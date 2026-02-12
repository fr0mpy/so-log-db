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
Published as `stackone-ui`. Import components and utilities:

```tsx
import { Button, Dialog, useControlledState } from 'stackone-ui'
import { Form, Layout } from 'stackone-ui/styles'
import { SPRING, DURATION } from 'stackone-ui/config'
```

### Harness (`packages/ui-library/harness`)
Component gallery for development. Not published.

## Tech Stack

- **Build**: Turborepo + pnpm workspaces
- **Apps**: Next.js 15, React 19
- **Styling**: Tailwind CSS, CSS variables
- **Components**: Base UI, Framer Motion
