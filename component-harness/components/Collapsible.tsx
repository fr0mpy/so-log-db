import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import { forwardRef, useState, createContext, useContext } from 'react'

interface CollapsibleContextValue {
  open: boolean
  setOpen: (open: boolean) => void
}

const CollapsibleContext = createContext<CollapsibleContextValue | undefined>(undefined)

const useCollapsibleContext = () => {
  const context = useContext(CollapsibleContext)
  if (!context) {
    throw new Error('Collapsible components must be used within a Collapsible provider')
  }
  return context
}

interface CollapsibleProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const Collapsible = forwardRef<HTMLDivElement, CollapsibleProps>(
  ({ defaultOpen = false, open, onOpenChange, className, children, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(open !== undefined ? open : defaultOpen)

    const handleSetOpen = (newOpen: boolean) => {
      if (open === undefined) {
        setIsOpen(newOpen)
      }
      onOpenChange?.(newOpen)
    }

    return (
      <CollapsibleContext.Provider value={{ open: open !== undefined ? open : isOpen, setOpen: handleSetOpen }}>
        <div ref={ref} className={cn('w-full', className)} {...props}>
          {children}
        </div>
      </CollapsibleContext.Provider>
    )
  }
)
Collapsible.displayName = 'Collapsible'

const CollapsibleTrigger = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, children, ...props }, ref) => {
    const { open, setOpen } = useCollapsibleContext()

    return (
      <button
        ref={ref}
        onClick={() => setOpen(!open)}
        className={cn(
          'flex w-full items-center justify-between cursor-pointer rounded-theme-md px-2 py-1',
          'bg-transparent transition-all duration-200',
          'hover:bg-slate-400',
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
CollapsibleTrigger.displayName = 'CollapsibleTrigger'

const CollapsibleContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const { open } = useCollapsibleContext()

    if (!open) return null

    return (
      <div
        ref={ref}
        className={cn('animate-in slide-in-from-top-2', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
CollapsibleContent.displayName = 'CollapsibleContent'

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
