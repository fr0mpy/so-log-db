/**
 * Theme system for StackOne UI.
 *
 * Two-tier architecture:
 * - Base theme: Structural tokens (spacing, shadows, motion, z-index) — static CSS file
 * - Brand theme: Visual tokens (colors, fonts) — fetched JSON, injected via JS
 *
 * @example
 * // In layout.tsx, import the base theme CSS
 * import '@stackone-ui/core/themes/base.css'
 *
 * // Brand theme is loaded by ThemeProvider
 * <ThemeProvider brandThemeUrl="/themes/brand.json">
 *   {children}
 * </ThemeProvider>
 *
 * // Or manually apply brand theme
 * const { theme } = validateBrandTheme(fetchedJson)
 * applyBrandTheme(theme)
 */

// Schema and types
export {
  BRAND_THEME_SCHEMA,
  type BrandTheme,
  type ThemeMode,
  type TokenDefinition,
} from './schema'

// Validation
export { validateBrandTheme, logWarnings, type ValidationResult } from './validate-theme'

// Application (brand theme only — base theme is now in CSS)
export { applyBrandTheme, clearBrandTheme } from './apply-theme'

// Logger
export { themeLogger } from './logger'

// Backwards compatibility: re-export base tokens for programmatic access
export { baseTokens as defaultBaseTheme } from '../tokens/base.tokens'

// Note: base.css should be imported directly in app layouts
// import '@stackone-ui/core/themes/base.css'
