/**
 * Skip Links styles following zero-inline-classnames rule
 * Slide-down panel that appears on focus for keyboard navigation
 */
export const SkipLinksStyles = {
  /** Container - hidden off-screen until focused */
  container: [
    'fixed top-0 left-0 right-0 z-[9999]',
    'transform -translate-y-full',
    'transition-transform duration-200 ease-out',
    'bg-neu-base border-b border-neu-pressed',
    'shadow-raised',
  ].join(' '),

  /** Container visible state - slide into view */
  containerVisible: 'translate-y-0',

  /** Navigation wrapper */
  nav: 'py-3 px-4',

  /** Skip links list */
  list: [
    'flex items-center justify-center gap-3',
    'list-none m-0 p-0',
  ].join(' '),

  /** Individual link */
  link: [
    'inline-flex items-center',
    'px-4 py-2 rounded-md',
    'bg-primary text-primary-foreground',
    'font-medium text-sm',
    'transition-colors duration-150',
    'hover:bg-primary/90',
    'focus-visible:outline-none focus-visible:shadow-neu-focus',
  ].join(' '),
} as const
