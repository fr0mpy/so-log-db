/**
 * Font configuration for StackOne UI.
 * Configurable per-brand, similar to color tokens.
 */

// =============================================================================
// Types
// =============================================================================

export type FontDisplay = 'auto' | 'block' | 'swap' | 'fallback' | 'optional'

export interface FontFamilyConfig {
  /** Font family name (e.g., 'Figtree', 'Inter') */
  name: string
  /** Font weights to load */
  weights: readonly number[]
  /** CSS variable name */
  variable: string
  /** System fallback stack */
  fallback: string
  /** Google Fonts family parameter (may differ from name) */
  googleFamily?: string
}

export interface FontConfig {
  /** font-display strategy */
  display: FontDisplay
  /** Character subsets to load */
  subsets: readonly string[]
  /** Whether to preload fonts */
  preload: boolean
}

// =============================================================================
// Default Configuration
// =============================================================================

/**
 * Global font loading configuration.
 * Change `display` to 'optional' for zero CLS (uses system font if not cached).
 */
export const FONT_CONFIG: FontConfig = {
  display: 'swap',
  subsets: ['latin'],
  preload: true,
} as const

/**
 * Font family definitions.
 * These define the LOADED fonts (--font-sans, --font-mono).
 * Theme system maps these to semantic tokens (--font-body, --font-heading, --font-code).
 */
export const FONT_FAMILIES = {
  sans: {
    name: 'Inter',
    weights: [400, 500, 600, 700] as const,
    variable: '--font-sans',
    fallback: 'ui-sans-serif, system-ui, -apple-system, sans-serif',
    googleFamily: 'Inter',
  },
  mono: {
    name: 'IBM Plex Mono',
    weights: [400, 500] as const,
    variable: '--font-mono',
    fallback: 'ui-monospace, SFMono-Regular, Menlo, monospace',
    googleFamily: 'IBM+Plex+Mono',
  },
} as const satisfies Record<string, FontFamilyConfig>

export type FontKey = keyof typeof FONT_FAMILIES

// =============================================================================
// Google Fonts URL Builder
// =============================================================================

/**
 * Builds Google Fonts URL from font configuration.
 * Used by Vite/harness environments that can't use next/font.
 */
export function buildGoogleFontsUrl(
  families: Record<string, FontFamilyConfig> = FONT_FAMILIES,
  config: FontConfig = FONT_CONFIG
): string {
  const params = Object.values(families)
    // Dedupe by googleFamily name
    .reduce((acc, font) => {
      const key = font.googleFamily ?? font.name.replace(/\s+/g, '+')
      if (!acc.has(key)) {
        acc.set(key, font.weights)
      } else {
        // Merge weights if same font used for multiple purposes
        const existing = acc.get(key)!
        const merged = [...new Set([...existing, ...font.weights])].sort((a, b) => a - b)
        acc.set(key, merged as unknown as readonly number[])
      }
      return acc
    }, new Map<string, readonly number[]>())

  const familyParams = Array.from(params.entries())
    .map(([family, weights]) => `family=${family}:wght@${weights.join(';')}`)
    .join('&')

  return `https://fonts.googleapis.com/css2?${familyParams}&display=${config.display}`
}

/**
 * Generates preconnect link tags for Google Fonts.
 */
export function getPreconnectLinks(): string[] {
  return [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
  ]
}
