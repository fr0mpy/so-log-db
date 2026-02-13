/**
 * Shell Application Route Configuration
 *
 * Single source of truth for all routes within the shell app.
 * Includes cross-zone routes to MFEs.
 *
 * @example
 * import { Routes } from '@/lib/routes'
 * <a href={Routes.connectors}>Connectors MFE</a>
 */

export const Routes = {
  /** Shell home page */
  home: '/',

  /** Connectors MFE (cross-zone - use <a> not <Link>) */
  connectors: '/connectors',
} as const

/** Type for route keys */
export type RouteKey = keyof typeof Routes
