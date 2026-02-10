import { cn } from '@/lib/utils'
import { forwardRef, useState, createContext, useContext, useId, useRef, useCallback, useEffect } from 'react'
import { motion, LayoutGroup } from 'motion/react'

// Original spring with natural bounce - used at edges
const SPRING_BOUNCE = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 30,
}

// Extra smooth for middle transitions - no bounce
const SPRING_SMOOTH = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 40,
}

interface TabsContextValue {
  activeTab: string
  setActiveTab: (value: string) => void
  layoutId: string
  registerTab: (value: string) => void
  unregisterTab: (value: string) => void
  getSpring: () => typeof SPRING_SMOOTH | typeof SPRING_BOUNCE
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

    // Track registered tabs in DOM order
    const tabsRef = useRef<string[]>([])
    const currentSpringRef = useRef<typeof SPRING_SMOOTH | typeof SPRING_BOUNCE>(SPRING_SMOOTH)

    const registerTab = useCallback((tabValue: string) => {
      if (!tabsRef.current.includes(tabValue)) {
        tabsRef.current.push(tabValue)
      }
    }, [])

    const unregisterTab = useCallback((tabValue: string) => {
      tabsRef.current = tabsRef.current.filter(t => t !== tabValue)
    }, [])

    const computeSpring = useCallback((toValue: string) => {
      const tabs = tabsRef.current
      const toIndex = tabs.indexOf(toValue)
      const isEdge = toIndex === 0 || toIndex === tabs.length - 1
      return isEdge ? SPRING_BOUNCE : SPRING_SMOOTH
    }, [])

    const handleSetActiveTab = (newValue: string) => {
      currentSpringRef.current = computeSpring(newValue)

      if (value === undefined) {
        setActiveTab(newValue)
      }
      onValueChange?.(newValue)
    }

    const getSpring = useCallback(() => currentSpringRef.current, [])

    return (
      <TabsContext.Provider value={{
        activeTab: value ?? activeTab,
        setActiveTab: handleSetActiveTab,
        layoutId,
        registerTab,
        unregisterTab,
        getSpring,
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
    const { activeTab, setActiveTab, layoutId, registerTab, unregisterTab, getSpring } = useTabsContext()
    const isActive = activeTab === value

    // Register tab on mount, unregister on unmount
    useEffect(() => {
      registerTab(value)
      return () => unregisterTab(value)
    }, [value, registerTab, unregisterTab])

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
            transition={getSpring()}
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

    if (!isActive && !forceMount) return null

    return (
      <div
        ref={ref}
        role="tabpanel"
        tabIndex={isActive ? 0 : -1}
        className={cn(
          'mt-2 focus-visible:outline-none',
          !isActive && 'hidden',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
TabsContent.displayName = 'TabsContent'

export { Tabs, TabsList, TabsTrigger, TabsContent }
