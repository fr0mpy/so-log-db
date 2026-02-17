/**
 * Log List View
 *
 * Data Strategy: REST + WebSocket
 * Real-time log viewing with filters and streaming
 */

export { metadata } from './metadata'

import { getTranslations, logs, aria } from '@stackone/i18n'
import { LogsPageContentLazy } from './LogsPageContentLazy'

// Mock data configuration
const PROVIDERS = [
  { name: 'Attio', version: 'v1.0.0' },
  { name: 'Humaans', version: 'v1.0.0' },
  { name: 'Salesforce', version: 'v2.1.0' },
  { name: 'HubSpot', version: 'v1.2.0' },
  { name: 'Workday', version: 'v3.0.0' },
] as const

const ORIGIN_OWNERS = [
  'StackOne Interviews',
  'StackOne HR',
  'StackOne Sales',
  'StackOne Marketing',
] as const

const REQUESTS = [
  { method: 'GET', name: 'List People' },
  { method: 'GET', name: 'Get Person' },
  { method: 'POST', name: 'Create Person' },
  { method: 'PUT', name: 'Update Person' },
  { method: 'DELETE', name: 'Delete Person' },
  { method: 'GET', name: 'List Companies' },
  { method: 'GET', name: 'Get Company' },
  { method: 'POST', name: 'Create Company' },
  { method: 'GET', name: 'Search Records' },
  { method: 'POST', name: 'Sync Data' },
  { method: 'GET', name: 'List Employees' },
  { method: 'GET', name: 'Get Token Info' },
] as const

const SOURCES = ['MCP Tool', 'API Direct', 'Webhook', 'Scheduled Job'] as const

// Status distribution: 70% success, 20% client error, 10% server error
const STATUS_WEIGHTS = [
  { status: 200, weight: 60 },
  { status: 201, weight: 10 },
  { status: 400, weight: 8 },
  { status: 401, weight: 4 },
  { status: 404, weight: 5 },
  { status: 422, weight: 3 },
  { status: 500, weight: 5 },
  { status: 502, weight: 3 },
  { status: 503, weight: 2 },
] as const

// Seeded random for consistent mock data
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function generateMockLogs(count: number, timeSeed: number) {
  const logsData = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Generate time slots programmatically for dense x-axis coverage
  const TIME_SLOTS: Array<{ hour: number; minute: number }> = []
  for (let hour = 8; hour <= 17; hour++) {
    const minuteSlots = [0, 3, 7, 12, 15, 18, 22, 27, 30, 33, 38, 42, 45, 48, 52, 55, 58]
    for (const minute of minuteSlots) {
      const duplicates = (hour === 9 || hour === 12 || hour === 16) ? 3 :
                         (minute % 15 === 0) ? 2 : 1
      for (let d = 0; d < duplicates; d++) {
        TIME_SLOTS.push({ hour, minute })
      }
    }
  }

  for (let i = 0; i < count; i++) {
    const seed = i + timeSeed

    const slotIndex = Math.floor(seededRandom(seed * 1) * TIME_SLOTS.length)
    const slot = TIME_SLOTS[slotIndex]
    const second = Math.floor(seededRandom(seed * 3) * 60)

    const timestamp = new Date(today)
    timestamp.setHours(slot.hour, slot.minute, second)

    const providerIndex = Math.floor(seededRandom(seed * 4) * PROVIDERS.length)
    const provider = PROVIDERS[providerIndex]

    const ownerIndex = Math.floor(seededRandom(seed * 5) * ORIGIN_OWNERS.length)
    const originOwner = ORIGIN_OWNERS[ownerIndex]

    const requestIndex = Math.floor(seededRandom(seed * 6) * REQUESTS.length)
    const baseRequest = REQUESTS[requestIndex]
    const request = {
      method: baseRequest.method,
      name: `${provider.name} ${baseRequest.name}`,
    }

    const sourceIndex = Math.floor(seededRandom(seed * 7) * SOURCES.length)
    const source = SOURCES[sourceIndex]

    const statusRoll = seededRandom(seed * 8) * 100
    let cumulative = 0
    let status = 200
    for (const sw of STATUS_WEIGHTS) {
      cumulative += sw.weight
      if (statusRoll < cumulative) {
        status = sw.status
        break
      }
    }

    const baseDuration = 50 + Math.floor(seededRandom(seed * 9) * 200)
    const duration = status >= 400 ? baseDuration + Math.floor(seededRandom(seed * 10) * 500) : baseDuration

    logsData.push({
      id: `log_${String(i + 1).padStart(3, '0')}`,
      timestamp: timestamp.toISOString(),
      provider,
      originOwner,
      source,
      request,
      duration,
      status,
    })
  }

  return logsData.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
}

type LogEntry = ReturnType<typeof generateMockLogs>[number]

function calculateStats(logEntries: LogEntry[]) {
  let success = 0
  let clientErrors = 0
  let serverErrors = 0
  let totalDuration = 0

  for (const log of logEntries) {
    totalDuration += log.duration
    if (log.status >= 200 && log.status < 300) {
      success++
    } else if (log.status >= 400 && log.status < 500) {
      clientErrors++
    } else if (log.status >= 500) {
      serverErrors++
    }
  }

  const total = logEntries.length
  const totalErrorCount = clientErrors + serverErrors
  const successRate = total > 0 ? (success / total) * 100 : 0
  const errorRate = total > 0 ? (totalErrorCount / total) * 100 : 0
  const avgLatency = total > 0 ? Math.round(totalDuration / total) : 0

  return {
    total,
    success,
    clientErrors,
    serverErrors,
    totalErrors: totalErrorCount,
    successRate: successRate.toFixed(1),
    errorRate: errorRate.toFixed(1),
    avgLatency,
    trends: {
      successRate: { delta: 1.2, isUp: true },
      avgLatency: { delta: 15, isUp: false },
      totalRequests: { delta: 8, isUp: true },
      errorRate: { delta: 0.5, isUp: false },
    },
  }
}

export default async function LogsPage() {
  const t = await getTranslations()

  // Generate fresh mock data on each request
  const logsData = generateMockLogs(100, Date.now())
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
      },
      pagination: {
        showing: t(logs.pagination.showing),
        rowsPerPage: t(logs.pagination.rowsPerPage),
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
