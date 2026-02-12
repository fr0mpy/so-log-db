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
export const FONT_METRICS: Record<string, FontFallbackConfig> = {
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
// CSS Generation
// =============================================================================

/**
 * Generates @font-face CSS for a fallback font with metric adjustments.
 */
export function generateFallbackFontFace(
  fontName: string,
  fallbackName?: string
): string {
  const config = FONT_METRICS[fontName]
  if (!config) {
    // Unknown font - return empty (will use browser defaults)
    return ''
  }

  const { metrics, localFonts } = config
  const name = fallbackName ?? `${fontName} Fallback`
  const src = localFonts.map((f) => `local('${f}')`).join(', ')

  return `
@font-face {
  font-family: '${name}';
  src: ${src};
  size-adjust: ${metrics.sizeAdjust};
  ascent-override: ${metrics.ascentOverride};
  descent-override: ${metrics.descentOverride};
  line-gap-override: ${metrics.lineGapOverride};
}`.trim()
}

/**
 * Generates all fallback @font-face rules for the default font families.
 */
export function generateAllFallbackFontFaces(
  fontNames: string[] = ['Figtree', 'IBM Plex Mono']
): string {
  return fontNames
    .map((name) => generateFallbackFontFace(name))
    .filter(Boolean)
    .join('\n\n')
}

/**
 * Builds a font-family stack including the adjusted fallback.
 */
export function buildFontStack(fontName: string, fallback: string): string {
  const hasFallbackMetrics = fontName in FONT_METRICS
  const fallbackName = hasFallbackMetrics ? `'${fontName} Fallback', ` : ''
  return `'${fontName}', ${fallbackName}${fallback}`
}
