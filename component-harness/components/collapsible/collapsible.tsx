import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import { createContext, useContext, cloneElement, isValidElement } from 'react'
import { useControlledState } from '../../hooks/useControlledState'
import type {
  CollapsibleContextValue,
  CollapsibleRootProps,
  CollapsibleTriggerProps,
  CollapsibleContentProps,
} from './types'
import { CollapsibleStyles as S } from './styles'

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

function CollapsibleRoot({ defaultOpen = false, open, onOpenChange, className, children, ref, ...props }: CollapsibleRootProps) {
  const [isOpen, setIsOpen] = useControlledState<boolean>(
    open,
    defaultOpen,
    onOpenChange
  )

  return (
    <CollapsibleContext.Provider value={{ open: isOpen, setOpen: setIsOpen }}>
      <div ref={ref} data-state={isOpen ? 'open' : 'closed'} className={cn(S.root, className)} {...props}>
        {children}
      </div>
    </CollapsibleContext.Provider>
  )
}

// ============================================================================
// Collapsible.Trigger
// ============================================================================

function CollapsibleTrigger({ className, children, asChild, ref, ...props }: CollapsibleTriggerProps) {
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
      className={cn(S.trigger, className)}
      {...props}
    >
      {children}
      <ChevronDown className={cn(S.icon, open && S.iconOpen)} />
    </button>
  )
}

// ============================================================================
// Collapsible.Content
// ============================================================================

function CollapsibleContent({ className, children, ref, ...props }: CollapsibleContentProps) {
  const { open } = useCollapsibleContext()

  if (!open) return null

  return (
    <div
      ref={ref}
      data-state={open ? 'open' : 'closed'}
      className={cn(S.content, className)}
      {...props}
    >
      {children}
    </div>
  )
}

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
