export const NumberInput = {
  field: [
    'flex h-10 w-full px-3 py-2',
    'bg-neu-base shadow-neu-pressed-sm',
    'text-sm text-foreground text-center placeholder:text-muted-foreground',
    'transition-[border-color] duration-200 ease-neu',
    'border-y border-transparent',
    'focus:outline-none',
    'disabled:cursor-not-allowed disabled:opacity-50',
    '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
  ].join(' '),

  interactive: 'hover:shadow-neu-pressed hover:border-primary focus:shadow-neu-pressed focus:border-primary',
  error: 'border-destructive hover:shadow-neu-pressed focus:shadow-neu-pressed',
  success: 'border-success hover:shadow-neu-pressed focus:shadow-neu-pressed',
} as const
