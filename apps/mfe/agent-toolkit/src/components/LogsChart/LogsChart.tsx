'use client'

import { useTranslations, logs } from '@stackone/i18n'
import { StackedBarChart } from '@stackone-ui/core/stacked-bar-chart'
import type { LogsChartProps, LogEntry } from './types'

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
function aggregateLogsByTime(logEntries: readonly LogEntry[]): LogChartData[] {
  const grouped = new Map<string, LogChartData>()

  for (const log of logEntries) {
    const date = new Date(log.timestamp)
    // Use UTC to ensure consistent formatting between server and client (prevents hydration mismatch)
    const hours = date.getUTCHours().toString().padStart(2, '0')
    const minutes = date.getUTCMinutes().toString().padStart(2, '0')
    const time = `${hours}:${minutes}`

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
export function LogsChart({ logs: logEntries, hoveredTime, onHover }: LogsChartProps) {
  const t = useTranslations()
  const data = aggregateLogsByTime(logEntries)

  const series = [
    { key: 'success', color: 'var(--color-success)', label: t(logs.chart.success) },
    { key: 'clientError', color: 'var(--color-warning)', label: t(logs.chart.clientError) },
    { key: 'serverError', color: 'var(--color-destructive)', label: t(logs.chart.serverError) },
  ]

  return (
    <div id="chart" tabIndex={-1} className="w-full min-w-0">
      <StackedBarChart
        data={data}
        series={series}
        height={220}
        hoveredLabel={hoveredTime}
        onHover={onHover}
      />
    </div>
  )
}
