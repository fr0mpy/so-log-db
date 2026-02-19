'use client'

import dynamic from 'next/dynamic'
import type { ComponentProps } from 'react'
import type { LogsPageContent as LogsPageContentType } from './LogsPageContent'
import { LogsSkeleton } from './LogsSkeleton'

type LogsPageContentProps = ComponentProps<typeof LogsPageContentType>

/**
 * Lazy-loaded page content with skeleton during load.
 *
 * With `ssr: false` + `loading`:
 * 1. Server renders the skeleton (no real data)
 * 2. Client loads JS bundle
 * 3. Component renders with data
 *
 * Uses LogsSkeleton (with header) since no header exists during bundle load.
 * LogsContentSkeleton (no header) is used during refresh when LogFilters is visible.
 */
export const LogsPageContentLazy = dynamic<LogsPageContentProps>(
  () => import('./LogsPageContent').then((mod) => mod.LogsPageContent),
  {
    ssr: false,
    loading: () => <LogsSkeleton />,
  }
)
