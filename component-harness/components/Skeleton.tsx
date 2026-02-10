import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

type SkeletonVariant = 'text' | 'circle' | 'rectangular'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant
}

const VARIANT_CLASSES: Record<SkeletonVariant, string> = {
  text: 'rounded-theme-md',
  circle: 'rounded-full aspect-square',
  rectangular: 'rounded-theme-lg',
}

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = 'text', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'animate-pulse bg-neu-base shadow-neu-pressed-sm',
          VARIANT_CLASSES[variant],
          className
        )}
        {...props}
      />
    )
  }
)

Skeleton.displayName = 'Skeleton'

export { Skeleton }
export type { SkeletonProps, SkeletonVariant }
