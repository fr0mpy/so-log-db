import { Layout, Interactive, SpacingTokens, SizingTokens, TypographyTokens } from '../../styles'

export const AccordionStyles = {
  root: 'w-full',
  item: 'mb-2 rounded-theme-lg bg-neu-base shadow-neu-raised-sm',
  header: 'flex',
  trigger: [
    Layout.Flex.between,
    'w-full',
    SpacingTokens.px4,
    SpacingTokens.py4,
    TypographyTokens.fontMedium,
    Interactive.Cursor.pointer,
    'rounded-theme-lg',
    'hover:text-primary',
    'transition-colors duration-neu ease-neu',
    Interactive.Focus.neu,
  ].join(' '),
  iconWrapper: Layout.Flex.centerBoth,
  icon: [SizingTokens.iconSm, 'shrink-0'].join(' '),
  contentWrapper: 'overflow-hidden',
  content: [
    SpacingTokens.px4,
    SpacingTokens.pb4,
    SpacingTokens.pt0,
    TypographyTokens.textSm,
    TypographyTokens.textMuted,
  ].join(' '),
} as const
