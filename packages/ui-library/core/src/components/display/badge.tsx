import { cn } from '@/utils/cn'
import { cva, type VariantProps } from 'class-variance-authority'
import { Feedback } from '../../styles'

const badgeVariants = cva(Feedback.Badge.base, {
  variants: {
    variant: {
      primary: Feedback.Badge.primary,
      secondary: Feedback.Badge.secondary,
      destructive: Feedback.Badge.destructive,
      success: Feedback.Badge.success,
      warning: Feedback.Badge.warning,
      info: Feedback.Badge.info,
      outline: Feedback.Badge.outline,
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

export type BadgeVariant = VariantProps<typeof badgeVariants>['variant']

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  ref?: React.Ref<HTMLSpanElement>
}

function Badge({ variant, className, children, ref, ...props }: BadgeProps) {
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

export { Badge, badgeVariants }
