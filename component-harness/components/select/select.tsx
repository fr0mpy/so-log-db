import { cn } from '@/lib/utils'
import { Check, ChevronDown, Search } from 'lucide-react'
import {
  forwardRef,
  useRef,
  useLayoutEffect,
  useMemo,
  useCallback,
  createContext,
  useContext,
} from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'motion/react'
import { Input } from '../form/input'
import { useControlledState } from '../../hooks/useControlledState'
import { useClickOutsideMultiple } from '../../hooks/useClickOutside'
import { SPRING, PLACEHOLDER } from '../../config'
import type {
  SelectContextValue,
  SelectRootProps,
  SelectTriggerProps,
  SelectValueProps,
  SelectIconProps,
  SelectPortalProps,
  SelectPositionerProps,
  SelectPopupProps,
  SelectOptionProps,
  SelectSearchProps,
} from './types'

// Shared spring config for consistent motion
const spring = SPRING.default

// Context
const SelectContext = createContext<SelectContextValue | undefined>(undefined)

const useSelectContext = () => {
  const context = useContext(SelectContext)
  if (!context) {
    throw new Error('Select components must be used within a Select.Root')
  }
  return context
}

// Select.Root - Context provider
const SelectRoot = ({
  children,
  value,
  defaultValue = '',
  onValueChange,
  disabled = false,
  searchable = false,
}: SelectRootProps) => {
  const [currentValue, setValue] = useControlledState(value, defaultValue, onValueChange)
  const [isOpen, setIsOpen] = useControlledState<boolean>(undefined, false)
  const [searchQuery, setSearchQuery] = useControlledState<string>(undefined, '')
  const triggerRef = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [dropdownPosition, setDropdownPosition] = useControlledState<{
    top: number
    left: number
    width: number
  }>(undefined, { top: 0, left: 0, width: 0 })

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
  }, [isOpen, setDropdownPosition])

  // Close on click outside
  useClickOutsideMultiple(
    [triggerRef as React.RefObject<HTMLElement>, dropdownRef as React.RefObject<HTMLElement>],
    () => {
      if (isOpen) {
        setIsOpen(false)
        setSearchQuery('')
      }
    },
    isOpen
  )

  const contextValue = useMemo<SelectContextValue>(
    () => ({
      isOpen,
      setIsOpen,
      value: currentValue,
      setValue: (newValue: string) => {
        setValue(newValue)
        setIsOpen(false)
        setSearchQuery('')
      },
      searchQuery,
      setSearchQuery,
      triggerRef,
      dropdownRef,
      dropdownPosition,
      disabled,
      searchable,
    }),
    [
      isOpen,
      setIsOpen,
      currentValue,
      setValue,
      searchQuery,
      setSearchQuery,
      dropdownPosition,
      disabled,
      searchable,
    ]
  )

  return <SelectContext.Provider value={contextValue}>{children}</SelectContext.Provider>
}
SelectRoot.displayName = 'Select.Root'

