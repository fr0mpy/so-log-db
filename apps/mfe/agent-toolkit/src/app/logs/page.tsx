/**
 * Log List View
 *
 * Data Strategy: REST + WebSocket
 * Real-time log viewing with filters and streaming
 */

export { metadata } from './metadata'

import { getTranslations, logs, aria } from '@stackone/i18n'
import { LogsPageContentLazy } from './LogsPageContentLazy'
import {
  generateMockLogs,
  calculateStats,
  generateDateSeed,
} from '@/lib/mock-data-generator'

export default async function LogsPage() {
  const t = await getTranslations()

  // Generate stable mock data - same data for entire day, refreshes daily
  const logsData = generateMockLogs(100, generateDateSeed())
  const statsData = calculateStats(logsData)

  const translations = {
    title: t(logs.title),
    filter: {
      placeholder: t(logs.placeholder),
      dateRange: t(logs.filters.dateRange),
      backgroundLogs: t(logs.filters.backgroundLogs),
      refresh: t(logs.filters.refresh),
      last24Hours: t(logs.filters.last24Hours),
      last7Days: t(logs.filters.last7Days),
      last30Days: t(logs.filters.last30Days),
      customRange: t(logs.filters.customRange),
      allStatuses: t(logs.filters.allStatuses),
      success2xx: t(logs.filters.success2xx),
      clientError4xx: t(logs.filters.clientError4xx),
      serverError5xx: t(logs.filters.serverError5xx),
      aria: {
        filterInput: t(aria.filterInput),
        filterByStatus: t(aria.filterByStatus),
        filterByTimeRange: t(aria.filterByTimeRange),
      },
    },
    chart: {
      success: t(logs.chart.success),
      clientError: t(logs.chart.clientError),
      serverError: t(logs.chart.serverError),
    },
    stats: {
      successRate: t(logs.stats.successRate),
      avgLatency: t(logs.stats.avgLatency),
      totalRequests: t(logs.stats.totalRequests),
      errorRate: t(logs.stats.errorRate),
      clientErrors: t(logs.stats.clientErrors),
      serverErrors: t(logs.stats.serverErrors),
      ms: t(logs.stats.ms),
    },
    table: {
      table: {
        requested: t(logs.table.requested),
        provider: t(logs.table.provider),
        originOwner: t(logs.table.originOwner),
        source: t(logs.table.source),
        request: t(logs.table.request),
        duration: t(logs.table.duration),
        status: t(logs.table.status),
      },
      dates: {
        today: t(logs.dates.today),
        yesterday: t(logs.dates.yesterday),
      },
      aria: {
        viewLogDetails: t(aria.viewLogDetails),
        pagination: t(aria.pagination),
        sortByColumn: t(aria.sortByColumn),
      },
      pagination: {
        showing: t(logs.pagination.showing),
        rowsPerPage: t(logs.pagination.showRowsPerPage),
        show: {
          10: t(logs.pagination.show, { count: 10 }),
          20: t(logs.pagination.show, { count: 20 }),
          50: t(logs.pagination.show, { count: 50 }),
          100: t(logs.pagination.show, { count: 100 }),
        },
      },
      actions: {
        replay: t(logs.actions.replay),
        replayDescription: t(logs.actions.replayDescription),
        replayLoading: t(logs.actions.replayLoading),
        replaySuccess: t(logs.actions.replaySuccess),
        replayError: t(logs.actions.replayError),
        batchReplay: t(logs.actions.batchReplay),
        batchReplayDescription: t(logs.actions.batchReplayDescription),
        requestTester: t(logs.actions.requestTester),
        requestTesterDescription: t(logs.actions.requestTesterDescription),
        integration: t(logs.actions.integration),
        account: t(logs.actions.account),
      },
    },
  }

  return (
    <LogsPageContentLazy
      logs={logsData}
      stats={statsData}
      translations={translations}
    />
  )
}
