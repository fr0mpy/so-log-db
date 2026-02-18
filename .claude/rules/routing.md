# Routing Rules

## Route Configuration

**Routes MUST come from centralized config — never hardcode route strings.**

| App | Config Location | Import |
|-----|-----------------|--------|
| Shell | `apps/shell/src/lib/routes.ts` | `import { Routes } from '@/lib/routes'` |
| MFE Agent Toolkit | `apps/mfe/agent-toolkit/src/routes.ts` | `import { Routes } from '@/routes'` |
| MFE Component Library | `apps/mfe/component-library/src/routes.ts` | `import { Routes } from '@/routes'` |
| MFE Design Review | `apps/mfe/design-review/src/routes.ts` | `import { Routes } from '@/routes'` |

```tsx
// ❌ NEVER — hardcoded route strings
<Link href="/logs">Logs</Link>
<a href="/">Home</a>

// ✅ ALWAYS — import from routes config
import { Routes } from '@/routes'
<Link href={Routes.logs.index}>Logs</Link>
<a href={Routes.shell.home}>Home</a>
```

## Multi-Zone Architecture

This project uses **Next.js Multi-Zones** with 4 separate deployments:

| App | URL | basePath |
|-----|-----|----------|
| Shell | `stackone-shell.vercel.app` | none |
| Agent Toolkit MFE | `stackone-agent-toolkit.vercel.app` | `/agent-toolkit` |
| Component Library MFE | `stackone-component-library.vercel.app` | `/component-library` |
| Design Review MFE | `stackone-design-review.vercel.app` | `/design-review` |

## Shell → MFE Navigation (Rewrites)

Shell uses rewrites to proxy MFE routes:

```ts
// apps/shell/next.config.ts
async rewrites() {
  return [
    {
      source: '/agent-toolkit/:path*',
      destination: `${MFE_AGENT_TOOLKIT_URL}/agent-toolkit/:path*`,
    },
    // ... other MFEs
  ]
}
```

**Shell links to MFEs use `<a>` tags (cross-zone):**

```tsx
// ✅ CORRECT — <a> for cross-zone navigation
<a href={Routes.agentToolkit}>Agent Toolkit</a>

// ❌ WRONG — <Link> only works within same zone
<Link href={Routes.agentToolkit}>Agent Toolkit</Link>
```

## MFE → Shell Navigation (Environment Variable)

MFEs link back to shell via `NEXT_PUBLIC_SHELL_URL` environment variable.

### Configuration

**1. next.config.ts** — Pass env to client:
```ts
const SHELL_URL = process.env.NEXT_PUBLIC_SHELL_URL || 'http://localhost:3000'

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_SHELL_URL: SHELL_URL,
  },
  // ...
}
```

**2. routes.ts** — Use env in Routes:
```ts
export const Routes = {
  // ... MFE routes
  shell: {
    home: process.env.NEXT_PUBLIC_SHELL_URL || '/',
  },
}
```

**3. Components** — Use Routes.shell.home:
```tsx
<a href={Routes.shell.home}>Back to Home</a>
```

### Vercel Environment Variables

Set `NEXT_PUBLIC_SHELL_URL` in each MFE project:

| Project | Variable | Value |
|---------|----------|-------|
| stackone-agent-toolkit | `NEXT_PUBLIC_SHELL_URL` | `https://stackone-shell.vercel.app` |
| stackone-component-library | `NEXT_PUBLIC_SHELL_URL` | `https://stackone-shell.vercel.app` |
| stackone-design-review | `NEXT_PUBLIC_SHELL_URL` | `https://stackone-shell.vercel.app` |

## Within-MFE Navigation

**Use `<Link>` for navigation within the same MFE:**

```tsx
// Within Agent Toolkit MFE
import Link from 'next/link'
import { Routes } from '@/routes'

<Link href={Routes.logs.index}>Logs</Link>
<Link href={Routes.logs.detail(id)}>Log Detail</Link>
```
