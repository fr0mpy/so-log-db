export const Stepper = {
  base: [
    'flex items-center justify-center',
    'h-10 w-10 cursor-pointer',
    'bg-neu-base shadow-neu-raised',
    'text-foreground transition-shadow duration-200',
    'hover:shadow-neu-raised-lg active:shadow-neu-pressed-sm',
    'focus-visible:outline-none focus-visible:shadow-[var(--shadow-raised),var(--shadow-focus)]',
    'disabled:pointer-events-none disabled:opacity-50',
  ].join(' '),

  left: 'rounded-l-theme-lg',
  right: 'rounded-r-theme-lg',
} as const
