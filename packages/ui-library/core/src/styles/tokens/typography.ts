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
  textXl: 'text-xl',
  text2xl: 'text-2xl',
  text3xl: 'text-3xl',
  text4xl: 'text-4xl',

  // Font weight
  fontNormal: 'font-normal',
  fontMedium: 'font-medium',
  fontSemibold: 'font-semibold',
  fontBold: 'font-bold',

  // Font family
  fontHeading: 'font-heading',
  fontBody: 'font-body',
  fontMono: 'font-mono',

  // Tracking (letter-spacing)
  trackingTight: 'tracking-tight',
  trackingNormal: 'tracking-normal',
  trackingWide: 'tracking-wide',

  // Leading (line-height)
  leadingNone: 'leading-none',
  leadingTight: 'leading-tight',
  leadingSnug: 'leading-snug',
  leadingNormal: 'leading-normal',
  leadingRelaxed: 'leading-relaxed',

  // Text align
  textLeft: 'text-left',
  textCenter: 'text-center',
  textRight: 'text-right',

  // Text colors (semantic)
  textForeground: 'text-foreground',
  textMuted: 'text-muted-foreground',
  textPrimary: 'text-primary',
  textDestructive: 'text-destructive',
  textSuccess: 'text-success',

  // Text transforms
  uppercase: 'uppercase',
  lowercase: 'lowercase',
  capitalize: 'capitalize',

  // Text modifiers
  truncate: 'truncate',
  italic: 'italic',
  underline: 'underline',

  // Placeholder
  placeholder: 'placeholder:text-muted-foreground',
} as const

/**
 * Responsive typography tokens - mobile-first breakpoint-aware text sizing.
 * Prevents overly large text on small screens.
 */
export const ResponsiveTypography = {
  // Semantic heading levels with mobile-first scaling
  h1: 'text-2xl md:text-3xl lg:text-4xl',
  h2: 'text-xl md:text-2xl lg:text-3xl',
  h3: 'text-lg md:text-xl lg:text-2xl',
  h4: 'text-base md:text-lg lg:text-xl',

  // Legacy aliases (kept for backward compatibility)
  heading: 'text-2xl md:text-3xl lg:text-4xl',
  subheading: 'text-lg md:text-xl lg:text-2xl',
  componentTitle: 'text-xl md:text-2xl',

  // Body text that scales slightly
  lead: 'text-lg md:text-xl',
  bodyLg: 'text-base md:text-lg',
} as const
