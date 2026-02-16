/**
 * LogsChart Types
 */

export interface LogEntry {
  id: string
  timestamp: string
  provider: { name: string; version: string }
  originOwner: string
  source: string
  request: { method: string; name: string }
  duration: number
  status: number
}

export interface ChartDataPoint {
  time: string
  success: number
  clientError: number
  serverError: number
}

export interface LogsChartTranslations {
  success: string
  clientError: string
  serverError: string
}

export interface LogsChartProps {
  logs: readonly LogEntry[]
  translations: LogsChartTranslations
}
