import { cn } from '@/utils/cn'
import { cva, type VariantProps } from 'class-variance-authority'
import { Feedback } from '../../styles'

const tagVariants = cva(Feedback.Tag.base, {
  variants: {
    variant: {
      success: Feedback.Tag.success,
      warning: Feedback.Tag.warning,
      destructive: Feedback.Tag.destructive,
      info: Feedback.Tag.info,
      primary: Feedback.Tag.primary,
      secondary: Feedback.Tag.secondary,
      accent: Feedback.Tag.accent,
      muted: Feedback.Tag.muted,
    },
  },
  defaultVariants: {
    variant: 'muted',
  },
})

export type TagVariant = VariantProps<typeof tagVariants>['variant']

interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {
  ref?: React.Ref<HTMLSpanElement>
}

function Tag({ variant, className, children, ref, ...props }: TagProps) {
  return (
    <span
      ref={ref}
      className={cn(tagVariants({ variant }), className)}
      {...props}
    >
      {children}
    </span>
  )
}

export { Tag, tagVariants }
