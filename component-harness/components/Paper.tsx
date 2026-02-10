import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

export interface PaperProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Depth of the inward press effect */
  depth?: 'sm' | 'md'
}

const Paper = forwardRef<HTMLDivElement, PaperProps>(
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
Paper.displayName = 'Paper'

const PaperHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
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
PaperHeader.displayName = 'PaperHeader'

const PaperTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
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
PaperTitle.displayName = 'PaperTitle'

const PaperDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
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
PaperDescription.displayName = 'PaperDescription'

const PaperContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
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
PaperContent.displayName = 'PaperContent'

const PaperFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
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
PaperFooter.displayName = 'PaperFooter'

export { Paper, PaperHeader, PaperTitle, PaperDescription, PaperContent, PaperFooter }
