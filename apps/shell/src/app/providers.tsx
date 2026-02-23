'use client'

import { useEffect, type ReactNode } from 'react'
import { ThemeProvider, type ThemeMode } from '@stackone-ui/core/providers'
import { registerServiceWorker } from '../lib/service-worker'
import { MobileWarning } from '../components'

interface ProvidersProps {
  children: ReactNode
  initialTheme?: ThemeMode
}

export function Providers({ children, initialTheme }: ProvidersProps) {
  useEffect(() => {
    registerServiceWorker()
  }, [])

  return (
    <ThemeProvider
      brandThemeUrl="/themes/stackone-green.json"
      initialTheme={initialTheme}
    >
      <MobileWarning />
      {children}
    </ThemeProvider>
  )
}
