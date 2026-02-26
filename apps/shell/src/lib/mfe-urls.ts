/**
 * MFE URL configuration
 */
import {
  MFE_AGENT_TOOLKIT_URL,
  MFE_COMPONENT_LIBRARY_URL,
  MFE_DESIGN_REVIEW_URL,
} from './env'

/** MFE base paths (match Next.js basePath config) */
export const MFE_BASE_PATHS = {
  agentToolkit: '/agent-toolkit',
  componentLibrary: '/component-library',
  designReview: '/design-review',
} as const

/** MFE domain origins for preconnect hints */
export const MFE_ORIGINS = [
  new URL(MFE_AGENT_TOOLKIT_URL).origin,
  new URL(MFE_COMPONENT_LIBRARY_URL).origin,
  new URL(MFE_DESIGN_REVIEW_URL).origin,
] as const
