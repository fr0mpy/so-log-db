/**
 * MFE Agent Toolkit Route Configuration
 *
 * Single source of truth for all routes within the agent-toolkit MFE.
 *
 * @example
 * import { Routes, BASE_PATH } from '@/routes'
 * <Link href={Routes.dashboard}>Dashboard</Link>
 * <Link href={Routes.logs.index}>Logs</Link>
 * <Link href={Routes.search}>Search</Link>
 */

/** Base path for this MFE (matches next.config.ts basePath) */
export const BASE_PATH = '/agent-toolkit'

export const Routes = {
  /** Dashboard page (home) */
  dashboard: '/',

  /** Logs section */
  logs: {
    index: '/logs',
    detail: (id: string | number) => `/logs/${id}` as const,
  },

  /** Search page */
  search: '/search',

  /** Explore page */
  explore: '/explore',
} as const

/** Type for route keys */
export type RouteKey = keyof typeof Routes
