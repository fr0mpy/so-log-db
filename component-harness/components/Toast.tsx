import { cn } from '@/lib/utils'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import { forwardRef, useState, useEffect } from 'react'

interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'destructive'
  title?: string
  description?: string
  duration?: number
  onClose?: () => void
}

const Toast = forwardRef<HTMLDivElement, ToastProps>(
  ({ variant = 'info', title, description, duration = 5000, onClose, className, children, ...props }, ref) => {
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
      if (duration > 0) {
        const timer = setTimeout(() => {
          setIsVisible(false)
          onClose?.()
        }, duration)
        return () => clearTimeout(timer)
      }
    }, [duration, onClose])

    if (!isVisible) return null

    const variants = {
      info: 'bg-primary/10 text-primary border-primary/20',
      success: 'bg-success/10 text-success border-success/20',
      warning: 'bg-warning/10 text-warning border-warning/20',
      destructive: 'bg-destructive/10 text-destructive border-destructive/20',
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
          'relative w-full max-w-sm rounded-theme-lg border p-4 shadow-theme-lg glass',
          'flex items-start gap-3 animate-in slide-in-from-top-5',
          variants[variant],
          className
        )}
        {...props}
      >
        <Icon className="h-5 w-5 flex-shrink-0" />
        <div className="flex-1">
          {title && <div className="font-semibold">{title}</div>}
          {description && <div className="text-sm opacity-90 mt-1">{description}</div>}
          {children}
        </div>
        <button
          onClick={() => {
            setIsVisible(false)
            onClose?.()
          }}
          className={cn(
            'rounded-theme-sm opacity-70 cursor-pointer min-h-11 min-w-11',
            'transition-opacity hover:opacity-100',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2'
          )}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      </div>
    )
  }
)

Toast.displayName = 'Toast'

export { Toast }
