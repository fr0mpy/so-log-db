'use client'

import { cn } from '@stackone-ui/core/utils'
import type { SortDirection } from '../../app/logs/_lib'
import { SortIndicatorStyles as S } from './styles'

interface SortIndicatorProps {
  /** Current sort direction for this column */
  direction: SortDirection
}

/**
 * Visual indicator showing sort state.
 *
 * - Ascending: chevron pointing up
 * - Descending: chevron pointing down
 * - Unsorted: subtle up-down chevron (appears on hover)
 */
export function SortIndicator({ direction }: SortIndicatorProps) {
  const isActive = direction !== null
  const iconClass = cn(S.base, isActive ? S.active : S.inactive)

  if (direction === 'asc') {
    return (
      <svg
        className={iconClass}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    )
  }

  if (direction === 'desc') {
    return (
      <svg
        className={iconClass}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    )
  }

  // Unsorted: show up-down indicator on hover
  return (
    <svg
      className={iconClass}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l5 5 5-5M7 8l5-5 5 5" />
    </svg>
  )
}
