export { Radio, useRadioContext, useRadioItemContext } from './radio'
export type {
  RadioRootProps,
  RadioGroupProps,
  RadioItemProps,
  RadioIndicatorProps,
  RadioContextValue,
  RadioItemContextValue,
} from './types'

// =============================================================================
// Backward compatibility exports (convenience wrappers)
// =============================================================================
import { forwardRef, type ReactNode } from 'react'
import { Radio } from './radio'

export interface RadioGroupWrapperProps {
  children: ReactNode
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  name?: string
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

export interface RadioGroupItemProps {
  value: string
  label?: ReactNode
  disabled?: boolean
  className?: string
}

/**
 * Convenience wrapper that combines Radio.Root and Radio.Group
 */
export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupWrapperProps>(
  ({ children, value, defaultValue, onValueChange, disabled, name, orientation, className }, ref) => (
    <Radio.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
      name={name}
    >
      <Radio.Group ref={ref} orientation={orientation} className={className}>
        {children}
      </Radio.Group>
    </Radio.Root>
  )
)
RadioGroup.displayName = 'RadioGroup'

/**
 * Convenience wrapper that combines Radio.Item with label prop
 */
export const RadioGroupItem = forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ value, label, disabled, className }, ref) => (
    <Radio.Item ref={ref} value={value} disabled={disabled} className={className}>
      {label}
    </Radio.Item>
  )
)
RadioGroupItem.displayName = 'RadioGroupItem'
