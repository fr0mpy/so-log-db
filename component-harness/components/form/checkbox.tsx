import { cn } from '@/lib/utils'
import { forwardRef, useId } from 'react'
import {
  CONTROL_BASE,
  CONTROL_UNCHECKED,
  CONTROL_CHECKED_STATE,
  CONTROL_DISABLED,
  CONTROL_FOCUS,
  CONTROL_LABEL,
} from '../../styles'

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    const generatedId = useId()
    const checkboxId = id || generatedId

    return (
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id={checkboxId}
          ref={ref}
          className={cn(
            'h-4 w-4 rounded-theme-sm',
            CONTROL_BASE,
            CONTROL_UNCHECKED,
            CONTROL_FOCUS,
            CONTROL_CHECKED_STATE,
            CONTROL_DISABLED,
            className
          )}
          {...props}
        />
        {label && (
          <label htmlFor={checkboxId} className={CONTROL_LABEL}>
            {label}
          </label>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'

export { Checkbox }
