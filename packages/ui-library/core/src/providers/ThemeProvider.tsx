'use client'

import { createContext, useContext, useEffect, useState, useRef, type ReactNode } from 'react'
import { setStorageString } from '@stackone/utils'
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

/** localStorage key for persisted theme preference */
export const THEME_STORAGE_KEY = 'stackone-theme'

/**
 * Inline script to prevent theme flash (FOUC).
 * Must run before React hydrates to set `dark` class on `<html>`.
 * Use in layout.tsx: `<script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />`
 */
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t==='dark'||(t===null&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`

// Backwards compat alias
const STORAGE_KEY = THEME_STORAGE_KEY

/**
 * Get initial theme by reading from DOM class.
 * The inline THEME_INIT_SCRIPT sets `dark` class before React hydrates,
 * so we read from DOM to match and avoid hydration mismatch.
 */
function getInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'light'
  // Read from DOM class (set by THEME_INIT_SCRIPT) to match hydration
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

// =============================================================================
// Provider
// =============================================================================

export function ThemeProvider({ children, brandThemeUrl }: ThemeProviderProps) {
  // Initialize theme from DOM class (set by THEME_INIT_SCRIPT before hydration)
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme)

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
    setStorageString(STORAGE_KEY, theme)

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
