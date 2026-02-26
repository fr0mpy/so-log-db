import { Status } from './constants'
import type { LogEntry } from './types'
import type { LogFilters } from './useLogFilters'

/**
 * Filters logs based on status and search query
 */
export function filterLogs(
  logs: readonly LogEntry[],
  filters: LogFilters,
): LogEntry[] {
  return logs.filter((log) => {
    // Status filter
    if (filters.status !== Status.all) {
      const statusBand = `${Math.floor(log.status / 100)}xx`
      if (statusBand !== filters.status) return false
    }

    // Search filter
    if (filters.search) {
      const query = filters.search.toLowerCase()
      const matchesRequest = log.request.name.toLowerCase().includes(query)
      const matchesProvider = log.provider.name.toLowerCase().includes(query)
      const matchesSource = log.source.toLowerCase().includes(query)
      if (!matchesRequest && !matchesProvider && !matchesSource) return false
    }

    return true
  })
}
