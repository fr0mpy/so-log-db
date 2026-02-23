/**
 * Font system for StackOne UI.
 *
 * Provides configurable font loading with:
 * - Fallback metrics for CLS prevention
 * - Next.js support
 * - Namespace pattern for consistent access
 *
 * @example
 * // Access font config
 * import { Font, FONT_FAMILIES } from '@stackone-ui/core/fonts'
 *
 * // Use namespace
 * const fontStack = Font.Sans.family  // Full stack with fallbacks
 * const cssVar = Font.Mono.variable   // '--font-mono'
 *
 * // For Next.js apps, import loader separately
 * import { fontSans, fontMono, fontVariables } from '@stackone-ui/core/fonts/next-loader'
 */

// =============================================================================
// Configuration (from next-loader)
// =============================================================================

export { FONT_FAMILIES, type FontKey } from './next-loader'

// =============================================================================
// Schema & Metrics
// =============================================================================

export { buildFontStack, type FontMetrics, type FontFallbackConfig } from './schema'

// =============================================================================
// Font Namespace
// =============================================================================

import { FONT_FAMILIES } from './next-loader'
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
    /** CSS variable name (e.g., '--font-sans') */
    variable: FONT_FAMILIES.sans.variable,
    /** Full font-family stack with fallbacks */
    family: buildFontStack(FONT_FAMILIES.sans.name, FONT_FAMILIES.sans.fallback),
    /** Font family name */
    name: FONT_FAMILIES.sans.name,
    /** Weights available */
    weights: FONT_FAMILIES.sans.weights,
  },
  Mono: {
    /** CSS variable name (e.g., '--font-mono') */
    variable: FONT_FAMILIES.mono.variable,
    /** Full font-family stack with fallbacks */
    family: buildFontStack(FONT_FAMILIES.mono.name, FONT_FAMILIES.mono.fallback),
    /** Font family name */
    name: FONT_FAMILIES.mono.name,
    /** Weights available */
    weights: FONT_FAMILIES.mono.weights,
  },
} as const
