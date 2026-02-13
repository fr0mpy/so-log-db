/** Debug flag key in localStorage */
const DEBUG_KEY = 'stackone:debug'

/** Check if debug mode is enabled */
function isDebugEnabled(): boolean {
  if (typeof window === 'undefined') return false
  // Support both localStorage (persists) and window.logger (session)
  return (
    localStorage.getItem(DEBUG_KEY) === 'true' ||
    (window as unknown as { logger?: boolean }).logger === true
  )
}

/** Simple logger for service worker registration */
const log = {
  info: (msg: string, data?: object) => {
    if (isDebugEnabled()) {
      data ? console.log(`[ServiceWorker] ${msg}`, data) : console.log(`[ServiceWorker] ${msg}`)
    }
  },
  error: (msg: string, data?: object) => {
    // Always log errors
    data ? console.error(`[ServiceWorker] ${msg}`, data) : console.error(`[ServiceWorker] ${msg}`)
  },
}

/** Enable debug logging (call from console) */
function enableDebug(): void {
  localStorage.setItem(DEBUG_KEY, 'true')
  console.log('[ServiceWorker] Debug mode enabled - refresh to apply to service worker')
}

/** Disable debug logging */
function disableDebug(): void {
  localStorage.removeItem(DEBUG_KEY)
  console.log('[ServiceWorker] Debug mode disabled')
}

export function registerServiceWorker() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return
  }

  // Expose debug helpers on window
  const win = window as unknown as {
    enableStackOneDebug: typeof enableDebug
    disableStackOneDebug: typeof disableDebug
  }
  win.enableStackOneDebug = enableDebug
  win.disableStackOneDebug = disableDebug

  const debug = isDebugEnabled()

  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        if (debug) {
          log.info('Registered successfully', { scope: registration.scope })
        }

        // Send debug flag to service worker
        if (debug && registration.active) {
          registration.active.postMessage({ type: 'ENABLE_DEBUG' })
        }

        // Handle updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          if (debug) log.info('Update found, installing new version')

          newWorker?.addEventListener('statechange', () => {
            if (newWorker.state === 'activated' && debug) {
              log.info('New version activated')
              newWorker.postMessage({ type: 'ENABLE_DEBUG' })
            }
          })
        })
      })
      .catch((error) => {
        log.error('Registration failed', { message: error.message })
      })
  })
}
