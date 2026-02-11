import { cn } from '@/lib/utils'
import { Minus, Plus } from 'lucide-react'
import { forwardRef, useState, useCallback } from 'react'
import { ARIA } from '../../config'

interface NumberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  label?: string
  error?: boolean
  success?: boolean
  helperText?: string
  /** Minimum value */
  min?: number
  /** Maximum value */
  max?: number
  /** Step increment/decrement amount. Default: 1 */
  step?: number
  /** Controlled value */
  value?: number
  /** Default value for uncontrolled mode */
  defaultValue?: number
  /** Callback when value changes */
  onChange?: (value: number) => void
}

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  ({
    className,
    label,
    error,
    success,
    helperText,
    min,
    max,
    step = 1,
    value: controlledValue,
    defaultValue = 0,
    onChange,
    disabled,
    id,
    ...props
  }, ref) => {
    const [internalValue, setInternalValue] = useState(defaultValue)
    const isControlled = controlledValue !== undefined
    const currentValue = isControlled ? controlledValue : internalValue

    const inputId = id || (label ? `number-input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined)

    const clampValue = useCallback((val: number): number => {
      let clamped = val
      if (min !== undefined && clamped < min) clamped = min
      if (max !== undefined && clamped > max) clamped = max
      return clamped
    }, [min, max])

    const updateValue = useCallback((newValue: number) => {
      const clamped = clampValue(newValue)
      if (!isControlled) {
        setInternalValue(clamped)
      }
      onChange?.(clamped)
    }, [clampValue, isControlled, onChange])

    const handleIncrement = () => {
      if (disabled) return
      updateValue(currentValue + step)
    }

    const handleDecrement = () => {
      if (disabled) return
      updateValue(currentValue - step)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const parsed = parseFloat(e.target.value)
      if (!isNaN(parsed)) {
        updateValue(parsed)
      } else if (e.target.value === '' || e.target.value === '-') {
        // Allow empty or just minus sign while typing
        if (!isControlled) {
          setInternalValue(0)
        }
      }
    }

    const handleBlur = () => {
      // Ensure value is clamped on blur
      updateValue(currentValue)
    }

    const canDecrement = min === undefined || currentValue > min
    const canIncrement = max === undefined || currentValue < max

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1.5 block font-body text-sm font-medium tracking-wide text-foreground"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          <button
            type="button"
            onClick={handleDecrement}
            disabled={disabled || !canDecrement}
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-l-theme-lg',
              'bg-neu-base shadow-neu-raised',
              'text-foreground transition-shadow duration-200',
              'hover:shadow-neu-raised-lg active:shadow-neu-pressed-sm',
              'focus-visible:outline-none focus-visible:shadow-[var(--shadow-raised),var(--shadow-focus)]',
              'disabled:pointer-events-none disabled:opacity-50',
              'cursor-pointer'
            )}
            aria-label={ARIA.decreaseValue}
          >
            <Minus className="h-4 w-4" />
          </button>
          <input
            id={inputId}
            ref={ref}
            type="number"
            value={currentValue}
            onChange={handleInputChange}
            onBlur={handleBlur}
            disabled={disabled}
            min={min}
            max={max}
            step={step}
            className={cn(
              'flex h-10 w-full px-3 py-2',
              'bg-neu-base shadow-neu-pressed-sm',
              'text-sm text-foreground text-center placeholder:text-muted-foreground',
              'transition-[border-color] duration-200 ease-neu',
              'border-y border-transparent',
              'focus:outline-none',
              'disabled:cursor-not-allowed disabled:opacity-50',
              // Hide spin buttons
              '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
              !error && !success && 'hover:shadow-neu-pressed hover:border-primary focus:shadow-neu-pressed focus:border-primary',
              error && 'border-destructive hover:shadow-neu-pressed focus:shadow-neu-pressed',
              success && 'border-success hover:shadow-neu-pressed focus:shadow-neu-pressed',
              className
            )}
            {...props}
          />
          <button
            type="button"
            onClick={handleIncrement}
            disabled={disabled || !canIncrement}
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-r-theme-lg',
              'bg-neu-base shadow-neu-raised',
              'text-foreground transition-shadow duration-200',
              'hover:shadow-neu-raised-lg active:shadow-neu-pressed-sm',
              'focus-visible:outline-none focus-visible:shadow-[var(--shadow-raised),var(--shadow-focus)]',
              'disabled:pointer-events-none disabled:opacity-50',
              'cursor-pointer'
            )}
            aria-label={ARIA.increaseValue}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        {helperText && (
          <p
            className={cn(
              'mt-1.5 text-xs',
              error && 'text-destructive',
              success && 'text-success',
              !error && !success && 'text-muted-foreground'
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

NumberInput.displayName = 'NumberInput'

export { NumberInput }
export type { NumberInputProps }
