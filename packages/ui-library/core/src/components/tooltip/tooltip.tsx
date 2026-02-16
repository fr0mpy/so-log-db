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
  type Side,
  type Anchor,
} from '../../hooks'
import { TooltipStyles as S } from './styles'
import type {
  TooltipRootProps,
  TooltipTriggerProps,
  TooltipPortalProps,
  TooltipPositionerProps,
  TooltipPopupProps,
  TooltipArrowProps,
  TooltipContextValue,
} from './types'
import { SPRING } from '../../config'

// ============================================================================
// Context
// ============================================================================

const TooltipContext = createContext<TooltipContextValue | null>(null)

function useTooltipContext() {
  const context = useContext(TooltipContext)
  if (!context) {
    throw new Error('Tooltip components must be used within Tooltip.Root')
  }
  return context
}

// ============================================================================
// Root
// ============================================================================

function TooltipRoot({
  children,
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  delayDuration = 0,
}: TooltipRootProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
  const [side, setSide] = useState<Side>('top')
  const [anchor, setAnchor] = useState<Anchor>('center')
  const triggerRef = useRef<HTMLElement>(null)
  const delayTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen

  const setOpen = useCallback(
    (value: boolean) => {
      // Clear any pending delay timer
      if (delayTimerRef.current) {
        clearTimeout(delayTimerRef.current)
        delayTimerRef.current = undefined
      }

      if (value && delayDuration > 0) {
        // Delay opening
        delayTimerRef.current = setTimeout(() => {
          if (!isControlled) {
            setUncontrolledOpen(true)
          }
          onOpenChange?.(true)
        }, delayDuration)
      } else {
        // Immediate open/close
        if (!isControlled) {
          setUncontrolledOpen(value)
        }
        onOpenChange?.(value)
      }
    },
    [isControlled, onOpenChange, delayDuration]
  )

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (delayTimerRef.current) {
        clearTimeout(delayTimerRef.current)
      }
    }
  }, [])

  return (
    <TooltipContext.Provider
      value={{ open, setOpen, triggerRef, side, setSide, anchor, setAnchor }}
    >
      {children}
    </TooltipContext.Provider>
  )
}

// ============================================================================
// Trigger
// ============================================================================

function TooltipTrigger({ asChild, children, onMouseEnter, onMouseLeave, onFocus, onBlur, ref, ...props }: TooltipTriggerProps) {
  const { setOpen, triggerRef } = useTooltipContext()

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

  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLDivElement>) => {
      setOpen(true)
      onFocus?.(e)
    },
    [setOpen, onFocus]
  )

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLDivElement>) => {
      setOpen(false)
      onBlur?.(e)
    },
    [setOpen, onBlur]
  )

  // Merge refs
  const mergedRef = useCallback(
    (node: HTMLElement | null) => {
      if (typeof ref === 'function') {
        ref(node as HTMLDivElement)
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node as HTMLDivElement
      }
      (triggerRef as React.MutableRefObject<HTMLElement | null>).current = node
    },
    [ref, triggerRef]
  )

  if (asChild && isValidElement(children)) {
    return cloneElement(children as React.ReactElement<Record<string, unknown>>, {
      ref: mergedRef,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onFocus: handleFocus,
      onBlur: handleBlur,
      ...props,
    })
  }

  return (
    <div
      ref={mergedRef as React.Ref<HTMLDivElement>}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={S.trigger}
      {...props}
    >
      {children}
    </div>
  )
}

// ============================================================================
// Portal
// ============================================================================

function TooltipPortal({ children, container }: TooltipPortalProps) {
  const { open } = useTooltipContext()

  // Guard against SSR - document not available on server
  if (typeof document === 'undefined') return null
  if (!open) return null

  return createPortal(children, container ?? document.body)
}

// ============================================================================
// Positioner
// ============================================================================

