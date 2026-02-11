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
  MenuRootProps,
  MenuTriggerProps,
  MenuPortalProps,
  MenuPositionerProps,
  MenuPopupProps,
  MenuItemProps,
  MenuSeparatorProps,
  MenuLabelProps,
  MenuAlign,
} from './types'

// ============================================================================
// Context
// ============================================================================

interface MenuContextValue {
  open: boolean
  setOpen: (open: boolean) => void
}

const MenuContext = createContext<MenuContextValue | null>(null)

function useMenuContext() {
  const context = useContext(MenuContext)
  if (!context) {
    throw new Error('Menu components must be used within Menu.Root')
  }
  return context
}

// ============================================================================
// Alignment classes for dropdown positioning
// ============================================================================

const ALIGNMENT_CLASSES: Record<MenuAlign, string> = {
  start: 'left-0',
  center: 'left-1/2 -translate-x-1/2',
  end: 'right-0',
}

// ============================================================================
// Components
// ============================================================================

function MenuRoot({
  children,
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
}: MenuRootProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)

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
    }),
    [open, setOpen]
  )

  return <MenuContext.Provider value={contextValue}>{children}</MenuContext.Provider>
}

MenuRoot.displayName = 'Menu.Root'

function MenuTrigger({ children, className }: MenuTriggerProps) {
  const { open, setOpen } = useMenuContext()

  const handleClick = useCallback(() => {
    setOpen(!open)
  }, [open, setOpen])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        setOpen(true)
      }
    },
    [setOpen]
  )

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn('cursor-pointer', className)}
    >
      {children}
    </div>
  )
}

MenuTrigger.displayName = 'Menu.Trigger'

function MenuPortal({ children }: MenuPortalProps) {
  const { open } = useMenuContext()

  return <AnimatePresence>{open && children}</AnimatePresence>
}

MenuPortal.displayName = 'Menu.Portal'

function MenuPositioner({ align = 'start', children, className }: MenuPositionerProps) {
  const { setOpen } = useMenuContext()
  const positionerRef = useRef<HTMLDivElement>(null)

  useClickOutside(
    positionerRef,
    () => setOpen(false),
    true
  )

  return (
    <div ref={positionerRef} className={cn('absolute z-50 mt-1', ALIGNMENT_CLASSES[align], className)}>
      {children}
    </div>
  )
}

MenuPositioner.displayName = 'Menu.Positioner'

const MenuPopup = forwardRef<HTMLDivElement, MenuPopupProps>(
  ({ className, children, onDrag, onDragStart, onDragEnd, onAnimationStart, onAnimationEnd, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        role="menu"
        initial={{ opacity: 0, scale: 0.95, y: -4 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -4 }}
        transition={SPRING_CONFIG.default}
        className={cn(
          'min-w-[12rem] rounded-theme-md border border-border',
          'bg-background shadow-theme-lg glass p-1 origin-top',
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

MenuPopup.displayName = 'Menu.Popup'

const MenuItem = forwardRef<HTMLButtonElement, MenuItemProps>(
  ({ className, children, onClick, onDrag, onDragStart, onDragEnd, onAnimationStart, onAnimationEnd, ...props }, ref) => {
    const { setOpen } = useMenuContext()

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

MenuItem.displayName = 'Menu.Item'

const MenuSeparator = forwardRef<HTMLDivElement, MenuSeparatorProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="separator"
      className={cn('my-1 h-px bg-border', className)}
      {...props}
    />
  )
)

MenuSeparator.displayName = 'Menu.Separator'

const MenuLabel = forwardRef<HTMLDivElement, MenuLabelProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('px-2 py-1.5 text-sm font-semibold text-foreground', className)}
      {...props}
    >
      {children}
    </div>
  )
)

MenuLabel.displayName = 'Menu.Label'

// ============================================================================
// Namespace Export
// ============================================================================

export const Menu = {
  Root: MenuRoot,
  Trigger: MenuTrigger,
  Portal: MenuPortal,
  Positioner: MenuPositioner,
  Popup: MenuPopup,
  Item: MenuItem,
  Separator: MenuSeparator,
  Label: MenuLabel,
}
