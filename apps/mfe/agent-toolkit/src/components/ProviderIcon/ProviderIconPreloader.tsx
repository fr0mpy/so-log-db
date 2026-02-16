'use client'

import { useEffect } from 'react'
import { preloadProviderIcons } from '../../utils/preload-provider-icons'

/**
 * Preloads provider icons into service worker cache on mount.
 * Add to layout for early cache warming.
 */
export function ProviderIconPreloader() {
  useEffect(() => {
    preloadProviderIcons()
  }, [])

  return null
}
