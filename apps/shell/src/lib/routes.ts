/**
 * Shell Application Route Configuration
 *
 * Routes for Multi-Zone MFE architecture.
 * Cross-zone routes require `<a>` tags (not `<Link>`).
 *
 * @example
 * import { Routes } from '@/lib/routes'
 * <a href={Routes.agentToolkit}>Agent Toolkit</a>
 */

export const Routes = {
  /** Shell home page */
  home: '/',

  /** Agent Toolkit MFE (cross-zone) - links directly to logs, skipping redirect */
  agentToolkit: '/agent-toolkit/logs',

  /** Component Library MFE (cross-zone) */
  componentLibrary: '/component-library',

  /** Design Review MFE (cross-zone) */
  designReview: '/design-review',

  /** GitHub repository (external) */
  github: 'https://github.com/fr0mpy/so-log-db',
} as const

/** Type for route keys */
export type RouteKey = keyof typeof Routes
