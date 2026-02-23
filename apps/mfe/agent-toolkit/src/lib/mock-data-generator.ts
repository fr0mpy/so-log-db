/**
 * Mock Log Data Generator
 *
 * Generates realistic mock log entries with consistent seeded randomness.
 * Data remains stable throughout the day and refreshes at midnight.
 */

import {
  PROVIDERS,
  ORIGIN_OWNERS,
  REQUESTS,
  SOURCES,
  STATUS_WEIGHTS,
  MOCK_LOG_CONFIG,
} from '@/config/mock-logs'
import { seededRandom } from '@/utils'

export { generateDateSeed } from '@/utils'

type TimeBucket = 'today' | 'yesterday' | 'past'

interface UnderlyingRequest {
  id: string
  timestamp: string
  method: string
  url: string
  duration: number
  status: number
  requestDetails: {
    method: string
    headers: Record<string, string>
  }
  responseDetails: {
    status: number
    headers: Record<string, string>
    body: Record<string, unknown>
    bodyAvailable: boolean
  }
}

function generateTimestamp(seed: number, bucket: TimeBucket, now: Date): Date {
  const todayStart = new Date(now)
  todayStart.setHours(0, 0, 0, 0)

  const yesterdayStart = new Date(todayStart)
  yesterdayStart.setDate(yesterdayStart.getDate() - 1)

  const threeMonthsAgo = new Date(todayStart)
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)

  const { businessHours } = MOCK_LOG_CONFIG

  if (bucket === 'today') {
    const hour = businessHours.start + Math.floor(
      seededRandom(seed) * Math.min(businessHours.duration, Math.max(1, now.getHours() - 7))
    )
    const minute = Math.floor(seededRandom(seed * 2) * 60)
    const second = Math.floor(seededRandom(seed * 3) * 60)
    const ts = new Date(todayStart)
    ts.setHours(hour, minute, second)
    return ts
  } else if (bucket === 'yesterday') {
    const hour = businessHours.start + Math.floor(seededRandom(seed) * businessHours.duration)
    const minute = Math.floor(seededRandom(seed * 2) * 60)
    const second = Math.floor(seededRandom(seed * 3) * 60)
    const ts = new Date(yesterdayStart)
    ts.setHours(hour, minute, second)
    return ts
  } else {
    const twoDaysAgo = new Date(yesterdayStart)
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 1)
    const rangeMs = twoDaysAgo.getTime() - threeMonthsAgo.getTime()
    const offsetMs = Math.floor(seededRandom(seed) * rangeMs)
    const ts = new Date(threeMonthsAgo.getTime() + offsetMs)
    ts.setHours(
      Math.floor(seededRandom(seed * 2) * 24),
      Math.floor(seededRandom(seed * 3) * 60),
      Math.floor(seededRandom(seed * 4) * 60)
    )
    return ts
  }
}

function selectStatus(seed: number): number {
  const statusRoll = seededRandom(seed) * 100
  let cumulative = 0
  for (const sw of STATUS_WEIGHTS) {
    cumulative += sw.weight
    if (statusRoll < cumulative) {
      return sw.status
    }
  }
  return 200
}

function createLog(index: number, baseSeed: number, bucket: TimeBucket, now: Date) {
  const seed = index + baseSeed
  const timestamp = generateTimestamp(seed * 11, bucket, now)

  const providerIndex = Math.floor(seededRandom(seed * 4) * PROVIDERS.length)
  const provider = PROVIDERS[providerIndex]

  const ownerIndex = Math.floor(seededRandom(seed * 5) * ORIGIN_OWNERS.length)
  const originOwner = ORIGIN_OWNERS[ownerIndex]

  const requestIndex = Math.floor(seededRandom(seed * 6) * REQUESTS.length)
  const baseRequest = REQUESTS[requestIndex]
  const request = {
    method: baseRequest.method,
    name: baseRequest.name,
  }

  const sourceIndex = Math.floor(seededRandom(seed * 7) * SOURCES.length)
  const source = SOURCES[sourceIndex]

  const status = selectStatus(seed * 8)

  const { duration: durationConfig } = MOCK_LOG_CONFIG
  const baseDuration = durationConfig.base + Math.floor(seededRandom(seed * 9) * durationConfig.variance)
  const duration = status >= 400
    ? baseDuration + Math.floor(seededRandom(seed * 10) * durationConfig.errorPenalty)
    : baseDuration

  const providerSlug = provider.name.toLowerCase().replace(/\s+/g, '-')
  const url = `https://api.${providerSlug}.com/v1/${baseRequest.name.toLowerCase().replace(/\s+/g, '/')}?page=1&per_page=50`

  const expiresDay = Math.floor(seededRandom(seed * 12) * 30) + 1
  const expires = `${expiresDay} Day${expiresDay > 1 ? 's' : ''}`

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

  const hasUnderlyingRequests = seededRandom(seed * 16) > 0.4
  const underlyingRequestCount = hasUnderlyingRequests ? Math.floor(seededRandom(seed * 17) * 3) + 1 : 0
  const underlyingRequests: UnderlyingRequest[] | undefined = hasUnderlyingRequests
    ? Array.from({ length: underlyingRequestCount }, (_, i) => {
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
      })
    : undefined

  return {
    id: `log_${String(index + 1).padStart(3, '0')}`,
    timestamp: timestamp.toISOString(),
    provider,
    originOwner,
    source,
    request,
    duration,
    status,
    url,
    expires,
    requestDetails,
    responseDetails,
    underlyingRequests,
  }
}

/**
 * Generate mock log entries with consistent seeded randomness
 *
 * @param count - Number of logs to generate
 * @param baseSeed - Base seed for random generation (use generateDateSeed() for daily consistency)
 * @returns Array of log entries sorted by timestamp (newest first)
 */
export function generateMockLogs(count: number, baseSeed: number) {
  const logsData = []
  const now = new Date()

  const { distribution } = MOCK_LOG_CONFIG
  const todayCount = Math.floor(count * distribution.today)
  const yesterdayCount = Math.floor(count * distribution.yesterday)
  const pastCount = count - todayCount - yesterdayCount

  let logIndex = 0

  for (let i = 0; i < todayCount; i++) {
    logsData.push(createLog(logIndex++, baseSeed, 'today', now))
  }

  for (let i = 0; i < yesterdayCount; i++) {
    logsData.push(createLog(logIndex++, baseSeed, 'yesterday', now))
  }

  for (let i = 0; i < pastCount; i++) {
    logsData.push(createLog(logIndex++, baseSeed, 'past', now))
  }

  return logsData.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
}

export type LogEntry = ReturnType<typeof generateMockLogs>[number]

/**
 * Calculate statistics from log entries
 *
 * @param logEntries - Array of log entries
 * @returns Statistics object with counts, rates, and trends
 */
export function calculateStats(logEntries: LogEntry[]) {
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

export type LogStats = ReturnType<typeof calculateStats>
