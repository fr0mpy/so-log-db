'use client'

import { useEffect, type ReactNode } from 'react'
import { ThemeProvider } from '@stackone-ui/core/providers'
import { registerServiceWorker } from '../lib/service-worker'
import { ThemeInitializer } from '../components'

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    registerServiceWorker()
  }, [])

  return (
    <ThemeProvider>
      <ThemeInitializer>{children}</ThemeInitializer>
    </ThemeProvider>
  )
}
