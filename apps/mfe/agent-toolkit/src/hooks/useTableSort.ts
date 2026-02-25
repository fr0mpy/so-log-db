'use client'

import { useCallback, useMemo, useState } from 'react'
import type { LogEntry, SortableColumn, SortState } from '../app/logs/_lib'
import { createComparator, getDefaultDirection } from '../app/logs/_lib'

interface UseTableSortOptions {
  /** Default column to sort by */
  column?: SortableColumn
  /** Default sort direction */
  direction?: 'asc' | 'desc'
}

interface UseTableSortReturn {
  /** Sorted data array */
  sortedData: readonly LogEntry[]
  /** Current sort state */
  sortState: SortState
  /** Handler for column header clicks */
  handleSort: (column: SortableColumn) => void
}

/**
 * Hook for managing table sort state and sorted data.
 *
 * @param data - Array of log entries to sort
 * @param options - Default sort configuration
 *
 * @example
 * ```tsx
 * const { sortedData, sortState, handleSort } = useTableSort(logs, {
 *   column: 'requested',
 *   direction: 'desc',
 * })
 * ```
 */
export function useTableSort(
  data: readonly LogEntry[],
  options?: UseTableSortOptions
): UseTableSortReturn {
  const [sortState, setSortState] = useState<SortState>({
    column: options?.column ?? null,
    direction: options?.direction ?? null,
  })

  /**
   * Cycles sort direction on column click:
   * - New column: use column's default direction
   * - Same column: cycle through default → opposite → unsorted
   */
  const handleSort = useCallback((column: SortableColumn) => {
    setSortState((prev) => {
      const defaultDir = getDefaultDirection(column)
      const oppositeDir = defaultDir === 'desc' ? 'asc' : 'desc'

      if (prev.column !== column) {
        // New column: start with its default direction
        return { column, direction: defaultDir }
      }

      // Same column: cycle through directions
      if (prev.direction === defaultDir) {
        return { column, direction: oppositeDir }
      }

      if (prev.direction === oppositeDir) {
        return { column: null, direction: null }
      }

      // From null, go to default
      return { column, direction: defaultDir }
    })
  }, [])

  /**
   * Memoized sorted data - only recomputes when data or sort state changes.
   */
  const sortedData = useMemo(() => {
    if (!sortState.column || !sortState.direction) {
      return data
    }

    const comparator = createComparator(sortState)
    return [...data].sort(comparator)
  }, [data, sortState])

  return {
    sortedData,
    sortState,
    handleSort,
  }
}
