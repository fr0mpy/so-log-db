/**
 * Log Table Types
 *
 * Type definitions for log entries and table sorting functionality.
 */

// ============================================================================
// Log Entry
// ============================================================================

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

// ============================================================================
// Sorting
// ============================================================================

/** Sort direction: ascending, descending, or unsorted */
export type SortDirection = 'asc' | 'desc' | null

/** Columns that support sorting */
export type SortableColumn =
  | 'requested'
  | 'provider'
  | 'originOwner'
  | 'source'
  | 'request'
  | 'duration'
  | 'status'

/** Current sort state */
export interface SortState {
  column: SortableColumn | null
  direction: SortDirection
}
