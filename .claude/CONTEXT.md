# Project Context

> Last updated: 2026-02-18

## Overview

**Project:** StackOne Log Dashboard
**Type:** Unified Next.js App with Lazy-Loaded Sections
**Stage:** Production Ready

---

## What We're Building

| Deliverable              | Description                                        |
| ------------------------ | -------------------------------------------------- |
| **StackOne Dashboard**   | Unified app with log dashboard, search, and data exploration |
| **Component Library**    | Shared UI components (`@stackone-ui/core`)         |
| **Theme Infrastructure** | Design tokens + runtime theming                    |

### App Sections

| Section | Purpose | Data Strategy |
|---------|---------|---------------|
| **Agent Toolkit** | Real-time log viewing and analysis | REST |
| **Component Library** | Component gallery and documentation | Static |
| **Design Review** | Design assets and guidelines | Static |

---

## Architecture Decisions

### Unified App with Lazy Loading

- **Single Next.js deployment** — All sections in one app
- **Route groups for lazy loading** — `(agent-toolkit)`, `(component-library)`, `(design-review)`
- **Shared UI via workspace package** — `@stackone-ui/core` with `transpilePackages`

### Monorepo

- **Turborepo + pnpm workspaces** — Monorepo tooling for caching and incremental builds
- Structure:
  ```
  apps/
    shell/                          # Unified app (port 3000)
      src/app/
        (agent-toolkit)/            # Lazy-loaded section
        (component-library)/        # Lazy-loaded section
        (design-review)/            # Lazy-loaded section
  packages/
    ui-library/
      core/                         # @stackone-ui/core - Component library
      harness/                      # Component preview harness (Vite)
    i18n/                           # @stackone/i18n - Translations
  ```

### Routing

- **All routes in single app** — No cross-zone navigation issues
- **Client-side navigation** — `<Link>` for all internal routes
- **Route groups** — `(folder-name)` for code organization without affecting URLs

---

## Design System

### Tokens

- **Tokens Studio** — Figma plugin for managing design tokens
- **Style Dictionary** — Transforms tokens to CSS vars, Tailwind config, JSON

### Component Library

- **Owned by this team**
- **Tailwind CSS** — Utility-first styling
- **Zero-inline-classnames** — All styles in `styles.ts` files

### Theme Flow

1. App reads theme preference from localStorage
2. Inline script sets theme class before React hydrates (prevents FOUC)
3. ThemeProvider maintains state for runtime switching

---

## Technical Stack

### Frontend

| Technology        | Purpose             |
| ----------------- | ------------------- |
| Next.js 15        | App framework       |
| React 19          | UI library          |
| Tailwind CSS      | Styling             |
| React Compiler    | Automatic optimization |

### Build & Tooling

| Technology       | Purpose                 |
| ---------------- | ----------------------- |
| Turborepo        | Monorepo management     |
| pnpm 9.0         | Package manager         |
| Vitest           | Unit testing            |
| Playwright       | E2E testing             |

---

## Runtime Sequence (Summary)

### Data Strategy

| Route | Strategy | Why |
|-------|----------|-----|
| **Agent Toolkit** | REST | Real-time log data |
| **Component Library** | Static | Demo pages |
| **Design Review** | Static | Documentation |

### Entry Paths

| Scenario | Flow |
|----------|------|
| **Direct visit** | SSR → Render page → Hydrate |
| **In-app nav** | Client-side routing → Render |

See [architecture.md](../docs/architecture.md) for detailed sequence diagrams.

---

## Core Web Vitals Strategy

### Optimizations in Place

| Metric | Strategy |
|--------|----------|
| **LCP** | SSR for all content; no client-only page wrappers |
| **CLS** | Skeleton UI reserves layout; metric-matched font fallbacks |
| **INP** | Theme init runs synchronously via inline script |
| **FCP** | SSR provides early content; skeleton renders before data |

---

## Key Files

| File                                    | Purpose                            |
| --------------------------------------- | ---------------------------------- |
| [architecture.md](../docs/architecture.md) | Full architecture diagrams      |
| `.claude/component-recipes/`            | Component implementation templates |
| `.claude/rules/`                        | Coding standards and patterns      |

---

## Constraints

1. **Single deployment** — All sections in one Vercel project
2. **Peer deps for shared packages** — Must not bundle shared libraries
3. **Runtime theming** — Themes applied via CSS variables
4. **Granular imports** — Never import from barrel `@stackone-ui/core`
5. **Zero-inline-classnames** — All Tailwind classes in `styles.ts`
