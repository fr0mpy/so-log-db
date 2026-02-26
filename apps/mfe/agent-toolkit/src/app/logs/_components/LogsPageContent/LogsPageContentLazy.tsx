'use client'

import type { ComponentProps } from 'react'
import dynamic from 'next/dynamic'
import { LogsSkeleton } from '../LogsSkeleton'
import type { LogsPageContent as LogsPageContentType } from './LogsPageContent'

type LogsPageContentProps = ComponentProps<typeof LogsPageContentType>

export const LogsPageContentLazy = dynamic<LogsPageContentProps>(
  () => import('./LogsPageContent').then((mod) => mod.LogsPageContent),
  {
    loading: () => <LogsSkeleton />,
  },
)
