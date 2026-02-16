export const Input = {
  base: [
    'flex w-full rounded-theme-lg px-3 py-2',
    'bg-neu-base shadow-neu-pressed-sm',
    'text-sm text-foreground placeholder:text-muted-foreground',
    'transition-[border-color,box-shadow] duration-200 ease-neu',
    'border border-transparent',
    'focus:outline-none',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ].join(' '),

  height: 'h-11', // 44px for WCAG 2.5.8 touch target compliance

  interactive: 'hover:shadow-neu-pressed hover:border-primary focus:shadow-neu-pressed focus:border-primary',
  error: 'border-destructive hover:shadow-neu-pressed focus:shadow-neu-pressed',
  success: 'border-success hover:shadow-neu-pressed focus:shadow-neu-pressed',

  iconLeft: 'absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-hover:text-primary group-focus-within:text-primary',
  iconRight: 'absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-hover:text-primary group-focus-within:text-primary',

  withIconLeft: 'pl-10',
  withIconRight: 'pr-10',
} as const
