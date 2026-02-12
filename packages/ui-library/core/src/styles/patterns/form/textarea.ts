export const Textarea = {
  base: [
    'flex w-full rounded-theme-lg px-3 py-2',
    'bg-neu-base shadow-neu-pressed-sm',
    'text-sm text-foreground placeholder:text-muted-foreground',
    'transition-[border-color,box-shadow] duration-200 ease-neu',
    'border border-transparent',
    'focus:outline-none',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'min-h-[80px] resize-y',
  ].join(' '),

  interactive: 'hover:shadow-neu-pressed hover:border-primary focus:shadow-neu-pressed focus:border-primary',
  error: 'border-destructive',
  success: 'border-success',
} as const
