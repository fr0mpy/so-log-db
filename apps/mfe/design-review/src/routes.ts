/**
 * Design Review MFE Route Configuration
 *
 * Single source of truth for all routes within the Design Review MFE.
 */

export const BASE_PATH = '/design-review'

export const Routes = {
  /** Design Review home page */
  index: '/',

  /** Shell home (cross-zone - use <a> not <Link>) */
  shell: {
    home: process.env.NEXT_PUBLIC_SHELL_URL || '/',
  },
} as const
