import { cn } from '@/lib/utils'
import { forwardRef, useState, useId } from 'react'
import { CONTROL_CHECKED, CONTROL_LABEL } from '../../styles'

/** Switch-specific unchecked state (has border unlike checked) */
const SWITCH_UNCHECKED = 'bg-neu-base border border-primary/30 shadow-neu-control-unchecked-inline'

interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  onCheckedChange?: (checked: boolean) => void
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, id, checked, defaultChecked, onCheckedChange, onChange, ...props }, ref) => {
    const [isChecked, setIsChecked] = useState(defaultChecked || false)
    const generatedId = useId()
    const switchId = id || generatedId
    const controlledChecked = checked !== undefined ? checked : isChecked

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = e.target.checked
      if (checked === undefined) {
        setIsChecked(newChecked)
      }
      onCheckedChange?.(newChecked)
      onChange?.(e)
    }

    return (
      <div className="flex items-center gap-2">
        <label
          htmlFor={switchId}
          className={cn(
            'relative inline-flex h-4 w-8 cursor-pointer items-center rounded-full',
            'transition-all duration-200',
            controlledChecked ? CONTROL_CHECKED : SWITCH_UNCHECKED,
            props.disabled && 'cursor-not-allowed opacity-50',
            className
          )}
        >
          <input
            type="checkbox"
            id={switchId}
            ref={ref}
            className="sr-only peer"
            checked={controlledChecked}
            onChange={handleChange}
            {...props}
          />
          <span
            className={cn(
              'inline-block h-3 w-3 transform rounded-full bg-neu-base shadow-neu-raised-sm transition-transform duration-200',
              controlledChecked ? 'translate-x-4' : 'translate-x-0.5'
            )}
          />
        </label>
        {label && (
          <label htmlFor={switchId} className={CONTROL_LABEL}>
            {label}
          </label>
        )}
      </div>
    )
  }
)

Switch.displayName = 'Switch'

export { Switch }
