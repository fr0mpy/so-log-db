/**
 * SortableHeader Styles
 *
 * Co-located styles for sortable table header cells.
 */

export const SortableHeaderStyles = {
  /** Clickable header cell with hover and focus states */
  cell: [
    'py-3 whitespace-nowrap',
    'cursor-pointer select-none',
    'hover:bg-muted/10',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary',
    'group',
    'flex items-center',
  ].join(' '),

  /** Content wrapper for text + icon */
  content: 'flex items-center',
} as const

export const SortIndicatorStyles = {
  /** Base icon styles */
  base: 'w-4 h-4 ml-1 inline-block transition-colors',

  /** Active sort indicator - visible, uses primary color */
  active: 'text-primary',

  /** Inactive sort indicator - subtle, appears on hover */
  inactive: 'text-muted-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity',
} as const
