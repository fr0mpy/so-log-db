# Performance

Performance optimizations and best practices for the StackOne platform.

## Results Summary

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| **First Load JS** | 1.7 MB | 102 KB | **-94%** |
| **Performance Score** | 84 | 90+ | +6 points |
| **Accessibility Score** | 89 | 93 | +4 points |
| **Total Blocking Time** | 360ms | 250ms | -110ms |
| **Unused JavaScript** | 3,153 KB | ~50 KB | -98% |

## Key Optimizations

### 1. Granular Imports

The UI library uses granular exports to prevent bundle bloat:

```tsx
// Never import from barrel - pulls ALL components
import { Card, Badge, Spinner } from '@stackone-ui/core'

// Always use granular paths - tree-shakeable (~5KB per component)
import { Card, CardHeader } from '@stackone-ui/core/card'
import { Badge } from '@stackone-ui/core/badge'
import { Spinner } from '@stackone-ui/core/spinner'
```

### 2. Server Components by Default

Pages are React Server Components (no `'use client'`), minimizing JS sent to client.

| Component Type | JS Sent | When to Use |
|----------------|---------|-------------|
| Server Component | 0 KB | Default for pages and static content |
| Client Component | Full hydration | Only when required |

**What requires `'use client'`:**

| Trigger | Examples |
|---------|----------|
| React hooks | `useState`, `useEffect`, `useRef`, `useContext` |
| Event handlers | `onClick`, `onChange`, `onSubmit` |
| Browser APIs | `localStorage`, `window`, `document` |

**What does NOT require `'use client'`:**
- Static JSX, props, children
- `async/await` data fetching
- CSS classes (Tailwind)

### 3. Modern Browserslist

Targeting only modern browsers eliminates legacy polyfills (~10KB savings):

```json
{
  "browserslist": [
    "last 2 Chrome versions",
    "last 2 Firefox versions",
    "last 2 Safari versions",
    "last 2 Edge versions"
  ]
}
```

### 4. CSS-Only Animations

Spinner uses pure CSS instead of Framer Motion:

```tsx
// Before: Pulls framer-motion (~150KB)
import { motion } from 'framer-motion'
<motion.div animate={{ rotate: 360 }} />

// After: Pure CSS (~0KB additional)
<style>{`
  @keyframes cube-spin {
    0% { transform: rotateX(0) rotateY(0); }
    100% { transform: rotateX(360deg) rotateY(360deg); }
  }
`}</style>
```

### 5. Server-Safe Config Imports

```tsx
// Barrel has 'use client' - breaks server components
import { ARIA } from '@stackone-ui/core'

// Server-safe granular import
import { ARIA } from '@stackone-ui/core/config'
```

## Bundle Composition

```
First Load JS shared by all: 102 KB
├─ React 19 + React DOM:     ~45 KB (required)
├─ Next.js 15 framework:     ~55 KB (required)
├─ App code + utilities:     ~2 KB
└─ Page-specific code:       144-163 bytes each
```

## Performance Targets

| Metric | Target | Current |
|--------|--------|---------|
| Lighthouse Performance | 90+ | 90 |
| First Load JS (shared) | <110 KB | 102 KB |
| Total Blocking Time | <200ms | 250ms |
| Largest Contentful Paint | <2.5s | Pass |
| Cumulative Layout Shift | <0.1 | Pass |

## How to Measure

### Bundle Analysis

```bash
cd apps/mfe/agent-toolkit
ANALYZE=true pnpm build
# Opens interactive treemap at .next/analyze/client.html
```

### Lighthouse Audit

1. Run production build: `pnpm build`
2. Start server: `pnpm start`
3. Open Chrome DevTools -> Lighthouse
4. Run audit in Incognito mode (no extensions)

### Build Output

```bash
pnpm build 2>&1 | grep -A 20 "First Load JS"
```

## Common Pitfalls

### Barrel Import

```tsx
// Never import from barrel
import { Card } from '@stackone-ui/core'

// Use granular path
import { Card } from '@stackone-ui/core/card'
```

### Unnecessary 'use client'

```tsx
// Don't add 'use client' for static content
'use client'
export default function StaticPage() { return <div>...</div> }

// Keep as Server Component
export default function StaticPage() { return <div>...</div> }
```

### Non-Composited Animations

```css
/* Triggers layout, causes jank */
animation: slide { width, height, top, left }

/* GPU accelerated */
animation: slide { transform, opacity }
```

### Heavy Dependencies

| Avoid | Use Instead |
|-------|-------------|
| `moment.js` (300KB) | `date-fns` (tree-shakeable) |
| `lodash` (70KB) | `lodash-es` or native methods |
| `framer-motion` (150KB) | CSS animations where possible |

## Server vs Client Exports

### Server-Safe (No 'use client')

| Export | Path |
|--------|------|
| Card, CardHeader, etc. | `@stackone-ui/core/card` |
| Badge | `@stackone-ui/core/badge` |
| Spinner | `@stackone-ui/core/spinner` |
| ARIA, LABEL, SR_ONLY | `@stackone-ui/core/config` |
| Style patterns | `@stackone-ui/core/styles` |

### Client-Only (Has 'use client')

| Export | Path | Reason |
|--------|------|--------|
| ThemeProvider | `@stackone-ui/core/providers` | Hooks, localStorage |
| Button (animated) | `@stackone-ui/core/button` | Motion |
| Select, Slider, Dialog | Interactive | Event handlers |
| All hooks | `@stackone-ui/core/hooks` | React hooks |
