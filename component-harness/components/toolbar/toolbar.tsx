import { cn } from '@/lib/utils'
import { forwardRef, createContext, useContext } from 'react'
import type {
  ToolbarOrientation,
  ToolbarRootProps,
  ToolbarButtonProps,
  ToolbarSeparatorProps,
  ToolbarGroupProps,
  ToolbarLinkProps,
} from './types'

interface ToolbarContextValue {
  orientation: ToolbarOrientation
}

const ToolbarContext = createContext<ToolbarContextValue>({ orientation: 'horizontal' })

const useToolbarContext = () => useContext(ToolbarContext)

const ToolbarRoot = forwardRef<HTMLDivElement, ToolbarRootProps>(
  ({ orientation = 'horizontal', className, children, ...props }, ref) => (
    <ToolbarContext.Provider value={{ orientation }}>
      <div
        ref={ref}
        role="toolbar"
        aria-orientation={orientation}
        className={cn(
          'flex items-center gap-1 p-1 rounded-theme-lg',
          'bg-neu-base shadow-neu-raised',
          orientation === 'vertical' && 'flex-col',
          className
        )}
        {...props}
      >
        {children}
      </div>
    </ToolbarContext.Provider>
  )
)
ToolbarRoot.displayName = 'Toolbar.Root'

const ToolbarButton = forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  ({ active, className, children, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      data-state={active ? 'on' : 'off'}
      className={cn(
        'inline-flex h-9 w-9 items-center justify-center rounded-theme-md',
        'text-sm font-medium text-foreground cursor-pointer',
        'transition-shadow duration-200',
        'focus-visible:outline-none focus-visible:shadow-neu-focus',
        'disabled:pointer-events-none disabled:opacity-50',
        active
          ? 'bg-primary/10 shadow-neu-pressed-sm text-primary'
          : 'bg-transparent hover:bg-neu-base hover:shadow-neu-raised-sm active:shadow-neu-pressed-sm',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
)
ToolbarButton.displayName = 'Toolbar.Button'

const ToolbarSeparator = forwardRef<HTMLDivElement, ToolbarSeparatorProps>(
  ({ className, ...props }, ref) => {
    const { orientation } = useToolbarContext()

    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation={orientation === 'horizontal' ? 'vertical' : 'horizontal'}
        className={cn(
          'bg-border',
          orientation === 'horizontal' ? 'mx-1 h-5 w-px' : 'my-1 h-px w-5',
          className
        )}
        {...props}
      />
    )
  }
)
ToolbarSeparator.displayName = 'Toolbar.Separator'

const ToolbarGroup = forwardRef<HTMLDivElement, ToolbarGroupProps>(
  ({ className, children, ...props }, ref) => {
    const { orientation } = useToolbarContext()

    return (
      <div
        ref={ref}
        role="group"
        className={cn(
          'flex items-center gap-0.5',
          orientation === 'vertical' && 'flex-col',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ToolbarGroup.displayName = 'Toolbar.Group'

const ToolbarLink = forwardRef<HTMLAnchorElement, ToolbarLinkProps>(
  ({ className, children, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(
        'inline-flex h-9 items-center justify-center px-3 rounded-theme-md',
        'text-sm font-medium text-foreground cursor-pointer',
        'transition-shadow duration-200',
        'hover:bg-neu-base hover:shadow-neu-raised-sm',
        'focus-visible:outline-none focus-visible:shadow-neu-focus',
        className
      )}
      {...props}
    >
      {children}
    </a>
  )
)
ToolbarLink.displayName = 'Toolbar.Link'

export const Toolbar = Object.assign(ToolbarRoot, {
  Button: ToolbarButton,
  Separator: ToolbarSeparator,
  Group: ToolbarGroup,
  Link: ToolbarLink,
})

// Individual exports for backward compatibility
export { ToolbarButton, ToolbarSeparator, ToolbarGroup, ToolbarLink }
