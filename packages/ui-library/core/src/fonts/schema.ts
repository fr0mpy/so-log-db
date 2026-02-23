/**
 * Font fallback metrics for CLS prevention.
 * These values adjust system fonts to match web font metrics,
 * minimizing layout shift when fonts swap.
 */

// =============================================================================
// Types
// =============================================================================

export interface FontMetrics {
  /** Scales the fallback font to match web font width */
  sizeAdjust: string
  /** Adjusts the ascender height */
  ascentOverride: string
  /** Adjusts the descender depth */
  descentOverride: string
  /** Adjusts line gap spacing */
  lineGapOverride: string
}

export interface FontFallbackConfig {
  /** Metrics to match web font */
  metrics: FontMetrics
  /** Local system fonts to use as fallback */
  localFonts: string[]
}

// =============================================================================
// Fallback Metrics
// =============================================================================

/**
 * Fallback font metrics per font family.
 * Values calculated to minimize CLS when swapping from system to web font.
 *
 * Note: These are approximations. For precise values, use tools like:
 * - https://screenspan.net/fallback
 * - https://meowni.ca/font-style-matcher/
 */
const FONT_METRICS: Record<string, FontFallbackConfig> = {
  // Figtree - geometric sans-serif, similar to system-ui
  Figtree: {
    metrics: {
      sizeAdjust: '105%',
      ascentOverride: '95%',
      descentOverride: '25%',
      lineGapOverride: '0%',
    },
    localFonts: ['Arial', 'Helvetica Neue', 'Helvetica'],
  },

  // Inter - widely used, well-documented metrics
  Inter: {
    metrics: {
      sizeAdjust: '107.64%',
      ascentOverride: '96.88%',
      descentOverride: '24.15%',
      lineGapOverride: '0%',
    },
    localFonts: ['Arial', 'Helvetica Neue', 'Helvetica'],
  },

  // IBM Plex Mono - monospace, match to Courier
  'IBM Plex Mono': {
    metrics: {
      sizeAdjust: '100%',
      ascentOverride: '88%',
      descentOverride: '24%',
      lineGapOverride: '0%',
    },
    localFonts: ['Courier New', 'Courier'],
  },

  // JetBrains Mono - popular coding font
  'JetBrains Mono': {
    metrics: {
      sizeAdjust: '98%',
      ascentOverride: '92%',
      descentOverride: '24%',
      lineGapOverride: '0%',
    },
    localFonts: ['Menlo', 'Monaco', 'Courier New'],
  },

  // Roboto - Android system font
  Roboto: {
    metrics: {
      sizeAdjust: '100%',
      ascentOverride: '92.77%',
      descentOverride: '24.41%',
      lineGapOverride: '0%',
    },
    localFonts: ['Arial', 'Helvetica'],
  },
} as const

// =============================================================================
// Font Stack Builder
// =============================================================================

/**
 * Builds a font-family stack including the adjusted fallback.
 */
export function buildFontStack(fontName: string, fallback: string): string {
  const hasFallbackMetrics = fontName in FONT_METRICS
  const fallbackName = hasFallbackMetrics ? `'${fontName} Fallback', ` : ''
  return `'${fontName}', ${fallbackName}${fallback}`
}
