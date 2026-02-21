# Deployment

Vercel Multi-Zone deployment configuration.

## Overview

4 separate Vercel projects deploy from the same monorepo using different build filters.

| Project | Filter | Output Directory |
|---------|--------|------------------|
| stackone-shell | `@stackone/shell` | `apps/shell/.next` |
| stackone-agent-toolkit | `@stackone/mfe-agent-toolkit` | `apps/mfe/agent-toolkit/.next` |
| stackone-component-library | `@stackone/mfe-component-library` | `apps/mfe/component-library/.next` |
| stackone-design-review | `@stackone/mfe-design-review` | `apps/mfe/design-review/.next` |

## vercel.json

Each project uses the same base config with a different filter:

```json
{
  "framework": "nextjs",
  "installCommand": "pnpm install",
  "buildCommand": "pnpm turbo run build --filter=@stackone/shell",
  "outputDirectory": "apps/shell/.next"
}
```

To deploy a different app, change `--filter` and `outputDirectory`.

## Environment Variables

### Shell (stackone-shell.vercel.app)

| Variable | Value | Required |
|----------|-------|----------|
| `MFE_AGENT_TOOLKIT_URL` | `https://stackone-agent-toolkit.vercel.app` | No (has default) |
| `MFE_COMPONENT_LIBRARY_URL` | `https://stackone-component-library.vercel.app` | No (has default) |
| `MFE_DESIGN_REVIEW_URL` | `https://stackone-design-review.vercel.app` | No (has default) |
| `BRAND_THEME` | `stackone-green` | No |

### All MFEs

| Variable | Value | Required |
|----------|-------|----------|
| `NEXT_PUBLIC_SHELL_URL` | `https://stackone-shell.vercel.app` | Yes |

### Agent Toolkit Only

| Variable | Value | Required |
|----------|-------|----------|
| `NEXT_PUBLIC_BASE_URL` | `https://stackone-shell.vercel.app/agent-toolkit` | Yes |
| `NEXT_PUBLIC_POWERSYNC_URL` | PowerSync instance URL | No |

## Deployment Order

1. **Deploy MFEs first** - They're independent
2. **Deploy Shell last** - Depends on MFE URLs for rewrites

## Local Development

```bash
# All apps in parallel
pnpm dev

# Individual apps
pnpm dev:shell               # Port 3000
pnpm dev:agent-toolkit       # Port 3001
pnpm dev:component-library   # Port 3002
pnpm dev:design-review       # Port 3003
```

## Production URLs

| App | URL |
|-----|-----|
| Shell | `https://stackone-shell.vercel.app` |
| Agent Toolkit | `https://stackone-shell.vercel.app/agent-toolkit` |
| Component Library | `https://stackone-shell.vercel.app/component-library` |
| Design Review | `https://stackone-shell.vercel.app/design-review` |

Note: MFE URLs are proxied through Shell via rewrites. Users always see Shell URLs.

## .env.example Files

| App | Location |
|-----|----------|
| Shell | `apps/shell/.env.example` |
| Agent Toolkit | `apps/mfe/agent-toolkit/.env.example` |
| Component Library | `apps/mfe/component-library/.env.example` |
| Design Review | `apps/mfe/design-review/.env.example` |

Copy to `.env.local` for local development.
