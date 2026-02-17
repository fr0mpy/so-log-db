'use client'

import dynamic from 'next/dynamic'
import type { LogsChartProps } from './types'
import { LogsChartSkeleton } from './LogsChartSkeleton'

/**
 * Lazy-loaded chart - splits Recharts (~200KB) into separate chunk.
 * ssr: false is appropriate since charts require DOM for rendering.
 */
export const LogsChartLazy = dynamic<LogsChartProps>(
  () => import('./LogsChart').then((mod) => mod.LogsChart),
  {
    ssr: false,
    loading: () => <LogsChartSkeleton />,
  }
)
