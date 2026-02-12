/**
 * Font system for StackOne UI.
 *
 * Provides configurable font loading with:
 * - Fallback metrics for CLS prevention
 * - Next.js and Vite/CSS support
 * - Namespace pattern for consistent access
 *
 * @example
 * // Access font config
 * import { Font, FONT_FAMILIES } from '@stackone-ui/core/fonts'
 *
 * // Use namespace
 * const fontStack = Font.Sans.family
 * const cssVar = Font.Mono.variable
 *
 * // For Next.js apps, import loader separately
 * import { fontSans, fontVariables } from '@stackone-ui/core/fonts/next-loader'
 *
 * // For Vite apps
 * import { initializeFonts } from '@stackone-ui/core/fonts/css-loader'
 */

// =============================================================================
// Configuration
// =============================================================================

export {
  FONT_CONFIG,
  FONT_FAMILIES,
  buildGoogleFontsUrl,
  getPreconnectLinks,
  type FontConfig,
  type FontDisplay,
  type FontFamilyConfig,
  type FontKey,
} from './config'

// =============================================================================
// Schema & Metrics
// =============================================================================

export {
  FONT_METRICS,
  generateFallbackFontFace,
  generateAllFallbackFontFaces,
  buildFontStack,
  type FontMetrics,
  type FontFallbackConfig,
} from './schema'

// =============================================================================
// CSS Loader (for Vite/non-Next.js)
// =============================================================================

export {
  generateFontCSS,
  injectFontStyles,
  injectFontLinks,
  initializeFonts,
  cleanupFonts,
  fontsReady,
  isFontLoaded,
} from './css-loader'

// =============================================================================
// Font Namespace
// =============================================================================

import { FONT_FAMILIES } from './config'
import { buildFontStack } from './schema'

/**
 * Font namespace for consistent access across the codebase.
 * Follows the same pattern as Layout.*, Interactive.*, etc.
 *
 * @example
 * import { Font } from '@stackone-ui/core/fonts'
 *
 * // CSS variable
 * style={{ fontFamily: `var(${Font.Sans.variable})` }}
 *
 * // Full font stack
 * style={{ fontFamily: Font.Sans.family }}
 *
 * // Font name only
 * console.log(Font.Mono.name) // 'IBM Plex Mono'
 */
export const Font = {
  Sans: {
    /** CSS variable name (e.g., '--font-body') */
    variable: FONT_FAMILIES.sans.variable,
    /** Full font-family stack with fallbacks */
    family: buildFontStack(FONT_FAMILIES.sans.name, FONT_FAMILIES.sans.fallback),
    /** Font family name */
    name: FONT_FAMILIES.sans.name,
    /** Weights available */
    weights: FONT_FAMILIES.sans.weights,
  },
  Heading: {
    variable: FONT_FAMILIES.heading.variable,
    family: buildFontStack(FONT_FAMILIES.heading.name, FONT_FAMILIES.heading.fallback),
    name: FONT_FAMILIES.heading.name,
    weights: FONT_FAMILIES.heading.weights,
  },
  Mono: {
    variable: FONT_FAMILIES.mono.variable,
    family: buildFontStack(FONT_FAMILIES.mono.name, FONT_FAMILIES.mono.fallback),
    name: FONT_FAMILIES.mono.name,
    weights: FONT_FAMILIES.mono.weights,
  },
} as const
