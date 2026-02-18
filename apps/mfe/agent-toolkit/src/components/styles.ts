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
    'sticky top-0 h-screen z-40 flex-shrink-0',
    'flex flex-col',
    'bg-neu-base shadow-neu-pressed-sm',
    'rounded-r-theme-xl overflow-hidden',
    'transition-[width] duration-200 ease-out',
  ].join(' '),
  header: [
    'flex flex-col gap-3',
    'px-3 py-3', // 12px horizontal centers 40px logo in 64px collapsed sidebar
  ].join(' '),
  headerRow: [
    'flex items-center gap-2 w-full',
  ].join(' '),
  projectSelector: [
    'flex-1 min-w-0 overflow-hidden',
    'transition-opacity duration-200 ease-out',
  ].join(' '),
  projectTrigger: [
    'h-10 text-sm whitespace-nowrap',
    // Ghost variant overrides
    '!bg-transparent !shadow-none',
    'hover:bg-muted/50',
  ].join(' '),
  footer: [
    'flex flex-col gap-1',
    'mt-auto p-2 border-t border-border/50',
  ].join(' '),
  footerItem: [
    'flex items-center justify-start',
    'gap-3 p-3 h-12 w-full',
    'rounded-theme-md',
    'text-muted-foreground',
    Interactive.Cursor.pointer,
    Interactive.Transition.color,
    Interactive.Hover.ghost,
    'focus-visible:shadow-neu-focus outline-none',
    'whitespace-nowrap overflow-hidden',
  ].join(' '),
  footerIcon: 'size-5 flex-shrink-0',
  footerLabel: 'flex-1 text-left transition-[opacity,transform] duration-200 ease-out',
  footerLabelVisible: 'opacity-100 translate-x-0',
  footerLabelHidden: 'opacity-0 -translate-x-2',
  /** @deprecated Use footerItem instead */
  footerButton: [
    'flex items-center justify-center',
    'size-9 rounded-theme-md',
    'text-muted-foreground',
    Interactive.Cursor.pointer,
    Interactive.Transition.color,
    Interactive.Hover.ghost,
    'focus-visible:shadow-neu-focus outline-none',
  ].join(' '),
} as const

export const SidebarLogoStyles = {
  container: [
    'flex items-center justify-center flex-shrink-0',
    'size-10 rounded-theme-md',
    'bg-gradient-to-br from-[#10B981]/25 to-[#10B981]/10', // Green gradient fade
    'backdrop-blur-md', // Glass blur
    'cursor-pointer',
    'transition-all hover:from-[#10B981]/35 hover:to-[#10B981]/15',
  ].join(' '),
  image: 'size-6 object-contain',
} as const

export const SidebarNavStyles = {
  nav: 'flex-1 flex flex-col p-2 gap-1 overflow-y-auto overflow-x-hidden',
  item: {
    base: [
      'flex items-center justify-start',
      'gap-3 p-3 h-12 w-full', // Always full width (no width transition)
      'rounded-theme-md',
      Interactive.Cursor.pointer,
      Interactive.Transition.color,
      'whitespace-nowrap overflow-hidden',
    ].join(' '),
    icon: 'size-5 flex-shrink-0',
    /** Label fades in/out with GPU-composited opacity + transform */
    label: 'flex-1 text-left transition-[opacity,transform] duration-200 ease-out',
    labelVisible: 'opacity-100 translate-x-0',
    labelHidden: 'opacity-0 -translate-x-2',
    active: 'bg-primary text-primary-foreground',
    inactive: ['text-foreground', Interactive.Hover.ghost].join(' '),
  },
} as const
