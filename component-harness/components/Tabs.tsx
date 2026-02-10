import { cn } from '@/lib/utils'
import { forwardRef, useState, createContext, useContext, useId } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'motion/react'

// Spring config for snappy tab switching
const spring = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 30,
}

interface TabsContextValue {
  activeTab: string
  setActiveTab: (value: string) => void
  layoutId: string
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined)

const useTabsContext = () => {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs provider')
  }
  return context
}

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue: string
  value?: string
  onValueChange?: (value: string) => void
}

const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ defaultValue, value, onValueChange, className, children, ...props }, ref) => {
    const [activeTab, setActiveTab] = useState(value || defaultValue)
    const layoutId = useId()

    const handleSetActiveTab = (newValue: string) => {
      if (value === undefined) {
        setActiveTab(newValue)
      }
      onValueChange?.(newValue)
    }

    return (
      <TabsContext.Provider value={{
        activeTab: value || activeTab,
        setActiveTab: handleSetActiveTab,
        layoutId,
      }}>
        <LayoutGroup>
          <div ref={ref} className={cn('w-full', className)} {...props}>
            {children}
          </div>
        </LayoutGroup>
      </TabsContext.Provider>
    )
  }
)
Tabs.displayName = 'Tabs'

const TabsList = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="tablist"
        className={cn(
          'relative inline-flex h-10 items-center justify-center rounded-theme-lg bg-neu-base shadow-neu-pressed-sm p-1 text-muted-foreground',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
TabsList.displayName = 'TabsList'

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}

const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ value, className, children, ...props }, ref) => {
    const { activeTab, setActiveTab, layoutId } = useTabsContext()
    const isActive = activeTab === value

    return (
      <button
        ref={ref}
        role="tab"
        aria-selected={isActive}
        onClick={() => setActiveTab(value)}
        className={cn(
          'relative z-10 inline-flex items-center justify-center whitespace-nowrap rounded-theme-md px-3 py-1.5',
          'text-sm font-medium cursor-pointer',
          'transition-colors duration-neu ease-neu',
          'focus-visible:outline-none focus-visible:shadow-neu-focus',
          'disabled:pointer-events-none disabled:opacity-50',
          isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
          className
        )}
        {...props}
      >
        {isActive && (
          <motion.span
            layoutId={`${layoutId}-indicator`}
            className="absolute inset-0 rounded-theme-md bg-neu-base shadow-neu-raised-sm"
            transition={spring}
          />
        )}
        <span className="relative z-10">{children}</span>
      </button>
    )
  }
)
TabsTrigger.displayName = 'TabsTrigger'

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  forceMount?: boolean
}

const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ value, forceMount, className, children, ...props }, ref) => {
    const { activeTab } = useTabsContext()
    const isActive = activeTab === value

    return (
      <AnimatePresence mode="wait" initial={false}>
        {(isActive || forceMount) && (
          <motion.div
            key={value}
            ref={ref}
            role="tabpanel"
            tabIndex={isActive ? 0 : -1}
            initial={{ opacity: 0, y: 4 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.2, ease: 'easeOut' }
            }}
            exit={{
              opacity: 0,
              y: -4,
              transition: { duration: 0.15, ease: 'easeIn' }
            }}
            className={cn(
              'mt-2 focus-visible:outline-none',
              !isActive && 'hidden',
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
TabsContent.displayName = 'TabsContent'

export { Tabs, TabsList, TabsTrigger, TabsContent }
