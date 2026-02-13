# Performance Optimization Guide

This document explains the performance optimizations implemented in this project and the best practices enforced to maintain them.

## Results Summary

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| **First Load JS** | 1.7 MB | 102 KB | **-94%** |
| **Performance Score** | 84 | 90+ | +6 points |
| **Accessibility Score** | 89 | 93 | +4 points |
| **Total Blocking Time** | 360ms | 250ms | -110ms |
| **Unused JavaScript** | 3,153 KB | ~50 KB | -98% |

## Key Optimizations

### 1. Granular Imports (Biggest Impact)

The UI library (`@stackone-ui/core`) was causing massive bundle bloat due to barrel export imports.

```tsx
// ❌ BEFORE: Pulls ALL 24+ components (1.7MB)
import { Card, Badge, Spinner } from '@stackone-ui/core'

// ✅ AFTER: Tree-shakeable (~5KB per component)
import { Card, CardHeader } from '@stackone-ui/core/card'
import { Badge } from '@stackone-ui/core/badge'
import { Spinner } from '@stackone-ui/core/spinner'
```

**Implementation:** Added `exports` field to `packages/ui-library/core/package.json`:

```json
{
  "exports": {
    ".": "./src/index.ts",
    "./card": "./src/components/card/index.ts",
    "./badge": "./src/components/display/badge.tsx",
    "./spinner": "./src/components/display/spinner.tsx",
    "./button": "./src/components/form/button.tsx",
    "./config": "./src/config/index.ts",
    "./providers": "./src/providers/index.ts",
    "./styles": "./src/styles/index.ts"
  }
}
```

### 2. Server Components by Default

All pages are React Server Components (no `'use client'` directive), minimizing JavaScript sent to the client.

| Component Type | JS Sent | When to Use |
|----------------|---------|-------------|
| Server Component | 0 KB | Default for all pages and static content |
| Client Component | Full hydration | Only when required (see below) |

**What requires `'use client'`:**

| Trigger | Examples |
|---------|----------|
| React hooks | `useState`, `useEffect`, `useRef`, `useContext`, `useReducer`, `useCallback` |
| Event handlers | `onClick`, `onChange`, `onSubmit`, `onKeyDown`, `onFocus` |
| Browser APIs | `localStorage`, `window`, `document`, `navigator` |

**What does NOT require `'use client'`:**
- Static JSX, props, children
- `async/await` data fetching
- CSS classes (Tailwind)
- `React.memo` (just a wrapper; React 19 auto-memoizes anyway)

**Current client components (minimal):**
- `ThemeProvider` - Uses `useState`, `useEffect`, `localStorage`
- `NavLink` - Uses `usePathname` hook

### 3. Modern Browserslist

Targeting only modern browsers eliminates legacy JavaScript polyfills (~10KB savings).

```json
// apps/mfe/connectors/package.json
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

The Spinner component uses pure CSS animations instead of Framer Motion, eliminating the motion library from the bundle.

```tsx
// ❌ BEFORE: Pulls framer-motion (~150KB)
import { motion } from 'framer-motion'
<motion.div animate={{ rotate: 360 }} />

// ✅ AFTER: Pure CSS (~0KB additional)
<style>{`
  @keyframes cube-spin {
    0% { transform: rotateX(0) rotateY(0); }
    100% { transform: rotateX(360deg) rotateY(360deg); }
  }
`}</style>
```

### 5. Server-Safe Config Imports

ARIA labels and text constants are imported from a server-safe path:

```tsx
// ❌ BEFORE: Barrel has 'use client' - breaks server components
import { ARIA } from '@stackone-ui/core'

// ✅ AFTER: Server-safe granular import
import { ARIA } from '@stackone-ui/core/config'
```

## Bundle Composition

Current production build breakdown:

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
| Lighthouse Performance | 90+ | 90 ✅ |
| First Load JS (shared) | <110 KB | 102 KB ✅ |
| Total Blocking Time | <200ms | 250ms ⚠️ |
| Largest Contentful Paint | <2.5s | ✅ |
| Cumulative Layout Shift | <0.1 | ✅ |

## How to Measure

### Bundle Analysis

```bash
cd apps/mfe/connectors
ANALYZE=true pnpm build
# Opens interactive treemap at .next/analyze/client.html
```

### Lighthouse Audit

1. Run production build: `pnpm build`
2. Start server: `pnpm start`
3. Open Chrome DevTools → Lighthouse
4. Run audit in Incognito mode (no extensions)

### Build Output

```bash
pnpm build 2>&1 | grep -A 20 "First Load JS"
```

## Enforcement

Performance best practices are enforced via Claude agents:

| Agent | Purpose |
|-------|---------|
| `performance-profiler` | Detects N+1 queries, bundle bloat, non-composited animations |
| `server-component-validator` | Validates server/client boundaries and import paths |
| `bundle-size-tracker` | Monitors First Load JS and flags regressions |
| `accessibility-auditor` | Ensures ARIA labels use config constants |

## Common Pitfalls to Avoid

### 1. Barrel Import

```tsx
// ❌ DO NOT import from barrel
import { Card } from '@stackone-ui/core'

// ✅ Use granular path
import { Card } from '@stackone-ui/core/card'
```

### 2. Unnecessary 'use client'

```tsx
// ❌ Don't add 'use client' for static content
'use client'
export default function StaticPage() { return <div>...</div> }

// ✅ Keep as Server Component
export default function StaticPage() { return <div>...</div> }
```

### 3. Non-Composited Animations

```css
/* ❌ Triggers layout, causes jank */
animation: slide { width, height, top, left }

/* ✅ GPU accelerated */
animation: slide { transform, opacity }
```

### 4. Heavy Dependencies

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

## Future Optimizations

To reduce TBT below 200ms:

1. **Islands Architecture** - Consider Astro or Qwik for even less JS
2. **Partial Hydration** - React experimental features
3. **CSS-based Active Links** - Replace `usePathname` with CSS `:has()`
4. **Route-based Code Splitting** - Dynamic imports for heavy components

## References

- [Next.js App Router Performance](https://nextjs.org/docs/app/building-your-application/optimizing)
- [React Server Components](https://react.dev/reference/rsc/server-components)
- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse Performance Scoring](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring)
