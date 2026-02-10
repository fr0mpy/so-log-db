import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        'font-body text-sm font-medium tracking-wide text-foreground',
        'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        className
      )}
      {...props}
    >
      {children}
    </label>
  )
)

Label.displayName = 'Label'

export { Label }
