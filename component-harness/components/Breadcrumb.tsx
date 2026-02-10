import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'
import { forwardRef } from 'react'

const Breadcrumb = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <nav ref={ref} aria-label="breadcrumb" className={cn('', className)} {...props} />
  )
)
Breadcrumb.displayName = 'Breadcrumb'

const BreadcrumbList = forwardRef<HTMLOListElement, React.HTMLAttributes<HTMLOListElement>>(
  ({ className, ...props }, ref) => (
    <ol
      ref={ref}
      className={cn('flex items-center gap-2 text-sm text-muted-foreground', className)}
      {...props}
    />
  )
)
BreadcrumbList.displayName = 'BreadcrumbList'

const BreadcrumbItem = forwardRef<HTMLLIElement, React.HTMLAttributes<HTMLLIElement>>(
  ({ className, ...props }, ref) => (
    <li
      ref={ref}
      className={cn('inline-flex items-center gap-2', className)}
      {...props}
    />
  )
)
BreadcrumbItem.displayName = 'BreadcrumbItem'

const BreadcrumbLink = forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(
  ({ className, ...props }, ref) => (
    <a
      ref={ref}
      className={cn('cursor-pointer transition-colors hover:text-foreground', className)}
      {...props}
    />
  )
)
BreadcrumbLink.displayName = 'BreadcrumbLink'

const BreadcrumbSeparator = forwardRef<HTMLLIElement, React.HTMLAttributes<HTMLLIElement>>(
  ({ className, children, ...props }, ref) => (
    <li
      ref={ref}
      role="presentation"
      aria-hidden="true"
      className={cn('', className)}
      {...props}
    >
      {children || <ChevronRight className="h-4 w-4" />}
    </li>
  )
)
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator'

const BreadcrumbPage = forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn('font-medium text-foreground', className)}
      {...props}
    />
  )
)
BreadcrumbPage.displayName = 'BreadcrumbPage'

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
}
