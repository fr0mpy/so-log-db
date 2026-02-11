/**
 * Typography tokens - text styles used across components.
 * Usage: Typography.textSm, Typography.fontMedium
 */

export const Typography = {
  // Font size
  textXs: 'text-xs',
  textSm: 'text-sm',
  textBase: 'text-base',
  textLg: 'text-lg',

  // Font weight
  fontMedium: 'font-medium',
  fontSemibold: 'font-semibold',

  // Font family
  fontHeading: 'font-heading',
  fontBody: 'font-body',

  // Tracking
  trackingWide: 'tracking-wide',

  // Leading
  leadingNone: 'leading-none',

  // Text align
  textCenter: 'text-center',

  // Text colors (semantic)
  textForeground: 'text-foreground',
  textMuted: 'text-muted-foreground',
  textPrimary: 'text-primary',
  textDestructive: 'text-destructive',
  textSuccess: 'text-success',

  // Placeholder
  placeholder: 'placeholder:text-muted-foreground',
} as const
