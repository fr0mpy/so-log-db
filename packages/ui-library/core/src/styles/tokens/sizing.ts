/**
 * Sizing tokens - all size values used across components.
 * Usage: Sizing.h4, Sizing.w8, Sizing.icon
 */

export const Sizing = {
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
