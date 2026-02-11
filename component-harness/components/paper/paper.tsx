import { cn } from '@/lib/utils'
import { forwardRef } from 'react'
import type {
  PaperRootProps,
  PaperHeaderProps,
  PaperTitleProps,
  PaperDescriptionProps,
  PaperContentProps,
  PaperFooterProps,
} from './types'

const PaperRoot = forwardRef<HTMLDivElement, PaperRootProps>(
  ({ className, children, depth = 'md', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-theme-xl bg-neu-base',
        depth === 'sm' ? 'shadow-neu-pressed-sm' : 'shadow-neu-pressed',
        'transition-shadow duration-200 ease-neu',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
)
PaperRoot.displayName = 'Paper.Root'

const PaperHeader = forwardRef<HTMLDivElement, PaperHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    >
      {children}
    </div>
  )
)
PaperHeader.displayName = 'Paper.Header'

const PaperTitle = forwardRef<HTMLHeadingElement, PaperTitleProps>(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('font-heading text-lg font-semibold text-foreground', className)}
      {...props}
    >
      {children}
    </h3>
  )
)
PaperTitle.displayName = 'Paper.Title'

const PaperDescription = forwardRef<HTMLParagraphElement, PaperDescriptionProps>(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    >
      {children}
    </p>
  )
)
PaperDescription.displayName = 'Paper.Description'

const PaperContent = forwardRef<HTMLDivElement, PaperContentProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('p-6 pt-0', className)}
      {...props}
    >
      {children}
    </div>
  )
)
PaperContent.displayName = 'Paper.Content'

const PaperFooter = forwardRef<HTMLDivElement, PaperFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    >
      {children}
    </div>
  )
)
PaperFooter.displayName = 'Paper.Footer'

// Namespace Export (callable as Root + namespace)
export const Paper = Object.assign(PaperRoot, {
  Root: PaperRoot,
  Header: PaperHeader,
  Title: PaperTitle,
  Description: PaperDescription,
  Content: PaperContent,
  Footer: PaperFooter,
})

// Individual exports for backward compatibility
export { PaperHeader, PaperTitle, PaperDescription, PaperContent, PaperFooter }
