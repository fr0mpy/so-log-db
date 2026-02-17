import { createLogger, isLoggingEnabled } from '@stackone/utils'

const log = createLogger('ServiceWorker')

export function registerServiceWorker() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return
  }

  // Backwards compat: expose legacy debug helpers as aliases
  const stackone = (window as unknown as Record<string, unknown>).__stackone as Record<string, unknown> | undefined
  const win = window as unknown as {
    enableStackOneDebug: () => void
    disableStackOneDebug: () => void
  }
  win.enableStackOneDebug = () => stackone?.logs && (stackone.logs as { enable: () => void }).enable()
  win.disableStackOneDebug = () => stackone?.logs && (stackone.logs as { disable: () => void }).disable()

  const debug = isLoggingEnabled()

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
