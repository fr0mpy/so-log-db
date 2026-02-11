import { cn } from '@/lib/utils'
import {
  forwardRef,
  useState,
  useRef,
  useCallback,
  createContext,
  useContext,
  useMemo,
} from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useClickOutside, SPRING_CONFIG } from '../../hooks'
import type {
  ContextMenuRootProps,
  ContextMenuTriggerProps,
  ContextMenuPortalProps,
  ContextMenuPositionerProps,
  ContextMenuPopupProps,
  MenuItemProps,
  MenuSeparatorProps,
} from './types'

// ============================================================================
// Context
// ============================================================================

interface ContextMenuContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  position: { x: number; y: number }
  setPosition: (position: { x: number; y: number }) => void
}

const ContextMenuContext = createContext<ContextMenuContextValue | null>(null)

function useContextMenuContext() {
  const context = useContext(ContextMenuContext)
  if (!context) {
    throw new Error('ContextMenu components must be used within ContextMenu.Root')
  }
  return context
}

// ============================================================================
// Components
// ============================================================================

function ContextMenuRoot({
  children,
  open: controlledOpen,
  onOpenChange,
}: ContextMenuRootProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : internalOpen

  const setOpen = useCallback(
    (newOpen: boolean) => {
      if (!isControlled) {
        setInternalOpen(newOpen)
      }
      onOpenChange?.(newOpen)
    },
    [isControlled, onOpenChange]
  )

  const contextValue = useMemo(
    () => ({
      open,
      setOpen,
      position,
      setPosition,
    }),
    [open, setOpen, position]
  )

  return (
    <ContextMenuContext.Provider value={contextValue}>{children}</ContextMenuContext.Provider>
  )
}

ContextMenuRoot.displayName = 'ContextMenu.Root'

function ContextMenuTrigger({ children, className }: ContextMenuTriggerProps) {
  const { setOpen, setPosition } = useContextMenuContext()

  const handleContextMenu = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault()
      setPosition({ x: event.clientX, y: event.clientY })
      setOpen(true)
    },
    [setOpen, setPosition]
  )

  return (
    <div onContextMenu={handleContextMenu} className={className}>
      {children}
    </div>
  )
}

ContextMenuTrigger.displayName = 'ContextMenu.Trigger'

function ContextMenuPortal({ children }: ContextMenuPortalProps) {
  const { open } = useContextMenuContext()

  return <AnimatePresence>{open && children}</AnimatePresence>
}

ContextMenuPortal.displayName = 'ContextMenu.Portal'

function ContextMenuPositioner({ children, className }: ContextMenuPositionerProps) {
  const { setOpen, position } = useContextMenuContext()
  const positionerRef = useRef<HTMLDivElement>(null)

  useClickOutside(positionerRef, () => setOpen(false), true)

  return (
    <div
      ref={positionerRef}
      className={cn('fixed z-50', className)}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      {children}
    </div>
  )
}

ContextMenuPositioner.displayName = 'ContextMenu.Positioner'

const ContextMenuPopup = forwardRef<HTMLDivElement, ContextMenuPopupProps>(
  ({ className, children, onDrag, onDragStart, onDragEnd, onAnimationStart, onAnimationEnd, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        role="menu"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={SPRING_CONFIG.default}
        className={cn(
          'min-w-[12rem] rounded-theme-md border border-border',
          'bg-background shadow-theme-lg glass p-1 origin-top-left',
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

ContextMenuPopup.displayName = 'ContextMenu.Popup'

const ContextMenuItem = forwardRef<HTMLButtonElement, MenuItemProps>(
  ({ className, children, onClick, onDrag, onDragStart, onDragEnd, onAnimationStart, onAnimationEnd, ...props }, ref) => {
    const { setOpen } = useContextMenuContext()

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(e)
        setOpen(false)
      },
      [onClick, setOpen]
    )

    return (
      <motion.button
        ref={ref}
        role="menuitem"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={handleClick}
        className={cn(
          'relative flex w-full cursor-pointer select-none items-center rounded-theme-sm px-2 py-1.5',
          'text-sm outline-none transition-colors',
          'hover:bg-muted focus-visible:bg-muted',
          'disabled:pointer-events-none disabled:opacity-50',
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    )
  }
)

ContextMenuItem.displayName = 'ContextMenu.Item'

const ContextMenuSeparator = forwardRef<HTMLDivElement, MenuSeparatorProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="separator"
      className={cn('my-1 h-px bg-border', className)}
      {...props}
    />
  )
)

ContextMenuSeparator.displayName = 'ContextMenu.Separator'

// ============================================================================
// Simple Wrapper (backward compatibility)
// ============================================================================

interface ContextMenuSimpleProps {
  trigger: React.ReactNode
  children: React.ReactNode
}

function ContextMenuSimple({ trigger, children }: ContextMenuSimpleProps) {
  return (
    <ContextMenuRoot>
      <ContextMenuTrigger>{trigger}</ContextMenuTrigger>
      <ContextMenuPortal>
        <ContextMenuPositioner>
          <ContextMenuPopup>{children}</ContextMenuPopup>
        </ContextMenuPositioner>
      </ContextMenuPortal>
    </ContextMenuRoot>
  )
}

// ============================================================================
// Namespace Export (callable + namespace)
// ============================================================================

export const ContextMenu = Object.assign(ContextMenuSimple, {
  Root: ContextMenuRoot,
  Trigger: ContextMenuTrigger,
  Portal: ContextMenuPortal,
  Positioner: ContextMenuPositioner,
  Popup: ContextMenuPopup,
  Item: ContextMenuItem,
  Separator: ContextMenuSeparator,
})

// Individual exports for backward compatibility
export { ContextMenuItem, ContextMenuSeparator }
