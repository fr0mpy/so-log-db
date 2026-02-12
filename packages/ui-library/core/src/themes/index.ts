/**
 * Theme system for StackOne UI.
 *
 * Two-tier architecture:
 * - Base theme: Structural tokens (spacing, shadows, motion, z-index)
 * - Brand theme: Visual tokens (colors, typography)
 *
 * @example
 * import {
 *   defaultBaseTheme,
 *   applyBaseTheme,
 *   applyBrandTheme,
 *   validateBrandTheme,
 * } from '@stackone-ui/core/themes'
 *
 * // Apply base theme on app init
 * applyBaseTheme(defaultBaseTheme)
 *
 * // Load and apply brand theme
 * const { theme, warnings } = validateBrandTheme(fetchedTheme)
 * logWarnings(warnings, 'stackone-green')
 * applyBrandTheme(theme)
 */

// Schema and types
export {
  BASE_THEME_SCHEMA,
  BRAND_THEME_SCHEMA,
  extractFallbacks,
  type BaseTheme,
  type BrandTheme,
  type ThemeMode,
  type TokenDefinition,
} from './schema'

// Validation
export {
  validateBaseTheme,
  validateBrandTheme,
  logWarnings,
  type ValidationResult,
} from './validate-theme'

// Application
export {
  applyBaseTheme,
  applyBrandTheme,
  clearTheme,
  clearBrandTheme,
  updateThemeMode,
  type ApplyThemeOptions,
} from './apply-theme'

// Logger
export { themeLogger, configureLogger } from './logger'

// Default base theme
import baseThemeJson from './base.json'
import type { BaseTheme } from './schema'

export const defaultBaseTheme: BaseTheme = baseThemeJson as BaseTheme
