import { Layout, Interactive, SizingTokens, TypographyTokens } from '../../styles'

export const PaginationStyles = {
  root: 'mx-auto flex w-full justify-center',
  content: [
    Layout.Flex.center,
    Layout.Spacing.gap1,
  ].join(' '),
  item: '',
  link: {
    base: [
      Layout.Flex.inline,
      SizingTokens.minTouch,
      SizingTokens.square9,
      'rounded-theme-lg',
      TypographyTokens.textSm,
      TypographyTokens.fontMedium,
      Interactive.Transition.shadow,
      Interactive.Cursor.pointer,
      Interactive.Focus.neu,
      Interactive.Disabled.base,
    ].join(' '),
    active: 'bg-primary text-primary-foreground shadow-neu-badge-primary',
    inactive: [
      'bg-transparent',
      TypographyTokens.textForeground,
      Interactive.Hover.ghost,
      Interactive.Active.pressed,
    ].join(' '),
  },
  navButton: Interactive.Button.nav,
  ellipsis: [
    Layout.Flex.centerBoth,
    SizingTokens.square9,
  ].join(' '),
  ellipsisIcon: SizingTokens.iconSm,
  srOnly: 'sr-only',
} as const
