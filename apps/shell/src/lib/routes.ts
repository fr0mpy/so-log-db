/**
 * Shell Application Route Configuration
 *
 * Single source of truth for all routes within the shell app.
 * Includes cross-zone routes to MFEs.
 *
 * @example
 * import { Routes } from '@/lib/routes'
 * <a href={Routes.agentToolkit}>Agent Toolkit MFE</a>
 */

export const Routes = {
  /** Shell home page */
  home: '/',

  /** Agent Toolkit MFE (cross-zone - use <a> not <Link>) */
  agentToolkit: '/agent-toolkit',

  /** Component Library MFE (cross-zone - use <a> not <Link>) */
  componentLibrary: '/component-library',
} as const

/** Type for route keys */
export type RouteKey = keyof typeof Routes
