import { cn } from '@/lib/utils'
import { Check, ChevronDown, Search } from 'lucide-react'
import { forwardRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { SmoothScroll } from './SmoothScroll'

// Shared spring config for consistent motion
const spring = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 30,
}

interface ComboboxOption {
  value: string
  label: string
}

interface ComboboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  options: ComboboxOption[]
  placeholder?: string
  onValueChange?: (value: string) => void
  value?: string
  defaultValue?: string
}

const Combobox = forwardRef<HTMLInputElement, ComboboxProps>(
  ({ options, placeholder, onValueChange, value, defaultValue = '', className, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedValue, setSelectedValue] = useState(defaultValue)
    const [searchQuery, setSearchQuery] = useState('')
    const currentValue = value !== undefined ? value : selectedValue

    const selectedOption = options.find(opt => opt.value === currentValue)

    const filteredOptions = options.filter(option =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleSelect = (optionValue: string) => {
      if (value === undefined) {
        setSelectedValue(optionValue)
      }
      onValueChange?.(optionValue)
      setIsOpen(false)
      setSearchQuery('')
    }

    return (
      <div className="relative w-full">
        <motion.button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className={cn(
            'flex h-10 w-full items-center justify-between rounded-theme-lg border border-border',
            'bg-background px-3 py-2 text-sm text-foreground cursor-pointer',
            'transition-colors duration-200',
            'hover:bg-slate-400 hover:border-foreground/30',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
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
              className="absolute z-50 mt-1 w-full rounded-theme-md border border-border bg-background shadow-theme-lg glass origin-top"
            >
              <div className="p-2 border-b border-border">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    ref={ref}
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={cn(
                      'flex h-9 w-full rounded-theme-md border border-border bg-background pl-9 pr-3 py-2',
                      'text-sm text-foreground placeholder:text-muted-foreground',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
                    )}
                  />
                </div>
              </div>
              <SmoothScroll className="p-1 max-h-60 overflow-auto">
                {filteredOptions.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-6 text-center text-sm text-muted-foreground"
                  >
                    No results found.
                  </motion.div>
                ) : (
                  filteredOptions.map((option) => (
                    <motion.button
                      key={option.value}
                      type="button"
                      onClick={() => handleSelect(option.value)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={cn(
                        'relative flex w-full cursor-pointer select-none items-center rounded-theme-sm px-2 py-1.5',
                        'text-sm outline-none transition-colors',
                        'hover:bg-muted focus-visible:bg-muted',
                        currentValue === option.value && 'bg-muted'
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
                  ))
                )}
              </SmoothScroll>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

Combobox.displayName = 'Combobox'

export { Combobox }
export type { ComboboxOption }
