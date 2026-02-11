export const Button = {
  icon: [
    'flex items-center justify-center',
    'h-10 w-10 cursor-pointer',
    'bg-neu-base shadow-neu-raised',
    'text-foreground transition-shadow duration-200',
    'hover:shadow-neu-raised-lg active:shadow-neu-pressed-sm',
    'focus-visible:outline-none focus-visible:shadow-[var(--shadow-raised),var(--shadow-focus)]',
    'disabled:pointer-events-none disabled:opacity-50',
  ].join(' '),

  nav: [
    'inline-flex items-center justify-center gap-1',
    'h-9 px-3 rounded-theme-lg',
    'text-sm font-medium cursor-pointer whitespace-nowrap',
    'bg-transparent text-foreground',
    'transition-all duration-200',
    'hover:bg-neu-base hover:shadow-neu-raised-sm',
    'active:shadow-neu-pressed-sm active:scale-[0.98]',
    'focus-visible:outline-none focus-visible:shadow-neu-focus',
    'disabled:pointer-events-none disabled:opacity-50',
  ].join(' '),

  paginationLink: [
    'inline-flex items-center justify-center',
    'min-h-11 min-w-11 h-9 w-9 rounded-theme-lg',
    'text-sm font-medium cursor-pointer',
    'transition-shadow duration-200',
    'focus-visible:outline-none focus-visible:shadow-neu-focus',
    'disabled:pointer-events-none disabled:opacity-50',
  ].join(' '),
} as const
