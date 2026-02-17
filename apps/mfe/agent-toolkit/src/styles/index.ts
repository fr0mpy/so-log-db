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
  value: 'text-sm',
  valueTruncate: 'text-sm flex-1 truncate',
  label: [Typography.textSm, Typography.fontMedium, Typography.textMuted].join(' '),
  medium: Typography.fontMedium,
  center: 'text-center',
  pre: 'whitespace-pre',
  /** Page title in filter row */
  pageTitle: 'text-2xl font-bold whitespace-nowrap mr-5',
} as const

// ============================================================================
// Layout Compositions
// ============================================================================

export const AppLayout = {
  container: 'min-h-screen',
  /** Main content area - uses ml-16 (64px) to account for collapsed SideNav */
  main: 'flex-1 p-8 ml-16',
  /** Animated main content - flex-1 shrinks when sidebar expands */
  mainAnimated: [
    'flex-1 min-h-screen p-8',
    'transition-[margin] duration-200 ease-out',
    '[contain:layout_style]', // Isolate layout/paint recalculations
  ].join(' '),
} as const

// ============================================================================
// Page Header
// ============================================================================

export const PageHeader = {
  container: 'mb-2',
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
  /** CardContent with top padding for stats cards */
  contentPadded: 'pt-6',
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
    'focus-visible:outline-none focus-visible:shadow-neu-focus',
  ].join(' '),
  large: [
    'w-full px-4 py-3',
    'bg-surface border border-border rounded-lg',
    'focus-visible:outline-none focus-visible:shadow-neu-focus',
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
  /** Chart on left (70%), stats on right (30%) */
  chartStats: 'grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4',
} as const

// ============================================================================
// Log Stats Panel - Bento Grid Layout
// ============================================================================

export const LogStats = {
  /** 2x2 grid with separate cards - self-center for vertical alignment */
  grid: 'grid grid-cols-2 gap-2 self-center',
  /** Card content padding - fixed height for skeleton alignment, centered vertically */
  cell: 'p-4 h-[78px] flex flex-col justify-center',
  /** Label text - small, muted, uppercase */
  label: [Typography.textXs, Typography.textMuted, Typography.fontMedium, 'uppercase tracking-wide'].join(' '),
  /** Row for value + optional inline content (items-center for vertical centering with breakdown) */
  valueRow: 'flex flex-row flex-nowrap items-center justify-between gap-2 mt-0.5',
  /** Primary value - medium and bold */
  value: 'text-lg font-bold',
  valueSuccess: 'text-lg font-bold text-success',
  valueDestructive: 'text-lg font-bold text-destructive',
  /** Trend indicator row */
  trend: 'flex items-center gap-1 mt-1',
  trendUp: 'text-[10px] text-success flex items-center gap-0.5',
  trendDown: 'text-[10px] text-destructive flex items-center gap-0.5',
  trendNeutral: 'text-[10px] text-muted-foreground flex items-center gap-0.5',
  /** Arrow icons */
  trendArrow: 'w-2.5 h-2.5',
  /** Secondary info text */
  subtext: [Typography.textXs, Typography.textMuted].join(' '),
  /** Error breakdown section - vertical stack, left-aligned labels */
  breakdown: 'flex flex-col items-start gap-0',
  breakdownItem: 'flex items-center gap-1',
  breakdownLabel: [Typography.textXs, Typography.textMuted].join(' '),
  breakdownValue: [Typography.textXs, 'font-semibold'].join(' '),
  breakdownValueWarning: [Typography.textXs, 'text-warning font-bold'].join(' '),
  breakdownValueDestructive: [Typography.textXs, 'text-destructive font-bold'].join(' '),
} as const

// ============================================================================
// Data Table
// ============================================================================

export const DataTable = {
  container: 'w-full',
  /** Wrapper - relative for absolute header positioning */
  scrollWrapper: 'relative rounded-lg mt-4',
  /** No minimum width - columns shrink responsively */
  innerWrapper: 'w-full',
  header: 'text-left text-xs font-semibold text-foreground uppercase tracking-wider',
  /** Card wrapper for header - absolute positioned so shadow can leak out */
  headerCard: 'absolute top-0 left-0 right-0 z-10 rounded-t-lg rounded-b-none border-b-0 shadow-neu-raised-highlight',
  /** Paper wrapper for body - padding-top accounts for absolute header height */
  bodyPaper: 'pt-11 rounded-lg overflow-hidden',
  /** Responsive header row - no min-width */
  headerRow: 'flex w-full',
  /** Responsive cell padding - smaller on mobile */
  headerCell: 'px-2 sm:px-3 py-3 whitespace-nowrap',
  headerCellSortable: [
    'px-2 sm:px-3 py-3 whitespace-nowrap',
    'cursor-pointer hover:bg-muted/10 select-none',
  ].join(' '),
  headerCellRight: 'px-2 sm:px-3 py-3 whitespace-nowrap text-right',
  /** Responsive row - clips overflow, raises on hover, presses on click */
  row: ['group flex items-center w-full overflow-hidden', 'hover:bg-muted/10', 'hover:shadow-neu-raised-sm', 'active:shadow-neu-pressed-sm', 'transition-[background-color,box-shadow,border-color] duration-200 ease-neu', 'motion-reduce:transition-none', 'cursor-pointer'].join(' '),
  /** Row focused state for keyboard navigation - uses inset ring to avoid overflow clipping */
  rowFocused: 'ring-2 ring-inset ring-primary',
  /** Row wrapper that includes separator - hides borders adjacent to hovered row */
  rowWrapper: [
    'border-b border-border last:border-b-0',
    'hover:border-transparent',                // Hide own border when hovered
    '[&:has(+_div:hover)]:border-transparent', // Hide border when next sibling is hovered
  ].join(' '),
  /** Skeleton row wrapper - no borders to prevent flash before animation starts */
  rowWrapperSkeleton: '',
  /** Responsive cell padding */
  cell: 'px-2 sm:px-3 py-3 flex items-center overflow-hidden',
  cellRight: 'px-2 sm:px-3 py-3 text-right text-sm flex items-center justify-end',
  cellTruncate: 'px-2 sm:px-3 py-3 truncate flex items-center overflow-hidden',
  scrollArea: 'max-h-[60vh] overflow-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary',
} as const

