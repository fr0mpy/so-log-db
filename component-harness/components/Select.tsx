import { cn } from '@/lib/utils'
import { Check, ChevronDown } from 'lucide-react'
import { forwardRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { SmoothScroll } from './SmoothScroll'

// Shared spring config for consistent motion
const spring = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 30,
}

interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  options: SelectOption[]
  placeholder?: string
  onValueChange?: (value: string) => void
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, placeholder, onValueChange, value, defaultValue, className, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedValue, setSelectedValue] = useState(defaultValue as string || '')
    const currentValue = value !== undefined ? value : selectedValue

    const selectedOption = options.find(opt => opt.value === currentValue)

    const handleSelect = (optionValue: string) => {
      if (value === undefined) {
        setSelectedValue(optionValue)
      }
      onValueChange?.(optionValue)
      setIsOpen(false)
    }

    return (
      <div className="relative w-full">
        <motion.button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className={cn(
            'flex h-10 w-full items-center justify-between rounded-theme-lg',
            'bg-neu-base shadow-neu-raised px-3 py-2 text-sm text-foreground cursor-pointer',
            'transition-shadow duration-200',
            'hover:shadow-neu-raised-lg',
            'focus-visible:outline-none focus-visible:shadow-[var(--shadow-raised),var(--shadow-focus)]',
            'disabled:cursor-not-allowed disabled:opacity-50',
            isOpen && 'shadow-neu-pressed-sm',
            className
          )}
          {...props}
        >
          <span className={cn(!selectedOption && 'text-muted-foreground')}>
            {selectedOption?.label || placeholder || 'Select...'}
          </span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={spring}
          >
            <ChevronDown className="h-4 w-4 opacity-50" />
          </motion.span>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -4 }}
              transition={spring}
              className="absolute z-50 mt-1 w-full rounded-theme-md bg-neu-base shadow-neu-raised-lg origin-top"
            >
              <SmoothScroll className="p-1 max-h-60 overflow-auto">
                {options.map((option) => (
                  <motion.button
                    key={option.value}
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={cn(
                      'relative flex w-full cursor-pointer select-none items-center rounded-theme-sm px-2 py-1.5',
                      'text-sm outline-none transition-shadow duration-150',
                      'hover:shadow-neu-pressed-sm focus-visible:shadow-neu-pressed-sm',
                      currentValue === option.value && 'shadow-neu-pressed-sm bg-muted/30'
                    )}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4 transition-opacity duration-150',
                        currentValue === option.value ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    {option.label}
                  </motion.button>
                ))}
              </SmoothScroll>
            </motion.div>
          )}
        </AnimatePresence>

        <select
          ref={ref}
          value={currentValue}
          onChange={(e) => {
            if (value === undefined) {
              setSelectedValue(e.target.value)
            }
            onValueChange?.(e.target.value)
          }}
          className="sr-only"
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    )
  }
)

Select.displayName = 'Select'

export { Select }
export type { SelectOption }
