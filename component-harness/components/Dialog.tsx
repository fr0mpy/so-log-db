import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import { forwardRef, createContext, useContext, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

// Shared spring config for consistent motion
const spring = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 30,
}

interface DialogContextValue {
  open: boolean
  setOpen: (open: boolean) => void
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
  children: React.ReactNode
}

const Dialog = ({ open, defaultOpen = false, onOpenChange, children }: DialogProps) => {
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
    <DialogContext.Provider value={{ open: isOpen, setOpen: handleSetOpen }}>
      {children}
    </DialogContext.Provider>
  )
}

const DialogTrigger = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, children, ...props }, ref) => {
    const { setOpen } = useDialogContext()

    return (
      <motion.button
        ref={ref}
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          'cursor-pointer rounded-theme-md px-2 py-1',
          'transition-colors duration-200',
          'hover:bg-slate-400',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    )
  }
)
DialogTrigger.displayName = 'DialogTrigger'

const DialogContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const { open, setOpen } = useDialogContext()

    return (
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-foreground/80 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              ref={ref}
              initial={{ opacity: 0, scale: 0.95, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -8 }}
              transition={spring}
              className={cn(
                'relative z-50 w-full max-w-lg rounded-theme-xl',
                'bg-neu-base shadow-neu-raised-lg',
                className
              )}
              {...props}
            >
              {children}
              <motion.button
                onClick={() => setOpen(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  'absolute right-4 top-4 rounded-theme-lg p-1.5 cursor-pointer',
                  'bg-neu-base shadow-neu-raised-sm',
                  'transition-shadow duration-200 hover:shadow-neu-raised',
                  'active:shadow-neu-pressed-sm',
                  'focus-visible:outline-none focus-visible:shadow-[var(--shadow-raised-sm),var(--shadow-focus)]',
                  'disabled:pointer-events-none'
                )}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </motion.button>
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
      className={cn('flex flex-col space-y-1.5 p-6', className)}
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
      className={cn('flex items-center justify-end gap-2 p-6 pt-0', className)}
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