// ============================================================================
// Log Table Column Widths
// ============================================================================

/**
 * Responsive column widths:
 * - lg (1024px+): Full table
 * - md (768px-1023px): Hide originOwner, truncate text
 * - sm (640px-767px): Hide source, provider icon-only
 * - xs (<640px): Hide duration, request name - show icons/badges only
 */
export const LogTableColumns = {
  requested: 'w-[110px] shrink-0',
  provider: 'w-[160px] shrink-0',
  originOwner: 'hidden lg:flex lg:flex-1 lg:min-w-[120px]',
  source: 'hidden md:flex md:w-[120px] shrink-0',
  request: 'flex-1 min-w-[180px]',
  duration: 'hidden sm:flex sm:w-[100px] shrink-0',
  status: 'w-[70px] shrink-0',
  /** Actions column - fixed width, right-aligned */
  actions: 'w-[160px] shrink-0 justify-end',
} as const

// ============================================================================
// Provider Avatar
// ============================================================================

export const ProviderAvatar = {
  container: [Layout.Flex.center, 'gap-2'].join(' '),
  icon: 'w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold text-white',
  /** Wrapper for name + version - hidden below md for icon-only mode */
  textWrapper: 'hidden md:flex flex-col',
  name: 'font-medium leading-tight truncate max-w-[100px]',
  version: 'text-[10px] text-muted-foreground leading-tight',
  /** Provider-specific colors use semantic tokens */
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  accent: 'bg-accent',
  muted: 'bg-muted-foreground',
} as const

// ============================================================================
// Method Badge (for HTTP methods) - Swagger UI color conventions
// GET=Blue, POST=Green, PUT=Orange, DELETE=Red, PATCH=Teal
// ============================================================================

export const MethodBadge = {
  base: Feedback.Tag.base,
  GET: Feedback.Tag.info,
  POST: Feedback.Tag.success,
  PUT: Feedback.Tag.warning,
  DELETE: Feedback.Tag.destructive,
  PATCH: Feedback.Tag.accent,
  HEAD: Feedback.Tag.primary,
  OPTIONS: Feedback.Tag.secondary,
} as const

// ============================================================================
// Status Badge (for HTTP status codes) - solid backgrounds with white text
// ============================================================================

export const StatusBadge = {
  base: Feedback.TagSolid.base,
  success: Feedback.TagSolid.success,
  warning: Feedback.TagSolid.warning,
  error: Feedback.TagSolid.destructive,
} as const

// ============================================================================
// Version Badge
// ============================================================================

export const VersionBadge = {
  base: 'inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-muted/50 text-muted-foreground ml-2',
} as const

// ============================================================================
// Source Cell
// ============================================================================

export const SourceCell = {
  container: [Layout.Flex.center, 'gap-2'].join(' '),
  icon: 'w-4 h-4 rounded bg-muted/30 flex items-center justify-center text-[10px] text-muted-foreground shrink-0',
  /** Source text - hidden below lg for icon-only mode */
  text: 'hidden lg:block text-sm truncate max-w-[100px]',
} as const

// ============================================================================
// Timestamp Cell
// ============================================================================

export const TimestampCell = {
  container: 'block',
  date: 'block text-xs text-muted-foreground',
  time: 'block text-sm',
} as const

// ============================================================================
// Request Cell
// ============================================================================

export const RequestCell = {
  container: [Layout.Flex.center, 'gap-2 overflow-hidden'].join(' '),
  /** Fixed width for method badge so all names align */
  methodWrapper: 'w-[4.5rem] flex justify-center shrink-0',
  /** Request name - truncates to fit available space */
  name: 'hidden sm:block truncate text-sm text-muted-foreground',
} as const

// ============================================================================
// Row Action (chevron)
// ============================================================================

