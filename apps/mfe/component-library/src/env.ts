/**
 * Environment configuration for Component Library MFE
 *
 * Type-safe environment variable access with fallbacks.
 */

import type { BrandName } from '@stackone-ui/core/theming'

/**
 * Shell URL for cross-zone navigation
 */
export const SHELL_URL = process.env.NEXT_PUBLIC_SHELL_URL || 'http://localhost:3000'

/**
 * Brand theme for this MFE
 * TypeScript validates against available brand names at compile time.
 */
export const BRAND_THEME: BrandName =
  (process.env.NEXT_PUBLIC_BRAND_THEME as BrandName) || 'stackone-green'
