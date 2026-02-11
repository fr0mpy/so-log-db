/**
 * Shared styles for feedback components (Badge, Alert).
 * These components share nearly identical variant shadow patterns.
 */

/** Feedback variant styles combining background, text color, and neumorphic shadow */
export const FEEDBACK_VARIANTS = {
  primary: 'bg-primary text-primary-foreground shadow-neu-badge-primary',
  secondary: 'bg-secondary text-secondary-foreground shadow-neu-badge-secondary',
  destructive: 'bg-destructive text-destructive-foreground shadow-neu-badge-destructive',
  success: 'bg-success text-success-foreground shadow-neu-badge-success',
  warning: 'bg-warning text-warning-foreground shadow-neu-badge-warning',
  info: 'bg-info text-info-foreground shadow-neu-badge-info',
  outline: 'bg-neu-base text-foreground shadow-neu-raised-sm',
} as const

export type FeedbackVariant = keyof typeof FEEDBACK_VARIANTS

/** Alert-specific variants (subset without outline) */
export const ALERT_VARIANTS = {
  info: `${FEEDBACK_VARIANTS.info} border-transparent`,
  success: `${FEEDBACK_VARIANTS.success} border-transparent`,
  warning: `${FEEDBACK_VARIANTS.warning} border-transparent`,
  destructive: `${FEEDBACK_VARIANTS.destructive} border-transparent`,
} as const

export type AlertVariant = keyof typeof ALERT_VARIANTS
