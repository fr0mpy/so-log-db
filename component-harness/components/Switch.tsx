import { cn } from '@/lib/utils'
import { forwardRef, useState } from 'react'

interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  onCheckedChange?: (checked: boolean) => void
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, id, checked, defaultChecked, onCheckedChange, onChange, ...props }, ref) => {
    const [isChecked, setIsChecked] = useState(defaultChecked || false)
    const switchId = id || `switch-${Math.random().toString(36).substr(2, 9)}`
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
            controlledChecked
              ? 'bg-primary shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.2),inset_2px_2px_5px_rgba(0,80,50,0.3)]'
              : 'bg-neu-base border border-primary/30 shadow-[inset_2px_2px_4px_rgba(0,60,40,0.25),inset_-1px_-1px_2px_rgba(255,255,255,0.4)]',
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
          <label
            htmlFor={switchId}
            className="text-sm font-medium text-foreground cursor-pointer select-none"
          >
            {label}
          </label>
        )}
      </div>
    )
  }
)

Switch.displayName = 'Switch'

export { Switch }
