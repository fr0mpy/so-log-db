const CACHE_NAME = 'stackone-v2'
const PRECACHE_URLS = ['/', '/connectors']

// Destinations to cache with cache-first strategy
const CACHEABLE_DESTINATIONS = ['script', 'style', 'image', 'font']

// Pattern for translation JSON files
const TRANSLATION_PATTERN = /\/(en|fr)\/(common|shell|connectors)\.json$/

// Debug flag - enabled via postMessage from main thread
let debugEnabled = false

const log = {
  info: (msg, data) => debugEnabled && console.log(`[SW] ${msg}`, data || ''),
  error: (msg, data) => debugEnabled && console.error(`[SW] ${msg}`, data || ''),
}

self.addEventListener('install', (event) => {
  log.info('Installing service worker')
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => log.info('Precached URLs', { urls: PRECACHE_URLS }))
      .catch((err) => log.error('Precache failed', { error: err.message }))
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  log.info('Activating service worker')
  event.waitUntil(
    caches.keys().then((keys) => {
      const oldKeys = keys.filter((k) => k !== CACHE_NAME)
      if (oldKeys.length) log.info('Clearing old caches', { keys: oldKeys })
      return Promise.all(oldKeys.map((k) => caches.delete(k)))
    })
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Cache-first for translation JSON files
  if (TRANSLATION_PATTERN.test(url.pathname)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) {
          log.info('Cache hit (translation)', { url: request.url })
          return cached
        }
        return fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone()
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, clone)
              log.info('Cached (translation)', { url: request.url })
            })
          }
          return response
        })
      })
    )
    return
  }

  // Cache-first for static assets (scripts, styles, images, fonts)
  if (CACHEABLE_DESTINATIONS.includes(request.destination)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) {
          log.info('Cache hit', { url: request.url, type: request.destination })
          return cached
        }
        return fetch(request).then((response) => {
          // Clone response before caching (streams can only be read once)
          if (response.ok) {
            const clone = response.clone()
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, clone)
              log.info('Cached', { url: request.url, type: request.destination })
            })
          }
          return response
        })
      })
    )
  }
})

// Enable debug mode via postMessage
self.addEventListener('message', (event) => {
  if (event.data?.type === 'ENABLE_DEBUG') {
    debugEnabled = true
    log.info('Debug mode enabled')
  }
})
