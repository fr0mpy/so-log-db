'use client'

import dynamic from 'next/dynamic'
import type { ComponentProps } from 'react'
import type { LogsPageContent as LogsPageContentType } from './LogsPageContent'

type LogsPageContentProps = ComponentProps<typeof LogsPageContentType>

/**
 * Lazy-loaded page content with SSR enabled.
 * Server renders immediately, children with DOM deps load lazily.
 *
 * NOTE: No loading prop - SSR handles initial render, loading.tsx handles
 * route transitions. Adding loading prop with SSR causes content→skeleton→content flash.
 */
export const LogsPageContentLazy = dynamic<LogsPageContentProps>(
  () => import('./LogsPageContent').then((mod) => mod.LogsPageContent)
)
