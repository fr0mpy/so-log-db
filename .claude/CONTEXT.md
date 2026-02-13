# Project Context

> Last updated: 2026-02-09

## Overview

**Project:** StackOne Log Dashboard
**Type:** Micro Frontend (MFE) + Design System
**Stage:** Architecture & Planning (no source code yet)

---

## What We're Building

| Deliverable              | Description                                        |
| ------------------------ | -------------------------------------------------- |
| **StackOne MFE**         | Multi-page MFE with log dashboard, search, and data exploration |
| **Component Library**    | Shared UI components consumed by shell and MFEs    |
| **Theme Infrastructure** | Design tokens + runtime theming via CDN            |
| **MFE Manifest System**  | Config that declares each MFE's theme and settings |

### MFE Pages

| Page | Purpose | Data Strategy |
|------|---------|---------------|
| **Log Dashboard** | Real-time log viewing and analysis | REST + WebSocket |
| **Search Pages** | Search across 1000s of items | Hybrid: REST + SQLite |
| **Data Exploration** | Drill into records, traces | REST only |

**SQLite is route-specific** — only search pages bootstrap WASM/SQLite.

---

## Architecture Decisions

### MFE Pattern

- **Multi-Zone** — Next.js zones with URL rewrites (not Module Federation)
- **Shell proxies to MFE** — Rewrites `/agent-toolkit/*` requests to MFE server
- **MFEs are standalone Next.js apps** — Each zone is independently deployable
- **Shared UI via workspace package** — `@stackone-ui/core` with `transpilePackages`

### Monorepo

- **Turborepo + pnpm workspaces** — Monorepo tooling for caching and incremental builds
- Structure:
  ```
  apps/
    shell/             # Shell app (port 3000)
    mfe/
      agent-toolkit/   # Agent Toolkit MFE (port 3001, basePath: /agent-toolkit)
  packages/
    ui-library/
      core/            # @stackone-ui/core - Component library
      harness/         # Component preview harness (Vite)
  ```

### Shell Relationship (Multi-Zone)

- **Shell is editable** — We can modify Shell behavior when needed
- **Shell is server-rendered (SSR)** — Returns fully rendered HTML, then hydrates on client
- **Shell imports component library** — Uses `@stackone-ui/core` with `transpilePackages`
- **Shell rewrites to MFE** — `/agent-toolkit/*` routes proxied to MFE server via `rewrites()`
- **MFE uses `basePath`** — MFE serves all routes under `/agent-toolkit` prefix
- **Each zone is independent** — Shell and MFE are separate Next.js apps with own builds
- **Direct visits are primary traffic** — Users frequently visit MFE URLs directly

### Multi-Zone Configuration

- **Shell `next.config.ts`** — Defines rewrites to proxy `/agent-toolkit/*` to MFE
- **MFE `next.config.ts`** — Sets `basePath: '/agent-toolkit'` to serve under prefix
- **No manifest required** — Routing handled via Next.js rewrites, not dynamic loading
- **Environment variable** — `MFE_URL` controls MFE destination (default: `http://localhost:3001`)

---

## Design System

### Tokens

- **Tokens Studio** — Figma plugin for managing design tokens
- **Style Dictionary** — Transforms tokens to CSS vars, Tailwind config, JSON

### Component Library

- **Owned by this team**
- **Tailwind CSS** — Utility-first styling
- **Consumed via peer deps** — Shell imports, MFEs reference as peer

### Figma Integration

- **Design team uses Figma**
- **Storybook** — Planned for component documentation
- **Storybook Connect** — Links Figma components to live code

### Theme Flow

1. MFE reads manifest to get `themeUrl` + `themeName`
2. MFE fetches theme from Theme CDN
3. MFE applies CSS variables at runtime
4. Cached in LocalStorage for instant subsequent loads

---

## Technical Stack

### Frontend

| Technology        | Purpose             |
| ----------------- | ------------------- |
| Next.js           | MFE framework       |
| React             | UI library          |
| Tailwind CSS      | Styling             |
| Multi-Zone        | Next.js zone routing |

### Local-First Data

| Technology    | Purpose                 |
| ------------- | ----------------------- |
| PowerSync     | Client-side sync engine |
| SQLite (WASM) | In-browser database     |
| Postgres      | Backend database        |

