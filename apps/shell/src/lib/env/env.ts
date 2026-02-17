/**
 * Environment configuration for shell app
 *
 * Centralizes environment variable access with fallbacks
 */

/**
 * MFE URL for multi-zone routing
 * Falls back to localhost:3001 in development
 */
export const MFE_URL = process.env.MFE_URL || 'http://localhost:3001'

/**
 * Component Library MFE URL for multi-zone routing
 * Falls back to localhost:3002 in development
 */
export const COMPONENT_LIBRARY_URL = process.env.COMPONENT_LIBRARY_URL || 'http://localhost:3002'

/**
 * Default brand theme for the application
 * Can be overridden via environment variable or props
 */
export const DEFAULT_BRAND_THEME = process.env.BRAND_THEME || 'stackone-green'

/**
 * Default development ports
 */
export const PORTS = {
  shell: 3000,
  mfe: 3001,
  componentLibrary: 3002,
  harness: 5173,
} as const
