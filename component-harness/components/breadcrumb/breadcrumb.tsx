import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'
import { forwardRef } from 'react'
import { ARIA } from '../../config'
import type {
  BreadcrumbRootProps,
  BreadcrumbListProps,
  BreadcrumbItemProps,
  BreadcrumbLinkProps,
  BreadcrumbSeparatorProps,
  BreadcrumbPageProps,
} from './types'

const BreadcrumbRoot = forwardRef<HTMLElement, BreadcrumbRootProps>(
  ({ className, ...props }, ref) => (
    <nav ref={ref} aria-label={ARIA.breadcrumb} className={cn('', className)} {...props} />
  )
)
BreadcrumbRoot.displayName = 'Breadcrumb.Root'

const BreadcrumbList = forwardRef<HTMLOListElement, BreadcrumbListProps>(
  ({ className, ...props }, ref) => (
    <ol
      ref={ref}
      className={cn('flex items-center gap-2 text-sm text-muted-foreground', className)}
      {...props}
    />
  )
)
BreadcrumbList.displayName = 'Breadcrumb.List'

const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ className, ...props }, ref) => (
    <li
      ref={ref}
      className={cn('inline-flex items-center gap-2', className)}
      {...props}
    />
  )
)
BreadcrumbItem.displayName = 'Breadcrumb.Item'

const BreadcrumbLink = forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ className, ...props }, ref) => (
    <a
      ref={ref}
      className={cn('cursor-pointer transition-colors hover:text-foreground', className)}
      {...props}
    />
  )
)
BreadcrumbLink.displayName = 'Breadcrumb.Link'

const BreadcrumbSeparator = forwardRef<HTMLLIElement, BreadcrumbSeparatorProps>(
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
BreadcrumbSeparator.displayName = 'Breadcrumb.Separator'

const BreadcrumbPage = forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
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
BreadcrumbPage.displayName = 'Breadcrumb.Page'

// Namespace Export (callable as Root + namespace)
export const Breadcrumb = Object.assign(BreadcrumbRoot, {
  Root: BreadcrumbRoot,
  List: BreadcrumbList,
  Item: BreadcrumbItem,
  Link: BreadcrumbLink,
  Separator: BreadcrumbSeparator,
  Page: BreadcrumbPage,
})

// Individual exports for backward compatibility
export { BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage }
