// Default export is lazy - splits Recharts into separate chunk
export { LogsChartLazy as LogsChart } from './LogsChartLazy'

// Eager version for special cases
export { LogsChart as LogsChartEager } from './LogsChart'

export type { LogsChartProps, LogsChartTranslations, ChartDataPoint, LogEntry } from './types'
