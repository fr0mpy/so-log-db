'use client'

import dynamic from 'next/dynamic'
import type { ComponentProps } from 'react'
import type { LogsPageContent as LogsPageContentType } from './LogsPageContent'
import { LogsSkeleton } from './LogsSkeleton'

type LogsPageContentProps = ComponentProps<typeof LogsPageContentType>

/**
 * Lazy-loaded entire page content with full skeleton fallback.
 *
 * ssr: false ensures the server sends the skeleton HTML,
 * then the full content loads client-side.
 */
export const LogsPageContentLazy = dynamic<LogsPageContentProps>(
  () => import('./LogsPageContent').then((mod) => mod.LogsPageContent),
  {
    ssr: false,
    loading: () => <LogsSkeleton />,
  }
)
