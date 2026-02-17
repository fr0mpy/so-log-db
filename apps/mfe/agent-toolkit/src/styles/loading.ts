/**
 * Loading State Styles
 *
 * Follows zero-inline-classnames pattern for loading.tsx files.
 */

import { Layout, ComponentHeight, TextHeight } from '@stackone-ui/core/styles'

/**
 * Note: min-h-[50vh] is an arbitrary value because Tailwind doesn't provide
 * a 50% viewport height token. This provides a reasonable loading container
 * height without taking up the full screen.
 */
export const LoadingStyles = {
  /** Full-page centered loading container (50vh min-height for visible loading state) */
  page: [Layout.Flex.centerBoth, 'min-h-[50vh]'].join(' '),

  /** Spinning refresh icon animation */
  spinning: 'animate-spin',
} as const

/**
 * Skeleton sizing tokens - re-exports from @stackone-ui/core/styles.
 *
 * These are tightly coupled to the actual component definitions in the ui-library.
 * If a component's height changes in @stackone-ui/core, skeletons automatically stay in sync.
 *
 * @see packages/ui-library/core/src/styles/tokens/sizing.ts
 */
export const SkeletonHeight = {
  // Typography line-heights (for text placeholders)
  textXs: TextHeight.xs,
  textSm: TextHeight.sm,
  textBase: TextHeight.base,
  textLg: TextHeight.lg,
  text2xl: TextHeight['2xl'],

  // Form component heights (from ComponentHeight)
  input: ComponentHeight.input,
  select: ComponentHeight.select,
  switch: ComponentHeight.switch,
  buttonSm: ComponentHeight.buttonSm,
  buttonMd: ComponentHeight.buttonMd,
  buttonLg: ComponentHeight.buttonLg,
  iconButtonSm: ComponentHeight.iconButtonSm,
  iconButtonMd: ComponentHeight.iconButtonMd,
} as const
