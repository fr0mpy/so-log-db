'use client'

import { useState, useTransition, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { LogTableLazy as LogTable } from './LogTableLazy'
import { StatCard } from './StatCard'
import { LogFiltersLazy as LogFilters } from './LogFiltersLazy'
import { LogsContentSkeleton } from './LogsContentSkeleton'
import { LogsChart } from '../../components/LogsChart'
import { LogsContent } from './LogsContent'
import { LogDetailDialog } from '../../components/LogDetailDialog'
import type { LogEntryDetail } from '../../components/LogDetailDialog'
import { ThemeSwitcher } from '@stackone-ui/core/theme-switcher'
import { Switch } from '@stackone-ui/core/switch'
import { useTheme } from '@stackone-ui/core/providers'
import { Grid, LogStats, FilterRow } from '../../styles'

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
        replayLoading: string
        replaySuccess: string
        replayError: string
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
  const router = useRouter()
  const [isRefreshing, startTransition] = useTransition()
  const { theme, toggle: toggleTheme } = useTheme()

  // Filter state
  const [dateRange, setDateRange] = useState('last24Hours')
  const [status, setStatus] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [backgroundLogs, setBackgroundLogs] = useState(false)

  // Log detail dialog state
  const [selectedLog, setSelectedLog] = useState<LogEntryDetail | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Handle row click - open dialog with selected log
  const handleRowClick = useCallback((log: LogEntry) => {
    // Cast to LogEntryDetail since our mock data includes full details
    setSelectedLog(log as LogEntryDetail)
    setIsDialogOpen(true)
  }, [])

  // Handle navigation within dialog
  const handleNavigate = useCallback((log: LogEntryDetail) => {
    setSelectedLog(log)
  }, [])

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh()
    })
  }

  // Filter logs based on status and search query
  const filteredLogs = logs.filter((log) => {
    // Status filter
    if (status !== 'all') {
      const statusBand = Math.floor(log.status / 100) + 'xx'
      if (statusBand !== status) return false
    }
    // Search filter
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase()
      const matchesRequest = log.request.name.toLowerCase().includes(searchLower)
      const matchesProvider = log.provider.name.toLowerCase().includes(searchLower)
      const matchesSource = log.source.toLowerCase().includes(searchLower)
      if (!matchesRequest && !matchesProvider && !matchesSource) return false
    }
    return true
  })

  return (
    <>
      {/* Filters */}
      <LogFilters
        title={title}
        translations={filter}
        dateRange={dateRange}
        status={status}
        searchQuery={searchQuery}
        onDateRangeChange={setDateRange}
        onStatusChange={setStatus}
        onSearchChange={setSearchQuery}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />

      {/* Chart + Stats with hover coordination */}
      <LogsContent>
        {isRefreshing ? (
          <LogsContentSkeleton />
        ) : (
          <>
            <div className={Grid.chartStats}>
              {/* Chart */}
              <div className={Grid.shrinkable}>
                <LogsChart logs={filteredLogs} translations={chart} />
              </div>

              {/* Stats 2x2 Grid with controls */}
              <div className={LogStats.wrapper}>
                {/* Controls at top right */}
                <div className={LogStats.controls}>
                  <ThemeSwitcher
                    isDark={theme === 'dark'}
                    onToggle={toggleTheme}
                    className={LogStats.themeSwitcher}
                  />
                  <Switch
                    id="background-logs-switch"
                    checked={backgroundLogs}
                    onCheckedChange={setBackgroundLogs}
                    aria-labelledby="background-logs-label"
                    className={FilterRow.switchSmall}
                  />
                  <label
                    id="background-logs-label"
                    htmlFor="background-logs-switch"
                    className={FilterRow.labelSmallMuted}
                  >
                    {filter.backgroundLogs}
                  </label>
                </div>

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
            </div>

            {/* Table */}
            <LogTable logs={filteredLogs} translations={table} onRowClick={handleRowClick} />
          </>
        )}
      </LogsContent>

      {/* Log Detail Dialog */}
      <LogDetailDialog
        log={selectedLog}
        logs={filteredLogs as unknown as readonly LogEntryDetail[]}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onNavigate={handleNavigate}
      />
    </>
  )
}
