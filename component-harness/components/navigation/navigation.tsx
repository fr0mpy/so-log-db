import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import { forwardRef, useState, createContext, useContext } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import type {
  NavigationRootProps,
  NavigationListProps,
  NavigationItemProps,
  NavigationTriggerProps,
  NavigationContentProps,
  NavigationLinkProps,
} from './types'
import { SPRING, OFFSET } from '../../config'

// Context to share open state between NavigationItem and NavigationContent
const NavigationItemContext = createContext<{ isOpen: boolean }>({ isOpen: false })

const NavigationRoot = forwardRef<HTMLElement, NavigationRootProps>(
  ({ className, children, ...props }, ref) => (
    <nav
      ref={ref}
      className={cn('relative z-10 flex items-center justify-center', className)}
      {...props}
    >
      {children}
    </nav>
  )
)
NavigationRoot.displayName = 'Navigation.Root'

const NavigationList = forwardRef<HTMLUListElement, NavigationListProps>(
  ({ className, children, ...props }, ref) => (
    <ul
      ref={ref}
      className={cn('flex items-center gap-1', className)}
      {...props}
    >
      {children}
    </ul>
  )
)
NavigationList.displayName = 'Navigation.List'

const NavigationItem = forwardRef<HTMLLIElement, NavigationItemProps>(
  ({ hasDropdown, className, children, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <NavigationItemContext.Provider value={{ isOpen }}>
        <li
          ref={ref}
          className={cn('relative', className)}
          onMouseEnter={() => hasDropdown && setIsOpen(true)}
          onMouseLeave={() => hasDropdown && setIsOpen(false)}
          {...props}
        >
          {hasDropdown ? (
            <>
              <div className="flex items-center">
                {children}
              </div>
            </>
          ) : (
            children
          )}
        </li>
      </NavigationItemContext.Provider>
    )
  }
)
NavigationItem.displayName = 'Navigation.Item'

const NavigationTrigger = forwardRef<HTMLButtonElement, NavigationTriggerProps>(
  ({ className, children, onDrag, onDragStart, onDragEnd, onAnimationStart, onAnimationEnd, ...props }, ref) => {
    const { isOpen } = useContext(NavigationItemContext)

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          'inline-flex items-center justify-center gap-1 rounded-theme-md px-4 py-2 cursor-pointer',
          'text-sm font-medium transition-colors',
          'hover:bg-surface focus-visible:bg-surface',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          className
        )}
        {...props}
      >
        {children}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={SPRING.default}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </motion.button>
    )
  }
)
NavigationTrigger.displayName = 'Navigation.Trigger'

const NavigationContent = forwardRef<HTMLDivElement, NavigationContentProps>(
  ({ className, children, onDrag, onDragStart, onDragEnd, onAnimationStart, onAnimationEnd, ...props }, ref) => {
    const { isOpen } = useContext(NavigationItemContext)

    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.95, y: -OFFSET.dropdown }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -OFFSET.dropdown }}
            transition={SPRING.default}
            className={cn(
              'absolute left-0 top-full mt-1 w-auto min-w-[12rem] rounded-theme-md border border-border',
              'bg-background shadow-theme-lg glass p-2 origin-top',
              className
            )}
            {...props}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    )
  }
)
NavigationContent.displayName = 'Navigation.Content'

const NavigationLink = forwardRef<HTMLAnchorElement, NavigationLinkProps>(
  ({ className, children, onDrag, onDragStart, onDragEnd, onAnimationStart, onAnimationEnd, ...props }, ref) => (
    <motion.a
      ref={ref}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={cn(
        'block rounded-theme-md px-4 py-2 text-sm font-medium cursor-pointer',
        'transition-colors hover:bg-surface',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        className
      )}
      {...props}
    >
      {children}
    </motion.a>
  )
)
NavigationLink.displayName = 'Navigation.Link'

export const Navigation = {
  Root: NavigationRoot,
  List: NavigationList,
  Item: NavigationItem,
  Trigger: NavigationTrigger,
  Content: NavigationContent,
  Link: NavigationLink,
}
