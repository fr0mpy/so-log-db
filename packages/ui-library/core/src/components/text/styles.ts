import { TypographyTokens as Typography, ResponsiveTypography } from '../../styles'

/**
 * Text component styles following zero-inline-classnames pattern.
 * Headings (h1-h4) use responsive sizing by default.
 */
export const TextStyles = {
  variants: {
    // Responsive headings (auto-scale on breakpoints)
    h1: [
      ResponsiveTypography.h1,
      Typography.fontBold,
      Typography.leadingTight,
      Typography.fontHeading,
    ].join(' '),
    h2: [
      ResponsiveTypography.h2,
      Typography.fontSemibold,
      Typography.leadingTight,
      Typography.fontHeading,
    ].join(' '),
    h3: [
      ResponsiveTypography.h3,
      Typography.fontSemibold,
      Typography.leadingSnug,
      Typography.fontHeading,
    ].join(' '),
    h4: [
      ResponsiveTypography.h4,
      Typography.fontSemibold,
      Typography.leadingSnug,
      Typography.fontHeading,
    ].join(' '),

    // Fixed-size headings
    h5: [
      Typography.textLg,
      Typography.fontMedium,
      Typography.leadingNormal,
      Typography.fontHeading,
    ].join(' '),
    h6: [
      Typography.textBase,
      Typography.fontMedium,
      Typography.leadingNormal,
      Typography.fontHeading,
    ].join(' '),

    // Body text
    lead: [ResponsiveTypography.lead, Typography.leadingRelaxed, Typography.fontBody].join(' '),
    body1: [Typography.textBase, Typography.leadingRelaxed, Typography.fontBody].join(' '),
    body2: [Typography.textSm, Typography.leadingRelaxed, Typography.fontBody].join(' '),
    subtitle: [Typography.textSm, Typography.fontMedium, Typography.leadingNormal].join(' '),
    caption: [Typography.textXs, Typography.leadingNormal].join(' '),
    overline: [
      Typography.textXs,
      Typography.fontMedium,
      Typography.trackingWide,
      Typography.uppercase,
    ].join(' '),

    // Utility variants
    code: [Typography.textSm, Typography.fontMono, 'bg-muted px-1.5 py-0.5 rounded'].join(' '),
    kbd: [
      Typography.textXs,
      Typography.fontMono,
      Typography.fontMedium,
      'px-1.5 py-0.5 bg-muted border border-border rounded shadow-sm',
    ].join(' '),
  },

  colors: {
    foreground: Typography.textForeground,
    muted: Typography.textMuted,
    primary: Typography.textPrimary,
    destructive: Typography.textDestructive,
    success: Typography.textSuccess,
  },

  weights: {
    normal: Typography.fontNormal,
    medium: Typography.fontMedium,
    semibold: Typography.fontSemibold,
    bold: Typography.fontBold,
  },

  aligns: {
    left: Typography.textLeft,
    center: Typography.textCenter,
    right: Typography.textRight,
  },

  modifiers: {
    truncate: Typography.truncate,
    italic: Typography.italic,
    underline: Typography.underline,
  },

  lineClamps: {
    1: 'line-clamp-1',
    2: 'line-clamp-2',
    3: 'line-clamp-3',
    4: 'line-clamp-4',
    5: 'line-clamp-5',
    6: 'line-clamp-6',
  },
} as const
