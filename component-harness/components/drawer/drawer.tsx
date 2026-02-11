import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import React, {
  forwardRef,
  createContext,
  useContext,
  useCallback,
} from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'motion/react'
import { Button } from '../form/button'
import { ScrollArea } from '../display/scroll-area'
import {
  useControlledState,
  useBodyScrollLock,
  useEscapeKey,
  SPRING_CONFIG,
} from '../../hooks'
import { DURATION, ARIA } from '../../config'
import type {
  DrawerContextValue,
  DrawerRootProps,
  DrawerPortalProps,
  DrawerBackdropProps,
  DrawerContentProps,
  DrawerHeaderProps,
  DrawerTitleProps,
  DrawerCloseProps,
  DrawerSide,
} from './types'

// Context
const DrawerContext = createContext<DrawerContextValue | undefined>(undefined)

const useDrawerContext = () => {
  const context = useContext(DrawerContext)
  if (!context) {
    throw new Error('Drawer components must be used within a Drawer.Root')
  }
  return context
}

// Position and animation configurations
const SIDE_POSITIONS: Record<DrawerSide, string> = {
  left: 'left-0 top-0 h-full w-80',
  right: 'right-0 top-0 h-full w-80',
  top: 'top-0 left-0 w-full h-80',
  bottom: 'bottom-0 left-0 w-full h-80',
}

const SLIDE_VARIANTS: Record<
  DrawerSide,
  { initial: { x?: string; y?: string }; animate: { x?: number; y?: number }; exit: { x?: string; y?: string } }
> = {
  left: {
    initial: { x: '-100%' },
    animate: { x: 0 },
    exit: { x: '-100%' },
  },
  right: {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '100%' },
  },
  top: {
    initial: { y: '-100%' },
    animate: { y: 0 },
    exit: { y: '-100%' },
  },
  bottom: {
    initial: { y: '100%' },
    animate: { y: 0 },
    exit: { y: '100%' },
  },
}

// Sub-components
const DrawerRoot = ({
  open,
  defaultOpen = false,
  onOpenChange,
  side = 'right',
  children,
}: DrawerRootProps) => {
  const [isOpen, setIsOpen] = useControlledState(open, defaultOpen, onOpenChange)

  const handleSetOpen = useCallback(
    (newOpen: boolean) => {
      setIsOpen(newOpen)
    },
    [setIsOpen]
  )

  return (
    <DrawerContext.Provider value={{ open: isOpen, setOpen: handleSetOpen, side }}>
      {children}
    </DrawerContext.Provider>
  )
}
DrawerRoot.displayName = 'Drawer.Root'

const DrawerPortal = ({ children }: DrawerPortalProps) => {
  const { open } = useDrawerContext()

  // Use body scroll lock from shared hooks
  useBodyScrollLock(open)

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open && <div className="fixed inset-0 z-50">{children}</div>}
    </AnimatePresence>,
    document.body
  )
}
DrawerPortal.displayName = 'Drawer.Portal'

const DrawerBackdrop = forwardRef<HTMLDivElement, DrawerBackdropProps>(
  ({ className, onClick, onDrag, onDragStart, onDragEnd, onAnimationStart, onAnimationEnd, ...props }, ref) => {
    const { setOpen } = useDrawerContext()

    const handleClick = useCallback(() => {
      setOpen(false)
    }, [setOpen])

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: DURATION.normal }}
        className={cn(
          'fixed inset-0 bg-foreground/60 backdrop-blur-sm',
          className
        )}
        onClick={handleClick}
        aria-hidden="true"
        {...props}
      />
    )
  }
)
DrawerBackdrop.displayName = 'Drawer.Backdrop'

const DrawerContent = forwardRef<HTMLDivElement, DrawerContentProps>(
  ({ className, children, onDrag, onDragStart, onDragEnd, onAnimationStart, onAnimationEnd, ...props }, ref) => {
    const { setOpen, side } = useDrawerContext()

    // Handle escape key using shared hook
    useEscapeKey(() => setOpen(false))

    const variants = SLIDE_VARIANTS[side]

    return (
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        transition={SPRING_CONFIG.default}
        className={cn(
          'fixed z-50 bg-neu-base shadow-neu-raised-lg',
          'flex flex-col',
          SIDE_POSITIONS[side],
          className
        )}
        {...props}
      >
        <ScrollArea className="flex-1 overflow-auto">{children}</ScrollArea>
      </motion.div>
    )
  }
)
DrawerContent.displayName = 'Drawer.Content'

const DrawerHeader = forwardRef<HTMLDivElement, DrawerHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center justify-between p-6', className)}
      {...props}
    >
      {children}
    </div>
  )
)
DrawerHeader.displayName = 'Drawer.Header'

const DrawerTitle = forwardRef<HTMLHeadingElement, DrawerTitleProps>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      id="drawer-title"
      className={cn('font-heading text-lg font-semibold text-foreground', className)}
      {...props}
    />
  )
)
DrawerTitle.displayName = 'Drawer.Title'

const DrawerClose = forwardRef<HTMLButtonElement, DrawerCloseProps>(
  ({ asChild, children, onClick, className, ...props }, ref) => {
    const { setOpen } = useDrawerContext()

    const handleClick = useCallback(
      (e: React.MouseEvent) => {
        onClick?.(e as React.MouseEvent<HTMLButtonElement>)
        setOpen(false)
      },
      [onClick, setOpen]
    )

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(
        children as React.ReactElement<{
          onClick?: (e: React.MouseEvent) => void
          ref?: React.Ref<HTMLButtonElement>
        }>,
        {
          onClick: handleClick,
          ref,
        }
      )
    }

    // Default close button
    if (!children) {
      return (
        <Button
          ref={ref}
          variant="ghost"
          size="sm"
          onClick={handleClick}
          className={cn('ml-auto', className)}
          aria-label={ARIA.close}
          {...props}
        >
          <X className="h-4 w-4" />
        </Button>
      )
    }

    return (
      <Button ref={ref} variant="ghost" onClick={handleClick} className={className} {...props}>
        {children}
      </Button>
    )
  }
)
DrawerClose.displayName = 'Drawer.Close'

// ============================================================================
// Simple Wrapper (backward compatibility)
// ============================================================================

interface DrawerSimpleProps {
  open?: boolean
  onClose?: () => void
  title?: string
  side?: DrawerSide
  children: React.ReactNode
}

function DrawerSimple({
  open,
  onClose,
  title,
  side = 'right',
  children,
}: DrawerSimpleProps) {
  return (
    <DrawerRoot open={open} onOpenChange={(isOpen) => !isOpen && onClose?.()} side={side}>
      <DrawerPortal>
        <DrawerBackdrop />
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerClose />
          </DrawerHeader>
          <ScrollArea className="flex-1 p-6">
            {children}
          </ScrollArea>
        </DrawerContent>
      </DrawerPortal>
    </DrawerRoot>
  )
}

// Namespace export (callable + namespace)
export const Drawer = Object.assign(DrawerSimple, {
  Root: DrawerRoot,
  Portal: DrawerPortal,
  Backdrop: DrawerBackdrop,
  Content: DrawerContent,
  Header: DrawerHeader,
  Title: DrawerTitle,
  Close: DrawerClose,
})

// Also export individual components for flexibility
export {
  DrawerRoot,
  DrawerPortal,
  DrawerBackdrop,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
}
