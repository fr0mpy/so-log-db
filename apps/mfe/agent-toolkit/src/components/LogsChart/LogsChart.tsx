'use client'

import { StackedBarChart } from '@stackone-ui/core/stacked-bar-chart'
import type { LogsChartProps, LogEntry } from './types'
import { useLogHover, useHoveredTime } from '../../app/logs/LogHoverContext'

/** Internal type for aggregating log data */
interface LogChartData {
  label: string
  success: number
  clientError: number
  serverError: number
  [key: string]: string | number
}

/**
 * Aggregate logs by minute and status category
 */
function aggregateLogsByTime(logs: readonly LogEntry[]): LogChartData[] {
  const grouped = new Map<string, LogChartData>()

  for (const log of logs) {
    const date = new Date(log.timestamp)
    const time = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })

    if (!grouped.has(time)) {
      grouped.set(time, {
        label: time,
        success: 0,
        clientError: 0,
        serverError: 0,
      })
    }

    const point = grouped.get(time)!
    if (log.status >= 200 && log.status < 300) {
      point.success++
    } else if (log.status >= 400 && log.status < 500) {
      point.clientError++
    } else if (log.status >= 500) {
      point.serverError++
    }
  }

  return Array.from(grouped.values()).sort((a, b) => a.label.localeCompare(b.label))
}

/**
 * Logs chart component - displays request status distribution over time
 *
 * Uses the StackedBarChart from the UI library with log-specific data transformation.
 */
export function LogsChart({ logs, translations }: LogsChartProps) {
  const { setHoveredTime } = useLogHover()
  const hoveredTime = useHoveredTime()

  const data = aggregateLogsByTime(logs)

  const series = [
    { key: 'success', color: 'var(--color-success)', label: translations.success },
    { key: 'clientError', color: 'var(--color-warning)', label: translations.clientError },
    { key: 'serverError', color: 'var(--color-destructive)', label: translations.serverError },
  ]

  return (
    <div id="chart" tabIndex={-1} className="w-full min-w-0">
      <StackedBarChart
        data={data}
        series={series}
        height={220}
        hoveredLabel={hoveredTime}
        onHover={setHoveredTime}
      />
    </div>
  )
}
