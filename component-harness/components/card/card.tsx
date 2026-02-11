import { cn } from '@/lib/utils'
import { forwardRef } from 'react'
import type {
  CardRootProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardContentProps,
  CardFooterProps,
} from './types'

const CardRoot = forwardRef<HTMLDivElement, CardRootProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-theme-xl bg-neu-base shadow-neu-raised',
        'transition-shadow duration-200 ease-neu',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
)
CardRoot.displayName = 'Card.Root'

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
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
CardHeader.displayName = 'Card.Header'

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
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
CardTitle.displayName = 'Card.Title'

const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
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
CardDescription.displayName = 'Card.Description'

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
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
CardContent.displayName = 'Card.Content'

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
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
CardFooter.displayName = 'Card.Footer'

// Namespace Export (callable as Root + namespace)
export const Card = Object.assign(CardRoot, {
  Root: CardRoot,
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter,
})

// Individual exports for backward compatibility
export { CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
