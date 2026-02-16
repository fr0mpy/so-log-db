/**
 * Tag pattern - colored text with matching border, light background
 * Used for HTTP methods, labels, etc.
 */
export const Tag = {
  base: 'inline-flex items-center rounded-theme-md px-2 py-0.5 text-xs font-semibold border',
  success: 'bg-success-muted text-success border-success',
  warning: 'bg-warning-muted text-warning border-warning',
  destructive: 'bg-destructive-muted text-destructive border-destructive',
  info: 'bg-info-muted text-info border-info',
  primary: 'bg-primary-muted text-primary border-primary',
  secondary: 'bg-secondary-muted text-secondary border-secondary',
  accent: 'bg-accent-muted text-accent border-accent',
  muted: 'bg-muted text-muted-foreground border-muted-foreground',
} as const

/**
 * TagSolid pattern - solid background with white text
 * Used for HTTP status codes, badges that need high contrast
 */
export const TagSolid = {
  base: 'inline-flex items-center rounded-theme-md px-2 py-0.5 text-xs font-semibold border',
  success: 'bg-success text-white border-success',
  warning: 'bg-warning text-white border-warning',
  destructive: 'bg-destructive text-white border-destructive',
  info: 'bg-info text-white border-info',
  primary: 'bg-primary text-white border-primary',
  secondary: 'bg-secondary text-white border-secondary',
  accent: 'bg-accent text-white border-accent',
  muted: 'bg-muted-foreground text-white border-muted-foreground',
} as const

export type TagVariant = keyof Omit<typeof Tag, 'base'>
export type TagSolidVariant = keyof Omit<typeof TagSolid, 'base'>
