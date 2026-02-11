import { Interactive, SpacingTokens, SizingTokens, TypographyTokens } from '../../styles'

export const TabsStyles = {
  root: 'w-full',
  list: [
    'relative inline-flex items-center justify-center',
    SizingTokens.h10,
    'rounded-theme-lg',
    'bg-neu-base shadow-neu-pressed-sm',
    SpacingTokens.p1,
    TypographyTokens.textMuted,
  ].join(' '),
  trigger: {
    base: [
      'relative z-10 inline-flex items-center justify-center whitespace-nowrap',
      'rounded-theme-md',
      SpacingTokens.px3,
      'py-1.5',
      TypographyTokens.textSm,
      TypographyTokens.fontMedium,
      Interactive.Cursor.pointer,
      'transition-colors duration-neu ease-neu',
      Interactive.Focus.neu,
      Interactive.Disabled.base,
    ].join(' '),
    active: TypographyTokens.textForeground,
    inactive: [TypographyTokens.textMuted, 'hover:text-foreground'].join(' '),
  },
  indicator: 'absolute inset-0 rounded-theme-md bg-neu-base shadow-neu-raised-sm',
  triggerLabel: 'relative z-10',
  content: {
    base: SpacingTokens.mt2 + ' ' + Interactive.Focus.none,
    hidden: 'hidden',
  },
} as const