**Why Local SQLite?**
- Search across 1000s of items requires rapid filtering
- Local queries (~5-10ms) vs server round-trip (~100-200ms)
- Users tweak filters repeatedly — each tweak must be instant
- WASM cost (566KB) amortized across multi-page MFE

### Observability

| Technology    | Purpose             |
| ------------- | ------------------- |
| OpenTelemetry | Distributed tracing |
| Sentry        | Error tracking      |

### Build & Tooling

| Technology       | Purpose                 |
| ---------------- | ----------------------- |
| Turborepo        | Monorepo management     |
| Tokens Studio    | Design token management |
| Style Dictionary | Token transformation    |
| Storybook        | Component documentation |

---

## Runtime Sequence (Summary)

### Data Strategy: Route-Aware

| Route | Strategy | Why |
|-------|----------|-----|
| **Search pages** | Hybrid: REST-first + SQLite | Rapid filtering across 1000s of items |
| **Log dashboard** | REST + WebSocket | Real-time streaming, fresh data |
| **Data exploration** | REST only | Detail views, no heavy filtering |

### Entry Paths

| Scenario | Route | Flow |
|----------|-------|------|
| **First visit** | Search | Shell SSR → REST fetch → Render → Background: WASM + SQLite |
| **First visit** | Other | Shell SSR → REST fetch → Render (no SQLite) |
| **Return visit** | Search | Shell SSR → SQLite query → Instant render |
| **Return visit** | Other | Shell SSR → REST fetch → Render |
| **In-app nav** | → Search | Bootstrap SQLite on demand if not ready |

See [architecture.md](../architecture.md) for detailed sequence diagrams.

---

## Core Web Vitals Strategy

### Traffic Patterns

| Scenario | Frequency | Optimization |
|----------|-----------|--------------|
| Return visitor, in-app nav | High | Preload on intent + SW cache |
| Return visitor, direct visit | High | Route-aware preload + SW cache |
| First-time visitor | Lower | Route-aware preload (no SW cache yet) |

### Optimizations in Place

| Metric | Strategy |
|--------|----------|
| **LCP** | Route-aware preload eliminates MFE fetch waterfall; local-first data via PowerSync |
| **CLS** | Skeleton UI reserves layout; metric-matched font fallbacks |
| **INP** | Theme/PowerSync init runs in parallel; defer non-critical work |
| **FCP** | Shell SSR provides early shell; skeleton renders before data |

### Remaining LCP Dependencies

After route-aware preload, LCP still depends on:
```
MFE render → PowerSync init → SQLite WASM → Query local data → Hydrate
```
PowerSync/SQLite are client-only and cannot be SSR'd. Local-first model means subsequent visits have instant data.

---

## Open Questions

- [x] MFE architecture — Multi-Zone with rewrites (not Module Federation)
- [x] Turborepo package structure — Defined (apps/shell, apps/mfe/agent-toolkit, packages/ui-library)
- [ ] PowerSync scope — Shared package or MFE-specific?
- [ ] Theme CDN implementation — Storage, versioning, invalidation
- [ ] Storybook setup — Standalone or part of monorepo?
- [x] Shell rendering strategy — Server-rendered (SSR) with hydration

---

## Key Files

| File                                    | Purpose                            |
| --------------------------------------- | ---------------------------------- |
| [architecture.md](../architecture.md)   | Full architecture diagrams         |
| [architecture.mmd](../architecture.mmd) | Mermaid source for diagrams        |
| `.claude/component-recipes/`            | Component implementation templates |

---

## Constraints

1. **Shell is editable** — Can modify shell behavior when needed
2. **Peer deps required** — Must not bundle shared libraries
3. **Runtime theming** — Themes applied via CSS variables, not build-time
4. **Offline-capable** — PowerSync enables local-first data access
5. **Direct visits through Shell** — All MFE access goes through Shell routing
6. **PowerSync is client-only** — SQLite WASM cannot run server-side, limits SSR options

## Multi-Zone Setup

Shell and MFE are independent Next.js apps connected via rewrites:

1. **Shell rewrites** — `next.config.ts` proxies `/agent-toolkit/*` to MFE server
2. **MFE basePath** — MFE sets `basePath: '/agent-toolkit'` so all routes serve under prefix
3. **Shared UI** — Both apps use `@stackone-ui/core` via `transpilePackages`
4. **Environment config** — `MFE_URL` env var controls MFE destination in production
