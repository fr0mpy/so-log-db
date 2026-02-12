'use client'

import { cn } from '@/utils/cn'
import { Check, ChevronDown, Search } from 'lucide-react'
import {
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

// Animation variants - scaleY from top keeps dropdown under trigger
const positionerVariants = {
  initial: { opacity: 0, scaleY: 0 },
  animate: {
    opacity: 1,
    scaleY: 1,
    transition: SPRING.selectOpen,
  },
  exit: {
    opacity: 0,
    scaleY: 0,
    transition: SPRING.selectClose,
  },
}
import { SelectStyles as S } from './styles'
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
function SelectRoot({
  children,
  value,
  defaultValue = '',
  onValueChange,
  disabled = false,
  searchable = false,
  triggerMode = 'hover',
}: SelectRootProps) {
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
      triggerMode,
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
      triggerMode,
    ]
  )

  return <SelectContext.Provider value={contextValue}>{children}</SelectContext.Provider>
}

// Select.Trigger - The button that opens the dropdown
function SelectTrigger({ children, className, ref }: SelectTriggerProps) {
  const { isOpen, setIsOpen, triggerRef, disabled, triggerMode } = useSelectContext()

  const handleMouseEnter = useCallback(() => {
    if (!disabled && triggerMode === 'hover') setIsOpen(true)
  }, [disabled, setIsOpen, triggerMode])

  const handleClick = useCallback(() => {
    if (!disabled && triggerMode === 'click') setIsOpen(!isOpen)
  }, [disabled, setIsOpen, triggerMode, isOpen])

  // Combine refs
  const combinedRef = (node: HTMLButtonElement | null) => {
    if (typeof ref === 'function') {
      ref(node)
    } else if (ref) {
      (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node
    }
    ;(triggerRef as React.MutableRefObject<HTMLButtonElement | null>).current = node
  }

  return (
    <motion.button
      ref={combinedRef}
      type="button"
      disabled={disabled}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      whileTap={{ scale: 0.99 }}
      className={cn(
        S.trigger.base,
        isOpen && S.trigger.open,
        className
      )}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
    >
      {children}
    </motion.button>
  )
}

// Select.Value - Displays the selected value
function SelectValue({ placeholder = PLACEHOLDER.select }: SelectValueProps) {
  const { value } = useSelectContext()

  return (
    <span className={cn(!value && S.value.placeholder)}>
      {value || placeholder}
    </span>
  )
}

// Select.Icon - The chevron icon
function SelectIcon({ className }: SelectIconProps) {
  const { isOpen } = useSelectContext()

  return (
    <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={spring}>
      <ChevronDown className={cn(S.icon, className)} />
    </motion.span>
  )
}

// Select.Portal - Renders children in a portal
function SelectPortal({ children }: SelectPortalProps) {
  const { isOpen } = useSelectContext()

  return createPortal(
    <AnimatePresence>{isOpen && children}</AnimatePresence>,
    document.body
  )
}

// Select.Positioner - Positions the dropdown
function SelectPositioner({ children }: SelectPositionerProps) {
  const { dropdownPosition, dropdownRef, setIsOpen, triggerRef, setSearchQuery, triggerMode } = useSelectContext()

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent) => {
      // Only close on mouse leave for hover mode
      if (triggerMode !== 'hover') return

      // Check if moving back to the trigger
      const relatedTarget = e.relatedTarget as Node
      if (triggerRef.current?.contains(relatedTarget)) {
        return
      }
      setIsOpen(false)
      setSearchQuery('')
    },
    [setIsOpen, setSearchQuery, triggerRef, triggerMode]
  )

  return (
    <motion.div
      ref={dropdownRef}
      variants={positionerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'fixed',
        top: dropdownPosition.top,
        left: dropdownPosition.left,
        width: dropdownPosition.width,
      }}
      className={S.positioner}
    >
      {children}
    </motion.div>
  )
}

// Select.Popup - The dropdown container
function SelectPopup({ children, className, ref }: SelectPopupProps) {
  return (
    <div
      ref={ref}
      role="listbox"
      className={cn(S.popup, className)}
    >
      {children}
    </div>
  )
}

// Select.Search - Search input for searchable selects
function SelectSearch({ placeholder = PLACEHOLDER.search, className }: SelectSearchProps) {
  const { searchQuery, setSearchQuery, searchable } = useSelectContext()

  if (!searchable) return null

  return (
    <div className={S.search.wrapper}>
      <Input
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        leftIcon={<Search className={S.icon} />}
        className={cn(S.search.input, className)}
      />
    </div>
  )
}

// Select.Option - Individual option
function SelectOption({ value: optionValue, children, className, ref }: SelectOptionProps) {
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
        S.option.base,
        isSelected && S.option.selected,
        className
      )}
    >
      <Check
        className={cn(
          S.checkIcon.base,
          isSelected ? S.checkIcon.selected : S.checkIcon.unselected
        )}
      />
      {children}
    </motion.button>
  )
}

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
