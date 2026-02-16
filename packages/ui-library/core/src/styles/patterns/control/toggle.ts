export const Toggle = {
  /** Base styles for all toggle controls */
  base: [
    'cursor-pointer appearance-none',
    'bg-neu-base border border-border',
    'transition-all duration-200',
  ].join(' '),

  /** Unchecked shadow (theme-aware) */
  unchecked: 'shadow-neu-control-unchecked',

  /** Checked styles (background + shadow, theme-aware) */
  checked: 'bg-primary shadow-neu-control-checked',

  /** Checked state with CSS selector prefix */
  checkedState: 'checked:bg-primary checked:shadow-neu-control-checked',

  /** Disabled state */
  disabled: 'disabled:cursor-not-allowed disabled:opacity-50',

  /** Focus state */
  focus: 'focus-visible:outline-none focus-visible:shadow-[var(--shadow-pressed-sm),var(--shadow-focus)]',

  /** Label text */
  label: 'text-sm font-medium text-foreground cursor-pointer select-none',
} as const
