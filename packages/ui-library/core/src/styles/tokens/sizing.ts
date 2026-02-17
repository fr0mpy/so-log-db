/**
 * Sizing tokens - all size values used across components.
 * Usage: Sizing.h4, Sizing.w8, Sizing.icon
 */

export const Sizing = {
  // Additional height (h-6, h-11 for form components)
  h6: 'h-6',
  h11: 'h-11',
  // Height
  h1: 'h-1',
  h2: 'h-2',
  h3: 'h-3',
  h4: 'h-4',
  h5: 'h-5',
  h7: 'h-7',
  h8: 'h-8',
  h9: 'h-9',
  h10: 'h-10',
  h12: 'h-12',
  hFull: 'h-full',

  // Width
  w2: 'w-2',
  w3: 'w-3',
  w4: 'w-4',
  w5: 'w-5',
  w8: 'w-8',
  w9: 'w-9',
  w10: 'w-10',
  w80: 'w-80',
  wFull: 'w-full',

  // Combined (square)
  square3: 'h-3 w-3',
  square4: 'h-4 w-4',
  square5: 'h-5 w-5',
  square8: 'h-8 w-8',
  square9: 'h-9 w-9',
  square10: 'h-10 w-10',
  square12: 'h-12 w-12',

  // Min sizes (touch targets)
  minTouch: 'min-h-11 min-w-11',
  minSquare8: 'min-h-8 min-w-8',

  // Icons
  iconXs: 'h-3 w-3',
  iconSm: 'h-4 w-4',
  iconMd: 'h-5 w-5',
  iconLg: 'h-6 w-6',
} as const

/**
 * Component height tokens - single source of truth for form component heights.
 * Import this in both actual components AND skeleton components to stay in sync.
 *
 * @example
 * // In component styles:
 * import { ComponentHeight } from '@stackone-ui/core/styles'
 * const base = `${ComponentHeight.input} px-3 py-2`
 *
 * // In skeleton:
 * <Skeleton className={`${ComponentHeight.input} w-full`} />
 */
export const ComponentHeight = {
  // Form inputs (WCAG 2.5.8 AAA compliant - 44px)
  input: 'h-11',
  select: 'h-11',

  // Buttons
  buttonSm: 'h-8',
  buttonMd: 'h-9',
  buttonLg: 'h-10',

  // Icon buttons (square)
  iconButtonSm: 'h-8 w-8',
  iconButtonMd: 'h-9 w-9',
  iconButtonLg: 'h-10 w-10',

  // Controls
  switch: 'h-5 w-10',
  checkbox: 'h-4 w-4',
  radio: 'h-4 w-4',
} as const

/**
 * Typography line-height tokens - matches Tailwind's text-* line-heights.
 * Use for skeleton placeholders matching actual text heights.
 */
export const TextHeight = {
  /** text-xs: 12px font, 16px line-height */
  xs: 'h-4',
  /** text-sm: 14px font, 20px line-height */
  sm: 'h-5',
  /** text-base: 16px font, 24px line-height */
  base: 'h-6',
  /** text-lg: 18px font, 28px line-height */
  lg: 'h-7',
  /** text-xl: 20px font, 28px line-height */
  xl: 'h-7',
  /** text-2xl: 24px font, 32px line-height */
  '2xl': 'h-8',
  /** text-3xl: 30px font, 36px line-height */
  '3xl': 'h-9',
} as const

/**
 * Touch target tokens for WCAG 2.5.8 compliance.
 * AA minimum: 24x24px, AAA enhanced: 44x44px (we target AAA).
 */
export const TouchTarget = {
  // Minimum touch target (44px = h-11/w-11 in Tailwind)
  min: 'min-h-11 min-w-11',

  // Expanded touch area via pseudo-element (keeps visual size small)
  // Use on small controls like checkboxes, radio buttons
  // Adds invisible 12px padding around element (16px + 24px = 40px minimum)
  controlArea: 'relative before:absolute before:-inset-3 before:content-[""]',

  // Larger expansion for very small controls (14px padding = 44px+ total)
  controlAreaLg: 'relative before:absolute before:-inset-3.5 before:content-[""]',
} as const
