import { Layout, Interactive, Paper } from '../../styles'

export const SideNavStyles = {
  root: {
    base: [
      'fixed left-0 top-0 h-full z-40',
      'flex flex-col',
      Paper.inset,
      'rounded-l-none', // Flush against left edge
      'overflow-hidden',
    ].join(' '),
  },
  header: {
    base: [
      Layout.Flex.col,
      'p-4 gap-1',
      'border-b border-border/50',
    ].join(' '),
    logo: [
      Layout.Flex.center,
      'gap-3',
      'min-h-[40px]',
    ].join(' '),
    title: [
      'text-xl font-bold text-primary',
      'whitespace-nowrap overflow-hidden',
    ].join(' '),
    subtitle: [
      'text-sm text-muted-foreground',
      'whitespace-nowrap overflow-hidden',
    ].join(' '),
  },
  nav: {
    base: [
      'flex-1 flex flex-col',
      'p-2 gap-1',
      'overflow-y-auto overflow-x-hidden',
    ].join(' '),
  },
  item: {
    base: [
      'flex items-center justify-start',
      'gap-3 p-3',
      'h-12', // Fixed height prevents CLS on expand/collapse
      'rounded-theme-md',
      Interactive.Cursor.pointer,
      Interactive.Transition.color,
      'text-foreground',
      'whitespace-nowrap overflow-hidden',
    ].join(' '),
    icon: [Layout.Size.iconMd, 'flex-shrink-0'].join(' '),
    active: 'bg-primary text-primary-foreground',
    inactive: [
      Interactive.Hover.ghost,
    ].join(' '),
  },
  footer: {
    base: [
      'mt-auto p-4',
      'border-t border-border/50',
    ].join(' '),
  },
} as const

export const SIDENAV_DIMENSIONS = {
  collapsed: 64,
  expanded: 220,
} as const
