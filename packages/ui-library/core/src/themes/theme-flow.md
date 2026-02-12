# Theme System Flow

This document describes how the StackOne theme system loads, validates, and applies theme tokens.

## Architecture Overview

The theme system uses a **two-tier architecture** that separates structural and visual tokens:

| Tier | Contains | Bundled | Purpose |
|------|----------|---------|---------|
| **Base Theme** | Spacing, radius, shadows, motion, z-index | With app | Structural/layout tokens |
| **Brand Theme** | Colors, typography | Fetched at runtime | Visual/brand-specific tokens |

```
┌─────────────────────────────────────────────────────────────────┐
│                        Theme System                              │
├──────────────────────────┬──────────────────────────────────────┤
│      Base Theme          │         Brand Theme                  │
│    (bundled JSON)        │      (fetched JSON)                  │
├──────────────────────────┼──────────────────────────────────────┤
│  • spacing               │  • color.light.*                     │
│  • radius                │  • color.dark.*                      │
│  • shadow.light.*        │  • font (heading, body, code)        │
│  • shadow.dark.*         │                                      │
│  • motion                │                                      │
│  • zIndex                │                                      │
└──────────────────────────┴──────────────────────────────────────┘
```

## File Structure

```
packages/ui-library/core/src/themes/
├── schema.ts          # Token definitions + fallback values
├── base.json          # Default base theme (bundled)
├── apply-theme.ts     # CSS variable injection
├── validate-theme.ts  # Validation + fallback merging
├── logger.ts          # Theme-specific logging
└── index.ts           # Barrel exports

apps/shell/public/themes/
└── stackone-green.json   # Brand theme (fetched at runtime)
```

## Initialization Flow

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. App Layout Mounts                                            │
│    ├─ Font CSS variables injected via className                 │
│    └─ ThemeProvider initializes                                 │
└────────────────────────────┬────────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│ 2. ThemeProvider                                                │
│    ├─ Restores theme mode from localStorage (or 'light')        │
│    ├─ Adds 'dark' class to <html> if needed                     │
│    └─ Tracks document.fonts.ready for font loading state        │
└────────────────────────────┬────────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│ 3. ThemeInitializer                                             │
│    ├─ initBaseTheme()                                           │
│    │   ├─ validateBaseTheme(base.json)                          │
│    │   ├─ logWarnings() if tokens missing                       │
│    │   └─ applyBaseTheme(theme, { mode })                       │
│    │                                                            │
│    └─ loadBrandTheme('stackone-green')                          │
│        ├─ fetch('/themes/stackone-green.json')                  │
│        ├─ validateBrandTheme(response)                          │
│        ├─ logWarnings() if tokens missing                       │
│        └─ applyBrandTheme(theme, { mode })                      │
└────────────────────────────┬────────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│ 4. CSS Variables Applied to <html>                              │
│    --spacing-1, --spacing-2, ...                                │
│    --radius-sm, --radius-md, ...                                │
│    --shadow-raised, --shadow-pressed, ...                       │
│    --color-primary, --color-background, ...                     │
│    --font-heading, --font-body, --font-code                     │
└────────────────────────────┬────────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│ 5. Tailwind Reads CSS Variables                                 │
│    bg-primary → var(--color-primary)                            │
│    shadow-neu-raised → var(--shadow-raised)                     │
│    font-body → var(--font-body)                                 │
└─────────────────────────────────────────────────────────────────┘
```

## CSS Variable Naming Convention

All theme tokens use category prefixes:

| Category | Prefix | Examples |
|----------|--------|----------|
| Colors | `--color-*` | `--color-primary`, `--color-background` |
| Shadows | `--shadow-*` | `--shadow-raised`, `--shadow-pressed` |
| Radius | `--radius-*` | `--radius-sm`, `--radius-md` |
| Spacing | `--spacing-*` | `--spacing-1`, `--spacing-4` |
| Typography | `--font-*` | `--font-heading`, `--font-body` |
| Motion | `--motion-*` | `--motion-duration-fast` |
| Z-Index | `--z-*` | `--z-modal`, `--z-tooltip` |

## Validation System

The validation system ensures themes **never break the app**. Missing tokens use fallback values from the schema.

```typescript
// validate-theme.ts
const { theme, warnings } = validateBrandTheme(fetchedTheme)