// Select.Trigger - The button that opens the dropdown
const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ children, className }, ref) => {
    const { isOpen, setIsOpen, triggerRef, disabled } = useSelectContext()

    const handleMouseEnter = useCallback(() => {
      if (!disabled) setIsOpen(true)
    }, [disabled, setIsOpen])

    // Combine refs
    const combinedRef = (node: HTMLButtonElement | null) => {
      if (typeof ref === 'function') {
        ref(node)
      } else if (ref) {
        ref.current = node
      }
      ;(triggerRef as React.MutableRefObject<HTMLButtonElement | null>).current = node
    }

    return (
      <motion.button
        ref={combinedRef}
        type="button"
        disabled={disabled}
        onMouseEnter={handleMouseEnter}
        whileTap={{ scale: 0.99 }}
        className={cn(
          'relative flex h-10 w-full items-center justify-between rounded-theme-lg',
          'bg-neu-base shadow-neu-raised px-3 py-2 text-sm text-foreground cursor-pointer',
          'focus-visible:outline-none focus-visible:shadow-[var(--shadow-raised),var(--shadow-focus)]',
          'disabled:cursor-not-allowed disabled:opacity-50',
          isOpen && 'z-popover',
          className
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {children}
      </motion.button>
    )
  }
)
SelectTrigger.displayName = 'Select.Trigger'

// Select.Value - Displays the selected value
const SelectValue = ({ placeholder = PLACEHOLDER.select }: SelectValueProps) => {
  const { value } = useSelectContext()

  return (
    <span className={cn(!value && 'text-muted-foreground')}>
      {value || placeholder}
    </span>
  )
}
SelectValue.displayName = 'Select.Value'

// Select.Icon - The chevron icon
const SelectIcon = ({ className }: SelectIconProps) => {
  const { isOpen } = useSelectContext()

  return (
    <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={spring}>
      <ChevronDown className={cn('h-4 w-4 opacity-50', className)} />
    </motion.span>
  )
}
SelectIcon.displayName = 'Select.Icon'

// Select.Portal - Renders children in a portal
const SelectPortal = ({ children }: SelectPortalProps) => {
  const { isOpen } = useSelectContext()

  return createPortal(
    <AnimatePresence>{isOpen && children}</AnimatePresence>,
    document.body
  )
}
SelectPortal.displayName = 'Select.Portal'

// Select.Positioner - Positions the dropdown
const SelectPositioner = ({ children }: SelectPositionerProps) => {
  const { dropdownPosition, dropdownRef, setIsOpen, triggerRef, setSearchQuery } = useSelectContext()

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent) => {
      // Check if moving back to the trigger
      const relatedTarget = e.relatedTarget as Node
      if (triggerRef.current?.contains(relatedTarget)) {
        return
      }
      setIsOpen(false)
      setSearchQuery('')
    },
    [setIsOpen, setSearchQuery, triggerRef]
  )

  return (
    <motion.div
      ref={dropdownRef}
      initial={{ clipPath: 'inset(0 0 100% 0)' }}
      animate={{ clipPath: 'inset(0 0 0 0)' }}
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      transition={SPRING.bouncy}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'fixed',
        top: dropdownPosition.top,
        left: dropdownPosition.left,
        width: dropdownPosition.width,
      }}
      className="z-popover"
    >
      {children}
    </motion.div>
  )
}
SelectPositioner.displayName = 'Select.Positioner'

// Select.Popup - The dropdown container
const SelectPopup = forwardRef<HTMLDivElement, SelectPopupProps>(
  ({ children, className }, ref) => {
    return (
      <div
        ref={ref}
        role="listbox"
        className={cn(
          'rounded-theme-md bg-neu-base shadow-neu-raised-lg border border-white/40 dark:border-white/10',
          className
        )}
      >
        {children}
      </div>
    )
  }
)
SelectPopup.displayName = 'Select.Popup'

// Select.Search - Search input for searchable selects
const SelectSearch = ({ placeholder = PLACEHOLDER.search, className }: SelectSearchProps) => {
  const { searchQuery, setSearchQuery, searchable } = useSelectContext()

  if (!searchable) return null

  return (
    <div className="p-2 pt-4 border-b border-border/30">
      <Input
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        leftIcon={<Search className="h-4 w-4" />}
        className={cn('h-9', className)}
      />
    </div>
  )
}
SelectSearch.displayName = 'Select.Search'

// Select.Option - Individual option
const SelectOption = forwardRef<HTMLButtonElement, SelectOptionProps>(
  ({ value: optionValue, children, className }, ref) => {
    const { value, setValue } = useSelectContext()
    const isSelected = value === optionValue

    const handleClick = useCallback(() => {
      setValue(optionValue)
    }, [setValue, optionValue])

    return (
      <motion.button
        ref={ref}
        type="button"
        role="option"
        aria-selected={isSelected}
        onClick={handleClick}
        whileTap={{ scale: 0.99 }}
        className={cn(
          'relative flex w-full cursor-pointer select-none items-center rounded-theme-sm px-2 py-1.5',
          'text-sm outline-none transition-colors',
          'hover:bg-muted focus-visible:bg-muted',
          isSelected && 'bg-muted',
          className
        )}
      >
        <Check
          className={cn(
            'mr-2 h-4 w-4 transition-opacity duration-150',
            isSelected ? 'opacity-100' : 'opacity-0'
          )}
        />
        {children}
      </motion.button>
    )
  }
)
SelectOption.displayName = 'Select.Option'

// Namespace export
export const Select = {
  Root: SelectRoot,
  Trigger: SelectTrigger,
  Value: SelectValue,
  Icon: SelectIcon,
  Portal: SelectPortal,
  Positioner: SelectPositioner,
  Popup: SelectPopup,
  Option: SelectOption,
  Search: SelectSearch,
}

// Re-export context hook for advanced use cases
export { useSelectContext }
