# Font System Flow

This document describes how the StackOne font system loads, configures, and prevents CLS (Cumulative Layout Shift).

## Architecture Overview

The font system supports **two loading strategies** to accommodate different build environments:

| Environment | Loader | How Fonts Load | CLS Prevention |
|-------------|--------|----------------|----------------|
| **Next.js** | `next-loader.ts` | `next/font` at build time | Auto-generated metric adjustments |
| **Vite** | `css-loader.ts` | Google Fonts CDN at runtime | Manual fallback `@font-face` rules |

```
┌─────────────────────────────────────────────────────────────────┐
│                        Font System                               │
├──────────────────────────┬──────────────────────────────────────┤
│      Configuration       │         Loaders                      │
│    (shared config)       │    (environment-specific)            │
├──────────────────────────┼──────────────────────────────────────┤
│  • config.ts             │  • next-loader.ts (Next.js)          │
│    - FONT_FAMILIES       │    - Uses next/font/google           │
│    - FONT_CONFIG         │    - Build-time optimization         │
│    - buildGoogleFontsUrl │                                      │
│                          │  • css-loader.ts (Vite)              │
│  • schema.ts             │    - Runtime CSS injection           │
│    - FONT_METRICS        │    - Google Fonts CDN                │
│    - generateFallback    │                                      │
└──────────────────────────┴──────────────────────────────────────┘
```

## File Structure

```
packages/ui-library/core/src/fonts/
├── config.ts                 # Font families, weights, display (SOURCE OF TRUTH)
├── schema.ts                 # Fallback metrics for CLS prevention
├── generate-next-loader.ts   # Script to generate next-loader.ts
├── next-loader.ts            # AUTO-GENERATED - next/font instances
├── css-loader.ts             # Runtime CSS injection (Vite apps)
├── index.ts                  # Namespace exports (Font.Sans, Font.Mono)
└── FONT-FLOW.md              # This document
```

## Single Source of Truth: Code Generation

`next/font` performs static analysis at build time and requires literal values. To maintain a single source of truth, we **generate** `next-loader.ts` from `config.ts`.

```
┌─────────────────┐      generate:fonts       ┌─────────────────────┐
│   config.ts     │  ───────────────────────► │   next-loader.ts    │
│  (source of     │                           │   (auto-generated)  │
│   truth)        │                           │                     │
└─────────────────┘                           └─────────────────────┘
```

### Workflow

1. **Edit `config.ts`** - Change fonts, weights, display strategy
2. **Run `pnpm generate:fonts`** - Regenerates `next-loader.ts` with literals
3. **Commit both files** - Generated file is checked in for CI

```bash
# After changing config.ts
cd packages/ui-library/core
pnpm generate:fonts
```

### Why This Works

The generator reads `config.ts` at build time and outputs literal values:

```typescript
// config.ts (source of truth)
export const FONT_FAMILIES = {
  sans: { name: 'Figtree', weights: [400, 500, 600, 700], ... }
}

// next-loader.ts (generated with literals)
export const fontSans = Figtree({
  weight: ['400', '500', '600', '700'],  // ← Literal from config
})

## Default Fonts

| Purpose | Font | Weights | CSS Variable |
|---------|------|---------|--------------|
| **Body & Heading** | Figtree | 400, 500, 600, 700 | `--font-body`, `--font-heading` |
| **Code** | IBM Plex Mono | 400, 500 | `--font-code` |

## Next.js Loading Flow (Shell, MFE)

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. BUILD TIME                                                    │
│    next/font analyzes font usage and generates:                  │
│    ├─ Optimized @font-face with subset                          │
│    ├─ Preload <link> tags                                       │
│    └─ Fallback font with metric adjustments                     │
└────────────────────────────┬────────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│ 2. HTML DOCUMENT                                                 │
│    <html class="__figtree_abc123 __ibm_plex_mono_def456">       │
│    <head>                                                        │
│      <style>                                                     │
│        @font-face {                                              │
│          font-family: '__Figtree';                               │
│          src: url('/_next/static/media/figtree.woff2');         │
│          font-display: swap;                                     │
│        }                                                         │
│        @font-face {                                              │
│          font-family: '__Figtree_Fallback';                      │
│          src: local('Arial');                                    │
│          size-adjust: 105%;        /* Match Figtree width */    │
│          ascent-override: 95%;     /* Match Figtree ascent */   │
│        }                                                         │
│      </style>                                                    │
│      <link rel="preload" href="/_next/static/media/figtree..."  │
│            as="font" type="font/woff2" crossorigin />           │
│    </head>                                                       │
└────────────────────────────┬────────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│ 3. INITIAL PAINT                                                 │
│    Text renders immediately with fallback font                   │
│    ├─ Fallback has adjusted metrics → minimal layout shift      │
│    └─ User sees content instantly (no FOIT)                     │
└────────────────────────────┬────────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│ 4. FONT SWAP                                                     │
│    Web font loads → display: swap triggers replacement           │
│    ├─ Metric-adjusted fallback → Figtree                        │
│    └─ Minimal CLS due to matching metrics                       │
└────────────────────────────┬────────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│ 5. ThemeProvider                                                 │
│    document.fonts.ready → fontsLoaded = true                     │
│    Components can react to font loading state                    │
└─────────────────────────────────────────────────────────────────┘
```

