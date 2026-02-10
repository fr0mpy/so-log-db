import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import { forwardRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { SmoothScroll } from './SmoothScroll'

// Spring config for smooth slide
const spring = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 30,
}

interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean
  onClose: () => void
  side?: 'left' | 'right' | 'top' | 'bottom'
  title?: string
}

const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  ({ open, onClose, side = 'right', title, className, children, ...props }, ref) => {
    // Lock body scroll when open
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

    // Handle escape key
    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && open) {
          onClose()
        }
      }
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }, [open, onClose])

    const sidePositions = {
      left: 'left-0 top-0 h-full w-80',
      right: 'right-0 top-0 h-full w-80',
      top: 'top-0 left-0 w-full h-80',
      bottom: 'bottom-0 left-0 w-full h-80',
    }

    const slideVariants = {
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

    return (
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-foreground/60 backdrop-blur-sm"
              onClick={onClose}
              aria-hidden="true"
            />

            {/* Drawer panel */}
            <motion.div
              ref={ref}
              role="dialog"
              aria-modal="true"
              aria-labelledby={title ? 'drawer-title' : undefined}
              initial={slideVariants[side].initial}
              animate={slideVariants[side].animate}
              exit={slideVariants[side].exit}
              transition={spring}
              className={cn(
                'fixed z-50 bg-neu-base shadow-neu-raised-lg',
                'flex flex-col',
                sidePositions[side],
                className
              )}
              {...props}
            >
              <div className="flex items-center justify-between p-6">
                {title && (
                  <h2 id="drawer-title" className="font-heading text-lg font-semibold text-foreground">
                    {title}
                  </h2>
                )}
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    'ml-auto rounded-theme-lg p-1.5 cursor-pointer min-h-11 min-w-11 flex items-center justify-center',
                    'bg-neu-base shadow-neu-raised-sm',
                    'transition-shadow duration-neu ease-neu hover:shadow-neu-raised',
                    'active:shadow-neu-pressed-sm',
                    'focus-visible:outline-none focus-visible:shadow-[var(--shadow-raised-sm),var(--shadow-focus)]'
                  )}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </motion.button>
              </div>
              <SmoothScroll className="flex-1 overflow-auto p-6 pt-0">
                {children}
              </SmoothScroll>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    )
  }
)

Drawer.displayName = 'Drawer'

export { Drawer }
