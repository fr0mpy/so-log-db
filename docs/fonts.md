# Fonts

The font system provides optimized font loading with CLS prevention.

## Default Fonts

| Purpose | Font | Weights | CSS Variable |
|---------|------|---------|--------------|
| Body & Heading | Inter | 400, 500, 600, 700 | `--font-sans` |
| Code | IBM Plex Mono | 400, 500 | `--font-mono` |

## CLS Prevention

Fallback fonts use metric adjustments to match web font dimensions:

| Property | Purpose | Example |
|----------|---------|---------|
| `size-adjust` | Scale to match width | `107.64%` |
| `ascent-override` | Match height above baseline | `96.88%` |
| `descent-override` | Match depth below baseline | `24.15%` |
| `line-gap-override` | Match line spacing | `0%` |

With `adjustFontFallback: true`, Next.js auto-generates:

```css
@font-face {
  font-family: '__Inter_Fallback';
  src: local('Arial');
  size-adjust: 107.64%;
  ascent-override: 96.88%;
  descent-override: 24.15%;
  line-gap-override: 0%;
}
```

## Next.js Flow

1. **Build time** - `next/font` generates optimized `@font-face` with preload
2. **Initial paint** - Text renders with metric-adjusted fallback
3. **Font swap** - Web font loads, swaps in with minimal shift

## Namespace Access

```typescript
import { Font } from '@stackone-ui/core/fonts'

Font.Sans.variable    // '--font-sans'
Font.Sans.family      // "'Inter', 'Inter Fallback', ui-sans-serif, ..."
Font.Sans.name        // 'Inter'
Font.Sans.weights     // [400, 500, 600, 700]
```

## Font Display Options

| Value | Behavior | CLS Risk |
|-------|----------|----------|
| `swap` | Show fallback immediately, swap when ready | Low (default) |
| `optional` | Use fallback if not cached | Zero |

## Adding New Fonts

1. Edit `next-loader.ts`:
   - Add to `FONT_FAMILIES` with name, weights, variable, fallback
   - Add new `next/font` instance with matching settings
2. Add fallback metrics to `schema.ts` (optional, for documentation)
3. Update `index.ts` Font namespace if needed
4. Add to Tailwind preset if needed

## Key Files

| File | Purpose |
|------|---------|
| `packages/ui-library/core/src/fonts/next-loader.ts` | Font config + next/font instances |
| `packages/ui-library/core/src/fonts/schema.ts` | Fallback metrics reference |
| `packages/ui-library/core/src/fonts/index.ts` | Font namespace + exports |
