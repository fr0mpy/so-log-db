/**
 * Pagination configuration - shared across log table and other paginated views.
 */

export const PAGINATION = {
  /** Default number of rows per page */
  defaultPageSize: 20,
  /** Available page size options */
  pageSizeOptions: [10, 20, 50, 100] as const,
} as const

export const TABLE = {
  /** Row height for virtualization (in pixels) */
  rowHeight: 52,
  /** Extra rows rendered above/below viewport for smooth scrolling */
  overscan: 5,
} as const

export const TOAST_DURATION = {
  /** Loading toast - stays until dismissed (0 = infinite) */
  loading: 0,
  /** Success notification duration (ms) */
  success: 3000,
  /** Error notification duration - longer for reading (ms) */
  error: 5000,
  /** Cleanup delay after toast removal (ms) */
  cleanup: 300,
} as const
