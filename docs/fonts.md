# Fonts

The font system supports two loading strategies for different environments.

## Loading Strategies

| Environment | Loader | How | CLS Prevention |
|-------------|--------|-----|----------------|
| **Next.js** | `next/font` | Build-time optimization | Auto-generated metrics |
| **Vite** | Google Fonts CDN | Runtime | Manual fallback metrics |

## Default Fonts

| Purpose | Font | Weights | CSS Variable |
|---------|------|---------|--------------|
| Body & Heading | Figtree | 400, 500, 600, 700 | `--font-body`, `--font-heading` |
| Code | IBM Plex Mono | 400, 500 | `--font-code` |

## CLS Prevention

Fallback fonts use metric adjustments to match web font dimensions:

| Property | Purpose | Example |
|----------|---------|---------|
| `size-adjust` | Scale to match width | `105%` |
| `ascent-override` | Match height above baseline | `95%` |
| `descent-override` | Match depth below baseline | `25%` |
| `line-gap-override` | Match line spacing | `0%` |

```css
@font-face {
  font-family: 'Figtree Fallback';
  src: local('Arial');
  size-adjust: 105%;
  ascent-override: 95%;
  descent-override: 25%;
  line-gap-override: 0%;
}
```

## Next.js Flow

1. **Build time** - `next/font` generates optimized `@font-face` with preload
2. **Initial paint** - Text renders with metric-adjusted fallback
3. **Font swap** - Web font loads, swaps in with minimal shift
4. **ThemeProvider** - `document.fonts.ready` → `fontsLoaded = true`

## Namespace Access

```typescript
import { Font } from '@stackone-ui/core/fonts'

Font.Sans.variable    // '--font-body'
Font.Sans.family      // "'Figtree', 'Figtree Fallback', ui-sans-serif, ..."
Font.Sans.name        // 'Figtree'
Font.Sans.weights     // [400, 500, 600, 700]
```

## Font Display Options

| Value | Behavior | CLS Risk |
|-------|----------|----------|
| `swap` | Show fallback immediately, swap when ready | Low (default) |
| `optional` | Use fallback if not cached | Zero |

## Adding New Fonts

1. Add to `config.ts` with weights, variable name, fallback
2. Add metrics to `schema.ts`
3. Run `pnpm generate:fonts` to regenerate `next-loader.ts`
4. Add to Tailwind preset if needed

## Key Files

| File | Purpose |
|------|---------|
| `packages/ui-library/core/src/fonts/config.ts` | Font families, weights (source of truth) |
| `packages/ui-library/core/src/fonts/schema.ts` | Fallback metrics |
| `packages/ui-library/core/src/fonts/next-loader.ts` | Auto-generated next/font instances |
