# Architecture

## Runtime

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

## Application Structure

### Unified App with Lazy-Loaded Sections

```mermaid
graph TB
    subgraph "Single Deployment"
        Shell[Shell App<br/>apps/shell]

        subgraph "Route Groups (Lazy Loaded)"
            AT["(agent-toolkit)<br/>/agent-toolkit/*"]
            CL["(component-library)<br/>/component-library/*"]
            DR["(design-review)<br/>/design-review/*"]
        end

        Shell --> AT
        Shell --> CL
        Shell --> DR
    end

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

## Theming

### Two-Tier Theme System

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
