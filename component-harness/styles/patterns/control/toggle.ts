export const Toggle = {
  /** Base styles for all toggle controls */
  base: [
    'cursor-pointer appearance-none',
    'bg-neu-base border border-primary/30',
    'transition-all duration-200',
  ].join(' '),

  /** Unchecked shadow */
  unchecked: 'shadow-neu-control-unchecked-inline',

  /** Checked styles (background + shadow) */
  checked: 'bg-primary shadow-neu-control-checked-inline',

  /** Checked state with CSS selector prefix */
  checkedState: 'checked:bg-primary checked:shadow-neu-control-checked-inline',

  /** Disabled state */
  disabled: 'disabled:cursor-not-allowed disabled:opacity-50',

  /** Focus state */
  focus: 'focus-visible:outline-none focus-visible:shadow-[var(--shadow-pressed-sm),var(--shadow-focus)]',

  /** Label text */
  label: 'text-sm font-medium text-foreground cursor-pointer select-none',
} as const
