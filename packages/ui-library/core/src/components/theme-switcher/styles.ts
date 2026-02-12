import { Layout, Interactive, SizingTokens } from '../../styles'

export const ThemeSwitcherStyles = {
  button: [
    'relative w-14 h-8 rounded-full',
    Interactive.Cursor.pointer,
    'bg-neu-base shadow-neu-pressed',
    Interactive.Focus.ring,
    'focus-visible:ring-offset-background',
  ].join(' '),

  knob: [
    'absolute top-1 left-1 w-6 h-6 rounded-full',
    Interactive.Cursor.pointer,
    'bg-neu-base shadow-neu-raised',
    Layout.Flex.centerBoth,
    'overflow-hidden',
  ].join(' '),

  iconContainer: [
    'relative',
    SizingTokens.square4,
    Interactive.Cursor.pointer,
  ].join(' '),

  iconWrapper: [
    'absolute inset-0',
    Layout.Flex.centerBoth,
    Interactive.Cursor.pointer,
  ].join(' '),

  icon: {
    moon: [SizingTokens.iconSm, 'text-indigo-400'].join(' '),
    sun: [SizingTokens.iconSm, 'text-amber-500'].join(' '),
  },

  trackIndicators: [
    'absolute inset-0',
    Layout.Flex.between,
    'px-2 pointer-events-none',
  ].join(' '),

  trackIcon: [SizingTokens.iconXs, 'text-foreground'].join(' '),
} as const
