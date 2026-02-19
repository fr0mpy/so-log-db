'use client'

import dynamic from 'next/dynamic'
import type { ComponentProps } from 'react'
import type { LogsPageContent as LogsPageContentType } from './LogsPageContent'

type LogsPageContentProps = ComponentProps<typeof LogsPageContentType>

/**
 * Lazy-loaded page content with SSR disabled.
 * Server sends Suspense fallback (skeleton), content loads client-side.
 *
 * Combined with Suspense boundary in page.tsx, this ensures:
 * 1. Server streams skeleton immediately
 * 2. Client loads and hydrates content
 * 3. No flash of unstyled/partial content
 */
export const LogsPageContentLazy = dynamic<LogsPageContentProps>(
  () => import('./LogsPageContent').then((mod) => mod.LogsPageContent),
  { ssr: false }
)
