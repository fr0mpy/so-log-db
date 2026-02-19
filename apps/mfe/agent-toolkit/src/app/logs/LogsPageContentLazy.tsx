'use client'

import dynamic from 'next/dynamic'
import type { ComponentProps } from 'react'
import type { LogsPageContent as LogsPageContentType } from './LogsPageContent'
import { LogsContentSkeleton } from './LogsContentSkeleton'

type LogsPageContentProps = ComponentProps<typeof LogsPageContentType>

/**
 * Lazy-loaded page content with skeleton during load.
 *
 * With `ssr: false` + `loading`:
 * 1. Server renders the skeleton (no real data)
 * 2. Client loads JS bundle
 * 3. Component renders with data
 *
 * This ensures users see ONLY skeleton during initial load,
 * never real data flashing before skeleton.
 */
export const LogsPageContentLazy = dynamic<LogsPageContentProps>(
  () => import('./LogsPageContent').then((mod) => mod.LogsPageContent),
  {
    ssr: false,
    loading: () => <LogsContentSkeleton />,
  }
)
