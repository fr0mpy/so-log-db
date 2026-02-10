import { cn } from '@/lib/utils'
import { forwardRef, useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

// Shared spring config for consistent motion
const spring = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 30,
}

interface ContextMenuProps {
  trigger: React.ReactNode
  children: React.ReactNode
}

const ContextMenu = ({ trigger, children }: ContextMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
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

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault()
    setPosition({ x: event.clientX, y: event.clientY })
    setIsOpen(true)
  }

  return (
    <div ref={menuRef} className="relative inline-block">
      <div onContextMenu={handleContextMenu}>
        {trigger}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={spring}
            className={cn(
              'fixed z-50 min-w-[12rem] rounded-theme-md border border-border',
              'bg-background shadow-theme-lg glass p-1 origin-top-left'
            )}
            style={{ left: `${position.x}px`, top: `${position.y}px` }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

ContextMenu.displayName = 'ContextMenu'

const ContextMenuItem = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, children, ...props }, ref) => (
    <motion.button
      ref={ref}
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
ContextMenuItem.displayName = 'ContextMenuItem'

const ContextMenuSeparator = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="separator"
      className={cn('my-1 h-px bg-border', className)}
      {...props}
    />
  )
)
ContextMenuSeparator.displayName = 'ContextMenuSeparator'

export { ContextMenu, ContextMenuItem, ContextMenuSeparator }
