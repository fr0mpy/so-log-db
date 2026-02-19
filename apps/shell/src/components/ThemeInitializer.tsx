'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { useTheme } from '@stackone-ui/core/providers'
import { Spinner } from '@stackone-ui/core/spinner'
import {
  initBaseTheme,
  loadBrandTheme,
  setThemeMode,
} from '../lib/theme-manager'
import { Layout } from '@stackone-ui/core/styles'
import { DEFAULT_BRAND_THEME } from '../lib/env'

const styles = {
  loading: [
    Layout.Flex.centerBoth,
    'fixed inset-0 bg-background',
  ].join(' '),
} as const

interface ThemeInitializerProps {
  children: ReactNode
  brandTheme?: string
}

/**
 * Initializes the theme system and syncs with ThemeProvider.
 * Shows a loading spinner until themes are applied.
 */
export function ThemeInitializer({
  children,
  brandTheme = DEFAULT_BRAND_THEME,
}: ThemeInitializerProps) {
  const { theme } = useTheme()
  const [isReady, setIsReady] = useState(false)

  // Initialize themes on mount
  useEffect(() => {
    async function init() {
      initBaseTheme()
      await loadBrandTheme(brandTheme)
      setIsReady(true)
    }
    init()
  }, [brandTheme])

  // Sync mode changes with theme-manager
  useEffect(() => {
    if (isReady) {
      setThemeMode(theme)
    }
  }, [theme, isReady])

  if (!isReady) {
    return (
      <div className={styles.loading}>
        <Spinner size="lg" />
      </div>
    )
  }

  return <>{children}</>
}
