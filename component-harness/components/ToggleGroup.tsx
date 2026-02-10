import { cn } from '@/lib/utils'
import { forwardRef, useState, createContext, useContext } from 'react'

interface ToggleGroupContextValue {
  value: string | string[]
  onValueChange: (value: string) => void
  type: 'single' | 'multiple'
}

const ToggleGroupContext = createContext<ToggleGroupContextValue | undefined>(undefined)

const useToggleGroupContext = () => {
  const context = useContext(ToggleGroupContext)
  if (!context) {
    throw new Error('ToggleGroup components must be used within a ToggleGroup provider')
  }
  return context
}

interface ToggleGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'single' | 'multiple'
  value?: string | string[]
  defaultValue?: string | string[]
  onValueChange?: (value: string | string[]) => void
}

const ToggleGroup = forwardRef<HTMLDivElement, ToggleGroupProps>(
  ({ type = 'single', value, defaultValue = type === 'single' ? '' : [], onValueChange, className, children, ...props }, ref) => {
    const [internalValue, setInternalValue] = useState(value !== undefined ? value : defaultValue)
    const currentValue = value !== undefined ? value : internalValue

    const handleValueChange = (itemValue: string) => {
      let newValue: string | string[]

      if (type === 'single') {
        newValue = currentValue === itemValue ? '' : itemValue
      } else {
        const currentArray = Array.isArray(currentValue) ? currentValue : []
        newValue = currentArray.includes(itemValue)
          ? currentArray.filter(v => v !== itemValue)
          : [...currentArray, itemValue]
      }

      if (value === undefined) {
        setInternalValue(newValue)
      }
      onValueChange?.(newValue)
    }

    return (
      <ToggleGroupContext.Provider value={{ value: currentValue, onValueChange: handleValueChange, type }}>
        <div
          ref={ref}
          role="group"
          className={cn('inline-flex items-center rounded-theme-lg bg-neu-base shadow-neu-pressed-sm p-1', className)}
          {...props}
        >
          {children}
        </div>
      </ToggleGroupContext.Provider>
    )
  }
)
ToggleGroup.displayName = 'ToggleGroup'

interface ToggleGroupItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}

const ToggleGroupItem = forwardRef<HTMLButtonElement, ToggleGroupItemProps>(
  ({ value, className, children, ...props }, ref) => {
    const { value: groupValue, onValueChange, type } = useToggleGroupContext()

    const isActive = type === 'single'
      ? groupValue === value
      : Array.isArray(groupValue) && groupValue.includes(value)

    return (
      <button
        ref={ref}
        type="button"
        role={type === 'single' ? 'radio' : 'checkbox'}
        aria-checked={isActive}
        onClick={() => onValueChange(value)}
        className={cn(
          'inline-flex items-center justify-center rounded-theme-md px-3 py-1.5 cursor-pointer',
          'text-sm font-medium transition-all duration-200',
          'focus-visible:outline-none focus-visible:shadow-neu-focus',
          'disabled:pointer-events-none disabled:opacity-50',
          isActive
            ? 'bg-neu-base text-foreground shadow-neu-raised-sm'
            : 'text-muted-foreground hover:text-foreground',
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
ToggleGroupItem.displayName = 'ToggleGroupItem'

export { ToggleGroup, ToggleGroupItem }
