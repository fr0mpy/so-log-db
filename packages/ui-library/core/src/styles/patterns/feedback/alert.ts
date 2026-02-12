import { Badge } from './badge'

export const Alert = {
  base: 'relative w-full rounded-theme-lg border p-4 flex items-start gap-3',
  info: `${Badge.info} border-transparent`,
  success: `${Badge.success} border-transparent`,
  warning: `${Badge.warning} border-transparent`,
  destructive: `${Badge.destructive} border-transparent`,
  icon: 'h-5 w-5 flex-shrink-0',
  title: 'mb-1 font-medium leading-none tracking-tight',
  description: 'text-sm opacity-90',
} as const

export type AlertVariant = 'info' | 'success' | 'warning' | 'destructive'
