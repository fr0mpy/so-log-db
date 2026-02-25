/**
 * Environment configuration for shell app
 *
 * Centralizes environment variable access with fallbacks
 */

import type { BrandName } from '@stackone-ui/core/theming'

/**
 * MFE URLs for Multi-Zone routing
 */
export const MFE_AGENT_TOOLKIT_URL =
  process.env.MFE_AGENT_TOOLKIT_URL || 'https://stackone-agent-toolkit.vercel.app'
export const MFE_COMPONENT_LIBRARY_URL =
  process.env.MFE_COMPONENT_LIBRARY_URL || 'https://stackone-component-library.vercel.app'
export const MFE_DESIGN_REVIEW_URL =
  process.env.MFE_DESIGN_REVIEW_URL || 'https://stackone-design-review.vercel.app'

/**
 * Default brand theme for the application
 * TypeScript validates against available brand names at compile time.
 */
export const DEFAULT_BRAND_THEME: BrandName =
  (process.env.BRAND_THEME as BrandName) || 'stackone-green'

/**
 * Development port
 */
export const PORT = 3000
