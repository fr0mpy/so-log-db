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
  iconWrapper: [
    Layout.Flex.center,
    'shrink-0',
  ].join(' '),
  icon: SizingTokens.iconSm,
  contentWrapper: 'overflow-hidden',
  content: SpacingTokens.pt2,
} as const
