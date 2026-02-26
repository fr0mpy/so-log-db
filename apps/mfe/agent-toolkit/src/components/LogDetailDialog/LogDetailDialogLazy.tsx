'use client'

import dynamic from 'next/dynamic'
import type { LogDetailDialogProps } from './types'

/**
 * Code-split LogDetailDialog - loads heavy dialog content only when needed.
 *
 * Defers ~24KB of code (tabs, keyboard navigation, nested components)
 * until user clicks a log row to view details.
 */
export const LogDetailDialogLazy = dynamic<LogDetailDialogProps>(
  () => import('./LogDetailDialog').then((mod) => mod.LogDetailDialog),
)
