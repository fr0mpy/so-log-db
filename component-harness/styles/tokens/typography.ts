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

/**
 * Responsive typography tokens - mobile-first breakpoint-aware text sizing.
 * Prevents overly large text on small screens.
 */
export const ResponsiveTypography = {
  // Page heading: scales from 2xl to 4xl
  heading: 'text-2xl md:text-3xl lg:text-4xl',

  // Section heading: scales from lg to 2xl
  subheading: 'text-lg md:text-xl lg:text-2xl',

  // Component title in gallery
  componentTitle: 'text-xl md:text-2xl',

  // Body text that scales slightly
  bodyLg: 'text-base md:text-lg',
} as const
