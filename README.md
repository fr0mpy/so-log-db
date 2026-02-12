# StackOne Log Dashboard

Turborepo monorepo for the StackOne log dashboard MFE and component library.

## Structure

```
apps/
  shell/           → Next.js SSR shell (port 3000)
  mfe/toolset/     → Next.js MFE - Log Dashboard (port 3001)
packages/
  ui-library/
    core/          → Component library (stackone-ui)
    harness/       → Dev preview tool (port 5173)
  utils/           → Shared utilities
```

## Quick Start

```bash
pnpm install

# Development (with hot reload)
pnpm dev:all       # Run all three servers
pnpm dev:harness   # http://localhost:5173 - Component gallery
pnpm dev:shell     # http://localhost:3000 - Shell app
pnpm dev:toolset   # http://localhost:3001 - Log dashboard

# Production build
pnpm build
cd apps/shell && pnpm start     # http://localhost:3000
cd apps/mfe/toolset && pnpm start   # http://localhost:3001
```

## Apps

### Shell (`apps/shell`)
SSR shell that mounts MFEs. Routes to `/connectors/*` load the MFE.

### Toolset (`apps/mfe/toolset`)
Log dashboard with routes:
- `/` - Dashboard home
- `/logs` - Log list (REST + WebSocket)
- `/logs/[id]` - Log detail
- `/search` - Search (REST + SQLite)
- `/explore` - Data exploration

## Packages

### Core (`packages/ui-library/core`)
Published as `@stackone-ui/core`. Import components and utilities:

```tsx
import { Button, Dialog, useControlledState } from '@stackone-ui/core'
import { Form, Layout } from '@stackone-ui/core/styles'
import { SPRING, DURATION } from '@stackone-ui/core/config'
```

### Harness (`packages/ui-library/harness`)
Component gallery for development. Not published.

## Typography & Fonts

The design system uses **Figtree** (sans-serif) and **IBM Plex Mono** (monospace) with automatic CLS prevention via fallback font metrics.

### Font Architecture

```
packages/ui-library/core/src/fonts/
├── config.ts       → Font families, weights, display strategy
├── schema.ts       → Fallback metrics for CLS prevention
├── next-loader.ts  → next/font integration (Next.js apps)
├── css-loader.ts   → Runtime CSS injection (Vite apps)
└── index.ts        → Namespace exports (Font.Sans, Font.Mono)
```

### Usage

**Next.js Apps** (Shell, MFE):
```tsx
// app/layout.tsx
import { fontSans, fontMono } from '@stackone-ui/core/fonts/next-loader'

const fontVariables = `${fontSans.variable} ${fontMono.variable}`

export default function RootLayout({ children }) {
  return (
    <html className={fontVariables}>
      <body className={fontSans.className}>{children}</body>
    </html>
  )
}
```

**Vite Apps** (Harness):
```tsx
// Fonts loaded via index.html with Google Fonts CDN
// Fallback metrics defined inline for CLS prevention
```

**Namespace Access**:
```tsx
import { Font } from '@stackone-ui/core/fonts'

Font.Sans.family   // 'Figtree', 'Figtree Fallback', ui-sans-serif...
Font.Sans.variable // '--font-body'
Font.Mono.name     // 'IBM Plex Mono'
```

**Font Loading State**:
```tsx
import { useTheme } from '@stackone-ui/core/providers'

const { fontsLoaded } = useTheme()
```

### Configuration

Fonts are configurable in `fonts/config.ts`:

```ts
export const FONT_FAMILIES = {
  sans: {
    name: 'Figtree',           // Change to any Google Font
    weights: [400, 500, 600, 700],
    variable: '--font-body',
    fallback: 'ui-sans-serif, system-ui, sans-serif',
  },
  // ...
}

export const FONT_CONFIG = {
  display: 'swap',    // 'swap' | 'optional' | 'fallback'
  subsets: ['latin'], // Add 'latin-ext', 'cyrillic', etc.
  preload: true,
}
```

### CLS Prevention

Fallback fonts use metric adjustments (`size-adjust`, `ascent-override`, etc.) to match web font dimensions, minimizing layout shift when fonts swap. Metrics are defined in `fonts/schema.ts`.

## Tech Stack

- **Build**: Turborepo + pnpm workspaces
- **Apps**: Next.js 15, React 19
- **Styling**: Tailwind CSS, CSS variables
- **Components**: Base UI, Framer Motion
