/**
 * Theming system for StackOne UI.
 *
 * Two-tier architecture:
 * - Base theme: Structural tokens (spacing, shadows, motion, z-index)
 * - Brand theme: Visual tokens (colors, fonts)
 *
 * Source files in `input/` generate CSS in `output/`.
 * Run: pnpm --filter @stackone-ui/core build:theme-css
 *
 * @example
 * // In layout.tsx
 * import '@stackone-ui/core/theming/output/base.css'
 * import '@stackone-ui/core/theming/output/stackone-green.css'
 * import { ThemeInitScript } from '@stackone-ui/core/providers/server'
 *
 * <head>
 *   <ThemeInitScript />
 * </head>
 */

// Re-export from input (TypeScript source of truth)
export {
  baseTheme,
  type BaseTheme,
  stackoneGreen,
  BRAND_NAMES,
  type BrandName,
} from './input'

// Re-export ThemeMode type from providers for convenience
export type { ThemeMode } from '../providers/theme-cookie'
