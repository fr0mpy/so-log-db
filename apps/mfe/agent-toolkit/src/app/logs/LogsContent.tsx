'use client'

import { type ReactNode } from 'react'
import { LogHoverProvider } from './LogHoverContext'
import { Spacing } from '../../styles'

interface LogsContentProps {
  /** Content to render */
  children: ReactNode
}

/**
 * Minimal client wrapper providing hover coordination context.
 * No hydration gate - let Next.js SSR render the initial HTML naturally.
 */
export function LogsContent({ children }: LogsContentProps) {
  return (
    <LogHoverProvider>
      <div className={Spacing.spaceY4}>{children}</div>
    </LogHoverProvider>
  )
}
