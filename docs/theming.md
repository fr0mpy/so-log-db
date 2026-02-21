# Theming

The StackOne theme system uses a **two-tier architecture** separating structural and visual tokens.

## Architecture

| Tier | Contains | Loading | Purpose |
|------|----------|---------|---------|
| **Base Theme** | Spacing, radius, shadows, motion, z-index | Bundled | Structural/layout tokens |
| **Brand Theme** | Colors, typography | Runtime fetch | Visual/brand tokens |

```
Base Theme (bundled)              Brand Theme (fetched)
├── spacing                       ├── color.light.*
├── radius                        ├── color.dark.*
├── shadow.light/dark             └── font (heading, body, code)
├── motion
└── zIndex
```

## CSS Variable Naming

| Category | Prefix | Examples |
|----------|--------|----------|
| Colors | `--color-*` | `--color-primary`, `--color-background` |
| Shadows | `--shadow-*` | `--shadow-raised`, `--shadow-pressed` |
| Radius | `--radius-*` | `--radius-sm`, `--radius-md` |
| Spacing | `--spacing-*` | `--spacing-1`, `--spacing-4` |
| Typography | `--font-*` | `--font-heading`, `--font-body` |
| Motion | `--motion-*` | `--motion-duration-fast` |
| Z-Index | `--z-*` | `--z-modal`, `--z-tooltip` |

## Initialization Flow

1. **Layout mounts** - Font CSS variables injected via className
2. **ThemeProvider initializes** - Restores mode from localStorage, sets `dark` class on `<html>`
3. **Base theme applied** - Structural tokens injected as CSS variables
4. **Brand theme fetched** - Visual tokens fetched from `/themes/*.json` and applied
5. **Tailwind reads variables** - `bg-primary` → `var(--color-primary)`

## FOUC Prevention

An inline script sets the `dark` class before React hydrates:

```tsx
// In layout.tsx <head>
<script dangerouslySetInnerHTML={{
  __html: `(function(){try{var t=localStorage.getItem('theme');
    document.documentElement.classList.toggle('dark',t==='dark')}catch(e){}})()`,
}} />
```

## Validation

Themes never break the app. Missing tokens use fallback values from `schema.ts`:

```typescript
const { theme, warnings } = validateBrandTheme(fetchedTheme)
// Missing tokens use schema fallbacks
```

## Mode Switching

When user toggles light/dark:

```typescript
// ThemeProvider
document.documentElement.classList.toggle('dark', theme === 'dark')
localStorage.setItem(STORAGE_KEY, theme)
// Only mode-specific tokens (shadows, colors) update
```

## ThemeProvider Context

```typescript
interface ThemeContextValue {
  theme: 'light' | 'dark'  // Current mode
  toggle: () => void       // Switch mode
  fontsLoaded: boolean     // Web fonts ready
}

const { theme, toggle, fontsLoaded } = useTheme()
```

## Adding New Tokens

1. Add to `schema.ts` with fallback value
2. Add to theme JSON (base.json or brand theme)
3. Add to `tailwind.preset.ts` if utility class needed
4. Use: `<div className="bg-new-token">` or `var(--color-new-token)`

## Key Files

| File | Purpose |
|------|---------|
| `packages/ui-library/core/src/themes/schema.ts` | Token definitions + fallbacks |
| `packages/ui-library/core/src/themes/base.json` | Base theme (bundled) |
| `apps/shell/public/themes/stackone-green.json` | Brand theme (fetched) |
| `packages/ui-library/core/src/providers/ThemeProvider.tsx` | React context |
