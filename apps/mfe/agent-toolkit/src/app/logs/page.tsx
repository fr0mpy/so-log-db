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

// Generate a seed that stays constant for the entire day but changes daily
function generateDateSeed(): number {
  const dateString = new Date().toISOString().slice(0, 10) // "2026-02-17"
  let hash = 0
  for (let i = 0; i < dateString.length; i++) {
    hash = ((hash << 5) - hash) + dateString.charCodeAt(i)
    hash = hash & hash
  }
  return Math.abs(hash)
}

// Seeded random for consistent mock data
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function generateMockLogs(count: number, baseSeed: number) {
  const logsData = []
  const now = new Date()

  // Date boundaries
  const todayStart = new Date(now)
  todayStart.setHours(0, 0, 0, 0)

  const yesterdayStart = new Date(todayStart)
  yesterdayStart.setDate(yesterdayStart.getDate() - 1)

  const threeMonthsAgo = new Date(todayStart)
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)

  // Distribution: 30% today, 20% yesterday, 50% past 3 months
  const todayCount = Math.floor(count * 0.3)
  const yesterdayCount = Math.floor(count * 0.2)
  const pastCount = count - todayCount - yesterdayCount

  function generateTimestamp(seed: number, bucket: 'today' | 'yesterday' | 'past'): Date {
    if (bucket === 'today') {
      // Business hours today (8am - now or 6pm, whichever is earlier)
      const hour = 8 + Math.floor(seededRandom(seed) * Math.min(10, Math.max(1, now.getHours() - 7)))
      const minute = Math.floor(seededRandom(seed * 2) * 60)
      const second = Math.floor(seededRandom(seed * 3) * 60)
      const ts = new Date(todayStart)
      ts.setHours(hour, minute, second)
      return ts
    } else if (bucket === 'yesterday') {
      // Business hours yesterday (8am - 6pm)
      const hour = 8 + Math.floor(seededRandom(seed) * 10)
      const minute = Math.floor(seededRandom(seed * 2) * 60)
      const second = Math.floor(seededRandom(seed * 3) * 60)
      const ts = new Date(yesterdayStart)
      ts.setHours(hour, minute, second)
      return ts
    } else {
      // Random date in past 3 months (excluding today and yesterday)
      const twoDaysAgo = new Date(yesterdayStart)
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 1)
      const rangeMs = twoDaysAgo.getTime() - threeMonthsAgo.getTime()
      const offsetMs = Math.floor(seededRandom(seed) * rangeMs)
      const ts = new Date(threeMonthsAgo.getTime() + offsetMs)
      // Random time of day
      ts.setHours(
        Math.floor(seededRandom(seed * 2) * 24),
        Math.floor(seededRandom(seed * 3) * 60),
        Math.floor(seededRandom(seed * 4) * 60)
      )
      return ts
    }
  }

  function createLog(index: number, bucket: 'today' | 'yesterday' | 'past') {
    const seed = index + baseSeed
    const timestamp = generateTimestamp(seed * 11, bucket)

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

    // Generate URL based on provider and request
    const providerSlug = provider.name.toLowerCase().replace(/\s+/g, '-')
    const url = `https://api.${providerSlug}.com/v1/${baseRequest.name.toLowerCase().replace(/\s+/g, '/')}?page=1&per_page=50`

    // Generate expires (random 1-30 days)
    const expiresDay = Math.floor(seededRandom(seed * 12) * 30) + 1
    const expires = `${expiresDay} Day${expiresDay > 1 ? 's' : ''}`

    // Generate request details
    const requestDetails = {
      method: baseRequest.method,
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Connection': 'keep-alive',
        'User-Agent': 'stackone-sdk/2.35.1',
        'Authorization': '<redacted>',
        'X-Request-ID': `req_${seed.toString(16)}`,
        'Cache-Control': 'no-cache',
      } as Record<string, string>,
      queryParams: {
        page: 1,
        per_page: 50,
        ...(seededRandom(seed * 13) > 0.5 ? { include: 'metadata' } : {}),
      } as Record<string, string | number>,
      body: baseRequest.method === 'POST' || baseRequest.method === 'PUT' ? {
        data: {
          id: `rec_${seed.toString(16)}`,
          name: 'Sample Record',
          created_at: timestamp.toISOString(),
        },
      } : undefined,
    }

    // Generate response details
    const responseBodyAvailable = status < 400 || seededRandom(seed * 14) > 0.3
    const responseDetails = {
      status,
      headers: {
        'Content-Type': 'application/json',
        'X-Request-ID': `req_${seed.toString(16)}`,
        'X-RateLimit-Remaining': String(Math.floor(seededRandom(seed * 15) * 1000)),
        'X-RateLimit-Reset': String(Math.floor(Date.now() / 1000) + 3600),
      } as Record<string, string>,
      body: responseBodyAvailable ? {
        data: status < 400 ? [
          { id: 'rec_001', name: 'John Doe', email: 'john@example.com' },
          { id: 'rec_002', name: 'Jane Smith', email: 'jane@example.com' },
        ] : {
          error: {
            code: status === 401 ? 'unauthorized' : status === 404 ? 'not_found' : 'bad_request',
            message: status === 401 ? 'Invalid or expired access token' :
                     status === 404 ? 'Resource not found' : 'Invalid request parameters',
          },
        },
        meta: { page: 1, per_page: 50, total: 25 },
      } : undefined,
      bodyAvailable: responseBodyAvailable,
    }

    // Generate underlying requests (1-3 per log, only for some logs)
    const hasUnderlyingRequests = seededRandom(seed * 16) > 0.4
    const underlyingRequestCount = hasUnderlyingRequests ? Math.floor(seededRandom(seed * 17) * 3) + 1 : 0
    const underlyingRequests = hasUnderlyingRequests ? Array.from({ length: underlyingRequestCount }, (_, i) => {
      const urSeed = seed * 100 + i
      const urTimestamp = new Date(timestamp.getTime() + Math.floor(seededRandom(urSeed) * duration))
      const urDuration = Math.floor(seededRandom(urSeed * 2) * (duration / underlyingRequestCount))
      const urStatus = seededRandom(urSeed * 3) > 0.2 ? 200 : status
      return {
        id: `ur_${seed}_${i + 1}`,
        timestamp: urTimestamp.toISOString(),
        method: i === 0 ? 'GET' : seededRandom(urSeed * 4) > 0.5 ? 'POST' : 'GET',
        url: `https://api.${providerSlug}.com/v1/internal/${i === 0 ? 'auth' : 'data'}`,
        duration: urDuration,
        status: urStatus,
        requestDetails: {
          method: i === 0 ? 'GET' : seededRandom(urSeed * 4) > 0.5 ? 'POST' : 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': '<redacted>',
          },
        },
        responseDetails: {
          status: urStatus,
          headers: {
            'Content-Type': 'application/json',
          },
          body: urStatus === 200 ? { success: true } : { error: 'Request failed' },
          bodyAvailable: true,
        },
      }
    }) : undefined

    return {
      id: `log_${String(index + 1).padStart(3, '0')}`,
      timestamp: timestamp.toISOString(),
      provider,
      originOwner,
      source,
      request,
      duration,
      status,
      // Extended fields for LogEntryDetail
      url,
      expires,
      requestDetails,
      responseDetails,
      underlyingRequests,
    }
  }

  let logIndex = 0

  // Generate today's logs
  for (let i = 0; i < todayCount; i++) {
    logsData.push(createLog(logIndex++, 'today'))
  }

  // Generate yesterday's logs
  for (let i = 0; i < yesterdayCount; i++) {
    logsData.push(createLog(logIndex++, 'yesterday'))
  }

  // Generate past 3 months logs
  for (let i = 0; i < pastCount; i++) {
    logsData.push(createLog(logIndex++, 'past'))
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
      },
      pagination: {
        showing: t(logs.pagination.showing),
        rowsPerPage: t(logs.pagination.showRowsPerPage),
        show: {
          10: '10',
          20: '20',
          50: '50',
          100: '100',
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
