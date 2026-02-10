import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import React, { forwardRef, createContext, useContext, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Button } from './Button'

// Shared spring config for consistent motion
const spring = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 30,
}

interface DialogContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  blocking: boolean
}

const DialogContext = createContext<DialogContextValue | undefined>(undefined)

const useDialogContext = () => {
  const context = useContext(DialogContext)
  if (!context) {
    throw new Error('Dialog components must be used within a Dialog provider')
  }
  return context
}

interface DialogProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  /** When true, prevents closing via backdrop click or escape key (alert dialog behavior) */
  blocking?: boolean
  children: React.ReactNode
}

const Dialog = ({ open, defaultOpen = false, onOpenChange, blocking = false, children }: DialogProps) => {
  const [isOpen, setIsOpen] = useState(open !== undefined ? open : defaultOpen)

  useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open)
    }
  }, [open])

  const handleSetOpen = (newOpen: boolean) => {
    if (open === undefined) {
      setIsOpen(newOpen)
    }
    onOpenChange?.(newOpen)
  }

  return (
    <DialogContext.Provider value={{ open: isOpen, setOpen: handleSetOpen, blocking }}>
      {children}
    </DialogContext.Provider>
  )
}

interface DialogTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ asChild, children, onClick, ...props }, ref) => {
    const { setOpen } = useDialogContext()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e)
      setOpen(true)
    }

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<{ onClick?: (e: React.MouseEvent) => void; ref?: React.Ref<HTMLButtonElement> }>, {
        onClick: handleClick,
        ref,
      })
    }

    return (
      <Button ref={ref} variant="outline" onClick={handleClick} {...props}>
        {children}
      </Button>
    )
  }
)
DialogTrigger.displayName = 'DialogTrigger'

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  'aria-labelledby'?: string
  'aria-describedby'?: string
}

const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, children, ...props }, ref) => {
    const { open, setOpen, blocking } = useDialogContext()

    // Body scroll lock
    useEffect(() => {
      if (open) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
      return () => {
        document.body.style.overflow = ''
      }
    }, [open])

    // Handle escape key (blocked when blocking is true)
    useEffect(() => {
      if (!open || blocking) return
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setOpen(false)
        }
      }
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }, [open, blocking, setOpen])

    const handleBackdropClick = () => {
      if (!blocking) {
        setOpen(false)
      }
    }

    return (
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={cn(
                'fixed inset-0 bg-foreground/80 backdrop-blur-sm',
                blocking && 'cursor-not-allowed'
              )}
              onClick={handleBackdropClick}
            />
            <motion.div
              ref={ref}
              role={blocking ? 'alertdialog' : 'dialog'}
              aria-modal="true"
              initial={{ opacity: 0, scale: 0.95, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -8 }}
              transition={spring}
              className={cn(
                'relative z-50 w-full max-w-lg rounded-theme-xl p-6',
                'bg-neu-base shadow-neu-raised-lg',
                className
              )}
              {...props}
            >
              {children}
              {!blocking && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setOpen(false)}
                  className="absolute right-4 top-4 h-8 w-8 min-h-8 min-w-8 p-0"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    )
  }
)
DialogContent.displayName = 'DialogContent'

const DialogHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 pb-4', className)}
      {...props}
    />
  )
)
DialogHeader.displayName = 'DialogHeader'

const DialogTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn('font-heading text-lg font-semibold text-foreground', className)}
      {...props}
    />
  )
)
DialogTitle.displayName = 'DialogTitle'

const DialogDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
)
DialogDescription.displayName = 'DialogDescription'

const DialogFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center justify-end gap-2 pt-4', className)}
      {...props}
    />
  )
)
DialogFooter.displayName = 'DialogFooter'

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
}
