import { cn } from '@/lib/utils'
import { forwardRef, useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { SPRING, OFFSET } from '../../config'

// Alignment classes for dropdown positioning
const ALIGNMENTS = {
  start: 'left-0',
  center: 'left-1/2 -translate-x-1/2',
  end: 'right-0',
} as const

interface DropdownMenuProps {
  trigger: React.ReactNode
  children: React.ReactNode
  align?: 'start' | 'center' | 'end'
}

const DropdownMenu = ({ trigger, children, align = 'start' }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
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

  const handleTriggerClick = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  const handleTriggerKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setIsOpen(prev => !prev)
    }
  }, [])

  return (
    <div ref={menuRef} className="relative inline-block">
      <div
        role="button"
        tabIndex={0}
        onClick={handleTriggerClick}
        onKeyDown={handleTriggerKeyDown}
        className="cursor-pointer"
      >
        {trigger}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, scale: 0.95, y: -OFFSET.dropdown }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -OFFSET.dropdown }}
            transition={SPRING.default}
            className={cn(
              'absolute z-50 mt-1 min-w-[12rem] rounded-theme-md border border-border',
              'bg-background shadow-theme-lg glass p-1 origin-top',
              ALIGNMENTS[align]
            )}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

DropdownMenu.displayName = 'DropdownMenu'

const DropdownMenuItem = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, children, onDrag, onDragStart, onDragEnd, onAnimationStart, onAnimationEnd, ...props }, ref) => (
    <motion.button
      ref={ref}
      role="menuitem"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
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
)
DropdownMenuItem.displayName = 'DropdownMenuItem'

const DropdownMenuSeparator = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="separator"
      className={cn('my-1 h-px bg-border', className)}
      {...props}
    />
  )
)
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator'

const DropdownMenuLabel = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('px-2 py-1.5 text-sm font-semibold text-foreground', className)}
      {...props}
    />
  )
)
DropdownMenuLabel.displayName = 'DropdownMenuLabel'

export { DropdownMenu, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel }
