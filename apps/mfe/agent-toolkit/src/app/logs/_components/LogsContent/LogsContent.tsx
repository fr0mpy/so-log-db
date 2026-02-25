import { type ReactNode } from 'react'
import { Spacing } from '../../../../styles'

interface LogsContentProps {
  /** Content to render */
  children: ReactNode
}

/**
 * Wrapper for logs page content with consistent spacing.
 * mt-4 matches the gap from LogsSkeleton's space-y-4 wrapper (filter row → content).
 */
export function LogsContent({ children }: LogsContentProps) {
  return <div className={`${Spacing.mt4} ${Spacing.spaceY4}`}>{children}</div>
}
