'use client'

import { cn } from '@stackone-ui/core/utils'
import type { SortableColumn, SortState } from '../../app/logs/_lib'
import { SortIndicator } from './SortIndicator'
import { SortableHeaderStyles as S } from './styles'

interface SortableHeaderProps {
  /** Column identifier for sorting */
  column: SortableColumn
  /** Current sort state */
  sortState: SortState
  /** Callback when header is clicked */
  onSort: (column: SortableColumn) => void
  /** Header label text */
  children: React.ReactNode
  /** Additional CSS classes */
  className?: string
  /** ARIA label for accessibility */
  ariaLabel?: string
}

/**
 * Sortable table header cell with keyboard support and ARIA attributes.
 *
 * @example
 * ```tsx
 * <SortableHeader
 *   column="requested"
 *   sortState={sortState}
 *   onSort={handleSort}
 *   className={LogTableColumns.requested}
 * >
 *   {table.requested}
 * </SortableHeader>
 * ```
 */
export function SortableHeader({
  column,
  sortState,
  onSort,
  children,
  className,
  ariaLabel,
}: SortableHeaderProps) {
  const isSorted = sortState.column === column
  const direction = isSorted ? sortState.direction : null

  // ARIA sort values: 'ascending', 'descending', or 'none'
  const ariaSort = direction === 'asc'
    ? 'ascending'
    : direction === 'desc'
      ? 'descending'
      : 'none'

  const handleClick = () => {
    onSort(column)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onSort(column)
    }
  }

  return (
    <div
      role="columnheader"
      aria-sort={ariaSort}
      aria-label={ariaLabel}
      tabIndex={0}
      className={cn(S.cell, className)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <span className={S.content}>
        {children}
        <SortIndicator direction={direction} />
      </span>
    </div>
  )
}
