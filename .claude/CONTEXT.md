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
| **Component Library**    | Shared UI components consumed by host and MFEs     |
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

- **Module Federation** — MFEs are independently deployable
- **Host provides shared deps** — React, component library available at runtime
- **MFEs declare peer deps** — No bundling of shared libraries

### Monorepo

- **Turborepo** — Monorepo tooling for caching and incremental builds
- Structure TBD, likely:
  ```
  apps/
    log-dashboard/     # MFE
  packages/
    ui/                # Component library
    theme/             # Theme provider + tokens
    sync/              # PowerSync client (if shared)
  ```

### Host Relationship

- **Host is editable** — We can modify Host behavior when needed
- **Host is server-rendered (SSR)** — Returns fully rendered HTML, then hydrates on client
- **Host imports component library** — We publish, they consume
- **Host reads MFE manifests** — Published config dictates MFE loading
- **Host provides shared runtime** — React, router available at runtime
- **Host handles all routing** — Direct visits go through Host first
- **MFE loads on route match** — Host dynamically imports MFE when URL matches its routes
- **Direct visits are primary traffic** — Users frequently visit MFE URLs directly (not just in-app navigation)

### MFE Manifest

- **Published separately** — Host fetches manifest to load MFE
- **Contains:**
  - `name` — MFE identifier
  - `routes` — Route patterns this MFE handles (e.g., `["/stackone", "/stackone/*"]`)
  - `entry` — Bundle URL with content hash
  - `themeUrl` — Where to fetch theme config
  - `themeName` — Which theme to apply
  - `preload` — Whether Host should inject modulepreload hint for direct visits
  - `assets.wasm` — Optional WASM preload config:
    - `url` — WASM file URL
    - `routes` — Routes requiring WASM (e.g., `["/stackone/search/*"]`)

---

## Design System

### Tokens

- **Tokens Studio** — Figma plugin for managing design tokens
- **Style Dictionary** — Transforms tokens to CSS vars, Tailwind config, JSON

### Component Library

- **Owned by this team**
- **Tailwind CSS** — Utility-first styling
- **Consumed via peer deps** — Host imports, MFEs reference as peer

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
| Module Federation | MFE runtime sharing |

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
| **First visit** | Search | Host SSR → REST fetch → Render → Background: WASM + SQLite |
| **First visit** | Other | Host SSR → REST fetch → Render (no SQLite) |
| **Return visit** | Search | Host SSR → SQLite query → Instant render |
| **Return visit** | Other | Host SSR → REST fetch → Render |
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
| **FCP** | Host SSR provides early shell; skeleton renders before data |

### Remaining LCP Dependencies

After route-aware preload, LCP still depends on:
```
MFE render → PowerSync init → SQLite WASM → Query local data → Hydrate
```
PowerSync/SQLite are client-only and cannot be SSR'd. Local-first model means subsequent visits have instant data.

---

## Open Questions

- [x] MFE manifest schema — Defined (name, routes, entry, themeUrl, themeName, preload)
- [ ] Turborepo package structure — Exact layout TBD
- [ ] PowerSync scope — Shared package or MFE-specific?
- [ ] Theme CDN implementation — Storage, versioning, invalidation
- [ ] Storybook setup — Standalone or part of monorepo?
- [x] Host rendering strategy — Server-rendered (SSR) with hydration
- [ ] Host route-aware preload — We can implement this in Host

---

## Key Files

| File                                    | Purpose                            |
| --------------------------------------- | ---------------------------------- |
| [architecture.md](../architecture.md)   | Full architecture diagrams         |
| [architecture.mmd](../architecture.mmd) | Mermaid source for diagrams        |
| `.claude/component-recipes/`            | Component implementation templates |

---

## Constraints

1. **Host is editable** — Can modify host behavior when needed
2. **Peer deps required** — Must not bundle shared libraries
3. **Runtime theming** — Themes applied via CSS variables, not build-time
4. **Offline-capable** — PowerSync enables local-first data access
5. **Direct visits through Host** — All MFE access goes through Host routing
6. **PowerSync is client-only** — SQLite WASM cannot run server-side, limits SSR options

## Host Integration Requirements

For optimal direct visit performance, Host should:

1. **Read MFE manifest at SSR time** — Match URL to MFE routes
2. **Inject modulepreload hint** — `<link rel="modulepreload" href="[entry]">` for matched MFE
3. **Inject WASM preload (if route matches)** — `<link rel="preload" href="[wasm.url]" as="fetch">` when URL matches `assets.wasm.routes`
4. **Include mount point in SSR HTML** — MFE container exists before Host JS runs

We can implement these directly in Host when needed.
