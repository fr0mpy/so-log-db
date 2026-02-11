import { Feedback } from '../../styles'

export const AlertStyles = {
  base: Feedback.Alert.base,
  variants: {
    info: Feedback.Alert.info,
    success: Feedback.Alert.success,
    warning: Feedback.Alert.warning,
    destructive: Feedback.Alert.destructive,
  },
  icon: 'h-5 w-5 flex-shrink-0',
  title: 'mb-1 font-medium leading-none tracking-tight',
  description: 'text-sm opacity-90',
} as const
