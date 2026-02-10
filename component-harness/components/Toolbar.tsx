import { cn } from '@/lib/utils'
import { forwardRef, createContext, useContext } from 'react'

type ToolbarOrientation = 'horizontal' | 'vertical'

interface ToolbarContextValue {
  orientation: ToolbarOrientation
}

const ToolbarContext = createContext<ToolbarContextValue>({ orientation: 'horizontal' })

const useToolbarContext = () => useContext(ToolbarContext)

interface ToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Toolbar orientation. Default: 'horizontal' */
  orientation?: ToolbarOrientation
}

const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(
  ({ orientation = 'horizontal', className, children, ...props }, ref) => {
    return (
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
  }
)
Toolbar.displayName = 'Toolbar'

interface ToolbarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Whether this button is currently active/pressed */
  active?: boolean
}

const ToolbarButton = forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  ({ active, className, children, ...props }, ref) => {
    return (
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
  }
)
ToolbarButton.displayName = 'ToolbarButton'

interface ToolbarSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

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
ToolbarSeparator.displayName = 'ToolbarSeparator'

interface ToolbarGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

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
ToolbarGroup.displayName = 'ToolbarGroup'

interface ToolbarLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

const ToolbarLink = forwardRef<HTMLAnchorElement, ToolbarLinkProps>(
  ({ className, children, ...props }, ref) => {
    return (
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
  }
)
ToolbarLink.displayName = 'ToolbarLink'

export {
  Toolbar,
  ToolbarButton,
  ToolbarSeparator,
  ToolbarGroup,
  ToolbarLink,
}
export type { ToolbarProps, ToolbarButtonProps, ToolbarSeparatorProps, ToolbarGroupProps, ToolbarLinkProps }
