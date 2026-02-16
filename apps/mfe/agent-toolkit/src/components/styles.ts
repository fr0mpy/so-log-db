/**
 * MFE Component Styles - zero inline classnames pattern.
 * Uses core style patterns for consistency.
 */

import { Layout, Interactive } from '@stackone-ui/core/styles'

export const NavLinkStyles = {
  base: [
    Layout.Flex.inline,
    'gap-1',
    'font-medium',
    Interactive.Cursor.pointer,
    Interactive.Transition.color,
    'outline-none whitespace-nowrap',
    'disabled:pointer-events-none disabled:opacity-50',
    'h-9 px-4 text-sm rounded-theme-md',
    'bg-transparent text-foreground',
    Interactive.Hover.ghost,
    'active:shadow-neu-pressed-sm',
    'focus-visible:shadow-neu-focus',
  ].join(' '),
  active: 'bg-primary/10 text-primary',
  inactive: '',
} as const

export const SidebarStyles = {
  root: [
    'fixed left-0 top-0 h-full z-40',
    'flex flex-col',
    'bg-neu-base shadow-neu-pressed-sm',
    'rounded-r-theme-xl overflow-hidden',
    'transition-[width] duration-200 ease-out',
  ].join(' '),
  header: [
    'flex items-center justify-start',
    'pl-4 pr-3 py-3', // pl-4 (16px) positions at collapsed center
  ].join(' '),
  footer: [
    'flex items-center justify-start',
    'mt-auto p-3 border-t border-border/50',
  ].join(' '),
} as const

export const SidebarNavStyles = {
  nav: 'flex-1 flex flex-col p-2 gap-1 overflow-y-auto overflow-x-hidden',
  item: {
    base: [
      'flex items-center justify-start',
      'gap-3 p-3 h-12',
      'rounded-theme-md',
      Interactive.Cursor.pointer,
      Interactive.Transition.color,
      'whitespace-nowrap overflow-hidden',
      'transition-[width] duration-200 ease-out',
    ].join(' '),
    /** When collapsed, shrink width to fit icon only */
    widthCollapsed: 'w-12',
    /** When expanded, full width */
    widthExpanded: 'w-full',
    icon: 'size-5 flex-shrink-0 text-white',
    label: 'flex-1 text-left transition-[opacity,transform] duration-200 ease-out',
    labelVisible: 'opacity-100 translate-x-0',
    labelHidden: 'opacity-0 -translate-x-2',
    active: 'bg-primary text-primary-foreground',
    inactive: ['text-foreground', Interactive.Hover.ghost].join(' '),
  },
} as const
