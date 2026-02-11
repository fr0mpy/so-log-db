import { cn } from '@/lib/utils'
import { forwardRef } from 'react'
import { ScrollArea } from '../display/scroll-area'
import type {
  TableRootProps,
  TableHeaderProps,
  TableBodyProps,
  TableFooterProps,
  TableRowProps,
  TableHeadProps,
  TableCellProps,
  TableCaptionProps,
} from './types'

const TableRoot = forwardRef<HTMLTableElement, TableRootProps>(
  ({ className, ...props }, ref) => (
    <ScrollArea
      className="relative w-full overflow-auto"
      options={{ orientation: 'horizontal' }}
    >
      <table
        ref={ref}
        className={cn('w-full caption-bottom text-sm', className)}
        {...props}
      />
    </ScrollArea>
  )
)
TableRoot.displayName = 'Table.Root'

const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn('[&_tr]:border-b', className)} {...props} />
  )
)
TableHeader.displayName = 'Table.Header'

const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...props }, ref) => (
    <tbody
      ref={ref}
      className={cn('[&_tr:last-child]:border-0', className)}
      {...props}
    />
  )
)
TableBody.displayName = 'Table.Body'

const TableFooter = forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ className, ...props }, ref) => (
    <tfoot
      ref={ref}
      className={cn('bg-muted/50 font-medium [&>tr]:last:border-b-0', className)}
      {...props}
    />
  )
)
TableFooter.displayName = 'Table.Footer'

const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        'border-b border-border transition-colors hover:bg-muted/50',
        className
      )}
      {...props}
    />
  )
)
TableRow.displayName = 'Table.Row'

const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        'h-12 px-4 text-left align-middle font-medium text-muted-foreground',
        className
      )}
      {...props}
    />
  )
)
TableHead.displayName = 'Table.Head'

const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, ...props }, ref) => (
    <td
      ref={ref}
      className={cn('p-4 align-middle', className)}
      {...props}
    />
  )
)
TableCell.displayName = 'Table.Cell'

const TableCaption = forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  ({ className, ...props }, ref) => (
    <caption
      ref={ref}
      className={cn('mt-4 text-sm text-muted-foreground', className)}
      {...props}
    />
  )
)
TableCaption.displayName = 'Table.Caption'

// Namespace Export (callable as Root + namespace)
export const Table = Object.assign(TableRoot, {
  Root: TableRoot,
  Header: TableHeader,
  Body: TableBody,
  Footer: TableFooter,
  Row: TableRow,
  Head: TableHead,
  Cell: TableCell,
  Caption: TableCaption,
})

// Individual exports for backward compatibility
export {
  TableRoot,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
}
