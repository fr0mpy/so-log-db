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
