import { cn } from '@/lib/utils'
import { forwardRef } from 'react'
import { DURATION } from '../../config'

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
  segments?: number
  indeterminate?: boolean
  size?: 'sm' | 'md'
}

const sizeStyles = {
  sm: 'h-1 gap-0.5',
  md: 'h-2 gap-1',
}

const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ value = 0, max = 100, segments = 10, indeterminate = false, size = 'md', className, ...props }, ref) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100))
    const filledSegments = Math.round((percentage / 100) * segments)

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={indeterminate ? undefined : value}
        className={cn('flex w-full', sizeStyles[size], className)}
        {...props}
      >
        {indeterminate ? (
          <>
            <style>
              {`
                @keyframes progress-wave {
                  0% { transform: translateX(-100%); }
                  100% { transform: translateX(200%); }
                }
              `}
            </style>
            <div className="relative flex-1 bg-neu-base shadow-neu-pressed-sm rounded-full overflow-hidden">
              <div
                className="absolute inset-y-0 w-1/3 bg-primary rounded-full shadow-neu-raised-sm"
                style={{ animation: `progress-wave ${DURATION.progress}s ease-in-out infinite` }}
              />
            </div>
          </>
        ) : (
          Array.from({ length: segments }).map((_, i) => (
            <div
              key={i}
              className={cn(
                'flex-1 rounded-full transition-all duration-200 ease-out',
                i < filledSegments
                  ? 'bg-primary shadow-neu-raised-sm'
                  : 'bg-neu-base shadow-neu-pressed-sm'
              )}
            />
          ))
        )}
      </div>
    )
  }
)

Progress.displayName = 'Progress'

export { Progress }
