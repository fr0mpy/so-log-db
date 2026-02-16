export const SelectStyles = {
  trigger: {
    base: [
      'relative flex h-11 items-center justify-between gap-3 rounded-theme-lg', // h-11 = 44px touch target
      'bg-neu-base shadow-neu-raised px-4 py-2 text-sm text-foreground cursor-pointer',
      'focus-visible:outline-none focus-visible:shadow-[var(--shadow-raised),var(--shadow-focus)]',
      'disabled:cursor-not-allowed disabled:opacity-50',
    ].join(' '),
    open: 'z-popover',
    width: {
      full: 'w-full',
      auto: 'w-auto',
    },
  },
  value: {
    placeholder: 'text-muted-foreground',
  },
  icon: 'h-4 w-4 opacity-50',
  // clip-path: clips content outside positioner, shadow fades in via animation
  positioner: {
    base: 'z-dropdown',
    bottom: '[clip-path:inset(0_-24px_-24px_-24px)]', // clips above for bottom placement
    top: '[clip-path:inset(-24px_-24px_0_-24px)]', // clips below for top placement
  },
  popup: [
    'rounded-theme-md bg-neu-base',
    // shadow-neu-raised-lg removed - shadow is animated via slideVariants
  ].join(' '),
  search: {
    wrapper: 'p-2 pt-4 border-b border-border/30',
    input: 'h-9',
  },
  optionsWrapper: 'flex flex-col gap-2 p-2',
  option: {
    base: [
      'relative flex w-full cursor-pointer select-none items-center rounded-theme-sm',
      'px-3 py-3 min-h-11', // Touch-friendly: 44px minimum height for WCAG 2.5.8
      'text-sm outline-none transition-colors',
      'hover:bg-muted focus-visible:bg-muted',
      'active:bg-muted/80', // Touch feedback
    ].join(' '),
    selected: 'bg-primary text-primary-foreground hover:bg-primary',
  },
} as const
