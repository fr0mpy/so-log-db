/**
 * MFE App Styles
 *
 * Co-located styles following zero-inline-classnames pattern.
 * Imports from @stackone-ui/core and composes app-specific patterns.
 */

import {
  Layout,
  Interactive,
  Overlay,
  Feedback,
  Form,
  TypographyTokens as Typography,
} from '@stackone-ui/core/styles'

// ============================================================================
// Typography Compositions
// ============================================================================

export const Text = {
  h1: 'text-3xl font-bold',
  h2: 'text-2xl font-bold',
  h3: 'text-xl font-semibold',
  body: Typography.textSm,
  muted: [Typography.textSm, Typography.textMuted].join(' '),
  mono: 'font-mono text-sm',
  monoTruncate: 'font-mono text-sm flex-1 truncate',
  label: [Typography.textSm, Typography.fontMedium, Typography.textMuted].join(' '),
  medium: Typography.fontMedium,
  center: 'text-center',
  pre: 'whitespace-pre',
} as const

// ============================================================================
// Layout Compositions
// ============================================================================

export const AppLayout = {
  container: 'min-h-screen flex',
  sidebar: {
    base: 'w-64 bg-surface border-r border-border p-4',
    header: 'mb-8',
    title: 'text-xl font-bold text-primary',
    subtitle: Text.muted,
    nav: 'space-y-1',
  },
  main: 'flex-1 p-8',
} as const

export const NavLink = {
  base: [
    'block',
    Layout.Spacing.input,
    'rounded-lg',
    Interactive.Transition.color,
  ].join(' '),
  active: 'bg-primary/10 text-primary',
  inactive: 'hover:bg-muted/20',
} as const

// ============================================================================
// Page Header
// ============================================================================

export const PageHeader = {
  container: 'mb-8',
  title: Text.h1,
  description: Text.muted,
  breadcrumb: {
    container: [Text.muted, 'mb-2'].join(' '),
    link: 'hover:text-foreground',
    separator: 'mx-2',
  },
} as const

// ============================================================================
// Card Compositions
// ============================================================================

export const Card = {
  base: 'bg-surface rounded-lg border border-border',
  padded: 'bg-surface rounded-lg border border-border p-6',
  paddedCenter: 'bg-surface rounded-lg border border-border p-6 text-center',
  interactive: [
    'bg-surface rounded-lg border border-border',
    'hover:border-primary',
    Interactive.Transition.border,
  ].join(' '),
  header: 'p-4 border-b border-border',
  content: 'p-6',
  title: Overlay.Card.title,
  description: Overlay.Card.description,
} as const

// ============================================================================
// Stats Grid
// ============================================================================

export const Stats = {
  grid: 'grid grid-cols-1 md:grid-cols-3 gap-6 mb-8',
  card: Card.padded,
  label: Text.label,
  value: 'text-3xl font-bold',
  valueDestructive: 'text-3xl font-bold text-destructive',
  valueWarning: 'text-3xl font-bold text-warning',
} as const

// ============================================================================
// List Items
// ============================================================================

export const ListItem = {
  base: [
    'block p-4 border-b border-border last:border-b-0',
    'hover:bg-muted/10',
    Interactive.Transition.color,
  ].join(' '),
  row: [Layout.Flex.center, 'gap-4'].join(' '),
  interactive: [
    'p-3 bg-muted/10 rounded',
    'hover:bg-muted/20',
    Interactive.Transition.color,
    'cursor-pointer',
  ].join(' '),
} as const

// ============================================================================
// Badge (using Feedback patterns)
// ============================================================================

export const Badge = {
  base: Feedback.Badge.base,
  info: [Feedback.Badge.base, 'bg-info/10 text-info'].join(' '),
  success: [Feedback.Badge.base, 'bg-success/10 text-success'].join(' '),
  warning: [Feedback.Badge.base, 'bg-warning/10 text-warning'].join(' '),
  destructive: [Feedback.Badge.base, 'bg-destructive/10 text-destructive'].join(' '),
} as const

// ============================================================================
// Form Elements
// ============================================================================

export const FormInput = {
  base: [
    'w-full',
    Layout.Spacing.input,
    'bg-surface border border-border rounded-lg',
    'focus:outline-none focus:ring-2 focus:ring-primary',
  ].join(' '),
  large: [
    'w-full px-4 py-3',
    'bg-surface border border-border rounded-lg',
    'focus:outline-none focus:ring-2 focus:ring-primary',
    'text-lg',
  ].join(' '),
  select: [
    Layout.Spacing.input,
    'bg-surface border border-border rounded-lg',
  ].join(' '),
} as const

// ============================================================================
// Info Box
// ============================================================================

export const InfoBox = {
  base: 'mt-8 p-4 bg-muted/20 rounded-lg',
  info: 'mt-8 p-4 bg-info/10 rounded-lg border border-info/20',
  title: 'font-semibold mb-2',
  titleInfo: 'font-semibold text-info mb-2',
  content: [Text.muted, 'space-y-1'].join(' '),
} as const

// ============================================================================
// Code Block
// ============================================================================

export const Code = {
  block: 'font-mono bg-muted/20 p-4 rounded',
  inline: 'font-mono',
} as const

// ============================================================================
// Grid Layouts
// ============================================================================

export const Grid = {
  cols2: 'grid grid-cols-1 lg:grid-cols-2 gap-6',
  cols3: 'grid grid-cols-1 md:grid-cols-3 gap-6',
  actionsRow: 'grid grid-cols-1 md:grid-cols-2 gap-6',
} as const

// ============================================================================
// Spacing Utilities
// ============================================================================

export const Spacing = {
  mb4: 'mb-4',
  mb6: 'mb-6',
  spaceY2: 'space-y-2',
  spaceY4: 'space-y-4',
  gap4: 'gap-4',
} as const

// ============================================================================
// Position Utilities
// ============================================================================

export const Position = {
  relative: 'relative',
  absolute: 'absolute',
  searchIcon: 'absolute right-3 top-1/2 -translate-y-1/2',
  flex1: 'flex-1',
} as const

// Re-export core patterns for convenience
export { Layout, Interactive, Overlay, Feedback, Form }
