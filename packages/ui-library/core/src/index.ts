'use client'

/**
 * stackone-ui - Component library for StackOne projects
 *
 * @example
 * import { Button, Dialog, useControlledState, cn } from 'stackone-ui'
 * import { ComponentHeight, TextHeight } from 'stackone-ui/styles'
 * import { SPRING, DURATION } from 'stackone-ui/config'
 */

// =============================================================================
// Components
// =============================================================================
export * from './components'

// =============================================================================
// Hooks
// =============================================================================
export * from './hooks'

// =============================================================================
// Config
// =============================================================================
export * from './config'

// =============================================================================
// Styles - Tokens only (write raw Tailwind classes for IntelliSense support)
// =============================================================================
export {
  // Tokens
  SpacingTokens,
  ResponsiveSpacing,
  SizingTokens,
  TouchTarget,
  ComponentHeight,
  TextHeight,
  TypographyTokens,
  ResponsiveTypography,
  // Types
  type Breakpoint,
  type ResponsiveValue,
} from './styles'

// =============================================================================
// Providers
// =============================================================================
export * from './providers'

// =============================================================================
// Utils
// =============================================================================
export * from './utils'

