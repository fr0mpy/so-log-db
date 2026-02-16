/**
 * ProviderIcon Styles
 *
 * Styles for the provider icon component with fallback to letter avatar.
 */

export const ProviderIconStyles = {
  /** Container wrapper for icon and fallback */
  container: 'relative inline-flex shrink-0',

  /** Img element for provider logo */
  image: 'object-contain rounded-full',

  /** Hidden state during load/error */
  imageHidden: 'opacity-0',

  /** Visible state after successful load */
  imageVisible: 'opacity-100',

  /** Transition for smooth fade-in */
  imageTransition: 'transition-opacity duration-150',

  /** Fallback avatar overlay (positioned absolute) */
  fallbackWrapper: 'absolute inset-0',

  /** Fallback letter styles */
  fallbackLetter:
    'rounded-full flex items-center justify-center text-xs font-semibold text-white',

  /** Sizes matching table avatar */
  sizes: {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  },
} as const

/** Fallback colors for letter avatar (semantic tokens) */
export const ProviderFallbackColors = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  accent: 'bg-accent',
  muted: 'bg-muted-foreground',
} as const

export type ProviderFallbackColor = keyof typeof ProviderFallbackColors
