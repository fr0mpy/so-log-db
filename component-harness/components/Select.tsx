import { cn } from '@/lib/utils'
import { Check, ChevronDown, Search } from 'lucide-react'
import { forwardRef, useState, useRef, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'motion/react'
import { ScrollArea } from './ScrollArea'
import { Input } from './Input'

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
  searchable?: boolean
  onValueChange?: (value: string) => void
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, placeholder, searchable = false, onValueChange, value, defaultValue, className, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedValue, setSelectedValue] = useState(defaultValue as string || '')
    const [searchQuery, setSearchQuery] = useState('')
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 })
    const triggerRef = useRef<HTMLButtonElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const currentValue = value !== undefined ? value : selectedValue

    const selectedOption = options.find(opt => opt.value === currentValue)

    const filteredOptions = searchable
      ? options.filter(option => option.label.toLowerCase().includes(searchQuery.toLowerCase()))
      : options

    // Update dropdown position when opening
    useLayoutEffect(() => {
      if (isOpen && triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect()
        const dropdownWidth = rect.width * 0.98
        const horizontalOffset = (rect.width - dropdownWidth) / 2
        setDropdownPosition({
          top: rect.bottom - 4, // -4 for the overlap effect
          left: rect.left + horizontalOffset,
          width: dropdownWidth,
        })
      }
    }, [isOpen])

    const handleSelect = (optionValue: string) => {
      if (value === undefined) {
        setSelectedValue(optionValue)
      }
      onValueChange?.(optionValue)
      setIsOpen(false)
      setSearchQuery('')
    }

    const handleTriggerMouseEnter = () => setIsOpen(true)

    const handleTriggerMouseLeave = (e: React.MouseEvent) => {
      // Check if moving to the dropdown
      const relatedTarget = e.relatedTarget as Node
      if (dropdownRef.current?.contains(relatedTarget)) {
        return
      }
      setIsOpen(false)
    }

    const handleDropdownMouseLeave = (e: React.MouseEvent) => {
      // Check if moving back to the trigger
      const relatedTarget = e.relatedTarget as Node
      if (triggerRef.current?.contains(relatedTarget)) {
        return
      }
      setIsOpen(false)
    }

    return (
      <div className="relative w-full">
        <motion.button
          ref={triggerRef}
          type="button"
          onMouseEnter={handleTriggerMouseEnter}
          onMouseLeave={handleTriggerMouseLeave}
          whileTap={{ scale: 0.99 }}
          className={cn(
            'relative flex h-10 w-full items-center justify-between rounded-theme-lg',
            'bg-neu-base shadow-neu-raised px-3 py-2 text-sm text-foreground cursor-pointer',
            'focus-visible:outline-none focus-visible:shadow-[var(--shadow-raised),var(--shadow-focus)]',
            'disabled:cursor-not-allowed disabled:opacity-50',
            isOpen && 'z-[10000]',
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

        {createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                ref={dropdownRef}
                initial={{ clipPath: 'inset(0 0 100% 0)' }}
                animate={{ clipPath: 'inset(0 0 0 0)' }}
                exit={{ clipPath: 'inset(0 0 100% 0)' }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                onMouseLeave={handleDropdownMouseLeave}
                style={{
                  position: 'fixed',
                  top: dropdownPosition.top,
                  left: dropdownPosition.left,
                  width: dropdownPosition.width,
                }}
                className="z-[9999] rounded-theme-md bg-neu-base shadow-neu-raised-lg border border-white/40 dark:border-white/10"
              >
                {searchable && (
                  <div className="p-2 pt-4 border-b border-border/30">
                    <Input
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      leftIcon={<Search className="h-4 w-4" />}
                      className="h-9"
                    />
                  </div>
                )}
                <ScrollArea className="p-1 max-h-60 overflow-auto">
                  {filteredOptions.length === 0 ? (
                    <div className="py-6 text-center text-sm text-muted-foreground">
                      No results found.
                    </div>
                  ) : (
                    filteredOptions.map((option) => (
                      <motion.button
                        key={option.value}
                        type="button"
                        onClick={() => handleSelect(option.value)}
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
                </ScrollArea>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}

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
