import { cn } from '@/lib/utils'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

// Shared spring config for consistent motion
const spring = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 30,
}

interface PopoverProps {
  trigger: React.ReactNode
  children: React.ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
  className?: string
}

const Popover = ({ trigger, children, side = 'bottom', className }: PopoverProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

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
    <div ref={popoverRef} className="relative inline-block">
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, ...initialOffset[side] }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, ...initialOffset[side] }}
            transition={spring}
            className={cn(
              'absolute z-50 w-64 rounded-theme-lg',
              'bg-neu-base shadow-neu-raised-lg p-4',
              positions[side],
              origins[side],
              className
            )}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

Popover.displayName = 'Popover'

export { Popover }
