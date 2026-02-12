'use client'

/**
 * stackone-ui - Component library for StackOne projects
 *
 * @example
 * import { Button, Dialog, useControlledState, cn } from 'stackone-ui'
 * import { Form, Layout } from 'stackone-ui/styles'
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
// Styles (selective exports to avoid conflicts with component names)
// Use Form.Input, Layout.Flex, Control.Slider, etc. for style patterns
// =============================================================================
export {
  // Main namespaces
  Form,
  Layout,
  Interactive,
  Overlay,
  Control,
  Feedback,
  Patterns,
  // Tokens
  SpacingTokens,
  ResponsiveSpacing,
  SizingTokens,
  TouchTarget,
  TypographyTokens,
  ResponsiveTypography,
  // Motion
  Motion,
  MotionVariants,
  MotionTransition,
  // Responsive utilities
  responsiveClasses,
  getResponsiveClasses,
  resolveResponsiveValue,
  isResponsiveObject,
  // Types
  type MotionVariant,
  type Breakpoint,
  type ResponsiveValue,
  type BadgeVariant,
  type AlertVariant,
} from './styles'

// =============================================================================
// Providers
// =============================================================================
export * from './providers'

// =============================================================================
// Utils
// =============================================================================
export * from './utils'

