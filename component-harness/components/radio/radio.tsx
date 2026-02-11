import { cn } from '@/lib/utils'
import {
  forwardRef,
  createContext,
  useContext,
  useId,
  useCallback,
  useMemo,
} from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useControlledState } from '../../hooks/useControlledState'
import type {
  RadioContextValue,
  RadioItemContextValue,
  RadioRootProps,
  RadioGroupProps,
  RadioItemProps,
  RadioIndicatorProps,
} from './types'
import { SPRING } from '../../config'

// Smooth spring for instant but organic feedback
const FILL_SPRING = SPRING.snappy

// Context for the radio group state
const RadioContext = createContext<RadioContextValue | undefined>(undefined)

const useRadioContext = () => {
  const context = useContext(RadioContext)
  if (!context) {
    throw new Error('Radio components must be used within a Radio.Root')
  }
  return context
}

// Context for individual radio item state
const RadioItemContext = createContext<RadioItemContextValue | undefined>(undefined)

const useRadioItemContext = () => {
  const context = useContext(RadioItemContext)
  if (!context) {
    throw new Error('Radio.Indicator must be used within a Radio.Item')
  }
  return context
}

// Radio.Root - Context provider for the radio group
const RadioRoot = ({
  children,
  value,
  defaultValue = '',
  onValueChange,
  disabled = false,
  name,
}: RadioRootProps) => {
  const [currentValue, setValue] = useControlledState(value, defaultValue, onValueChange)
  const generatedId = useId()
  const groupName = name || `radio-group-${generatedId}`

  const contextValue = useMemo<RadioContextValue>(
    () => ({
      value: currentValue,
      setValue,
      name: groupName,
      disabled,
    }),
    [currentValue, setValue, groupName, disabled]
  )

  return <RadioContext.Provider value={contextValue}>{children}</RadioContext.Provider>
}
RadioRoot.displayName = 'Radio.Root'

// Radio.Group - Visual wrapper for radio options
const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ children, orientation = 'vertical', className, ...props }, ref) => {
    return (
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
    )
  }
)
RadioGroup.displayName = 'Radio.Group'

// Radio.Indicator - The visual indicator (the filled circle)
// Defined before RadioItem since RadioItem uses it internally
const RadioIndicator = ({ className }: RadioIndicatorProps) => {
  const { isSelected } = useRadioItemContext()

  return (
    <AnimatePresence>
      {isSelected && (
        <motion.span
          className={cn(
            'absolute h-3 w-3 rounded-full bg-primary shadow-neu-radio-indicator',
            className
          )}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={FILL_SPRING}
        />
      )}
    </AnimatePresence>
  )
}
RadioIndicator.displayName = 'Radio.Indicator'

// Radio.Item - Individual radio option
const RadioItem = forwardRef<HTMLInputElement, RadioItemProps>(
  ({ value: itemValue, children, className, id, disabled: itemDisabled, ...props }, ref) => {
    const { value: groupValue, setValue, name, disabled: groupDisabled } = useRadioContext()
    const isSelected = groupValue === itemValue
    const disabled = itemDisabled || groupDisabled
    const generatedId = useId()
    const radioId = id || `${name}-${itemValue}-${generatedId}`

    const handleChange = useCallback(() => {
      if (!disabled) {
        setValue(itemValue)
      }
    }, [disabled, setValue, itemValue])

    const itemContextValue = useMemo<RadioItemContextValue>(
      () => ({
        isSelected,
        disabled: disabled || false,
        radioId,
      }),
      [isSelected, disabled, radioId]
    )

    return (
      <RadioItemContext.Provider value={itemContextValue}>
        <div className={cn('flex items-center gap-3', className)}>
          <div className="relative">
            <input
              type="radio"
              ref={ref}
              id={radioId}
              name={name}
              value={itemValue}
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
                disabled && 'cursor-not-allowed opacity-50'
              )}
            >
              <RadioIndicator />
            </label>
          </div>
          {children && (
            <label
              htmlFor={radioId}
              className={cn(
                'text-sm font-medium text-foreground cursor-pointer select-none',
                disabled && 'cursor-not-allowed opacity-50'
              )}
            >
              {children}
            </label>
          )}
        </div>
      </RadioItemContext.Provider>
    )
  }
)
RadioItem.displayName = 'Radio.Item'

// Namespace export
export const Radio = {
  Root: RadioRoot,
  Group: RadioGroup,
  Item: RadioItem,
  Indicator: RadioIndicator,
}

// Re-export context hooks for advanced use cases
export { useRadioContext, useRadioItemContext }
