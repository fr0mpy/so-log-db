# Architecture

## Multi-Zone MFE Overview

The platform uses Next.js Multi-Zones with 4 separate Vercel deployments. Shell serves as the main entry point and proxies requests to MFEs via URL rewrites.

| App | Port (dev) | basePath | Vercel URL |
|-----|-----------|----------|------------|
| Shell | 3000 | none | `stackone-shell.vercel.app` |
| Agent Toolkit | 3001 | `/agent-toolkit` | `stackone-agent-toolkit.vercel.app` |
| Component Library | 3002 | `/component-library` | `stackone-component-library.vercel.app` |
| Design Review | 3003 | `/design-review` | `stackone-design-review.vercel.app` |

```mermaid
graph TB
    subgraph "Shell Deployment"
        Shell[Shell App<br/>stackone-shell.vercel.app]
    end

    subgraph "MFE Deployments"
        AT["Agent Toolkit<br/>stackone-agent-toolkit.vercel.app"]
        CL["Component Library<br/>stackone-component-library.vercel.app"]
        DR["Design Review<br/>stackone-design-review.vercel.app"]
    end

    Shell -->|rewrites /agent-toolkit/*| AT
    Shell -->|rewrites /component-library/*| CL
    Shell -->|rewrites /design-review/*| DR

    subgraph "Shared Packages"
        UI["@stackone-ui/core"]
        I18N["@stackone/i18n"]
        Utils["@stackone/utils"]
    end

    AT --> UI
    CL --> UI
    DR --> UI
    Shell --> I18N
```

---

## Shell Rewrite Flow

When a user navigates to `/agent-toolkit/logs`:

```mermaid
sequenceDiagram
    participant Browser
    participant Shell as Shell<br/>stackone-shell.vercel.app
    participant MFE as Agent Toolkit MFE<br/>stackone-agent-toolkit.vercel.app

    Browser->>Shell: GET /agent-toolkit/logs
    Note over Shell: Rewrite rule matches
    Shell->>MFE: Proxy to MFE_AGENT_TOOLKIT_URL/agent-toolkit/logs
    MFE->>MFE: SSR render page
    MFE-->>Shell: HTML + JS
    Shell-->>Browser: Response (URL stays /agent-toolkit/logs)
```

**Rewrite rules** in `apps/shell/next.config.ts`:

```typescript
async rewrites() {
  return [
    { source: '/agent-toolkit', destination: `${MFE_AGENT_TOOLKIT_URL}/agent-toolkit` },
    { source: '/agent-toolkit/:path*', destination: `${MFE_AGENT_TOOLKIT_URL}/agent-toolkit/:path*` },
    // ... component-library, design-review
  ]
}
```

---

## Navigation Rules

| Navigation Type | Method | Example |
|-----------------|--------|---------|
| Shell → MFE | `<a>` tag | `<a href={Routes.agentToolkit}>Agent Toolkit</a>` |
| MFE → Shell | `<a>` tag | `<a href={Routes.shell.home}>Home</a>` |
| Within MFE | `<Link>` or `redirect()` | `<Link href={Routes.logs.index}>Logs</Link>` |

Cross-zone navigation requires full page loads. Within-zone uses client-side routing.

**Route configuration:**
- Shell: `apps/shell/src/lib/routes.ts`
- MFEs: `apps/mfe/*/src/routes.ts`

---

## Runtime Flows

### First Visit Sequence

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Shell
    participant SW as Service Worker
    participant API as REST API
    participant LS as LocalStorage

    Note over User,Shell: Entry (Direct Visit or In-App Nav)
    User->>Browser: Navigate to /agent-toolkit/logs
    Browser->>Shell: GET /agent-toolkit/logs
    Shell->>Shell: SSR: Match route, render page
    Shell-->>Browser: HTML with page content

    par Parallel loading
        Browser->>Shell: Hydrate React app
        Shell->>SW: Register Service Worker
    end

    Note over Shell,API: Data Fetching
    Shell->>API: GET /api/data
    API-->>Shell: JSON response
    Shell-->>User: Render with data

    Note over Shell,LS: Theme Init
    Shell->>LS: Get cached theme
    LS-->>Shell: Theme preference
    Shell->>Shell: Apply CSS vars
```

---

### Return Visit Sequence

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Shell
    participant SW as Service Worker
    participant LS as LocalStorage
    participant API as REST API

    User->>Browser: Navigate to /agent-toolkit/logs
    Browser->>Shell: GET /agent-toolkit/logs

    par Parallel
        SW-->>Browser: Cached assets
    and
        Browser->>Shell: Hydrate app
    end

    Shell-->>User: Render skeleton UI

    Note over Shell,API: Data Fetching
    Shell->>API: GET /api/data
    API-->>Shell: JSON response
    Shell-->>User: Render with data

    par Background
        Shell->>LS: Apply cached theme
    end
```

---

## Data Flow

### REST-First Pattern

```mermaid
flowchart LR
    subgraph "Client"
        Page[Page Component]
        Table[Log Table]
        Chart[Chart]
    end

    subgraph "Server"
        API[REST API]
        DB[(Database)]
    end

    Page -->|fetch| API
    API -->|query| DB
    DB -->|data| API
    API -->|JSON| Page
    Page -->|props| Table
    Page -->|props| Chart
```

---

## Component Architecture

### Zero-Inline-Classnames Pattern

```mermaid
flowchart TB
    subgraph "Component File"
        C[component.tsx]
        S[styles.ts]
        T[types.ts]
        I[index.ts]
    end

    subgraph "Style System"
        Core["@stackone-ui/core/styles"]
        Patterns[Style Patterns]
        Tokens[Design Tokens]
    end

    S -->|imports| Patterns
    S -->|imports| Tokens
    C -->|imports| S
    I -->|exports| C
    I -->|exports| T
```

---

## Two-Tier Theme System

```mermaid
flowchart TB
    subgraph "Base Theme (Bundled)"
        Spacing[Spacing Tokens]
        Shadows[Shadow Tokens]
        Motion[Motion Tokens]
        Radii[Border Radius]
    end

    subgraph "Brand Theme (Runtime)"
        Colors[Color Palette]
        Typography[Font Family]
    end

    subgraph "CSS Variables"
        Vars["--color-*, --spacing-*, etc."]
    end

    Spacing --> Vars
    Shadows --> Vars
    Motion --> Vars
    Radii --> Vars
    Colors --> Vars
    Typography --> Vars
```

See [Theming](theming.md) for details on the theme initialization flow.
