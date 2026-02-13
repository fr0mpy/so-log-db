# Routing Rules

## Route Configuration

**Routes MUST come from centralized config — never hardcode route strings.**

| App | Config Location | Import |
|-----|-----------------|--------|
| Shell | `apps/shell/src/lib/routes.ts` | `import { Routes } from '@/lib/routes'` |
| MFE Agent Toolkit | `apps/mfe/agent-toolkit/src/routes.ts` | `import { Routes } from '@/routes'` |

```tsx
// ❌ NEVER — hardcoded route strings
<Link href="/logs">Logs</Link>
<a href="/agent-toolkit">MFE</a>
href={`/logs/${id}`}

// ✅ ALWAYS — import from routes config
import { Routes } from '@/routes'
<Link href={Routes.logs.index}>Logs</Link>
<a href={Routes.agentToolkit}>MFE</a>
href={Routes.logs.detail(id)}
```

## Route Config Structure

```ts
// Simple routes: string values
export const Routes = {
  dashboard: '/',
  search: '/search',

  // Nested routes: object with index + dynamic helpers
  logs: {
    index: '/logs',
    detail: (id: string | number) => `/logs/${id}` as const,
  },
} as const
```

## Navigation Items

```ts
export const NAV_ITEMS = [
  { href: Routes.dashboard, label: 'Dashboard' },
  { href: Routes.logs.index, label: 'Logs' },
] as const
```

## Multi-Zone Navigation

This project uses **Next.js Multi-Zones** (not Module Federation). Cross-zone links require full page navigation.

```tsx
// ❌ NEVER — next/link for cross-zone routes
import Link from 'next/link'
<Link href={Routes.agentToolkit}>MFE</Link>  // Causes webpack "call" error

// ✅ ALWAYS — <a> tag for cross-zone navigation
import { Routes } from '@/lib/routes'
<a href={Routes.agentToolkit}>MFE</a>  // Full page navigation via rewrite
```

**Why:** `next/link` performs client-side routing within the same zone. Routes served by different zones (via `rewrites()`) don't exist in the client router, causing webpack module errors.

| Route Type | Use |
|------------|-----|
| Same zone (e.g., `/about` in Shell) | `<Link href={Routes.about}>` |
| Cross zone (e.g., Agent Toolkit MFE) | `<a href={Routes.agentToolkit}>` |
| Within MFE (e.g., `/logs` in MFE) | `<Link href={Routes.logs.index}>` |
