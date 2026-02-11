'use client'

import {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  forwardRef,
  cloneElement,
  isValidElement,
  useEffect,
} from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'
import { usePositioning, SPRING_CONFIG, type Side } from '../../hooks'
import type {
  HoverCardRootProps,
  HoverCardTriggerProps,
  HoverCardPortalProps,
  HoverCardPositionerProps,
  HoverCardPopupProps,
  HoverCardArrowProps,
  HoverCardContextValue,
} from './types'

// ============================================================================
// Context
// ============================================================================

const HoverCardContext = createContext<HoverCardContextValue | null>(null)

function useHoverCardContext() {
  const context = useContext(HoverCardContext)
  if (!context) {
    throw new Error('HoverCard components must be used within HoverCard.Root')
  }
  return context
}

// ============================================================================
// Root
// ============================================================================

function HoverCardRoot({
  children,
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  openDelay = 200,
  closeDelay = 300,
}: HoverCardRootProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
  const [side, setSide] = useState<Side>('bottom')
  const triggerRef = useRef<HTMLElement>(null)
  const openTimerRef = useRef<ReturnType<typeof setTimeout>>()
  const closeTimerRef = useRef<ReturnType<typeof setTimeout>>()

  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen

  const setOpen = useCallback(
    (value: boolean) => {
      // Clear any pending timers
      if (openTimerRef.current) {
        clearTimeout(openTimerRef.current)
        openTimerRef.current = undefined
      }
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current)
        closeTimerRef.current = undefined
      }

      const delay = value ? openDelay : closeDelay

      if (delay > 0) {
        const timerRef = value ? openTimerRef : closeTimerRef
        timerRef.current = setTimeout(() => {
          if (!isControlled) {
            setUncontrolledOpen(value)
          }
          onOpenChange?.(value)
        }, delay)
      } else {
        if (!isControlled) {
          setUncontrolledOpen(value)
        }
        onOpenChange?.(value)
      }
    },
    [isControlled, onOpenChange, openDelay, closeDelay]
  )

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (openTimerRef.current) {
        clearTimeout(openTimerRef.current)
      }
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current)
      }
    }
  }, [])

  return (
    <HoverCardContext.Provider
      value={{ open, setOpen, triggerRef, side, setSide, openDelay, closeDelay }}
    >
      {children}
    </HoverCardContext.Provider>
  )
}

HoverCardRoot.displayName = 'HoverCard.Root'

// ============================================================================
// Trigger
// ============================================================================

const HoverCardTrigger = forwardRef<HTMLDivElement, HoverCardTriggerProps>(
  ({ asChild, children, onMouseEnter, onMouseLeave, ...props }, ref) => {
    const { setOpen, triggerRef } = useHoverCardContext()

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        setOpen(true)
        onMouseEnter?.(e)
      },
      [setOpen, onMouseEnter]
    )

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        setOpen(false)
        onMouseLeave?.(e)
      },
      [setOpen, onMouseLeave]
    )

    // Merge refs
    const mergedRef = useCallback(
      (node: HTMLElement | null) => {
        if (typeof ref === 'function') {
          ref(node as HTMLDivElement)
        } else if (ref) {
          ref.current = node as HTMLDivElement
        }
        (triggerRef as React.MutableRefObject<HTMLElement | null>).current = node
      },
      [ref, triggerRef]
    )

    if (asChild && isValidElement(children)) {
      return cloneElement(children as React.ReactElement<any>, {
        ref: mergedRef,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        ...props,
      })
    }

    return (
      <div
        ref={mergedRef as React.Ref<HTMLDivElement>}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="inline-block"
        {...props}
      >
        {children}
      </div>
    )
  }
)

HoverCardTrigger.displayName = 'HoverCard.Trigger'

// ============================================================================
// Portal
// ============================================================================

function HoverCardPortal({ children, container }: HoverCardPortalProps) {
  const { open } = useHoverCardContext()

  if (!open) return null

  return createPortal(children, container ?? document.body)
}

HoverCardPortal.displayName = 'HoverCard.Portal'

// ============================================================================
// Positioner
// ============================================================================

function HoverCardPositioner({
  children,
  side = 'bottom',
  className,
}: HoverCardPositionerProps) {
  const { setSide, triggerRef, setOpen } = useHoverCardContext()
  const positionerRef = useRef<HTMLDivElement>(null)

  // Update side in context when prop changes
  useEffect(() => {
    setSide(side)
  }, [side, setSide])

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

  // Keep card open when hovering over it
  const handleMouseEnter = useCallback(() => {
    setOpen(true)
  }, [setOpen])

  const handleMouseLeave = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  return (
    <div
      ref={positionerRef}
      className={cn('z-50', className)}
      style={getPositionStyles()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}

HoverCardPositioner.displayName = 'HoverCard.Positioner'

// ============================================================================
// Popup
// ============================================================================

const HoverCardPopup = forwardRef<HTMLDivElement, HoverCardPopupProps>(
  ({ children, className }, ref) => {
    const { side, open } = useHoverCardContext()
    const { originClass, initialOffset } = usePositioning(side)

    return (
      <AnimatePresence>
        {open && (
          <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.95, ...initialOffset }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, ...initialOffset }}
            transition={SPRING_CONFIG.default}
            className={cn(
              'w-64 rounded-theme-lg border border-border',
              'bg-surface shadow-theme-lg glass p-4',
              originClass,
              className
            )}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    )
  }
)

HoverCardPopup.displayName = 'HoverCard.Popup'

// ============================================================================
// Arrow
// ============================================================================

function HoverCardArrow({ className }: HoverCardArrowProps) {
  const { side } = useHoverCardContext()
  const { arrowClasses, arrowRotation } = usePositioning(side)

  return (
    <span
      className={cn(
        'absolute w-3 h-3 rotate-45',
        'bg-surface border border-border shadow-theme-sm',
        arrowClasses,
        className
      )}
      style={{ transform: `rotate(${arrowRotation}deg)` }}
      aria-hidden="true"
    />
  )
}

HoverCardArrow.displayName = 'HoverCard.Arrow'

// ============================================================================
// Simple Wrapper (backward compatibility)
// ============================================================================

interface HoverCardSimpleProps {
  trigger: React.ReactNode
  children: React.ReactNode
  side?: Side
  showArrow?: boolean
  openDelay?: number
  closeDelay?: number
}

function HoverCardSimple({
  trigger,
  children,
  side = 'bottom',
  showArrow = true,
  openDelay,
  closeDelay,
}: HoverCardSimpleProps) {
  return (
    <HoverCardRoot openDelay={openDelay} closeDelay={closeDelay}>
      <HoverCardTrigger asChild>{trigger}</HoverCardTrigger>
      <HoverCardPortal>
        <HoverCardPositioner side={side}>
          <HoverCardPopup>
            {children}
            {showArrow && <HoverCardArrow />}
          </HoverCardPopup>
        </HoverCardPositioner>
      </HoverCardPortal>
    </HoverCardRoot>
  )
}

// ============================================================================
// Namespace Export (callable + namespace)
// ============================================================================

export const HoverCard = Object.assign(HoverCardSimple, {
  Root: HoverCardRoot,
  Trigger: HoverCardTrigger,
  Portal: HoverCardPortal,
  Positioner: HoverCardPositioner,
  Popup: HoverCardPopup,
  Arrow: HoverCardArrow,
})
