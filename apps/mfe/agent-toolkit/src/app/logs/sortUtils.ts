/**
 * Log Table Sort Utilities
 *
 * Comparator functions and sort helpers for LogTable columns.
 */

import type { LogEntry, SortableColumn, SortState } from './types'

// ============================================================================
// Column Comparators
// ============================================================================

/**
 * Comparator functions for each sortable column.
 * All return positive if a > b (ascending order).
 */
const comparators: Record<SortableColumn, (a: LogEntry, b: LogEntry) => number> = {
  requested: (a, b) =>
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),

  provider: (a, b) =>
    a.provider.name.localeCompare(b.provider.name),

  originOwner: (a, b) =>
    a.originOwner.localeCompare(b.originOwner),

  source: (a, b) =>
    a.source.localeCompare(b.source),

  request: (a, b) => {
    // Sort by method first, then by name
    const methodCmp = a.request.method.localeCompare(b.request.method)
    return methodCmp !== 0 ? methodCmp : a.request.name.localeCompare(b.request.name)
  },

  duration: (a, b) =>
    a.duration - b.duration,

  status: (a, b) =>
    a.status - b.status,
}

// ============================================================================
// Default Directions
// ============================================================================

/**
 * Default sort direction when first clicking a column.
 * - Timestamps: descending (newest first)
 * - Numeric (duration, status): descending (highest/slowest first)
 * - Text: ascending (A-Z)
 */
const defaultDirections: Record<SortableColumn, 'asc' | 'desc'> = {
  requested: 'desc',
  provider: 'asc',
  originOwner: 'asc',
  source: 'asc',
  request: 'asc',
  duration: 'desc',
  status: 'desc',
}

export function getDefaultDirection(column: SortableColumn): 'asc' | 'desc' {
  return defaultDirections[column]
}

// ============================================================================
// Sort Function Factory
// ============================================================================

/**
 * Creates a comparator function based on current sort state.
 * Returns a no-op comparator if no column is selected.
 */
export function createComparator(sortState: SortState): (a: LogEntry, b: LogEntry) => number {
  const { column, direction } = sortState

  if (!column || !direction) {
    return () => 0
  }

  const baseComparator = comparators[column]

  // Reverse for descending order
  return direction === 'desc'
    ? (a: LogEntry, b: LogEntry) => -baseComparator(a, b)
    : baseComparator
}
