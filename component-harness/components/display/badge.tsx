import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'
import { FEEDBACK_VARIANTS } from '../../styles'

const badgeVariants = cva(
  'inline-flex items-center rounded-theme-md px-2.5 py-0.5 text-xs font-medium',
  {
    variants: {
      variant: FEEDBACK_VARIANTS,
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
)

export type BadgeVariant = VariantProps<typeof badgeVariants>['variant']

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant, className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant }), className)}
        {...props}
      >
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

export { Badge, badgeVariants }
