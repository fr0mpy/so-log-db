'use client'

import {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  cloneElement,
  isValidElement,
  useEffect,
} from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/utils/cn'
import {
  usePositioning,
  useClickOutside,
  SPRING_CONFIG,
  type Side,
} from '../../hooks'
import { PopoverStyles as S } from './styles'
import type {
  PopoverRootProps,
  PopoverTriggerProps,
  PopoverPortalProps,
  PopoverPositionerProps,
  PopoverPopupProps,
  PopoverArrowProps,
  PopoverCloseProps,
  PopoverContextValue,
} from './types'

// ============================================================================
// Context
// ============================================================================

const PopoverContext = createContext<PopoverContextValue | null>(null)

function usePopoverContext() {
  const context = useContext(PopoverContext)
  if (!context) {
    throw new Error('Popover components must be used within Popover.Root')
  }
  return context
}

// ============================================================================
// Root
// ============================================================================

function PopoverRoot({
  children,
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
}: PopoverRootProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
  const [side, setSide] = useState<Side>('bottom')
  const triggerRef = useRef<HTMLButtonElement>(null)

  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen

  const setOpen = useCallback(
    (value: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(value)
      }
      onOpenChange?.(value)
    },
    [isControlled, onOpenChange]
  )

  return (
    <PopoverContext.Provider
      value={{ open, setOpen, triggerRef, side, setSide }}
    >
      {children}
    </PopoverContext.Provider>
  )
}

// ============================================================================
// Trigger
// ============================================================================

function PopoverTrigger({ asChild, children, onClick, ref, ...props }: PopoverTriggerProps) {
  const { open, setOpen, triggerRef } = usePopoverContext()

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setOpen(!open)
      onClick?.(e)
    },
    [open, setOpen, onClick]
  )

  // Merge refs
  const mergedRef = useCallback(
    (node: HTMLButtonElement | null) => {
      if (typeof ref === 'function') {
        ref(node)
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node
      }
      (triggerRef as React.MutableRefObject<HTMLButtonElement | null>).current = node
    },
    [ref, triggerRef]
  )

  if (asChild && isValidElement(children)) {
    return cloneElement(children as React.ReactElement<Record<string, unknown>>, {
      ref: mergedRef,
      onClick: handleClick,
      'aria-expanded': open,
      'aria-haspopup': 'dialog',
      ...props,
    })
  }

  return (
    <button
      ref={mergedRef}
      type="button"
      onClick={handleClick}
      aria-expanded={open}
      aria-haspopup="dialog"
      {...props}
    >
      {children}
    </button>
  )
}

// ============================================================================
// Portal
// ============================================================================

function PopoverPortal({ children, container }: PopoverPortalProps) {
  const { open } = usePopoverContext()

  if (!open) return null

  return createPortal(children, container ?? document.body)
}

// ============================================================================
// Positioner
// ============================================================================

function PopoverPositioner({
  children,
  side = 'bottom',
  className,
}: PopoverPositionerProps) {
  const { setSide, triggerRef, setOpen } = usePopoverContext()
  const positionerRef = useRef<HTMLDivElement>(null)

  // Update side in context when prop changes
  useEffect(() => {
    setSide(side)
  }, [side, setSide])

  // Close on click outside
  useClickOutside(positionerRef, () => setOpen(false), true)

  // Get trigger position for absolute positioning
  const triggerRect = triggerRef.current?.getBoundingClientRect()

  if (!triggerRect) return null

  // Calculate position relative to viewport
  const getPositionStyles = (): React.CSSProperties => {
    const gap = 8

    switch (side) {
      case 'top':
        return {
          position: 'fixed',
          left: triggerRect.left + triggerRect.width / 2,
          top: triggerRect.top - gap,
          transform: 'translate(-50%, -100%)',
        }
      case 'bottom':
        return {
          position: 'fixed',
          left: triggerRect.left + triggerRect.width / 2,
          top: triggerRect.bottom + gap,
          transform: 'translateX(-50%)',
        }
      case 'left':
        return {
          position: 'fixed',
          left: triggerRect.left - gap,
          top: triggerRect.top + triggerRect.height / 2,
          transform: 'translate(-100%, -50%)',
        }
      case 'right':
        return {
          position: 'fixed',
          left: triggerRect.right + gap,
          top: triggerRect.top + triggerRect.height / 2,
          transform: 'translateY(-50%)',
        }
    }
  }

  return (
    <div
      ref={positionerRef}
      className={cn(S.positioner, className)}
      style={getPositionStyles()}
    >
      {children}
    </div>
  )
}

// ============================================================================
// Popup
// ============================================================================

function PopoverPopup({ children, className, ref }: PopoverPopupProps) {
  const { side, open } = usePopoverContext()
  const { originClass, initialOffset } = usePositioning(side)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          role="dialog"
          initial={{ opacity: 0, scale: 0.95, ...initialOffset }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, ...initialOffset }}
          transition={SPRING_CONFIG.default}
          className={cn(S.popup.base, originClass, className)}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ============================================================================
// Arrow
// ============================================================================

function PopoverArrow({ className }: PopoverArrowProps) {
  const { side } = usePopoverContext()
  const { arrowClasses, arrowRotation } = usePositioning(side)

  return (
    <span
      className={cn(S.arrow.base, arrowClasses, className)}
      style={{ transform: `rotate(${arrowRotation}deg)` }}
      aria-hidden="true"
    />
  )
}

// ============================================================================
// Close
// ============================================================================

function PopoverClose({ asChild, children, onClick, ref, ...props }: PopoverCloseProps) {
  const { setOpen } = usePopoverContext()

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setOpen(false)
      onClick?.(e)
    },
    [setOpen, onClick]
  )

  if (asChild && isValidElement(children)) {
    return cloneElement(children as React.ReactElement<Record<string, unknown>>, {
      ref,
      onClick: handleClick,
      ...props,
    })
  }

  return (
    <button ref={ref} type="button" onClick={handleClick} {...props}>
      {children ?? (
        <span className={S.srOnly}>Close</span>
      )}
    </button>
  )
}

// ============================================================================
// Simple Wrapper (backward compatibility)
// ============================================================================

interface PopoverSimpleProps {
  trigger: React.ReactNode
  children: React.ReactNode
  side?: Side
  showArrow?: boolean
}

function PopoverSimple({
  trigger,
  children,
  side = 'bottom',
  showArrow = true,
}: PopoverSimpleProps) {
  return (
    <PopoverRoot>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverPortal>
        <PopoverPositioner side={side}>
          <PopoverPopup>
            {children}
            {showArrow && <PopoverArrow />}
          </PopoverPopup>
        </PopoverPositioner>
      </PopoverPortal>
    </PopoverRoot>
  )
}

// ============================================================================
// Namespace Export (callable + namespace)
// ============================================================================

export const Popover = Object.assign(PopoverSimple, {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Portal: PopoverPortal,
  Positioner: PopoverPositioner,
  Popup: PopoverPopup,
  Arrow: PopoverArrow,
  Close: PopoverClose,
})
