import { cn } from '@/lib/utils'
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react'
import { forwardRef } from 'react'

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'destructive'
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ variant = 'info', className, children, ...props }, ref) => {
    const variants = {
      info: 'bg-info text-info-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.2),-2px_-2px_4px_rgba(255,255,255,0.2),2px_2px_4px_rgba(59,130,246,0.3)] border-transparent',
      success: 'bg-success text-success-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.2),-2px_-2px_4px_rgba(255,255,255,0.2),2px_2px_4px_rgba(0,100,60,0.2)] border-transparent',
      warning: 'bg-warning text-warning-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.2),-2px_-2px_4px_rgba(255,255,255,0.2),2px_2px_4px_rgba(180,80,0,0.2)] border-transparent',
      destructive: 'bg-destructive text-destructive-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.2),-2px_-2px_4px_rgba(255,255,255,0.2),2px_2px_4px_rgba(180,40,40,0.2)] border-transparent',
    }

    const icons = {
      info: Info,
      success: CheckCircle,
      warning: AlertTriangle,
      destructive: AlertCircle,
    }

    const Icon = icons[variant]

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          'relative w-full rounded-theme-lg border p-4 flex items-start gap-3',
          variants[variant],
          className
        )}
        {...props}
      >
        <Icon className="h-5 w-5 flex-shrink-0" />
        <div className="flex-1">{children}</div>
      </div>
    )
  }
)
Alert.displayName = 'Alert'

const AlertTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn('mb-1 font-medium leading-none tracking-tight', className)}
      {...props}
    />
  )
)
AlertTitle.displayName = 'AlertTitle'

const AlertDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm opacity-90', className)}
      {...props}
    />
  )
)
AlertDescription.displayName = 'AlertDescription'

export { Alert, AlertTitle, AlertDescription }
