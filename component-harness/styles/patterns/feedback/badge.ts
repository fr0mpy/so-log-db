export const Badge = {
  base: 'inline-flex items-center rounded-theme-md px-2.5 py-0.5 text-xs font-medium',
  primary: 'bg-primary text-primary-foreground shadow-neu-badge-primary',
  secondary: 'bg-secondary text-secondary-foreground shadow-neu-badge-secondary',
  destructive: 'bg-destructive text-destructive-foreground shadow-neu-badge-destructive',
  success: 'bg-success text-success-foreground shadow-neu-badge-success',
  warning: 'bg-warning text-warning-foreground shadow-neu-badge-warning',
  info: 'bg-info text-info-foreground shadow-neu-badge-info',
  outline: 'bg-neu-base text-foreground shadow-neu-raised-sm',
} as const

export type BadgeVariant = keyof typeof Badge
