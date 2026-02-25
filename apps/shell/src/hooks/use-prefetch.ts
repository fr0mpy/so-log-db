'use client'

import { useCallback, useRef } from 'react'
import { MFE_ROUTES, MFE_THEME_PATHS } from '@/lib/mfe-urls'

/**
 * Hook to prefetch a URL when user shows intent (hover/focus).
 * Creates a <link rel="prefetch"> element on first interaction.
 *
 * @param href - The route path to prefetch
 * @returns Event handlers for onMouseEnter and onFocus
 */
export function usePrefetch(href: string) {
  const prefetchedRef = useRef(false)

  const triggerPrefetch = useCallback(() => {
    // Only prefetch once per link instance
    if (prefetchedRef.current) return

    // Only prefetch MFE routes
    if (!MFE_ROUTES.has(href)) return

    // Check if already prefetched by another instance
    const existingLink = document.querySelector(
      `link[rel="prefetch"][href="${href}"]`
    )
    if (existingLink) {
      prefetchedRef.current = true
      return
    }

    // Create prefetch link for document
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.href = href
    link.as = 'document'
    document.head.appendChild(link)

    // Prefetch theme JSON (blocks render via ThemeScript)
    const themePath = MFE_THEME_PATHS[href]
    if (themePath) {
      const themeLink = document.createElement('link')
      themeLink.rel = 'prefetch'
      themeLink.href = themePath
      themeLink.as = 'fetch'
      document.head.appendChild(themeLink)
    }

    prefetchedRef.current = true
  }, [href])

  return {
    onMouseEnter: triggerPrefetch,
    onFocus: triggerPrefetch,
  }
}