## Vite Loading Flow (Harness)

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. HTML DOCUMENT (index.html)                                    │
│    <head>                                                        │
│      <!-- Preconnect for faster DNS/TLS -->                     │
│      <link rel="preconnect" href="https://fonts.googleapis.com">│
│      <link rel="preconnect" href="https://fonts.gstatic.com"   │
│            crossorigin>                                          │
│                                                                  │
│      <!-- Google Fonts stylesheet -->                           │
│      <link href="https://fonts.googleapis.com/css2?family=     │
│            Figtree:wght@400;500;600;700&display=swap"           │
│            rel="stylesheet">                                     │
│                                                                  │
│      <style>                                                     │
│        /* Fallback fonts with metric adjustments */             │
│        @font-face {                                              │
│          font-family: 'Figtree Fallback';                        │
│          src: local('Arial'), local('Helvetica');               │
│          size-adjust: 105%;                                      │
│          ascent-override: 95%;                                   │
│          descent-override: 25%;                                  │
│          line-gap-override: 0%;                                  │
│        }                                                         │
│                                                                  │
│        :root {                                                   │
│          --font-body: 'Figtree', 'Figtree Fallback', ...;       │
│        }                                                         │
│      </style>                                                    │
│    </head>                                                       │
└────────────────────────────┬────────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│ 2. PARALLEL LOADING                                              │
│    Browser fetches in parallel:                                  │
│    ├─ JavaScript bundle                                         │
│    └─ Google Fonts CSS → font files                             │
└────────────────────────────┬────────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│ 3. INITIAL PAINT                                                 │
│    React renders with fallback font                              │
│    ├─ 'Figtree Fallback' uses adjusted metrics                  │
│    └─ Content visible immediately                               │
└────────────────────────────┬────────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│ 4. FONT SWAP                                                     │
│    display=swap → text swaps when Figtree loads                  │
│    Metric adjustments minimize visible shift                     │
└─────────────────────────────────────────────────────────────────┘
```

## CLS Prevention: Fallback Font Metrics

The key to preventing layout shift is making fallback fonts **visually match** the web font dimensions.

### Metric Properties

| Property | Purpose | Example |
|----------|---------|---------|
| `size-adjust` | Scale fallback to match web font width | `105%` |
| `ascent-override` | Match height above baseline | `95%` |
| `descent-override` | Match depth below baseline | `25%` |
| `line-gap-override` | Match line spacing | `0%` |

### How Metrics Work

```
Without Metric Adjustment:          With Metric Adjustment:
┌────────────────────────┐          ┌────────────────────────┐
│ Hello World            │          │ Hello World            │
│ ▲ Arial (fallback)     │          │ ▲ Arial (adjusted)     │
└────────────────────────┘          └────────────────────────┘
         ↓ swap                              ↓ swap
┌──────────────────────────┐        ┌────────────────────────┐
│ Hello World              │        │ Hello World            │
│ ▲ Figtree (wider!)       │        │ ▲ Figtree (same size!) │
└──────────────────────────┘        └────────────────────────┘
    ❌ Layout shifts!                    ✅ No shift!
