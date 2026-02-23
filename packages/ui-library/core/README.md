# @stackone-ui/core

Core UI component library for StackOne applications.

## Design Token System

Tokens are managed through a **single source of truth** system. Edit the source files and regenerate outputs.

### Architecture

| Tier | Source | Output | Runtime |
|------|--------|--------|---------|
| **Base** | `src/tokens/base.tokens.ts` | `src/themes/base.css` | Static (bundled) |
| **Brand** | `src/tokens/brand.tokens.ts` | `src/themes/schema.ts` | Dynamic (fetched JSON) |
| **Both** | Both sources | `tailwind.preset.ts` | Build-time |

### Regenerating Tokens

```bash
# From package directory
pnpm build:tokens

# From monorepo root
pnpm --filter @stackone-ui/core build:tokens
```

Or use VSCode task: `Tasks: Run Task` → `build:tokens`

### Adding Tokens

#### New Base Token (spacing, radius, shadow, z-index, motion)

1. Edit `src/tokens/base.tokens.ts`
2. Run `pnpm build:tokens`
3. Commit generated files

#### New Brand Token (color, font)

1. Edit `src/tokens/brand.tokens.ts` (add key + fallback)
2. Run `pnpm build:tokens`
3. Add value to runtime theme JSON (`public/themes/stackone-green.json`)
4. Commit all changes

### Generated Files

These files have `AUTO-GENERATED` headers - do not edit directly:

| File | Purpose |
|------|---------|
| `src/themes/base.css` | CSS variables for structural tokens |
| `src/themes/schema.ts` | Brand token schema + fallbacks for validation |
| `tailwind.preset.ts` | Tailwind utility → CSS variable mappings |

### Token Categories

**Base Tokens** (static, bundled):
- Spacing: `--spacing-1` through `--spacing-16`
- Radius: `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`, `--radius-2xl`
- Z-Index: `--z-dropdown`, `--z-sticky`, `--z-modal`, `--z-popover`, `--z-tooltip`, `--z-toast`
- Motion: `--motion-duration-*`, `--motion-spring-*`
- Shadows: `--shadow-raised`, `--shadow-pressed`, `--shadow-flat`, etc.

**Brand Tokens** (dynamic, fetched at runtime):
- Colors: `--color-primary`, `--color-secondary`, `--color-background`, etc.
- Fonts: `--font-heading`, `--font-body`, `--font-code`

**Computed Tokens** (derived via `color-mix()`):
- `--color-primary-muted`, `--color-success-muted`, etc.

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
