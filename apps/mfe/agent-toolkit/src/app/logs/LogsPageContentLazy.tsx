'use client'

import dynamic from 'next/dynamic'
import type { ComponentProps } from 'react'
import type { LogsPageContent as LogsPageContentType } from './LogsPageContent'
import { LogsSkeleton } from './LogsSkeleton'

type LogsPageContentProps = ComponentProps<typeof LogsPageContentType>

/**
 * Lazy-loaded page content with SSR enabled.
 * Server renders immediately, children with DOM deps load lazily.
 */
export const LogsPageContentLazy = dynamic<LogsPageContentProps>(
  () => import('./LogsPageContent').then((mod) => mod.LogsPageContent),
  {
    loading: () => <LogsSkeleton />,
  }
)
