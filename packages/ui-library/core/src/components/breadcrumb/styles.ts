import { Layout, Interactive, SizingTokens, TypographyTokens } from '../../styles'

export const BreadcrumbStyles = {
  root: '',
  list: [
    Layout.Flex.center,
    Layout.Spacing.gap2,
    TypographyTokens.textSm,
    TypographyTokens.textMuted,
  ].join(' '),
  item: [
    'inline-flex items-center',
    Layout.Spacing.gap2,
  ].join(' '),
  link: [
    Interactive.Cursor.pointer,
    'transition-colors',
    'hover:text-primary',
  ].join(' '),
  separator: '',
  separatorIcon: SizingTokens.iconSm,
  page: [
    TypographyTokens.fontMedium,
    TypographyTokens.textForeground,
  ].join(' '),
} as const
