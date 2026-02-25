/**
 * Log List View
 *
 * Data Strategy: REST + WebSocket
 * Real-time log viewing with filters and streaming
 */

export { metadata } from './metadata'

import { LogsPageContentLazy } from './_components'
import {
  generateMockLogs,
  calculateStats,
  generateDateSeed,
} from '@/lib/mock-data-generator'

export default async function LogsPage() {
  // Generate stable mock data - same data for entire day, refreshes daily
  const logsData = generateMockLogs(100, generateDateSeed())
  const statsData = calculateStats(logsData)

  return <LogsPageContentLazy logs={logsData} stats={statsData} />
}
