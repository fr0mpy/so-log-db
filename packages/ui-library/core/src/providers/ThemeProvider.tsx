'use client'

import { createContext, useContext, useEffect, useState, useRef, type ReactNode } from 'react'
import {
  defaultBaseTheme,
  applyBaseTheme,
  applyBrandTheme,
  updateThemeMode,
  validateBrandTheme,
  logWarnings,
  type BrandTheme,
  type ThemeMode,
} from '../themes'

// =============================================================================
// Types
// =============================================================================

interface ThemeContextValue {
  /** Current theme mode */
  theme: ThemeMode
  /** Toggle between light and dark mode */
  toggle: () => void
  /** Whether web fonts have finished loading */
  fontsLoaded: boolean
  /** Whether themes have been applied */
  themeReady: boolean
}

interface ThemeProviderProps {
  children: ReactNode
  /** URL to fetch brand theme JSON from. If not provided, uses schema fallbacks. */
  brandThemeUrl?: string
}

// =============================================================================
// Context
// =============================================================================

const ThemeContext = createContext<ThemeContextValue | null>(null)

const STORAGE_KEY = 'stackone-theme'

// =============================================================================
// Provider
// =============================================================================

export function ThemeProvider({ children, brandThemeUrl }: ThemeProviderProps) {
  // Initialize theme synchronously from localStorage to match inline script
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return 'light'
    return (localStorage.getItem(STORAGE_KEY) as ThemeMode) ?? 'light'
  })

  const [fontsLoaded, setFontsLoaded] = useState(false)
  const [themeReady, setThemeReady] = useState(false)

  // Store validated brand theme for mode switching
  const brandThemeRef = useRef<BrandTheme | null>(null)

  // Apply base theme and load brand theme (non-blocking)
  useEffect(() => {
    // Apply base theme immediately (structural tokens)
    applyBaseTheme(defaultBaseTheme, { mode: theme })

    // Load and apply brand theme in background
    async function loadBrandTheme() {
      let brandTheme: Partial<BrandTheme> = {}

      if (brandThemeUrl) {
        try {
          const response = await fetch(brandThemeUrl)
          if (response.ok) {
            brandTheme = await response.json()
          }
        } catch {
          // Fall through to use fallbacks
        }
      }

      // Validate and fill in fallbacks for missing tokens
      const { theme: validatedTheme, warnings } = validateBrandTheme(brandTheme)
      brandThemeRef.current = validatedTheme

      if (warnings.length > 0) {
        logWarnings(warnings, brandThemeUrl ?? 'default')
      }

      // Apply brand theme (visual tokens)
      applyBrandTheme(validatedTheme, { mode: theme })

      // Mark theme as ready
      setThemeReady(true)
    }

    loadBrandTheme()
  }, [brandThemeUrl, theme])

  // Handle mode switching
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem(STORAGE_KEY, theme)

    // Update mode-specific tokens (shadows, colors)
    if (brandThemeRef.current) {
      updateThemeMode(defaultBaseTheme, brandThemeRef.current, theme)
    }
  }, [theme])

  // Track font loading state
  useEffect(() => {
    if (typeof document !== 'undefined' && document.fonts) {
      if (document.fonts.status === 'loaded') {
        setFontsLoaded(true)
      } else {
        document.fonts.ready.then(() => setFontsLoaded(true))
      }
    }
  }, [])

  const toggle = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))

  return (
    <ThemeContext.Provider value={{ theme, toggle, fontsLoaded, themeReady }}>
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
