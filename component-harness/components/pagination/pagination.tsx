import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { forwardRef } from 'react'
import { ARIA, SR_ONLY, LABEL } from '../../config'
import type {
  PaginationRootProps,
  PaginationContentProps,
  PaginationItemProps,
  PaginationLinkProps,
  PaginationPreviousProps,
  PaginationNextProps,
  PaginationEllipsisProps,
} from './types'

const PaginationRoot = forwardRef<HTMLElement, PaginationRootProps>(
  ({ className, ...props }, ref) => (
    <nav
      ref={ref}
      role="navigation"
      aria-label="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
      {...props}
    />
  )
)
PaginationRoot.displayName = 'Pagination.Root'

const PaginationContent = forwardRef<HTMLUListElement, PaginationContentProps>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      className={cn('flex items-center gap-1', className)}
      {...props}
    />
  )
)
PaginationContent.displayName = 'Pagination.Content'

const PaginationItem = forwardRef<HTMLLIElement, PaginationItemProps>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn('', className)} {...props} />
  )
)
PaginationItem.displayName = 'Pagination.Item'

const PaginationLink = forwardRef<HTMLButtonElement, PaginationLinkProps>(
  ({ isActive, className, ...props }, ref) => (
    <button
      ref={ref}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'inline-flex items-center justify-center min-h-11 min-w-11 h-9 w-9 rounded-theme-lg text-sm font-medium',
        'transition-shadow duration-200 cursor-pointer',
        'focus-visible:outline-none focus-visible:shadow-neu-focus',
        'disabled:pointer-events-none disabled:opacity-50',
        isActive
          ? 'bg-primary text-primary-foreground shadow-neu-badge-primary'
          : 'bg-transparent text-foreground hover:bg-neu-base hover:shadow-neu-raised-sm active:shadow-neu-pressed-sm',
        className
      )}
      {...props}
    />
  )
)
PaginationLink.displayName = 'Pagination.Link'

const PaginationPrevious = forwardRef<HTMLButtonElement, PaginationPreviousProps>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      aria-label={ARIA.previousPage}
      className={cn(
        'inline-flex items-center justify-center gap-1 h-9 px-3 rounded-theme-lg text-sm font-medium cursor-pointer',
        'bg-transparent text-foreground',
        'transition-all duration-200 active:scale-[0.98]',
        'hover:bg-neu-base hover:shadow-neu-raised-sm',
        'active:shadow-neu-pressed-sm',
        'focus-visible:outline-none focus-visible:shadow-neu-focus',
        'disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
      <span>{LABEL.previous}</span>
    </button>
  )
)
PaginationPrevious.displayName = 'Pagination.Previous'

const PaginationNext = forwardRef<HTMLButtonElement, PaginationNextProps>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      aria-label={ARIA.nextPage}
      className={cn(
        'inline-flex items-center justify-center gap-1 h-9 px-3 rounded-theme-lg text-sm font-medium cursor-pointer',
        'bg-transparent text-foreground',
        'transition-all duration-200 active:scale-[0.98]',
        'hover:bg-neu-base hover:shadow-neu-raised-sm',
        'active:shadow-neu-pressed-sm',
        'focus-visible:outline-none focus-visible:shadow-neu-focus',
        'disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      {...props}
    >
      <span>{LABEL.next}</span>
      <ChevronRight className="h-4 w-4" />
    </button>
  )
)
PaginationNext.displayName = 'Pagination.Next'

const PaginationEllipsis = forwardRef<HTMLSpanElement, PaginationEllipsisProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      aria-hidden
      className={cn('flex h-9 w-9 items-center justify-center', className)}
      {...props}
    >
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">{SR_ONLY.morePages}</span>
    </span>
  )
)
PaginationEllipsis.displayName = 'Pagination.Ellipsis'

export const Pagination = Object.assign(PaginationRoot, {
  Content: PaginationContent,
  Item: PaginationItem,
  Link: PaginationLink,
  Previous: PaginationPrevious,
  Next: PaginationNext,
  Ellipsis: PaginationEllipsis,
})

// Individual exports for backward compatibility
export {
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}
