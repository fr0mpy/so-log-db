/**
 * Brand theme application utilities.
 *
 * Injects brand theme (colors, fonts) as a <style> tag in the document head.
 * Both light and dark values are injected at once, so dark mode toggle
 * only requires adding/removing the .dark class — no JS re-injection needed.
 *
 * Base theme (spacing, radius, shadows, motion, z-index) is now a static
 * CSS file (base.css) that should be imported in app layouts.
 */

import type { BrandTheme } from './schema'

// =============================================================================
// Constants
// =============================================================================

const BRAND_STYLE_ID = 'brand-theme'

// =============================================================================
// Brand Theme Application
// =============================================================================

/**
 * Applies brand theme (colors, fonts) by injecting a <style> tag.
 *
 * Injects both :root (light) and .dark values at once, so dark mode
 * toggle is handled purely by CSS class — no re-injection needed.
 */
export function applyBrandTheme(theme: BrandTheme): void {
  let style = document.getElementById(BRAND_STYLE_ID) as HTMLStyleElement | null

  if (!style) {
    style = document.createElement('style')
    style.id = BRAND_STYLE_ID
    document.head.appendChild(style)
  }

  // Generate CSS variable declarations
  const lightColors = Object.entries(theme.color.light)
    .map(([key, value]) => `--color-${key}: ${value};`)
    .join('\n    ')

  const darkColors = Object.entries(theme.color.dark)
    .map(([key, value]) => `--color-${key}: ${value};`)
    .join('\n    ')

  const fonts = Object.entries(theme.font)
    .map(([key, value]) => `--font-${key}: ${value};`)
    .join('\n    ')

  // Inject both light and dark values at once
  style.textContent = `
  /* Brand Theme - Injected by applyBrandTheme() */
  :root {
    /* Colors (Light Mode) */
    ${lightColors}

    /* Fonts */
    ${fonts}
  }

  .dark {
    /* Colors (Dark Mode) */
    ${darkColors}
  }
`
}

// =============================================================================
// Theme Clearing
// =============================================================================

/**
 * Removes the brand theme <style> tag.
 * Useful when switching to a different brand theme.
 */
export function clearBrandTheme(): void {
  document.getElementById(BRAND_STYLE_ID)?.remove()
}
