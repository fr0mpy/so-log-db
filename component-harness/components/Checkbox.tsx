import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`

    return (
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id={checkboxId}
          ref={ref}
          className={cn(
            'h-4 w-4 cursor-pointer appearance-none rounded-theme-sm',
            'bg-neu-base border border-primary/30 shadow-[inset_2px_2px_4px_rgba(0,60,40,0.25),inset_-1px_-1px_2px_rgba(255,255,255,0.4)] transition-all duration-200',
            'focus-visible:outline-none focus-visible:shadow-[var(--shadow-pressed-sm),var(--shadow-focus)]',
            'checked:bg-primary checked:shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.2),inset_2px_2px_5px_rgba(0,80,50,0.3)]',
            'disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          {...props}
        />
        {label && (
          <label
            htmlFor={checkboxId}
            className="text-sm font-medium text-foreground cursor-pointer select-none"
          >
            {label}
          </label>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'

export { Checkbox }
