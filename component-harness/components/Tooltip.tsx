import { cn } from '@/lib/utils'
import { forwardRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

// Bouncy spring config mimicking cubic-bezier(0.68, -0.55, 0.265, 1.55)
const bouncySpring = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 15,
  mass: 0.8,
}

interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  content: React.ReactNode
  /** Which side the tooltip appears on */
  side?: 'top' | 'right' | 'bottom' | 'left'
  /** Alignment along the side edge */
  anchor?: 'start' | 'center' | 'end'
  /** Show arrow pointer */
  showArrow?: boolean
}

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      content,
      side = 'top',
      anchor = 'center',
      showArrow = true,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(false)

    // Position classes based on side and anchor
    // Anchor controls WHERE ON THE TRIGGER the tooltip points to
    const getPositionClasses = () => {
      const sidePositions = {
        top: 'bottom-full mb-2',
        right: 'left-full ml-2',
        bottom: 'top-full mt-2',
        left: 'right-full mr-2',
      }

      // Position tooltip so the arrow points to anchor position on trigger
      // Arrow is always centered in tooltip, so we offset the tooltip accordingly
      const anchorPositions = {
        top: {
          start: 'left-0 translate-x-[calc(-50%+1rem)]', // Arrow at trigger's left
          center: 'left-1/2 -translate-x-1/2', // Arrow at trigger's center
          end: 'right-0 translate-x-[calc(50%-1rem)]', // Arrow at trigger's right
        },
        bottom: {
          start: 'left-0 translate-x-[calc(-50%+1rem)]',
          center: 'left-1/2 -translate-x-1/2',
          end: 'right-0 translate-x-[calc(50%-1rem)]',
        },
        left: {
          start: 'top-0 translate-y-[calc(-50%+0.75rem)]',
          center: 'top-1/2 -translate-y-1/2',
          end: 'bottom-0 translate-y-[calc(50%-0.75rem)]',
        },
        right: {
          start: 'top-0 translate-y-[calc(-50%+0.75rem)]',
          center: 'top-1/2 -translate-y-1/2',
          end: 'bottom-0 translate-y-[calc(50%-0.75rem)]',
        },
      }

      return `${sidePositions[side]} ${anchorPositions[side][anchor]}`
    }

    // Arrow position - always centered in tooltip
    const getArrowClasses = () => {
      const arrowPositions = {
        top: 'top-full left-1/2 -translate-x-1/2 -mt-[3px]',
        right: 'right-full top-1/2 -translate-y-1/2 -mr-[3px]',
        bottom: 'bottom-full left-1/2 -translate-x-1/2 -mb-[3px]',
        left: 'left-full top-1/2 -translate-y-1/2 -ml-[3px]',
      }
      return arrowPositions[side]
    }

    // Initial offset - tooltip emerges from the trigger element
    const initialOffset = {
      top: { y: 20, opacity: 0 },
      right: { x: -20, opacity: 0 },
      bottom: { y: -20, opacity: 0 },
      left: { x: 20, opacity: 0 },
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
              initial={initialOffset[side]}
              animate={{ x: 0, y: 0, opacity: 1 }}
              exit={initialOffset[side]}
              transition={bouncySpring}
              className={cn(
                'absolute z-50 px-3 py-1.5 text-sm text-foreground whitespace-nowrap',
                'bg-neu-base rounded-theme-md shadow-neu-raised',
                getPositionClasses()
              )}
            >
              {content}
              {showArrow && (
                <span
                  className={cn(
                    'absolute w-2 h-2 rotate-45',
                    'bg-neu-base shadow-neu-raised-sm',
                    getArrowClasses()
                  )}
                  aria-hidden="true"
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

Tooltip.displayName = 'Tooltip'

export { Tooltip }
