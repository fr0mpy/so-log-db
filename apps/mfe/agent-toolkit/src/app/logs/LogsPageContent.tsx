'use client'

import { LogTable } from './LogTable'
import { StatCard } from './StatCard'
import { LogFilters } from './LogFilters'
import { LogsChart } from '../../components/LogsChart/LogsChart'
import { LogsContent } from './LogsContent'
import { Grid, LogStats } from '../../styles'

interface LogEntry {
  id: string
  timestamp: string
  provider: { name: string; version: string }
  originOwner: string
  source: string
  request: { method: string; name: string }
  duration: number
  status: number
}

interface LogsPageContentProps {
  logs: readonly LogEntry[]
  stats: {
    total: number
    avgLatency: number
    successRate: string
    errorRate: string
    clientErrors: number
    serverErrors: number
    trends: {
      totalRequests: { delta: number; isUp: boolean }
      avgLatency: { delta: number; isUp: boolean }
      successRate: { delta: number; isUp: boolean }
      errorRate: { delta: number; isUp: boolean }
    }
  }
  translations: {
    title: string
    filter: {
      placeholder: string
      dateRange: string
      backgroundLogs: string
      refresh: string
      last24Hours: string
      last7Days: string
      last30Days: string
      customRange: string
      allStatuses: string
      success2xx: string
      clientError4xx: string
      serverError5xx: string
      aria: {
        filterInput: string
        filterByStatus: string
        filterByTimeRange: string
      }
    }
    chart: {
      success: string
      clientError: string
      serverError: string
    }
    stats: {
      successRate: string
      avgLatency: string
      totalRequests: string
      errorRate: string
      clientErrors: string
      serverErrors: string
      ms: string
    }
    table: {
      table: {
        requested: string
        provider: string
        originOwner: string
        source: string
        request: string
        duration: string
        status: string
      }
      dates: {
        today: string
        yesterday: string
      }
      aria: {
        viewLogDetails: string
        pagination: string
      }
      pagination: {
        showing: string
        rowsPerPage: string
        show: Record<number, string>
      }
      actions: {
        replay: string
        replayDescription: string
        batchReplay: string
        batchReplayDescription: string
        requestTester: string
        requestTesterDescription: string
        integration: string
        account: string
      }
    }
  }
}

/**
 * All page content bundled together for code-splitting.
 * This allows the entire page to show skeleton while JS loads.
 */
export function LogsPageContent({ logs, stats, translations }: LogsPageContentProps) {
  const { title, filter, chart, stats: statsLabels, table } = translations

  return (
    <>
      {/* Filters */}
      <LogFilters title={title} translations={filter} />

      {/* Chart + Stats with hover coordination */}
      <LogsContent>
        <div className={Grid.chartStats}>
          {/* Chart */}
          <LogsChart logs={logs} translations={chart} />

          {/* Stats 2x2 Grid */}
          <div className={LogStats.grid}>
            <StatCard
              label={statsLabels.totalRequests}
              value={stats.total}
              trend={{ delta: stats.trends.totalRequests.delta, isPositive: true, prefix: '+', suffix: '%' }}
            />
            <StatCard
              label={statsLabels.avgLatency}
              value={`${stats.avgLatency}${statsLabels.ms}`}
              trend={{ delta: stats.trends.avgLatency.delta, isPositive: false, prefix: '-', suffix: statsLabels.ms }}
            />
            <StatCard
              label={statsLabels.successRate}
              value={`${stats.successRate}%`}
              variant="success"
              trend={{ delta: stats.trends.successRate.delta, isPositive: true, prefix: '+', suffix: '%' }}
            />
            <StatCard
              label={statsLabels.errorRate}
              value={`${stats.errorRate}%`}
              variant="destructive"
              trend={{ delta: stats.trends.errorRate.delta, isPositive: false, prefix: '-', suffix: '%' }}
            />
          </div>
        </div>

        {/* Table */}
        <LogTable logs={logs} translations={table} />
      </LogsContent>
    </>
  )
}
