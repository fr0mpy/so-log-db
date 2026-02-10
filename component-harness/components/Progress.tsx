import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
  segments?: number
}

const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ value = 0, max = 100, segments = 10, className, ...props }, ref) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100))
    const filledSegments = Math.round((percentage / 100) * segments)

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        className={cn('flex gap-1 w-full', className)}
        {...props}
      >
        {Array.from({ length: segments }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'h-2 flex-1 rounded-full transition-all duration-200 ease-out',
              i < filledSegments
                ? 'bg-primary shadow-neu-raised-sm'
                : 'bg-neu-base shadow-neu-pressed-sm'
            )}
          />
        ))}
      </div>
    )
  }
)

Progress.displayName = 'Progress'

export { Progress }
