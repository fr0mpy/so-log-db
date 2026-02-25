/**
 * Loading State Styles
 *
 * Follows zero-inline-classnames pattern for loading.tsx files.
 */

/**
 * Note: min-h-[50vh] is an arbitrary value because Tailwind doesn't provide
 * a 50% viewport height token. This provides a reasonable loading container
 * height without taking up the full screen.
 */
export const LoadingStyles = {
  /** Full-page centered loading container (50vh min-height for visible loading state) */
  page: 'flex items-center justify-center min-h-[50vh]',

  /** Spinning refresh icon animation */
  spinning: 'animate-spin',
} as const

/**
 * Skeleton height values for consistent loading states.
 *
 * Typography heights match Tailwind's line-heights:
 * - text-xs = h-4 (16px), text-sm = h-5 (20px), text-base = h-6 (24px), etc.
 *
 * Form heights follow WCAG 2.5.8 (44px touch target for inputs/selects):
 * - h-11 = 44px (inputs, selects)
 * - h-8/h-9/h-10 = 32/36/40px (buttons)
 */
export const SkeletonHeight = {
  // Typography line-heights (for text placeholders)
  textXs: 'h-4',      // 16px - matches text-xs
  textSm: 'h-5',      // 20px - matches text-sm
  textBase: 'h-6',    // 24px - matches text-base
  textLg: 'h-7',      // 28px - matches text-lg
  text2xl: 'h-8',     // 32px - matches text-2xl

  // Form component heights (WCAG 2.5.8 compliant)
  input: 'h-11',      // 44px
  select: 'h-11',     // 44px
  switch: 'h-5 w-10', // 20x40px
  buttonSm: 'h-8',    // 32px
  buttonMd: 'h-9',    // 36px
  buttonLg: 'h-10',   // 40px
  iconButtonSm: 'h-8 w-8',   // 32x32px
  iconButtonMd: 'h-9 w-9',   // 36x36px
} as const