// If stackone-green.json is missing 'primary-hover':
// - warnings: ["Missing token: color.light.primary-hover — using fallback"]
// - theme.color.light['primary-hover'] = '#008a52' (from schema fallback)
```

### Validation Flow

```
┌─────────────────────┐     ┌─────────────────────┐
│   Input JSON        │     │   Schema            │
│   (may be partial)  │     │   (with fallbacks)  │
└─────────┬───────────┘     └─────────┬───────────┘
          │                           │
          └───────────┬───────────────┘
                      ▼
          ┌───────────────────────┐
          │  For each token:      │
          │  input[key] ?? schema │
          │      .fallback        │
          └───────────┬───────────┘
                      ▼
          ┌───────────────────────┐
          │  Return:              │
          │  { theme, warnings }  │
          └───────────────────────┘
```

## Mode Switching (Light/Dark)

When the user toggles theme mode:

```typescript
// ThemeProvider
const toggle = () => setTheme(t => t === 'light' ? 'dark' : 'light')

// Effect triggers:
document.documentElement.classList.toggle('dark', theme === 'dark')
localStorage.setItem(STORAGE_KEY, theme)

// ThemeInitializer effect re-runs:
updateThemeMode(baseTheme, brandTheme, mode)
```

The `updateThemeMode` function re-applies only mode-specific tokens:
- Shadow tokens (different values for light/dark)
- Color tokens (different values for light/dark)

Non-mode-specific tokens (spacing, radius, motion, z-index) remain unchanged.

## Application Functions

### `applyBaseTheme(theme, options)`

Injects structural tokens as CSS variables:

```typescript
applyBaseTheme(defaultBaseTheme, { mode: 'light' })

// Result on <html>:
// --spacing-1: 0.25rem
// --spacing-2: 0.5rem
// --radius-sm: 0.375rem
// --shadow-raised: -6px -6px 14px rgba(...)
// --motion-duration-fast: 150ms
// --z-modal: 300
```

### `applyBrandTheme(theme, options)`

Injects visual tokens as CSS variables:

```typescript
applyBrandTheme(brandTheme, { mode: 'light' })

// Result on <html>:
// --color-primary: #00af66
// --color-background: #f0f0f0
// --font-heading: 'Figtree', ui-sans-serif, ...
// --font-body: 'Figtree', ui-sans-serif, ...
```

### `updateThemeMode(baseTheme, brandTheme, mode)`

Updates mode-specific tokens without re-applying everything:

```typescript
updateThemeMode(baseTheme, brandTheme, 'dark')

// Updates only:
// --shadow-* (from baseTheme.shadow.dark)
// --color-* (from brandTheme.color.dark)
```

### `clearTheme()` / `clearBrandTheme()`

Removes CSS variables from the DOM:

```typescript
clearTheme()       // Removes ALL theme variables
clearBrandTheme()  // Removes only color-* and font-* (preserves base)
```

## ThemeProvider Context

The `ThemeProvider` exposes:

```typescript
interface ThemeContextValue {
  theme: 'light' | 'dark'  // Current mode
  toggle: () => void       // Switch mode
  fontsLoaded: boolean     // Web fonts ready
}

// Usage in components:
const { theme, toggle, fontsLoaded } = useTheme()
```

The `fontsLoaded` flag tracks `document.fonts.ready` and can be used to prevent FOUT (Flash of Unstyled Text) or show loading states.

## Adding New Tokens

1. **Add to schema.ts** with a fallback value:
   ```typescript
   export const BRAND_THEME_SCHEMA = {
     color: {
       light: {
         'new-token': { fallback: '#ffffff' },
       },
       dark: {
         'new-token': { fallback: '#000000' },
       },
     },
   }
   ```

2. **Add to theme JSON** (base.json or brand theme):
   ```json
   {
     "color": {
       "light": { "new-token": "#f5f5f5" },
       "dark": { "new-token": "#1a1a1a" }
     }
   }
   ```

3. **Add to Tailwind preset** if a utility class is needed:
   ```typescript
   // tailwind.preset.ts
   colors: {
     'new-token': 'var(--color-new-token)',
   }
   ```

4. **Use in components**:
   ```tsx
   <div className="bg-new-token">...</div>
   // or
   <div style={{ background: 'var(--color-new-token)' }}>...</div>
   ```

## Key Design Principles

1. **Fail-Safe**: Missing tokens use fallbacks; app never breaks
2. **Separation**: Base (structural) vs Brand (visual) load separately
3. **Caching**: Brand themes cached in memory after first fetch
4. **Mode Efficiency**: Only mode-specific tokens update on toggle
5. **Prefix Convention**: All vars prefixed (`--color-*`, `--spacing-*`)
6. **Dynamic Loading**: Brand themes fetched at runtime (not bundled)
7. **Tailwind Integration**: Preset maps utilities to CSS variables
