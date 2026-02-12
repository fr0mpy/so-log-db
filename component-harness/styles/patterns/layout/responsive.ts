/**
 * Responsive layout patterns - mobile-first breakpoint utilities.
 * These patterns handle show/hide, stacking, and adaptive layouts.
 */
export const Responsive = {
  // Sidebar visibility patterns
  Sidebar: {
    // Desktop only: hidden on mobile, flex on md+
    desktop: 'hidden md:flex md:w-64',

    // Mobile trigger: visible on mobile, hidden on md+
    mobileTrigger: 'md:hidden',

    // Mobile trigger positioned fixed
    mobileFixed: 'fixed bottom-4 left-4 z-50 md:hidden',
  },

  // Stack patterns for controls that should wrap on mobile
  Stack: {
    // Vertical on mobile, horizontal on tablet+
    adaptive: 'flex flex-col gap-2 md:flex-row md:items-center md:gap-4',

    // Always horizontal but wraps
    wrap: 'flex flex-wrap items-center gap-2 md:gap-4',

    // Reverse order on mobile (useful for action buttons)
    reverseOnMobile: 'flex flex-col-reverse gap-2 sm:flex-row sm:items-center',
  },

  // Container patterns
  Container: {
    // Full height using modern viewport units with fallback
    fullHeight: 'min-h-screen min-h-[100svh]',

    // Main content area
    main: 'flex-1 overflow-hidden',
  },

  // Text visibility helpers
  Text: {
    // Screen reader only on mobile, visible on md+
    srOnlyMobile: 'sr-only md:not-sr-only',

    // Hidden on mobile, visible on sm+
    hiddenMobile: 'hidden sm:inline',
  },

  // Spacing adjustments
  Padding: {
    // Responsive page padding
    page: 'p-4 md:p-6 lg:p-8',

    // Responsive card padding
    card: 'p-4 lg:p-6',
  },
} as const