```

### Defined Metrics (schema.ts)

```typescript
export const FONT_METRICS = {
  Figtree: {
    metrics: {
      sizeAdjust: '105%',
      ascentOverride: '95%',
      descentOverride: '25%',
      lineGapOverride: '0%',
    },
    localFonts: ['Arial', 'Helvetica Neue', 'Helvetica'],
  },
  'IBM Plex Mono': {
    metrics: {
      sizeAdjust: '100%',
      ascentOverride: '88%',
      descentOverride: '24%',
      lineGapOverride: '0%',
    },
    localFonts: ['Courier New', 'Courier'],
  },
}
```

## Font Display Strategies

The `display` option controls how fonts render during loading:

| Value | Behavior | CLS Risk | Use Case |
|-------|----------|----------|----------|
| `swap` | Show fallback immediately, swap when ready | Low (with metrics) | **Default** - best UX |
| `optional` | Use fallback if font not cached; no swap | **Zero** | Core Web Vitals critical |
| `fallback` | Brief invisible period, then fallback | Medium | Balanced approach |
| `block` | Invisible text until font loads | High | Avoid unless necessary |

### Configuring Display Strategy

```typescript
// fonts/config.ts
export const FONT_CONFIG = {
  display: 'swap',     // Change to 'optional' for zero CLS
  subsets: ['latin'],
  preload: true,
}
```

## Namespace Access

The `Font` namespace provides consistent access to font configuration:

```typescript
import { Font } from '@stackone-ui/core/fonts'

// CSS variable name
Font.Sans.variable    // '--font-body'
Font.Mono.variable    // '--font-code'

// Full font-family stack (with fallbacks)
Font.Sans.family      // "'Figtree', 'Figtree Fallback', ui-sans-serif, ..."
Font.Mono.family      // "'IBM Plex Mono', 'IBM Plex Mono Fallback', ..."

// Font name only
Font.Sans.name        // 'Figtree'
Font.Mono.name        // 'IBM Plex Mono'

// Available weights
Font.Sans.weights     // [400, 500, 600, 700]
```

## Integration with ThemeProvider

The `ThemeProvider` exposes font loading state:

```typescript
interface ThemeContextValue {
  theme: 'light' | 'dark'
  toggle: () => void
  fontsLoaded: boolean   // ← Font loading state
}

// Usage
const { fontsLoaded } = useTheme()

// Example: Prevent FOUT with skeleton
{fontsLoaded ? <Text>Content</Text> : <Skeleton />}
```

## Adding a New Font

### 1. Add to config.ts

```typescript
export const FONT_FAMILIES = {
  // ... existing fonts
  display: {
    name: 'Playfair Display',
    weights: [400, 700] as const,
    variable: '--font-display',
    fallback: 'Georgia, serif',
    googleFamily: 'Playfair+Display',
  },
}
```

### 2. Add metrics to schema.ts

```typescript
export const FONT_METRICS = {
  // ... existing metrics
  'Playfair Display': {
    metrics: {
      sizeAdjust: '98%',
      ascentOverride: '94%',
      descentOverride: '22%',
      lineGapOverride: '0%',
    },
    localFonts: ['Georgia', 'Times New Roman'],
  },
}
```

### 3. Update next-loader.ts (for Next.js)

```typescript
import { Playfair_Display } from 'next/font/google'

export const fontDisplay = Playfair_Display({
  subsets: FONT_CONFIG.subsets,
  display: FONT_CONFIG.display,
  variable: FONT_FAMILIES.display.variable,
  weight: ['400', '700'],
  adjustFontFallback: true,
})
```

### 4. Update harness index.html (for Vite)

```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap" />

<style>
  @font-face {
    font-family: 'Playfair Display Fallback';
    src: local('Georgia'), local('Times New Roman');
    size-adjust: 98%;
    ascent-override: 94%;
    descent-override: 22%;
    line-gap-override: 0%;
  }
</style>
```

### 5. Add to Tailwind preset (if needed)

```typescript
// tailwind.preset.ts
fontFamily: {
  display: 'var(--font-display)',
}
```

## Key Design Principles

1. **Environment Agnostic**: Same font config works for Next.js and Vite
2. **CLS Prevention**: Fallback metrics match web font dimensions
3. **Progressive Enhancement**: Content visible immediately, fonts swap in
4. **Configurable**: `display`, `subsets`, and `preload` are customizable
5. **Namespace Pattern**: `Font.Sans.*` for consistent access
6. **Theme Integration**: `fontsLoaded` state in ThemeProvider
7. **Fallback Safety**: System fonts always available if web fonts fail
