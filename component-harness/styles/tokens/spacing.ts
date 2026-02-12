/**
 * Spacing tokens - all spacing values used across components.
 * Usage: Spacing.p4, Spacing.gap2, Spacing.mb2
 */

export const Spacing = {
  // Padding
  p0: 'p-0',
  p1: 'p-1',
  p2: 'p-2',
  p3: 'p-3',
  p4: 'p-4',
  p6: 'p-6',

  px2: 'px-2',
  px3: 'px-3',
  px4: 'px-4',
  px5: 'px-5',
  px6: 'px-6',

  py1: 'py-1',
  py2: 'py-2',
  py4: 'py-4',

  pt0: 'pt-0',
  pt2: 'pt-2',
  pt4: 'pt-4',

  pb4: 'pb-4',

  pl10: 'pl-10',
  pr10: 'pr-10',

  // Margin
  mt1: 'mt-1',
  mt2: 'mt-2',
  mb1: 'mb-1',
  mb2: 'mb-2',

  // Gap
  gap1: 'gap-1',
  gap2: 'gap-2',
  gap3: 'gap-3',

  // Space
  spaceY1: 'space-y-1',
  spaceY2: 'space-y-2',
} as const

/**
 * Responsive spacing tokens - mobile-first breakpoint-aware spacing.
 * Base (unprefixed) applies to all screens, prefixed applies at breakpoint and above.
 */
export const ResponsiveSpacing = {
  // Gallery/page padding: compact on mobile, roomier on larger screens
  galleryPadding: 'p-4 md:p-6 lg:p-8',

  // Card/panel padding: compact on mobile
  cardPadding: 'p-4 lg:p-6',

  // Section margins
  sectionMargin: 'mb-4 md:mb-6 lg:mb-8',

  // Stack/flex gaps: tighter on mobile
  stackGap: 'gap-2 md:gap-4',
  inlineGap: 'gap-2 md:gap-3',

  // Preview panel padding
  previewPadding: 'p-4 md:p-6 lg:p-8',
} as const
