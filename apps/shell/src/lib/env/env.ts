/**
 * Environment configuration for shell app
 *
 * Centralizes environment variable access with fallbacks
 */

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
 * Can be overridden via environment variable or props
 */
export const DEFAULT_BRAND_THEME = process.env.BRAND_THEME || 'stackone-green'

/**
 * Development port
 */
export const PORT = 3000
