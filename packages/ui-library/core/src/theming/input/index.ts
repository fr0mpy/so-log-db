/**
 * Theme Input Registry
 *
 * Source of truth for all theme definitions.
 * These TypeScript files are used to generate CSS output.
 *
 * Run: pnpm --filter @stackone-ui/core build:theme-css
 */

// Base theme (structural tokens: spacing, radius, shadows, motion, z-index)
export { baseTheme, type BaseTheme } from './base-theme'

// Brand themes (visual tokens: colors, typography)
export { stackoneGreen } from './stackone-green'

/**
 * Available brand names.
 * Update this array when adding new brands.
 */
export const BRAND_NAMES = ['stackone-green'] as const

/**
 * Type-safe brand name.
 */
export type BrandName = (typeof BRAND_NAMES)[number]
