# Architecture

## Runtime

### First Visit Sequence

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Host
    participant SW as Service Worker
    participant Bundle as MFE Bundle CDN
    participant MFE
    participant API as REST API
    participant LS as LocalStorage
    participant PS as PowerSync Client
    participant SQL as SQLite
    participant PSS as PowerSync Service

    Note over User,Host: Entry (Direct Visit or In-App Nav)
    User->>Browser: Navigate to /log-dashboard/...
    Browser->>Host: GET /log-dashboard/...
    Host->>Host: SSR: Match URL, inject modulepreload
    Host-->>Browser: HTML with shell + preload hint

    par Parallel loading
        Browser->>Bundle: Fetch MFE bundle (preload)
        Bundle-->>Browser: JS bundle
    and Host hydration
        Browser->>Host: Execute Host JS
        Host->>Host: Hydrate shell
        Host->>SW: Register Service Worker
    end

    Note over Host,MFE: MFE Mount
    Host->>MFE: Mount MFE
    MFE-->>User: Render skeleton UI

    Note over MFE,API: REST-First Data (Fast Time-to-Content)
    MFE->>API: GET /api/data
    API-->>MFE: JSON response
    MFE-->>User: Render with data

    Note over MFE,PSS: Background Bootstrap (requestIdleCallback)
    par Theme Init
        MFE->>LS: Get cached theme
        LS-->>MFE: Theme JSON (or fetch from CDN)
        MFE->>MFE: Apply CSS vars
    and SQLite Bootstrap
        MFE->>PS: Download WASM + init
        PS->>SQL: Create/open local DB
        MFE->>SQL: Seed with REST response
        PS->>PSS: Connect WebSocket
    end

    Note over PS,PSS: Background Sync Begins
    PSS-->>PS: Stream updates
    PS->>SQL: Update local
```

---

### Return Visit Sequence

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Host
    participant SW as Service Worker
    participant MFE
    participant LS as LocalStorage
    participant PS as PowerSync Client
    participant SQL as SQLite
    participant PSS as PowerSync Service

    User->>Browser: Navigate to /log-dashboard/...
    Browser->>Host: GET /log-dashboard/...
    Host-->>Browser: HTML with shell + preload hint

    par Parallel
        SW-->>Browser: MFE bundle (from cache)
    and
        Browser->>Host: Hydrate shell
    end

    Host->>MFE: Mount MFE
    MFE-->>User: Render skeleton UI

    Note over MFE,SQL: Local Data (Instant)
    MFE->>SQL: Check DB exists
    SQL-->>MFE: Yes, populated
    MFE->>PS: Query data
    PS->>SQL: SELECT from local
    SQL-->>PS: Records (~5-10ms)
    PS-->>MFE: Data ready
    MFE-->>User: Render with data (instant)

    par Background
        MFE->>LS: Apply cached theme
    and
        PS->>PSS: Connect WebSocket
        PSS-->>PS: Stream updates
        PS->>SQL: Update local
        PS-->>MFE: Reactive update
    end
```

---
