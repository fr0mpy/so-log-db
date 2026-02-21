# Caching

Service worker caching strategies for the StackOne platform.

## Service Worker Overview

| Property | Value |
|----------|-------|
| Location | `apps/shell/public/sw.js` |
| Cache name | `stackone-v2` |
| Precached URLs | `/`, `/agent-toolkit` |

## Caching Strategies

| Resource | Strategy | Pattern |
|----------|----------|---------|
| Translations | Cache-first | `/(en|fr)/(common|shell|agent-toolkit)\.json$` |
| Scripts | Cache-first | `request.destination === 'script'` |
| Styles | Cache-first | `request.destination === 'style'` |
| Images | Cache-first | `request.destination === 'image'` |
| Fonts | Cache-first | `request.destination === 'font'` |
| API requests | Network-only | Not cached |

## How It Works

### Install

```javascript
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
  )
  self.skipWaiting()  // Activate immediately
})
```

### Fetch (Cache-First)

```javascript
self.addEventListener('fetch', (event) => {
  if (CACHEABLE_DESTINATIONS.includes(request.destination)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached  // Return from cache
        return fetch(request).then((response) => {
          // Clone and cache new responses
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, response.clone())
          })
          return response
        })
      })
    )
  }
})
```

### Activate (Clear Old Caches)

```javascript
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((k) => k !== CACHE_NAME)
            .map((k) => caches.delete(k))
      )
    })
  )
  self.clients.claim()
})
```

## Debug Mode

Enable logging via postMessage from main thread:

```typescript
// In app
navigator.serviceWorker.controller?.postMessage({ type: 'ENABLE_DEBUG' })

// In sw.js
self.addEventListener('message', (event) => {
  if (event.data?.type === 'ENABLE_DEBUG') {
    debugEnabled = true
  }
})
```

## Registration

Service worker is registered in `apps/shell/src/lib/service-worker.ts`:

```typescript
export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
  }
}
```

## Cache Versioning

Increment `CACHE_NAME` to invalidate all cached assets:

```javascript
const CACHE_NAME = 'stackone-v2'  // Change to v3 to clear cache
```

Old caches are automatically deleted on activate.
