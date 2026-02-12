/**
 * AUTO-GENERATED FILE - DO NOT EDIT DIRECTLY
 *
 * Generated from config.ts by generate-next-loader.ts
 * Run: pnpm generate:fonts
 *
 * next/font requires literal values at build time, so we generate this file
 * from the canonical configuration in config.ts.
 */

import { Figtree, IBM_Plex_Mono } from 'next/font/google'

// =============================================================================
// Font Instances (generated from config.ts)
// =============================================================================

/**
 * Primary sans-serif font (Figtree).
 * Used for body text and headings.
 */
export const fontSans = Figtree({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
  adjustFontFallback: true,
  preload: true,
})

/**
 * Heading font (same as sans by default).
 */
export const fontHeading = fontSans

/**
 * Monospace font (IBM Plex Mono).
 * Used for code blocks and technical content.
 */
export const fontMono = IBM_Plex_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-code',
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
  heading: fontHeading.className,
  mono: fontMono.className,
} as const
