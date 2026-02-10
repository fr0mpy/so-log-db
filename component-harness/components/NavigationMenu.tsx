import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import { forwardRef, useState, createContext, useContext } from 'react'
import { motion, AnimatePresence } from 'motion/react'

// Shared spring config for consistent motion
const spring = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 30,
}

// Context to share open state between NavigationMenuItem and NavigationMenuContent
const NavigationMenuItemContext = createContext<{ isOpen: boolean }>({ isOpen: false })

const NavigationMenu = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
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
NavigationMenu.displayName = 'NavigationMenu'

const NavigationMenuList = forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
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
NavigationMenuList.displayName = 'NavigationMenuList'

interface NavigationMenuItemProps extends React.HTMLAttributes<HTMLLIElement> {
  hasDropdown?: boolean
}

const NavigationMenuItem = forwardRef<HTMLLIElement, NavigationMenuItemProps>(
  ({ hasDropdown, className, children, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <NavigationMenuItemContext.Provider value={{ isOpen }}>
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
      </NavigationMenuItemContext.Provider>
    )
  }
)
NavigationMenuItem.displayName = 'NavigationMenuItem'

const NavigationMenuTrigger = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, children, ...props }, ref) => {
    const { isOpen } = useContext(NavigationMenuItemContext)

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
          transition={spring}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </motion.button>
    )
  }
)
NavigationMenuTrigger.displayName = 'NavigationMenuTrigger'

const NavigationMenuContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const { isOpen } = useContext(NavigationMenuItemContext)

    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={spring}
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
NavigationMenuContent.displayName = 'NavigationMenuContent'

const NavigationMenuLink = forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(
  ({ className, children, ...props }, ref) => (
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
NavigationMenuLink.displayName = 'NavigationMenuLink'

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
}
