/**
 * Centralized style constants for component harness.
 * Uses namespace pattern for clean organization.
 *
 * @example
 * import { Form, Layout, Interactive, Overlay, Control, Feedback } from '../styles'
 * <input className={Form.Input.base} />
 * <div className={Layout.Flex.center} />
 */

// ============================================================================
// TOKEN EXPORTS (Primitives)
// ============================================================================

export { Spacing as SpacingTokens, ResponsiveSpacing } from './tokens/spacing'
export { Sizing as SizingTokens, TouchTarget } from './tokens/sizing'
export { Typography as TypographyTokens, ResponsiveTypography } from './tokens/typography'

// ============================================================================
// PATTERN EXPORTS (Compositions) - from patterns/ subdirectory
// ============================================================================

// Main namespaces
export {
  Form,
  Layout,
  Interactive,
  Overlay,
  Control,
  Feedback,
  Patterns,
} from './patterns'

// Sub-namespaces
export {
  Label,
  Input,
  NumberInput,
  Textarea,
  Helper,
  Stepper,
  getInputStyles,
  getHelperStyles,
} from './patterns'

export {
  Flex,
  Spacing,
  Position,
  Size,
  Responsive,
} from './patterns'

export {
  Transition,
  Focus,
  Disabled,
  Hover,
  Active,
  Cursor,
  Button,
  CloseButton,
} from './patterns'

export {
  Dialog,
  Drawer,
  Card,
  Paper,
} from './patterns'

export {
  Toggle,
  Slider,
} from './patterns'

export {
  Badge,
  Alert,
  type BadgeVariant,
  type AlertVariant,
} from './patterns'

// ============================================================================
// MOTION EXPORTS (Framer Motion presets)
// ============================================================================

export { Motion, Variants as MotionVariants, Transition as MotionTransition, type MotionVariant } from './motion'

// ============================================================================
// UTILITY EXPORTS
// ============================================================================

export {
  responsiveClasses,
  getResponsiveClasses,
  resolveResponsiveValue,
  isResponsiveObject,
  type Breakpoint,
  type ResponsiveValue,
} from './responsive'
