import { KNOWN_PROVIDERS, getProviderLogoUrl } from '../config/providers'

/**
 * Preload provider icons into browser cache.
 * Call this on app initialization for better UX.
 */
export function preloadProviderIcons(): void {
  if (typeof window === 'undefined') return

  const preload = () => {
    KNOWN_PROVIDERS.forEach((provider) => {
      const url = getProviderLogoUrl(provider)
      if (!url) return

      // Create Image to trigger fetch (will be cached)
      const img = new Image()
      img.src = url
    })
  }

  // Use requestIdleCallback for non-blocking preload
  if ('requestIdleCallback' in window) {
    ;(window as Window & { requestIdleCallback: typeof requestIdleCallback }).requestIdleCallback(
      preload,
      { timeout: 2000 },
    )
  } else {
    setTimeout(preload, 100)
  }
}
