'use client'

import { type ReactNode } from 'react'
import { ThemeProvider, type ThemeMode } from '@stackone-ui/core/providers'
import { MobileWarning } from '../components'

interface ProvidersProps {
  children: ReactNode
  initialTheme?: ThemeMode
}

export function Providers({ children, initialTheme }: ProvidersProps) {
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
