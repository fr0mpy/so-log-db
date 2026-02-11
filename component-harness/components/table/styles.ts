import { SpacingTokens, SizingTokens, TypographyTokens } from '../../styles'

export const TableStyles = {
  wrapper: 'relative w-full overflow-auto',
  table: 'w-full caption-bottom text-sm',
  header: '[&_tr]:border-b',
  body: '[&_tr:last-child]:border-0',
  footer: 'bg-muted/50 font-medium [&>tr]:last:border-b-0',
  row: 'border-b border-border transition-colors hover:bg-muted/50',
  head: [
    SizingTokens.h12,
    SpacingTokens.px4,
    'text-left',
    'align-middle',
    TypographyTokens.fontMedium,
    'text-muted-foreground',
  ].join(' '),
  cell: [SpacingTokens.p4, 'align-middle'].join(' '),
  caption: ['mt-4', 'text-sm', 'text-muted-foreground'].join(' '),
} as const
