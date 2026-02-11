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
import {
  useControlledState,
  useBodyScrollLock,
  useEscapeKey,
  SPRING_CONFIG,
} from '../../hooks'
import { DURATION, OFFSET, ARIA } from '../../config'
import type {
  DialogContextValue,
  DialogRootProps,
  DialogTriggerProps,
  DialogPortalProps,
  DialogBackdropProps,
  DialogPopupProps,
  DialogHeaderProps,
  DialogTitleProps,
  DialogDescriptionProps,
  DialogFooterProps,
  DialogCloseProps,
} from './types'

// Context
const DialogContext = createContext<DialogContextValue | undefined>(undefined)

const useDialogContext = () => {
  const context = useContext(DialogContext)
  if (!context) {
    throw new Error('Dialog components must be used within a Dialog.Root')
  }
  return context
}

// Sub-components
const DialogRoot = ({
  open,
  defaultOpen = false,
  onOpenChange,
  blocking = false,
  children,
}: DialogRootProps) => {
  const [isOpen, setIsOpen] = useControlledState(open, defaultOpen, onOpenChange)

  const handleSetOpen = useCallback(
    (newOpen: boolean) => {
      setIsOpen(newOpen)
    },
    [setIsOpen]
  )

  return (
    <DialogContext.Provider value={{ open: isOpen, setOpen: handleSetOpen, blocking }}>
      {children}
    </DialogContext.Provider>
  )
}
DialogRoot.displayName = 'Dialog.Root'

const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ asChild, children, onClick, ...props }, ref) => {
    const { setOpen } = useDialogContext()

    const handleClick = useCallback(
      (e: React.MouseEvent) => {
        onClick?.(e as React.MouseEvent<HTMLButtonElement>)
        setOpen(true)
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

    return (
      <Button ref={ref} variant="outline" onClick={handleClick} {...props}>
        {children}
      </Button>
    )
  }
)
DialogTrigger.displayName = 'Dialog.Trigger'

const DialogPortal = ({ children }: DialogPortalProps) => {
  const { open } = useDialogContext()

  // Use body scroll lock from shared hooks
  useBodyScrollLock(open)

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>{open && children}</AnimatePresence>,
    document.body
  )
}
DialogPortal.displayName = 'Dialog.Portal'

const DialogBackdrop = forwardRef<HTMLDivElement, DialogBackdropProps>(
  ({ className, onClick, onDrag, onDragStart, onDragEnd, onAnimationStart, onAnimationEnd, ...props }, ref) => {
    const { setOpen, blocking } = useDialogContext()

    const handleClick = useCallback(() => {
      if (!blocking) {
        setOpen(false)
      }
    }, [blocking, setOpen])

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: DURATION.normal }}
        className={cn(
          'fixed inset-0 z-50 bg-foreground/80 backdrop-blur-sm',
          blocking && 'cursor-not-allowed',
          className
        )}
        onClick={handleClick}
        aria-hidden="true"
        {...props}
      />
    )
  }
)
DialogBackdrop.displayName = 'Dialog.Backdrop'

const DialogPopup = forwardRef<HTMLDivElement, DialogPopupProps>(
  ({ className, children, onDrag, onDragStart, onDragEnd, onAnimationStart, onAnimationEnd, ...props }, ref) => {
    const { setOpen, blocking } = useDialogContext()

    // Handle escape key using shared hook
    useEscapeKey(() => setOpen(false), !blocking)

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          ref={ref}
          role={blocking ? 'alertdialog' : 'dialog'}
          aria-modal="true"
          initial={{ opacity: 0, scale: 0.95, y: -OFFSET.slide }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -OFFSET.slide }}
          transition={SPRING_CONFIG.default}
          className={cn(
            'relative z-50 w-full max-w-lg rounded-theme-xl p-6',
            'bg-neu-base shadow-neu-raised-lg',
            className
          )}
          {...props}
        >
          {children}
        </motion.div>
      </div>
    )
  }
)
DialogPopup.displayName = 'Dialog.Popup'

const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 pb-4', className)}
      {...props}
    />
  )
)
DialogHeader.displayName = 'Dialog.Header'

const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn('font-heading text-lg font-semibold text-foreground', className)}
      {...props}
    />
  )
)
DialogTitle.displayName = 'Dialog.Title'

const DialogDescription = forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
)
DialogDescription.displayName = 'Dialog.Description'

const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center justify-end gap-2 pt-4', className)}
      {...props}
    />
  )
)
DialogFooter.displayName = 'Dialog.Footer'

const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ asChild, children, onClick, className, ...props }, ref) => {
    const { setOpen, blocking } = useDialogContext()

    const handleClick = useCallback(
      (e: React.MouseEvent) => {
        onClick?.(e as React.MouseEvent<HTMLButtonElement>)
        if (!blocking) {
          setOpen(false)
        }
      },
      [onClick, blocking, setOpen]
    )

    // Don't render close button for blocking dialogs unless explicitly provided
    if (blocking && !children) {
      return null
    }

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
          className={cn('absolute right-4 top-4 h-8 w-8 min-h-8 min-w-8 p-0', className)}
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
DialogClose.displayName = 'Dialog.Close'

// Namespace export (callable as Root + namespace)
export const Dialog = Object.assign(DialogRoot, {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Portal: DialogPortal,
  Backdrop: DialogBackdrop,
  Popup: DialogPopup,
  Header: DialogHeader,
  Title: DialogTitle,
  Description: DialogDescription,
  Footer: DialogFooter,
  Close: DialogClose,
})

// Also export individual components for flexibility
export {
  DialogRoot,
  DialogTrigger,
  DialogPortal,
  DialogBackdrop,
  DialogPopup,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
}
