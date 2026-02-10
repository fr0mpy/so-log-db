import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { forwardRef } from 'react'

const Pagination = forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
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
Pagination.displayName = 'Pagination'

const PaginationContent = forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      className={cn('flex items-center gap-1', className)}
      {...props}
    />
  )
)
PaginationContent.displayName = 'PaginationContent'

const PaginationItem = forwardRef<HTMLLIElement, React.HTMLAttributes<HTMLLIElement>>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn('', className)} {...props} />
  )
)
PaginationItem.displayName = 'PaginationItem'

interface PaginationLinkProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean
}

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
          ? 'bg-primary text-primary-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.2),-2px_-2px_4px_rgba(255,255,255,0.2),2px_2px_4px_rgba(0,100,60,0.2)]'
          : 'bg-neu-base shadow-neu-raised-sm hover:shadow-neu-raised',
        className
      )}
      {...props}
    />
  )
)
PaginationLink.displayName = 'PaginationLink'

const PaginationPrevious = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      aria-label="Go to previous page"
      className={cn(
        'inline-flex items-center justify-center gap-1 h-9 px-3 rounded-theme-lg text-sm font-medium cursor-pointer',
        'bg-secondary text-secondary-foreground',
        'shadow-[inset_0_1px_0_rgba(255,255,255,0.2),-4px_-4px_10px_rgba(255,255,255,0.3),4px_4px_10px_rgba(60,60,140,0.3)]',
        'transition-all duration-200 active:scale-[0.98]',
        'hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.3),-2px_-2px_8px_rgba(255,255,255,0.4),2px_2px_8px_rgba(60,60,140,0.4)]',
        'active:shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.2),inset_2px_2px_5px_rgba(50,50,120,0.3)]',
        'focus-visible:outline-none focus-visible:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),-4px_-4px_10px_rgba(255,255,255,0.3),4px_4px_10px_rgba(60,60,140,0.3),var(--shadow-focus)]',
        'disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
      <span>Previous</span>
    </button>
  )
)
PaginationPrevious.displayName = 'PaginationPrevious'

const PaginationNext = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      aria-label="Go to next page"
      className={cn(
        'inline-flex items-center justify-center gap-1 h-9 px-3 rounded-theme-lg text-sm font-medium cursor-pointer',
        'bg-secondary text-secondary-foreground',
        'shadow-[inset_0_1px_0_rgba(255,255,255,0.2),-4px_-4px_10px_rgba(255,255,255,0.3),4px_4px_10px_rgba(60,60,140,0.3)]',
        'transition-all duration-200 active:scale-[0.98]',
        'hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.3),-2px_-2px_8px_rgba(255,255,255,0.4),2px_2px_8px_rgba(60,60,140,0.4)]',
        'active:shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.2),inset_2px_2px_5px_rgba(50,50,120,0.3)]',
        'focus-visible:outline-none focus-visible:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),-4px_-4px_10px_rgba(255,255,255,0.3),4px_4px_10px_rgba(60,60,140,0.3),var(--shadow-focus)]',
        'disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      {...props}
    >
      <span>Next</span>
      <ChevronRight className="h-4 w-4" />
    </button>
  )
)
PaginationNext.displayName = 'PaginationNext'

const PaginationEllipsis = forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      aria-hidden
      className={cn('flex h-9 w-9 items-center justify-center', className)}
      {...props}
    >
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">More pages</span>
    </span>
  )
)
PaginationEllipsis.displayName = 'PaginationEllipsis'

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}
