/**
 * MFE URL configuration for prefetching
 */
import {
  MFE_AGENT_TOOLKIT_URL,
  MFE_COMPONENT_LIBRARY_URL,
  MFE_DESIGN_REVIEW_URL,
} from './env'

/** MFE domain origins for preconnect hints */
export const MFE_ORIGINS = [
  new URL(MFE_AGENT_TOOLKIT_URL).origin,
  new URL(MFE_COMPONENT_LIBRARY_URL).origin,
  new URL(MFE_DESIGN_REVIEW_URL).origin,
] as const

/**
 * MFE routes that should be prefetched.
 * Uses shell routes (not direct MFE URLs) so browser cache
 * matches the actual navigation URL after rewrite.
 */
export const MFE_ROUTES = new Set([
  '/agent-toolkit',
  '/component-library',
  '/design-review',
])
