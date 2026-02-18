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
} as const
