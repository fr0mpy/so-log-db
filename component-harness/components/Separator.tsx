import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical'
}

const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  ({ orientation = 'horizontal', className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation={orientation}
        className={cn(
          'bg-transparent',
          orientation === 'horizontal'
            ? 'h-[2px] w-full shadow-neu-groove-h'
            : 'h-full w-[2px] shadow-neu-groove-v',
          className
        )}
        {...props}
      />
    )
  }
)

Separator.displayName = 'Separator'

export { Separator }
