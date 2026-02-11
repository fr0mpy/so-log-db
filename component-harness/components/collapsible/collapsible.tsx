import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import { forwardRef, createContext, useContext, cloneElement, isValidElement } from 'react'
import { useControlledState } from '../../hooks/useControlledState'
import type {
  CollapsibleContextValue,
  CollapsibleRootProps,
  CollapsibleTriggerProps,
  CollapsibleContentProps,
} from './types'

const CollapsibleContext = createContext<CollapsibleContextValue | undefined>(undefined)

const useCollapsibleContext = () => {
  const context = useContext(CollapsibleContext)
  if (!context) {
    throw new Error('Collapsible components must be used within a Collapsible.Root')
  }
  return context
}

// ============================================================================
// Collapsible.Root
// ============================================================================

const CollapsibleRoot = forwardRef<HTMLDivElement, CollapsibleRootProps>(
  ({ defaultOpen = false, open, onOpenChange, className, children, ...props }, ref) => {
    const [isOpen, setIsOpen] = useControlledState<boolean>(
      open,
      defaultOpen,
      onOpenChange
    )

    return (
      <CollapsibleContext.Provider value={{ open: isOpen, setOpen: setIsOpen }}>
        <div ref={ref} data-state={isOpen ? 'open' : 'closed'} className={cn('w-full', className)} {...props}>
          {children}
        </div>
      </CollapsibleContext.Provider>
    )
  }
)
CollapsibleRoot.displayName = 'Collapsible.Root'

// ============================================================================
// Collapsible.Trigger
// ============================================================================

const CollapsibleTrigger = forwardRef<HTMLButtonElement, CollapsibleTriggerProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const { open, setOpen } = useCollapsibleContext()

    const handleClick = () => setOpen(!open)

    if (asChild && isValidElement(children)) {
      return cloneElement(children as React.ReactElement<{ onClick?: () => void }>, {
        onClick: handleClick,
        'aria-expanded': open,
        'data-state': open ? 'open' : 'closed',
      } as Partial<unknown>)
    }

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        aria-expanded={open}
        data-state={open ? 'open' : 'closed'}
        className={cn(
          'flex w-full items-center justify-between cursor-pointer rounded-theme-md px-2 py-1',
          'bg-transparent transition-all duration-200',
          'hover:bg-muted',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 transition-transform duration-200',
            open && 'rotate-180'
          )}
        />
      </button>
    )
  }
)
CollapsibleTrigger.displayName = 'Collapsible.Trigger'

// ============================================================================
// Collapsible.Content
// ============================================================================

const CollapsibleContent = forwardRef<HTMLDivElement, CollapsibleContentProps>(
  ({ className, children, ...props }, ref) => {
    const { open } = useCollapsibleContext()

    if (!open) return null

    return (
      <div
        ref={ref}
        data-state={open ? 'open' : 'closed'}
        className={cn('animate-in slide-in-from-top-2', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
CollapsibleContent.displayName = 'Collapsible.Content'

// ============================================================================
// Namespace Export
// ============================================================================

// Namespace Export (callable as Root + namespace)
export const Collapsible = Object.assign(CollapsibleRoot, {
  Root: CollapsibleRoot,
  Trigger: CollapsibleTrigger,
  Content: CollapsibleContent,
})

// Individual exports for backward compatibility
export { CollapsibleRoot, CollapsibleTrigger, CollapsibleContent }
