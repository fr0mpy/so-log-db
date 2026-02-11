import { cn } from '@/lib/utils'
import { forwardRef, createContext, useContext, useId, useRef, useCallback, useEffect } from 'react'
import { motion, LayoutGroup } from 'motion/react'
import { useControlledState } from '../../hooks/useControlledState'
import type {
  TabsContextValue,
  TabsRootProps,
  TabsListProps,
  TabsTriggerProps,
  TabsContentProps,
} from './types'
import { SPRING } from '../../config'

// Original spring with natural bounce - used at edges
const SPRING_BOUNCE = SPRING.bouncy

// Extra smooth for middle transitions - no bounce
const SPRING_SMOOTH = { ...SPRING.bouncy, damping: 40 }

const TabsContext = createContext<TabsContextValue | undefined>(undefined)

const useTabsContext = () => {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs.Root')
  }
  return context
}

// ============================================================================
// Tabs.Root
// ============================================================================

const TabsRoot = forwardRef<HTMLDivElement, TabsRootProps>(
  ({ defaultValue, value, onValueChange, className, children, ...props }, ref) => {
    const layoutId = useId()

    const [activeTab, setActiveTabState] = useControlledState<string>(
      value,
      defaultValue,
      onValueChange
    )

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

    const setActiveTab = useCallback((newValue: string) => {
      currentSpringRef.current = computeSpring(newValue)
      setActiveTabState(newValue)
    }, [computeSpring, setActiveTabState])

    const getSpring = useCallback(() => currentSpringRef.current, [])

    return (
      <TabsContext.Provider value={{
        activeTab,
        setActiveTab,
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
TabsRoot.displayName = 'Tabs.Root'

// ============================================================================
// Tabs.List
// ============================================================================

const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
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
TabsList.displayName = 'Tabs.List'

// ============================================================================
// Tabs.Trigger
// ============================================================================

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
        type="button"
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
TabsTrigger.displayName = 'Tabs.Trigger'

// ============================================================================
// Tabs.Content
// ============================================================================

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
TabsContent.displayName = 'Tabs.Content'

// ============================================================================
// Tabs.Indicator (for custom indicator placement)
// ============================================================================

const TabsIndicator = forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, onDrag, onDragStart, onDragEnd, onAnimationStart, onAnimationEnd, ...props }, ref) => {
    const { layoutId, getSpring } = useTabsContext()

    return (
      <motion.span
        ref={ref}
        layoutId={`${layoutId}-indicator`}
        className={cn('absolute rounded-theme-md bg-neu-base shadow-neu-raised-sm', className)}
        transition={getSpring()}
        {...props}
      />
    )
  }
)
TabsIndicator.displayName = 'Tabs.Indicator'

// ============================================================================
// Namespace Export
// ============================================================================

// Namespace Export (callable as Root + namespace)
export const Tabs = Object.assign(TabsRoot, {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
  Indicator: TabsIndicator,
})

// Individual exports for backward compatibility
export { TabsList, TabsTrigger, TabsContent }
