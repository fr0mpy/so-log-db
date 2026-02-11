import { Layout, Interactive, SpacingTokens, SizingTokens } from '../../styles'

export const CollapsibleStyles = {
  root: 'w-full',
  trigger: [
    Layout.Flex.between,
    'w-full',
    Interactive.Cursor.pointer,
    'rounded-theme-md',
    SpacingTokens.px2,
    SpacingTokens.py1,
    'bg-transparent',
    Interactive.Transition.all,
    'hover:bg-muted',
    Interactive.Focus.ring,
  ].join(' '),
  icon: [
    SizingTokens.iconSm,
    'shrink-0',
    Interactive.Transition.transform,
  ].join(' '),
  iconOpen: 'rotate-180',
  content: 'animate-in slide-in-from-top-2',
} as const
