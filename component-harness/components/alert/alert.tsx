import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react'
import { forwardRef, createContext, useContext } from 'react'
import { ALERT_VARIANTS } from '../../styles'
import type { AlertIconProps, AlertTitleProps, AlertDescriptionProps } from './types'

const alertVariants = cva(
  'relative w-full rounded-theme-lg border p-4 flex items-start gap-3',
  {
    variants: {
      variant: ALERT_VARIANTS,
    },
    defaultVariants: {
      variant: 'info',
    },
  }
)

export type AlertVariant = VariantProps<typeof alertVariants>['variant']

// Context to pass variant down to children
const AlertContext = createContext<NonNullable<AlertVariant>>('info')

const icons: Record<NonNullable<AlertVariant>, typeof Info> = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  destructive: AlertCircle,
}

interface AlertRootProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}

const AlertRoot = forwardRef<HTMLDivElement, AlertRootProps>(
  ({ variant = 'info', className, children, ...props }, ref) => {
    // variant is guaranteed to be non-null due to default value
    const safeVariant: AlertVariant = variant ?? 'info'
    return (
      <AlertContext.Provider value={safeVariant}>
        <div
          ref={ref}
          role="alert"
          className={cn(alertVariants({ variant }), className)}
          {...props}
        >
          {children}
        </div>
      </AlertContext.Provider>
    )
  }
)
AlertRoot.displayName = 'Alert.Root'

function AlertIcon({ variant: variantProp, className }: AlertIconProps) {
  const contextVariant = useContext(AlertContext)
  const variant = variantProp ?? contextVariant
  const Icon = icons[variant]
  return <Icon className={cn('h-5 w-5 flex-shrink-0', className)} />
}
AlertIcon.displayName = 'Alert.Icon'

const AlertTitle = forwardRef<HTMLHeadingElement, AlertTitleProps>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn('mb-1 font-medium leading-none tracking-tight', className)}
      {...props}
    />
  )
)
AlertTitle.displayName = 'Alert.Title'

const AlertDescription = forwardRef<HTMLParagraphElement, AlertDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm opacity-90', className)}
      {...props}
    />
  )
)
AlertDescription.displayName = 'Alert.Description'

// Namespace Export (callable as Root + namespace)
export const Alert = Object.assign(AlertRoot, {
  Root: AlertRoot,
  Icon: AlertIcon,
  Title: AlertTitle,
  Description: AlertDescription,
})

// Export context for advanced use cases
export { AlertContext, alertVariants }

// Individual exports for backward compatibility
export { AlertIcon, AlertTitle, AlertDescription }
