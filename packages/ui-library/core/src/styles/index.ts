/**
 * Centralized style tokens for the UI library.
 *
 * This file exports only the primitive tokens that provide real value:
 * - Sizing tokens (WCAG 2.5.8 compliant touch targets)
 * - Spacing tokens (responsive spacing utilities)
 * - Typography tokens (text styles)
 * - Responsive utilities (breakpoint types)
 *
 * Pattern compositions (Layout.Flex.col, Interactive.Hover.ghost, etc.) have been
 * removed in favor of writing raw Tailwind classes directly in styles.ts files.
 * This enables Tailwind IntelliSense to work properly.
 *
 * @example
 * import { ComponentHeight, TextHeight } from '@stackone-ui/core/styles'
 *
 * export const SkeletonHeight = {
 *   input: ComponentHeight.input,    // WCAG-compliant 44px
 *   textSm: TextHeight.sm,           // Matches text-sm line-height
 * }
 */

// ============================================================================
// TOKEN EXPORTS (Primitives - provides WCAG compliance and consistency)
// ============================================================================

export { Spacing as SpacingTokens, ResponsiveSpacing } from './tokens/spacing'
export { Sizing as SizingTokens, TouchTarget, ComponentHeight, TextHeight } from './tokens/sizing'
export { Typography as TypographyTokens, ResponsiveTypography } from './tokens/typography'

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export { type Breakpoint, type ResponsiveValue } from './responsive'