export const RowAction = {
  chevron: 'w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity',
} as const

// ============================================================================
// Row Actions (hover menu icons)
// ============================================================================

export const RowActions = {
  /** Container for action icons - appears on row hover or when any button is focused, right-aligned */
  container: [
    'flex items-center justify-end gap-0.5',
    'opacity-0 group-hover:opacity-100 has-[:focus-visible]:opacity-100',
    'transition-opacity duration-150',
  ].join(' '),
  /** Individual action button - shows primary icon fill when focused */
  button: [
    'p-1 rounded',
    'hover:bg-muted/20',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary',
    '[&:focus-visible>svg]:text-primary [&:focus-visible>svg]:fill-primary',
  ].join(' '),
  /** Action icon - grey to match row text, adapts to theme */
  icon: 'size-5 flex-shrink-0 text-muted-foreground transition-colors duration-150',
  /** External link indicator */
  external: 'size-3 ml-0.5 opacity-60',
} as const

// ============================================================================
// Latency Bar - Mini progress bar for duration visualization
// ============================================================================

export const LatencyBar = {
  /** Container for duration value + bar */
  container: 'flex flex-col items-center gap-0.5',
  /** Duration text value */
  value: 'text-sm tabular-nums',
  /** Bar container - segments in a row */
  bar: 'flex gap-px w-16 h-1',
  /** Individual segment */
  segment: {
    base: 'flex-1 rounded-full transition-colors',
    empty: 'bg-muted/30',
    success: 'bg-success',
    warning: 'bg-warning',
    destructive: 'bg-destructive',
  },
} as const

// ============================================================================
// Table Icons
// ============================================================================

export const TableIcon = {
  sortIndicator: 'w-4 h-4 ml-1 inline-block text-muted-foreground',
} as const

// ============================================================================
// Log Pagination
// ============================================================================

export const LogPagination = {
  container: 'flex items-center justify-end mt-4 px-2 sm:px-4 py-3',
  controls: 'flex items-center gap-4',
} as const

// ============================================================================
// Filter Cards Row
// ============================================================================

export const FilterRow = {
  /** Container for filter cards row - sticky header, clip-path prevents shadow overflow on top/left */
  container: 'flex items-center gap-3 sticky top-0 z-10 bg-background py-4 -mt-4 -mx-8 px-8 transition-shadow duration-200 [clip-path:inset(0_-100%_-100%_0)]',
  /** Shadow applied when scrolled */
  scrolled: 'shadow-neu-raised',
  /** Individual filter card */
  card: 'bg-surface rounded-lg border border-border px-4 py-2.5 flex items-center gap-2',
  /** Search wrapper - takes remaining space */
  searchWrapper: 'flex-1',
  /** Filter label */
  label: [Typography.textSm, Typography.fontMedium].join(' '),
  /** Muted filter label for secondary info */
  labelMuted: [Typography.textSm, Typography.textMuted].join(' '),
  /** Toggle wrapper for switch + label */
  toggleWrapper: 'flex items-center gap-2',
  /** Icon for filter cards */
  icon: 'w-4 h-4 text-muted-foreground',
} as const

// ============================================================================
// Filter Select Widths
// ============================================================================

export const FilterSelect = {
  /** Date range select width */
  dateRange: 'w-[6.5rem]',
  /** Status filter select width */
  status: 'w-[5rem]',
  /** Refresh icon with hover transition */
  refreshIcon: 'w-4 h-4 transition-colors group-hover:text-primary',
} as const

// ============================================================================
// Table Row Skeleton
// ============================================================================

export const TableRowSkeleton = {
  /** Stacked layout for date/time cells */
  stack: 'flex flex-col gap-0.5',
  /** Row layout for icon + text */
  rowWithIcon: 'flex items-center gap-2',
  /** Hidden on small, visible on md+ */
  hiddenMdStack: 'hidden md:flex flex-col gap-0.5',
  /** Centered column stack for duration */
  centeredStack: 'flex flex-col items-center gap-0.5',
  /** Min width for inner row */
  innerRow: 'flex items-center min-w-[900px]',
} as const

// ============================================================================
// Pagination Select
// ============================================================================

export const PaginationSelect = {
  /** No-wrap for select trigger text */
  triggerText: 'whitespace-nowrap',
  /** Options container */
  optionsContainer: 'flex flex-col gap-2 p-2',
} as const

// ============================================================================
// Spacing Utilities
// ============================================================================

export const Spacing = {
  mt4: 'mt-4',
  mb4: 'mb-4',
  mb6: 'mb-6',
  spaceY2: 'space-y-2',
  spaceY4: 'space-y-4',
  gap4: 'gap-4',
} as const

// ============================================================================
// Page Skeleton (Generic)
// ============================================================================

export const PageSkeleton = {
  /** Page title skeleton */
  title: 'h-10 w-64',
  /** Chart area skeleton */
  chart: 'h-64 w-full',
  /** Table area skeleton */
  table: 'h-96 w-full',
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

// Loading styles
export { LoadingStyles, SkeletonHeight } from './loading'
