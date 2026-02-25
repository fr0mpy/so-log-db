# @stackone-ui/core

Core UI component library for StackOne applications.

## Theme System

Two-tier architecture for theming:

| Tier | File | Content | When Loaded |
|------|------|---------|-------------|
| **Base** | `src/themes/base.css` | Spacing, shadows, radius, z-index | Bundled (static) |
| **Brand** | `public/themes/*.json` | Colors, fonts | Runtime (dynamic) |

### Token Categories

**Base Tokens** (edit `base.css`):
- Spacing: `--spacing-1` through `--spacing-16`
- Radius: `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`
- Z-Index: `--z-dropdown`, `--z-modal`, `--z-tooltip`, etc.
- Motion: `--motion-duration-fast`, `--motion-duration-normal`, etc.
- Shadows: `--shadow-raised`, `--shadow-pressed`, `--shadow-flat`, etc.

**Brand Tokens** (edit `schema.ts` + brand JSON):
- Colors: `--color-primary`, `--color-secondary`, `--color-background`, etc.
- Fonts: `--font-heading`, `--font-body`, `--font-code`

## Usage

### Importing Components

```tsx
// Granular imports (recommended - tree-shakeable)
import { Card } from '@stackone-ui/core/card'
import { Button } from '@stackone-ui/core/button'
import { Text } from '@stackone-ui/core/text'

// Config and utilities
import { ARIA, SPRING } from '@stackone-ui/core/config'
import { cn } from '@stackone-ui/core/utils'
```

### Tailwind Preset

```ts
// tailwind.config.ts
import stackonePreset from '@stackone-ui/core/tailwind.preset'

export default {
  presets: [stackonePreset],
  content: ['./src/**/*.{ts,tsx}'],
}
```

### Theme Provider

```tsx
import { ThemeProvider } from '@stackone-ui/core/providers'
import '@stackone-ui/core/themes/base.css'

function App() {
  return (
    <ThemeProvider brandThemeUrl="/themes/stackone-green.json">
      {children}
    </ThemeProvider>
  )
}
```
