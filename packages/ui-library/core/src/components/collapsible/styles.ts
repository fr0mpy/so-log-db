import { Layout, Interactive, SpacingTokens, SizingTokens } from '../../styles'

export const CollapsibleStyles = {
  root: 'w-full',
  trigger: [
    'relative', // For indicator positioning
    Layout.Flex.between,
    'w-full',
    'group', // Enable group-hover for children
    Interactive.Cursor.pointer,
    'rounded-theme-md',
    SpacingTokens.px2,
    SpacingTokens.py1,
    'bg-transparent',
    Interactive.Transition.all,
    'hover:bg-muted',
    'hover:text-primary', // Text turns primary on hover
    Interactive.Focus.ring,
  ].join(' '),
  /** Indicator bar - neumorphic raised style like Tabs */
  indicator: [
    'absolute inset-0',
    'rounded-theme-md',
    'bg-neu-base shadow-neu-raised-sm',
  ].join(' '),
  /** Trigger content wrapper - sits above indicator */
  triggerContent: [
    'relative z-10',
    Layout.Flex.between,
    'w-full',
  ].join(' '),
  iconWrapper: [
    Layout.Flex.center,
    'shrink-0',
    'text-muted-foreground',
    'group-hover:text-primary', // Icon turns primary on hover
    Interactive.Transition.color,
  ].join(' '),
  icon: SizingTokens.iconSm,
  contentWrapper: 'overflow-hidden',
  content: SpacingTokens.pt2,
} as const
