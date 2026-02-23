'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { applyBrandTheme, validateBrandTheme, type BrandTheme } from '../themes'
import {
  setThemeCookie,
  getThemeCookieClient,
  migrateLocalStorageToCookie,
  type ThemeMode,
} from './theme-cookie'

// Re-export type for consumers
export type { ThemeMode } from './theme-cookie'

// =============================================================================
// Types
// =============================================================================

interface ThemeContextValue {
  /** Current theme preference ('light', 'dark', or 'system') */
  theme: ThemeMode
  /** Resolved theme - actual applied value (resolves 'system' to 'light' or 'dark') */
  resolvedTheme: 'light' | 'dark'
  /** Toggle between light and dark mode */
  toggle: () => void
  /** Set specific theme mode */
  setTheme: (theme: ThemeMode) => void
}

interface ThemeProviderProps {
  children: ReactNode
  /** Initial theme from server cookie read. Defaults to 'system'. */
  initialTheme?: ThemeMode
  /** URL to fetch brand theme JSON from. If not provided, uses schema fallbacks. */
  brandThemeUrl?: string
}

// =============================================================================
// Context
// =============================================================================

const ThemeContext = createContext<ThemeContextValue | null>(null)

/** @deprecated Use THEME_COOKIE_NAME from theme-cookie.ts instead */
export const THEME_STORAGE_KEY = 'stackone-theme'

/**
 * @deprecated Use server-side theme detection with getThemeFromCookies() instead.
 * This script is only needed for system preference detection when theme='system'.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t==='dark'||(t===null&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`

/**
 * Get system color scheme preference
 */
function getSystemPreference(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/**
 * Resolve theme mode to actual light/dark value
 */
function resolveTheme(theme: ThemeMode): 'light' | 'dark' {
  if (theme === 'system') {
    return getSystemPreference()
  }
  return theme
}

// =============================================================================
// Provider
// =============================================================================

export function ThemeProvider({
  children,
  initialTheme = 'system',
  brandThemeUrl,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeMode>(initialTheme)
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(() =>
    resolveTheme(initialTheme)
  )

  // Migrate localStorage to cookie on first mount (backwards compatibility)
  useEffect(() => {
    migrateLocalStorageToCookie()

    // Verify client cookie matches server-provided initial
    const clientTheme = getThemeCookieClient()
    if (clientTheme !== initialTheme && clientTheme !== 'system') {
      setThemeState(clientTheme)
      setResolvedTheme(resolveTheme(clientTheme))
    }
  }, [initialTheme])

  // Listen for system preference changes when in 'system' mode
  useEffect(() => {
    if (theme !== 'system') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handler = (e: MediaQueryListEvent) => {
      const newResolved = e.matches ? 'dark' : 'light'
      setResolvedTheme(newResolved)
      document.documentElement.classList.toggle('dark', e.matches)
    }

    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [theme])

  // Apply theme class to document when resolvedTheme changes
  useEffect(() => {
    document.documentElement.classList.toggle('dark', resolvedTheme === 'dark')
  }, [resolvedTheme])

  // Load brand theme (injects both :root and .dark values via <style> tag)
  useEffect(() => {
    async function loadBrandTheme() {
      let rawTheme: Partial<BrandTheme> = {}

      if (brandThemeUrl) {
        try {
          const response = await fetch(brandThemeUrl)
          if (response.ok) {
            rawTheme = await response.json()
          }
        } catch {
          // Fall through to use fallbacks
        }
      }

      // Validate and fill in fallbacks for missing tokens
      const { theme: validatedTheme } = validateBrandTheme(rawTheme)

      // Inject <style> tag with both :root and .dark values
      applyBrandTheme(validatedTheme)
    }

    loadBrandTheme()
  }, [brandThemeUrl])

  // Set theme and persist to cookie
  const setTheme = (newTheme: ThemeMode) => {
    setThemeCookie(newTheme)
    setThemeState(newTheme)
    setResolvedTheme(resolveTheme(newTheme))
  }

  // Toggle between light and dark (skips system)
  const toggle = () => {
    const newTheme = resolvedTheme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, toggle, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// =============================================================================
// Hook
// =============================================================================

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
