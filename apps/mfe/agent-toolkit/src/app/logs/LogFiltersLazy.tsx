'use client'

import dynamic from 'next/dynamic'
import type { ComponentProps } from 'react'
import type { LogFilters as LogFiltersType } from './LogFilters'
import { FilterRow } from '../../styles'
import { Skeleton } from '@stackone-ui/core/skeleton'

type LogFiltersProps = ComponentProps<typeof LogFiltersType>

/**
 * Skeleton for LogFilters matching exact layout
 */
function LogFiltersSkeleton() {
  return (
    <div className={FilterRow.container}>
      {/* Title - "Logs" is short */}
      <Skeleton className="h-8 w-16" />

      {/* Search input - fills remaining space */}
      <div className={FilterRow.searchWrapper}>
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>

      {/* Date range dropdown - "24h" width */}
      <Skeleton className="h-10 w-20 rounded-lg" />

      {/* Status dropdown - "All" width */}
      <Skeleton className="h-10 w-16 rounded-lg" />

      {/* Toggle + label */}
      <div className={FilterRow.toggleWrapper}>
        <Skeleton className="h-5 w-9 rounded-full" />
        <Skeleton className="h-4 w-28" />
      </div>

      {/* Refresh button */}
      <Skeleton className="h-9 w-9 rounded-lg" />
    </div>
  )
}

/**
 * Code-split LogFilters - loads Select/@base-ui only when needed
 */
export const LogFiltersLazy = dynamic<LogFiltersProps>(
  () => import('./LogFilters').then((mod) => mod.LogFilters),
  {
    ssr: false,
    loading: () => <LogFiltersSkeleton />,
  }
)
