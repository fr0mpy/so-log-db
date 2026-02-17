/**
 * MFE Agent Toolkit Route Configuration
 *
 * Single source of truth for all routes within the agent-toolkit MFE.
 *
 * @example
 * import { Routes, BASE_PATH } from '@/routes'
 * <Link href={Routes.logs.index}>Logs</Link>
 */

/** Base path for this MFE (matches next.config.ts basePath) */
export const BASE_PATH = '/agent-toolkit'

export const Routes = {
  /** Logs section (default landing page) */
  logs: {
    index: '/logs',
    detail: (id: string | number) => `/logs/${id}` as const,
  },

  /** Search page */
  search: '/search',

  /** Explore page */
  explore: '/explore',

  /** Shell home (cross-zone - use <a> not <Link>) */
  shell: {
    home: '/',
  },
} as const

/** Type for route keys */
export type RouteKey = keyof typeof Routes
