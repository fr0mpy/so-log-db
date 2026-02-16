'use client'

import { cn } from '@/utils/cn'
import { ChevronDown, Search } from 'lucide-react'
import {
  useRef,
  useLayoutEffect,
  useEffect,
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

// Animation variants - slide out from behind trigger (last item appears first)
// Shadow fades in only once expanded to avoid visible clip edge
const slideDownVariants = {
  initial: {
    y: '-100%',
    boxShadow: 'none',
  },
  animate: {
    y: 0,
    boxShadow: 'var(--shadow-raised-lg)',
    transition: SPRING.selectOpen,
  },
  exit: {
    y: '-100%',
    boxShadow: 'none',
    transition: SPRING.selectClose,
  },
}

// Animation variants for top placement - slide up from behind trigger
const slideUpVariants = {
  initial: {
    y: '100%',
    boxShadow: 'none',
  },
  animate: {
    y: 0,
    boxShadow: 'var(--shadow-raised-lg)',
    transition: SPRING.selectOpen,
  },
  exit: {
    y: '100%',
    boxShadow: 'none',
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
  width = 'full',
  placement = 'bottom',
}: SelectRootProps) {
  const [currentValue, setValue] = useControlledState(value, defaultValue, onValueChange)
  const [isOpen, setIsOpen] = useControlledState<boolean>(undefined, false)
  const [searchQuery, setSearchQuery] = useControlledState<string>(undefined, '')
  const triggerRef = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Use ref to lock position during entire animation lifecycle (including exit)
  const lockedPositionRef = useRef<{ top: number; left: number; minWidth: number } | null>(null)
  const [dropdownPosition, setDropdownPosition] = useControlledState<{
    top: number
    left: number
    minWidth: number
  }>(undefined, { top: 0, left: 0, minWidth: 0 })

  // Update dropdown position when opening - lock it in ref
  useLayoutEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      const position = {
        // For 'top' placement, dropdown ends at trigger top; for 'bottom', starts at trigger bottom
        top: placement === 'top' ? rect.top : rect.bottom,
        left: rect.left,
        minWidth: rect.width,
      }
      lockedPositionRef.current = position
      setDropdownPosition(position)
    }
  }, [isOpen, setDropdownPosition, placement])

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

  // Close on scroll to prevent dropdown from detaching from trigger
  useEffect(() => {
    if (!isOpen) return

    const handleScroll = () => {
      setIsOpen(false)
      setSearchQuery('')
    }

    // Listen on window and capture phase to catch all scroll events
    window.addEventListener('scroll', handleScroll, true)
    return () => window.removeEventListener('scroll', handleScroll, true)
  }, [isOpen, setIsOpen, setSearchQuery])

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
      lockedPositionRef,
      disabled,
      searchable,
      triggerMode,
      width,
      placement,
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
      width,
      placement,
    ]
  )

  return <SelectContext.Provider value={contextValue}>{children}</SelectContext.Provider>
}

// Select.Trigger - The button that opens the dropdown
function SelectTrigger({ children, className, ref }: SelectTriggerProps) {
  const { isOpen, setIsOpen, triggerRef, dropdownRef, setSearchQuery, disabled, triggerMode, width } = useSelectContext()

  const handleMouseEnter = useCallback(() => {
    if (!disabled && triggerMode === 'hover') setIsOpen(true)
  }, [disabled, setIsOpen, triggerMode])

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent) => {
      // Only handle for hover mode
      if (triggerMode !== 'hover') return

      // Check if moving into the dropdown
      const relatedTarget = e.relatedTarget as Node
      if (dropdownRef.current?.contains(relatedTarget)) {
        return
      }
      setIsOpen(false)
      setSearchQuery('')
    },
    [setIsOpen, setSearchQuery, dropdownRef, triggerMode]
  )

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
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      whileTap={{ scale: 0.99 }}
      className={cn(
        S.trigger.base,
        S.trigger.width[width],
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

  // Guard against SSR - document not available on server
  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>{isOpen && children}</AnimatePresence>,
    document.body
  )
}

// Select.Positioner - Positions the dropdown
function SelectPositioner({ children }: SelectPositionerProps) {
  const { dropdownPosition, lockedPositionRef, dropdownRef, setIsOpen, triggerRef, setSearchQuery, triggerMode, placement } = useSelectContext()

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

  // Use locked position (ref) to ensure animation returns to origin point
  const position = lockedPositionRef.current ?? dropdownPosition

  // For 'top' placement, position using bottom instead of top
  const positionStyle = placement === 'top'
    ? {
        position: 'fixed' as const,
        bottom: typeof window !== 'undefined' ? window.innerHeight - position.top : 0,
        left: position.left,
        width: position.minWidth,
      }
    : {
        position: 'fixed' as const,
        top: position.top,
        left: position.left,
        width: position.minWidth,
      }

  return (
    <div
      ref={dropdownRef}
      onMouseLeave={handleMouseLeave}
      style={positionStyle}
      className={cn(S.positioner.base, placement === 'top' ? S.positioner.top : S.positioner.bottom)}
    >
      {children}
    </div>
  )
}

// Select.Popup - The dropdown container with slide animation (last item appears first)
function SelectPopup({ children, className, ref }: SelectPopupProps) {
  const { placement } = useSelectContext()
  const variants = placement === 'top' ? slideUpVariants : slideDownVariants

  return (
    <motion.div
      ref={ref}
      role="listbox"
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={cn(S.popup, className)}
    >
      {children}
    </motion.div>
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
