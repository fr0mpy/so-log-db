import { Layout, Interactive, SpacingTokens, SizingTokens, TypographyTokens } from '../../styles'

export const NavigationStyles = {
  root: 'relative z-10 flex items-center justify-center',
  list: [
    Layout.Flex.center,
    Layout.Spacing.gap1,
  ].join(' '),
  item: 'relative',
  itemDropdownWrapper: Layout.Flex.center,
  trigger: [
    Layout.Flex.inline,
    Layout.Spacing.gap1,
    'rounded-theme-md',
    SpacingTokens.px4,
    'py-3 min-h-11', // 44px minimum for touch targets
    Interactive.Cursor.pointer,
    TypographyTokens.textSm,
    TypographyTokens.fontMedium,
    'transition-colors',
    'hover:text-primary',
    'focus-visible:bg-surface',
    Interactive.Focus.ring,
    Interactive.Disabled.base,
  ].join(' '),
  triggerIcon: SizingTokens.iconSm,
  content: [
    'absolute left-0 top-full mt-1 w-auto min-w-[12rem]',
    'rounded-theme-md border border-border',
    'bg-background shadow-theme-lg glass',
    SpacingTokens.p2,
    'origin-top',
  ].join(' '),
  link: [
    'block rounded-theme-md',
    SpacingTokens.px4,
    'py-3 min-h-11', // 44px minimum for touch targets
    TypographyTokens.textSm,
    TypographyTokens.fontMedium,
    Interactive.Cursor.pointer,
    'transition-colors',
    'hover:text-primary',
    'active:bg-muted/80', // Touch feedback
    Interactive.Focus.ring,
  ].join(' '),
} as const
