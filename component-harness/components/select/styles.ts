export const SelectStyles = {
  trigger: {
    base: [
      'relative flex h-10 w-full items-center justify-between rounded-theme-lg',
      'bg-neu-base shadow-neu-raised px-3 py-2 text-sm text-foreground cursor-pointer',
      'focus-visible:outline-none focus-visible:shadow-[var(--shadow-raised),var(--shadow-focus)]',
      'disabled:cursor-not-allowed disabled:opacity-50',
    ].join(' '),
    open: 'z-popover',
  },
  value: {
    placeholder: 'text-muted-foreground',
  },
  icon: 'h-4 w-4 opacity-50',
  positioner: 'z-popover',
  popup: [
    'rounded-theme-md bg-neu-base shadow-neu-raised-lg border border-white/40 dark:border-white/10',
  ].join(' '),
  search: {
    wrapper: 'p-2 pt-4 border-b border-border/30',
    input: 'h-9',
  },
  optionsWrapper: 'p-1',
  option: {
    base: [
      'relative flex w-full cursor-pointer select-none items-center rounded-theme-sm px-2 py-1.5',
      'text-sm outline-none transition-colors',
      'hover:bg-muted focus-visible:bg-muted',
    ].join(' '),
    selected: 'bg-muted',
  },
  checkIcon: {
    base: 'mr-2 h-4 w-4 transition-opacity duration-150',
    selected: 'opacity-100',
    unselected: 'opacity-0',
  },
} as const
