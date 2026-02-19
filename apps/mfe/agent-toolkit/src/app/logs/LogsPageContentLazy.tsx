'use client'

import dynamic from 'next/dynamic'
import type { ComponentProps } from 'react'
import type { LogsPageContent as LogsPageContentType } from './LogsPageContent'
import { LogsContentSkeleton } from './LogsContentSkeleton'

type LogsPageContentProps = ComponentProps<typeof LogsPageContentType>

/**
 * Lazy-loaded page content with SSR disabled and inline skeleton.
 *
 * The `loading` prop ensures the skeleton shows immediately while
 * the component JS bundle loads. Combined with `ssr: false`, this:
 * 1. Server sends the skeleton HTML
 * 2. Client loads the component bundle
 * 3. Component renders with data (passed as props)
 */
export const LogsPageContentLazy = dynamic<LogsPageContentProps>(
  () => import('./LogsPageContent').then((mod) => mod.LogsPageContent),
  {
    ssr: false,
    loading: () => <LogsContentSkeleton />,
  }
)
