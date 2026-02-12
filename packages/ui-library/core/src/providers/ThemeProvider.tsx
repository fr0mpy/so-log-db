'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

// =============================================================================
// Types
// =============================================================================

type Theme = 'light' | 'dark'

interface ThemeContextValue {
  /** Current theme mode */
  theme: Theme
  /** Toggle between light and dark mode */
  toggle: () => void
  /** Whether web fonts have finished loading */
  fontsLoaded: boolean
}

// =============================================================================
// Context
// =============================================================================

const ThemeContext = createContext<ThemeContextValue | null>(null)

const STORAGE_KEY = 'stackone-theme'

// =============================================================================
// Provider
// =============================================================================

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  const [fontsLoaded, setFontsLoaded] = useState(false)

  // Initialize theme from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
    if (stored) setTheme(stored)
  }, [])

  // Apply theme class and persist
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  // Track font loading state
  useEffect(() => {
    if (typeof document !== 'undefined' && document.fonts) {
      // Check if already loaded
      if (document.fonts.status === 'loaded') {
        setFontsLoaded(true)
      } else {
        // Wait for fonts to load
        document.fonts.ready.then(() => setFontsLoaded(true))
      }
    }
  }, [])

  const toggle = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))

  return (
    <ThemeContext.Provider value={{ theme, toggle, fontsLoaded }}>
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
