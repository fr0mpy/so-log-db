import { cn } from '@/lib/utils'
import { forwardRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

// Shared spring config for consistent motion
const spring = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 30,
}

interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  content: React.ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
}

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({ content, side = 'top', className, children, ...props }, ref) => {
    const [isVisible, setIsVisible] = useState(false)

    const positions = {
      top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
      right: 'left-full top-1/2 -translate-y-1/2 ml-2',
      bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
      left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    }

    const origins = {
      top: 'origin-bottom',
      right: 'origin-left',
      bottom: 'origin-top',
      left: 'origin-right',
    }

    const initialOffset = {
      top: { y: 4 },
      right: { x: -4 },
      bottom: { y: -4 },
      left: { x: 4 },
    }

    return (
      <div
        ref={ref}
        className={cn('relative inline-block', className)}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        {...props}
      >
        {children}
        <AnimatePresence>
          {isVisible && (
            <motion.div
              role="tooltip"
              initial={{ opacity: 0, scale: 0.95, ...initialOffset[side] }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, ...initialOffset[side] }}
              transition={spring}
              className={cn(
                'absolute z-50 px-3 py-1.5 text-sm text-foreground',
                'bg-neu-base rounded-theme-lg shadow-neu-raised',
                positions[side],
                origins[side]
              )}
            >
              {content}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

Tooltip.displayName = 'Tooltip'

export { Tooltip }
