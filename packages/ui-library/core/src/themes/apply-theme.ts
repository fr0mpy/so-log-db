/**
 * Theme application utilities.
 * Converts theme JSON to CSS custom properties and injects into DOM.
 */

import type { BaseTheme, BrandTheme, ThemeMode } from './schema'

// =============================================================================
// Types
// =============================================================================

export interface ApplyThemeOptions {
  /** Target element for CSS vars. Defaults to document.documentElement */
  target?: HTMLElement
  /** Current theme mode. Defaults to 'light' */
  mode?: ThemeMode
}

// =============================================================================
// CSS Variable Injection
// =============================================================================

function setVar(element: HTMLElement, name: string, value: string): void {
  element.style.setProperty(`--${name}`, value)
}

function removeVar(element: HTMLElement, name: string): void {
  element.style.removeProperty(`--${name}`)
}

// =============================================================================
// Base Theme Application
// =============================================================================

/**
 * Applies base theme (structural tokens) to the DOM.
 * Handles light/dark mode for shadows.
 */
export function applyBaseTheme(
  theme: BaseTheme,
  options: ApplyThemeOptions = {}
): void {
  const target = options.target ?? document.documentElement
  const mode = options.mode ?? 'light'

  // Spacing tokens
  for (const [key, value] of Object.entries(theme.spacing)) {
    setVar(target, `spacing-${key}`, value)
  }

  // Radius tokens
  for (const [key, value] of Object.entries(theme.radius)) {
    setVar(target, `radius-${key}`, value)
  }

  // Shadow tokens (mode-specific)
  const shadows = theme.shadow[mode]
  for (const [key, value] of Object.entries(shadows)) {
    setVar(target, `shadow-${key}`, value)
  }

  // Motion tokens
  for (const [key, value] of Object.entries(theme.motion)) {
    setVar(target, `motion-${key}`, value)
  }

  // Z-index tokens
  for (const [key, value] of Object.entries(theme.zIndex)) {
    setVar(target, `z-${key}`, value)
  }
}

// =============================================================================
// Brand Theme Application
// =============================================================================

/**
 * Applies brand theme (visual tokens) to the DOM.
 * Handles light/dark mode for colors.
 */
export function applyBrandTheme(
  theme: BrandTheme,
  options: ApplyThemeOptions = {}
): void {
  const target = options.target ?? document.documentElement
  const mode = options.mode ?? 'light'

  // Color tokens (mode-specific)
  const colors = theme.color[mode]
  for (const [key, value] of Object.entries(colors)) {
    setVar(target, `color-${key}`, value)
  }

  // Font tokens
  for (const [key, value] of Object.entries(theme.font)) {
    setVar(target, `font-${key}`, value)
  }
}

// =============================================================================
// Theme Clearing
// =============================================================================

/** Prefixes used by the theme system */
const THEME_PREFIXES = [
  'spacing-',
  'radius-',
  'shadow-',
  'motion-',
  'z-',
  'color-',
  'font-',
] as const

/**
 * Clears all theme CSS variables from the target element.
 */
export function clearTheme(target?: HTMLElement): void {
  const element = target ?? document.documentElement
  const style = element.style

  // Iterate through all properties and remove theme vars
  const propsToRemove: string[] = []

  for (let i = 0; i < style.length; i++) {
    const prop = style[i]
    if (prop.startsWith('--') && THEME_PREFIXES.some(p => prop.startsWith(`--${p}`))) {
      propsToRemove.push(prop)
    }
  }

  propsToRemove.forEach(prop => removeVar(element, prop.slice(2)))
}

/**
 * Clears only brand theme CSS variables (colors, fonts).
 * Preserves base theme (spacing, shadows, etc.).
 */
export function clearBrandTheme(target?: HTMLElement): void {
  const element = target ?? document.documentElement
  const style = element.style
  const brandPrefixes = ['color-', 'font-']

  const propsToRemove: string[] = []

  for (let i = 0; i < style.length; i++) {
    const prop = style[i]
    if (prop.startsWith('--') && brandPrefixes.some(p => prop.startsWith(`--${p}`))) {
      propsToRemove.push(prop)
    }
  }

  propsToRemove.forEach(prop => removeVar(element, prop.slice(2)))
}

// =============================================================================
// Mode Switching
// =============================================================================

/**
 * Updates theme for a mode change (light/dark).
 * Re-applies mode-specific tokens (shadows, colors).
 */
export function updateThemeMode(
  baseTheme: BaseTheme,
  brandTheme: BrandTheme,
  mode: ThemeMode,
  target?: HTMLElement
): void {
  const element = target ?? document.documentElement

  // Update shadow tokens
  const shadows = baseTheme.shadow[mode]
  for (const [key, value] of Object.entries(shadows)) {
    setVar(element, `shadow-${key}`, value)
  }

  // Update color tokens
  const colors = brandTheme.color[mode]
  for (const [key, value] of Object.entries(colors)) {
    setVar(element, `color-${key}`, value)
  }
}
