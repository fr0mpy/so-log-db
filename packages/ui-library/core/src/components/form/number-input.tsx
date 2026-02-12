'use client'

import { cn } from '@/utils/cn'
import { Minus, Plus } from 'lucide-react'
import { useState, useCallback } from 'react'
import { ARIA } from '../../config'
import { Form, Layout, Stepper, getHelperStyles } from '../../styles'
import { NumberInputStyles as S } from './styles'

interface NumberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  label?: string
  error?: boolean
  success?: boolean
  helperText?: string
  min?: number
  max?: number
  step?: number
  value?: number
  defaultValue?: number
  onChange?: (value: number) => void
  ref?: React.Ref<HTMLInputElement>
}

function NumberInput({
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
  ref,
  ...props
}: NumberInputProps) {
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

  const handleIncrement = () => !disabled && updateValue(currentValue + step)
  const handleDecrement = () => !disabled && updateValue(currentValue - step)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseFloat(e.target.value)
    if (!isNaN(parsed)) {
      updateValue(parsed)
    } else if (e.target.value === '' || e.target.value === '-') {
      if (!isControlled) setInternalValue(0)
    }
  }

  const handleBlur = () => updateValue(currentValue)

  const canDecrement = min === undefined || currentValue > min
  const canIncrement = max === undefined || currentValue < max

  return (
    <div className={S.container}>
      {label && (
        <label htmlFor={inputId} className={Form.Label.tracking}>
          {label}
        </label>
      )}
      <div className={S.wrapper}>
        <button
          type="button"
          onClick={handleDecrement}
          disabled={disabled || !canDecrement}
          className={cn(Stepper.base, Stepper.left)}
          aria-label={ARIA.decreaseValue}
        >
          <Minus className={Layout.Size.iconSm} />
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
            Form.NumberInput.field,
            !error && !success && Form.NumberInput.interactive,
            error && Form.NumberInput.error,
            success && Form.NumberInput.success,
            className
          )}
          {...props}
        />
        <button
          type="button"
          onClick={handleIncrement}
          disabled={disabled || !canIncrement}
          className={cn(Stepper.base, Stepper.right)}
          aria-label={ARIA.increaseValue}
        >
          <Plus className={Layout.Size.iconSm} />
        </button>
      </div>
      {helperText && (
        <p className={getHelperStyles({ hasError: error, hasSuccess: success })}>
          {helperText}
        </p>
      )}
    </div>
  )
}

export { NumberInput }
export type { NumberInputProps }
