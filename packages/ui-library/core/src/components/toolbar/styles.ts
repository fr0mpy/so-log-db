import { Layout, Interactive, SpacingTokens, SizingTokens, TypographyTokens } from '../../styles'

export const ToolbarStyles = {
  root: {
    base: [
      Layout.Flex.center,
      Layout.Spacing.gap1,
      SpacingTokens.p1,
      'rounded-theme-lg',
      'bg-neu-base shadow-neu-raised',
    ].join(' '),
    vertical: 'flex-col',
  },
  button: {
    base: [
      Layout.Flex.inline,
      SizingTokens.square9,
      'rounded-theme-md',
      TypographyTokens.textSm,
      TypographyTokens.fontMedium,
      TypographyTokens.textForeground,
      Interactive.Cursor.pointer,
      Interactive.Transition.shadow,
      Interactive.Focus.neu,
      Interactive.Disabled.base,
    ].join(' '),
    active: 'bg-primary/10 shadow-neu-pressed-sm text-primary',
    inactive: [
      'bg-transparent',
      Interactive.Hover.ghost,
      Interactive.Active.pressed,
    ].join(' '),
  },
  separator: {
    base: 'bg-border',
    horizontal: 'mx-1 h-5 w-px',
    vertical: 'my-1 h-px w-5',
  },
  group: {
    base: [
      Layout.Flex.center,
      'gap-0.5',
    ].join(' '),
    vertical: 'flex-col',
  },
  link: [
    'inline-flex items-center justify-center',
    SizingTokens.h9,
    SpacingTokens.px3,
    'rounded-theme-md',
    TypographyTokens.textSm,
    TypographyTokens.fontMedium,
    TypographyTokens.textForeground,
    Interactive.Cursor.pointer,
    Interactive.Transition.shadow,
    Interactive.Hover.ghost,
    Interactive.Focus.neu,
  ].join(' '),
} as const
