import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'destructive' | 'success' | 'warning' | 'outline'
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'primary', className, children, ...props }, ref) => {
    const variants = {
      primary: 'bg-primary text-primary-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.2),-2px_-2px_4px_rgba(255,255,255,0.2),2px_2px_4px_rgba(0,100,60,0.2)]',
      secondary: 'bg-secondary text-secondary-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.2),-2px_-2px_4px_rgba(255,255,255,0.2),2px_2px_4px_rgba(60,60,140,0.2)]',
      destructive: 'bg-destructive text-destructive-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.2),-2px_-2px_4px_rgba(255,255,255,0.2),2px_2px_4px_rgba(180,40,40,0.2)]',
      success: 'bg-success text-success-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.2),-2px_-2px_4px_rgba(255,255,255,0.2),2px_2px_4px_rgba(0,100,60,0.2)]',
      warning: 'bg-warning text-warning-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.2),-2px_-2px_4px_rgba(255,255,255,0.2),2px_2px_4px_rgba(180,80,0,0.2)]',
      outline: 'bg-neu-base text-foreground shadow-neu-raised-sm',
    }

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-theme-md px-2.5 py-0.5 text-xs font-medium',
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

export { Badge }
