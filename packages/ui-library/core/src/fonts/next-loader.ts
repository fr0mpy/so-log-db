/**
 * Font loader for Next.js apps.
 *
 * next/font requires literal values at build time.
 * Edit this file directly to change fonts.
 */

import { Inter, IBM_Plex_Mono } from 'next/font/google'

// =============================================================================
// Font Configuration
// =============================================================================

/**
 * Font family definitions.
 * Used by the Font namespace in index.ts.
 */
export const FONT_FAMILIES = {
  sans: {
    name: 'Inter',
    weights: [400, 500, 600, 700] as const,
    variable: '--font-sans',
    fallback: 'ui-sans-serif, system-ui, -apple-system, sans-serif',
  },
  mono: {
    name: 'IBM Plex Mono',
    weights: [400, 500] as const,
    variable: '--font-mono',
    fallback: 'ui-monospace, SFMono-Regular, Menlo, monospace',
  },
} as const

export type FontKey = keyof typeof FONT_FAMILIES

// =============================================================================
// Font Instances
// =============================================================================

/**
 * Primary sans-serif font (Inter).
 * Used for body text and headings.
 */
export const fontSans = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
  adjustFontFallback: true,
  preload: true,
})

/**
 * Monospace font (IBM Plex Mono).
 * Used for code blocks and technical content.
 */
export const fontMono = IBM_Plex_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['400', '500'],
  adjustFontFallback: true,
  preload: true,
})

// =============================================================================
// Combined Exports
// =============================================================================

/**
 * Combined CSS variable classes for all fonts.
 * Apply to <html> element to make CSS variables available.
 */
export const fontVariables = `${fontSans.variable} ${fontMono.variable}`

/**
 * Font class names for direct application.
 */
export const fontClassNames = {
  sans: fontSans.className,
  mono: fontMono.className,
} as const
