'use client'

import dynamic from 'next/dynamic'
import { Skeleton } from '@stackone-ui/core/skeleton'
import type { LogsChartProps } from './types'
import { LogsChartStyles } from './styles'

/**
 * Lazy-loaded LogsChart component
 *
 * Performance: Recharts (~50KB gzipped) is code-split and loaded on-demand.
 * The skeleton maintains layout while the chart loads.
 */
export const LogsChartLazy = dynamic<LogsChartProps>(
  () => import('./LogsChart').then((mod) => mod.LogsChart),
  {
    ssr: false, // Charts need client-side rendering
    loading: () => (
      <div className={LogsChartStyles.container}>
        <div className={LogsChartStyles.wrapper}>
          <Skeleton variant="rectangular" className="w-full h-full" />
        </div>
      </div>
    ),
  }
)