function TooltipPositioner({
  children,
  side = 'top',
  anchor = 'center',
  className,
}: TooltipPositionerProps) {
  const { setSide, setAnchor, triggerRef } = useTooltipContext()

  // Update context when props change
  useEffect(() => {
    setSide(side)
    setAnchor(anchor)
  }, [side, anchor, setSide, setAnchor])

  // Get trigger position for absolute positioning
  const triggerRect = triggerRef.current?.getBoundingClientRect()

  if (!triggerRect) return null

  // Calculate position relative to viewport
  const getPositionStyles = (): React.CSSProperties => {
    const gap = 8

    // Get anchor offset
    const getAnchorOffset = () => {
      const isHorizontal = side === 'top' || side === 'bottom'
      const dimension = isHorizontal ? triggerRect.width : triggerRect.height

      switch (anchor) {
        case 'start':
          return -dimension / 2 + 16
        case 'end':
          return dimension / 2 - 16
        default:
          return 0
      }
    }

    const anchorOffset = getAnchorOffset()

    switch (side) {
      case 'top':
        return {
          position: 'fixed',
          left: triggerRect.left + triggerRect.width / 2 + anchorOffset,
          top: triggerRect.top - gap,
          transform: 'translate(-50%, -100%)',
        }
      case 'bottom':
        return {
          position: 'fixed',
          left: triggerRect.left + triggerRect.width / 2 + anchorOffset,
          top: triggerRect.bottom + gap,
          transform: 'translateX(-50%)',
        }
      case 'left':
        return {
          position: 'fixed',
          left: triggerRect.left - gap,
          top: triggerRect.top + triggerRect.height / 2 + anchorOffset,
          transform: 'translate(-100%, -50%)',
        }
      case 'right':
        return {
          position: 'fixed',
          left: triggerRect.right + gap,
          top: triggerRect.top + triggerRect.height / 2 + anchorOffset,
          transform: 'translateY(-50%)',
        }
    }
  }

  return (
    <div className={cn(S.positioner, className)} style={getPositionStyles()}>
      {children}
    </div>
  )
}

// ============================================================================
// Popup
// ============================================================================

function TooltipPopup({ children, className, ref }: TooltipPopupProps) {
  const { side, open } = useTooltipContext()
  const { initialOffset } = usePositioning(side)

  // Bouncy spring config for tooltip
  const bouncySpring = SPRING.tooltip

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          role="tooltip"
          initial={{ ...initialOffset, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          exit={{ ...initialOffset, opacity: 0 }}
          transition={bouncySpring}
          className={cn(S.popup, className)}
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

function TooltipArrow({ className }: TooltipArrowProps) {
  const { side } = useTooltipContext()
  const { arrowClasses } = usePositioning(side)

  return (
    <span
      className={cn(S.arrow.base, arrowClasses, className)}
      aria-hidden="true"
    />
  )
}

// ============================================================================
// Simple Wrapper (backward compatibility)
// ============================================================================

interface TooltipSimpleProps {
  content: React.ReactNode
  side?: Side
  anchor?: Anchor
  showArrow?: boolean
  children: React.ReactNode
  delayDuration?: number
}

function TooltipSimple({
  content,
  side = 'top',
  anchor = 'center',
  showArrow = true,
  children,
  delayDuration,
}: TooltipSimpleProps) {
  return (
    <TooltipRoot delayDuration={delayDuration}>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipPortal>
        <TooltipPositioner side={side} anchor={anchor}>
          <TooltipPopup>{content}</TooltipPopup>
          {showArrow && <TooltipArrow />}
        </TooltipPositioner>
      </TooltipPortal>
    </TooltipRoot>
  )
}

// ============================================================================
// Namespace Export (callable + namespace)
// ============================================================================

export const Tooltip = Object.assign(TooltipSimple, {
  Root: TooltipRoot,
  Trigger: TooltipTrigger,
  Portal: TooltipPortal,
  Positioner: TooltipPositioner,
  Popup: TooltipPopup,
  Arrow: TooltipArrow,
})
