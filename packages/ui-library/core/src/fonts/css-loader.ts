/**
 * CSS-based font loading for non-Next.js environments (Vite, etc.).
 * Generates CSS for Google Fonts with fallback metric adjustments.
 *
 * @example
 * // In harness or Vite app entry point
 * import { injectFontStyles, injectFontLinks } from '@stackone-ui/core/fonts/css-loader'
 *
 * // Inject styles on app init
 * injectFontStyles()
 * injectFontLinks()
 */

import {
  FONT_CONFIG,
  FONT_FAMILIES,
  buildGoogleFontsUrl,
  getPreconnectLinks,
  type FontFamilyConfig,
} from './config'
import { generateFallbackFontFace, buildFontStack } from './schema'

// =============================================================================
// CSS Generation
// =============================================================================

/**
 * Generates the complete font CSS including:
 * - Fallback @font-face rules with metric adjustments
 * - CSS variable definitions
 */
export function generateFontCSS(
  families: Record<string, FontFamilyConfig> = FONT_FAMILIES
): string {
  // Generate fallback font faces
  const fallbackFaces = Object.values(families)
    .map((f) => generateFallbackFontFace(f.name))
    .filter(Boolean)
    .join('\n\n')

  // Generate CSS variables
  const cssVars = Object.entries(families)
    .map(([, font]) => {
      const stack = buildFontStack(font.name, font.fallback)
      return `  ${font.variable}: ${stack};`
    })
    .join('\n')

  return `
/* Font Fallbacks with Metric Adjustments */
${fallbackFaces}

/* Font CSS Variables */
:root {
${cssVars}
}
`.trim()
}

// =============================================================================
// DOM Injection (Browser Only)
// =============================================================================

const STYLE_ID = 'stackone-fonts'
const PRECONNECT_CLASS = 'stackone-font-preconnect'
const STYLESHEET_ID = 'stackone-google-fonts'

/**
 * Injects font CSS into the document head.
 * Safe to call multiple times (idempotent).
 */
export function injectFontStyles(
  families: Record<string, FontFamilyConfig> = FONT_FAMILIES
): void {
  if (typeof document === 'undefined') return

  // Remove existing if present
  const existing = document.getElementById(STYLE_ID)
  if (existing) existing.remove()

  const style = document.createElement('style')
  style.id = STYLE_ID
  style.textContent = generateFontCSS(families)
  document.head.appendChild(style)
}

/**
 * Injects preconnect and Google Fonts stylesheet links.
 * Safe to call multiple times (idempotent).
 */
export function injectFontLinks(
  families: Record<string, FontFamilyConfig> = FONT_FAMILIES,
  config = FONT_CONFIG
): void {
  if (typeof document === 'undefined') return

  // Remove existing preconnects
  document
    .querySelectorAll(`.${PRECONNECT_CLASS}`)
    .forEach((el) => el.remove())

  // Remove existing stylesheet
  const existingSheet = document.getElementById(STYLESHEET_ID)
  if (existingSheet) existingSheet.remove()

  // Add preconnects
  for (const href of getPreconnectLinks()) {
    const link = document.createElement('link')
    link.rel = 'preconnect'
    link.href = href
    link.className = PRECONNECT_CLASS
    if (href.includes('gstatic')) {
      link.crossOrigin = 'anonymous'
    }
    document.head.appendChild(link)
  }

  // Add Google Fonts stylesheet
  const stylesheet = document.createElement('link')
  stylesheet.id = STYLESHEET_ID
  stylesheet.rel = 'stylesheet'
  stylesheet.href = buildGoogleFontsUrl(families, config)
  document.head.appendChild(stylesheet)
}

/**
 * Initializes fonts for browser environments.
 * Combines style injection and link injection.
 */
export function initializeFonts(
  families: Record<string, FontFamilyConfig> = FONT_FAMILIES,
  config = FONT_CONFIG
): void {
  injectFontStyles(families)
  injectFontLinks(families, config)
}

/**
 * Cleans up injected font styles and links.
 */
export function cleanupFonts(): void {
  if (typeof document === 'undefined') return

  document.getElementById(STYLE_ID)?.remove()
  document.getElementById(STYLESHEET_ID)?.remove()
  document.querySelectorAll(`.${PRECONNECT_CLASS}`).forEach((el) => el.remove())
}

// =============================================================================
// Font Loading State
// =============================================================================

/**
 * Returns a promise that resolves when all fonts are loaded.
 */
export function fontsReady(): Promise<void> {
  if (typeof document === 'undefined') {
    return Promise.resolve()
  }

  return document.fonts.ready.then(() => undefined)
}

/**
 * Checks if a specific font is loaded.
 */
export function isFontLoaded(fontFamily: string, weight = '400'): boolean {
  if (typeof document === 'undefined') return false

  return document.fonts.check(`${weight} 1em "${fontFamily}"`)
}
