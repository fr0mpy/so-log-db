import { cn } from '@/lib/utils'
import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { SPRING, OFFSET } from '../../config'
import { DropdownMenuStyles as S } from './styles'

interface DropdownMenuProps {
  trigger: React.ReactNode
  children: React.ReactNode
  align?: 'start' | 'center' | 'end'
}

function DropdownMenu({ trigger, children, align = 'start' }: DropdownMenuProps) {
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
    <div ref={menuRef} className={S.wrapper}>
      <div
        role="button"
        tabIndex={0}
        onClick={handleTriggerClick}
        onKeyDown={handleTriggerKeyDown}
        className={S.trigger}
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
            className={cn(S.popup, S.alignment[align])}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface DropdownMenuItemProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd'> {
  ref?: React.Ref<HTMLButtonElement>
}

function DropdownMenuItem({ className, children, ref, ...props }: DropdownMenuItemProps) {
  return (
    <motion.button
      ref={ref}
      role="menuitem"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={cn(S.item, className)}
      {...props}
    >
      {children}
    </motion.button>
  )
}

interface DropdownMenuSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>
}

function DropdownMenuSeparator({ className, ref, ...props }: DropdownMenuSeparatorProps) {
  return (
    <div
      ref={ref}
      role="separator"
      className={cn(S.separator, className)}
      {...props}
    />
  )
}

interface DropdownMenuLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>
}

function DropdownMenuLabel({ className, ref, ...props }: DropdownMenuLabelProps) {
  return (
    <div
      ref={ref}
      className={cn(S.label, className)}
      {...props}
    />
  )
}

export { DropdownMenu, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel }
