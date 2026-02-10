import { cn } from '@/lib/utils'
import { forwardRef, useState, createContext, useContext, useId } from 'react'
import { motion, AnimatePresence } from 'motion/react'

// Smooth spring for instant but organic feedback
const FILL_SPRING = {
  type: 'spring' as const,
  stiffness: 500,
  damping: 30,
}

interface RadioGroupContextValue {
  value: string
  setValue: (value: string) => void
  name: string
  disabled?: boolean
  orientation: 'horizontal' | 'vertical'
}

const RadioGroupContext = createContext<RadioGroupContextValue | undefined>(undefined)

const useRadioGroupContext = () => {
  const context = useContext(RadioGroupContext)
  if (!context) {
    throw new Error('RadioGroup components must be used within a RadioGroup provider')
  }
  return context
}

interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  name?: string
  orientation?: 'horizontal' | 'vertical'
}

const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ defaultValue = '', value, onValueChange, disabled, name, orientation = 'vertical', className, children, ...props }, ref) => {
    const [internalValue, setInternalValue] = useState(value ?? defaultValue)
    const groupId = useId()
    const groupName = name || `radio-group-${groupId}`

    const handleSetValue = (newValue: string) => {
      if (value === undefined) {
        setInternalValue(newValue)
      }
      onValueChange?.(newValue)
    }

    const currentValue = value ?? internalValue

    return (
      <RadioGroupContext.Provider value={{
        value: currentValue,
        setValue: handleSetValue,
        name: groupName,
        disabled,
        orientation,
      }}>
        <div
          ref={ref}
          role="radiogroup"
          aria-orientation={orientation}
          className={cn(
            'flex',
            orientation === 'vertical' ? 'flex-col gap-2' : 'flex-row gap-4',
            className
          )}
          {...props}
        >
          {children}
        </div>
      </RadioGroupContext.Provider>
    )
  }
)
RadioGroup.displayName = 'RadioGroup'

interface RadioGroupItemProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  value: string
  label?: string
}

const RadioGroupItem = forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ value, label, className, id, disabled: itemDisabled, ...props }, ref) => {
    const { value: groupValue, setValue, name, disabled: groupDisabled } = useRadioGroupContext()
    const isSelected = groupValue === value
    const disabled = itemDisabled || groupDisabled
    const radioId = id || `${name}-${value}`

    const handleChange = () => {
      if (!disabled) {
        setValue(value)
      }
    }

    return (
      <div className="flex items-center gap-3">
        <div className="relative">
          <input
            type="radio"
            ref={ref}
            id={radioId}
            name={name}
            value={value}
            checked={isSelected}
            disabled={disabled}
            onChange={handleChange}
            className="sr-only peer"
            {...props}
          />
          <label
            htmlFor={radioId}
            className={cn(
              'relative flex h-5 w-5 cursor-pointer items-center justify-center rounded-full',
              'bg-neu-base shadow-neu-pressed-sm',
              'transition-shadow duration-200',
              'peer-focus-visible:shadow-[var(--shadow-pressed-sm),var(--shadow-focus)]',
              disabled && 'cursor-not-allowed opacity-50',
              className
            )}
          >
            {/* Animated fill indicator - fades/scales in and out */}
            <AnimatePresence>
              {isSelected && (
                <motion.span
                  key={`fill-${value}`}
                  className="absolute h-3 w-3 rounded-full bg-primary shadow-[inset_-1px_-1px_2px_rgba(255,255,255,0.3),inset_1px_1px_2px_rgba(0,80,50,0.3)]"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={FILL_SPRING}
                />
              )}
            </AnimatePresence>
          </label>
        </div>
        {label && (
          <label
            htmlFor={radioId}
            className={cn(
              'text-sm font-medium text-foreground cursor-pointer select-none',
              disabled && 'cursor-not-allowed opacity-50'
            )}
          >
            {label}
          </label>
        )}
      </div>
    )
  }
)
RadioGroupItem.displayName = 'RadioGroupItem'

// Legacy Radio component for backwards compatibility
interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, id, ...props }, ref) => {
    const radioId = id || `radio-${Math.random().toString(36).substr(2, 9)}`

    return (
      <div className="flex items-center gap-2">
        <input
          type="radio"
          id={radioId}
          ref={ref}
          className={cn(
            'h-4 w-4 cursor-pointer appearance-none rounded-full',
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
            htmlFor={radioId}
            className="text-sm font-medium text-foreground cursor-pointer select-none"
          >
            {label}
          </label>
        )}
      </div>
    )
  }
)

Radio.displayName = 'Radio'

export { Radio, RadioGroup, RadioGroupItem }
