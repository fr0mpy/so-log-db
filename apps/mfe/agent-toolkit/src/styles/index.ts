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
  /** Main content - flex-1 naturally fills remaining space beside sidebar */
  mainAnimated: [
    'flex-1 min-w-0 min-h-screen overflow-x-clip',
  ].join(' '),
  /** Inner content wrapper with padding */
  content: 'p-8',
} as const

// ============================================================================
// App Header
// ============================================================================

export const AppHeader = {
  /** Fixed header bar at top of main content */
  container: [
    'flex items-center justify-end',
    'h-14 px-6',
    'border-b border-border',
    'bg-background/80 backdrop-blur-sm',
  ].join(' '),
  /** Right-aligned actions area */
  actions: 'flex items-center gap-3',
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
  /** Chart on left (flexible), stats on right (fixed 280px) */
  chartStats: 'grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-4',
  /** Grid/flex child that can shrink below content size */
  shrinkable: 'min-w-0',
} as const

// ============================================================================
// Log Stats Panel - Bento Grid Layout
// ============================================================================

export const LogStats = {
  /** Wrapper - flex column, center children vertically */
  wrapper: 'flex flex-col justify-center h-full',
  /** Controls aligned to far right */
  controls: 'flex items-center gap-2 self-end mb-2',
  /** Theme switcher with left margin */
  themeSwitcher: 'ml-2',
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
  /** Responsive row - clips overflow, raises on hover, presses on click (not on button clicks) */
  row: ['group flex items-center w-full overflow-hidden', 'hover:bg-muted/10', 'hover:shadow-neu-raised-sm', '[&:not(:has(button:active))]:active:shadow-neu-pressed-sm', 'transition-[background-color,box-shadow,border-color] duration-200 ease-neu', 'motion-reduce:transition-none', 'cursor-pointer'].join(' '),
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
 * Responsive column widths - fluid scaling to fit viewport
 * - lg (1024px+): Full table, all columns ~1000px total
 * - md (768px): ~730px total (fits 768px viewport)
 * - sm (640px): ~525px total (fits 640px viewport)
 */
export const LogTableColumns = {
  /** Timestamp: responsive width, always visible */
  requested: 'w-[90px] md:w-[100px] lg:w-[110px] shrink-0',
  /** Provider: shrink allowed, responsive width */
  provider: 'w-[100px] md:w-[130px] lg:w-[160px] shrink',
  /** Origin: hidden <lg */
  originOwner: 'hidden lg:flex lg:flex-1 lg:min-w-[100px]',
  /** Source: hidden <md, reduced width */
  source: 'hidden md:flex md:w-[90px] lg:w-[120px] shrink',
  /** Request: reduced min-width for flexibility */
  request: 'flex-1 min-w-[120px] md:min-w-[150px] lg:min-w-[180px]',
  /** Duration: hidden <sm, reduced width */
  duration: 'hidden sm:flex sm:w-[80px] lg:w-[100px] shrink',
  /** Status: compact, content-sized */
  status: 'shrink-0',
  /** Actions: responsive width, center-aligned */
  actions: 'w-[100px] md:w-[140px] lg:w-[260px] shrink-0 flex justify-center',
} as const

// ============================================================================
// Provider Avatar
// ============================================================================

export const ProviderAvatar = {
  container: [Layout.Flex.center, 'gap-2'].join(' '),
  icon: 'w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold text-white',
  /** Wrapper for name + version - hidden below md for icon-only mode, min-w-0 enables truncation */
  textWrapper: 'hidden md:flex flex-col min-w-0',
  /** Progressive truncation: tighter at md, wider at lg */
  name: 'font-medium leading-tight truncate max-w-[60px] md:max-w-[80px] lg:max-w-[100px]',
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
  container: [Layout.Flex.center, 'w-full gap-2 overflow-hidden'].join(' '),
  /** Method badge - fixed width for text alignment, centered */
  methodWrapper: 'w-16 flex justify-center shrink-0',
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
  /** Container for action icons - appears on row hover or when any button is focused, center-aligned */
  container: [
    'flex items-center justify-center gap-0.5',
    'opacity-0 group-hover:opacity-100 has-[:focus-visible]:opacity-100',
    'transition-opacity duration-150',
  ].join(' '),
  /** Action icon - grey to match row text, adapts to theme */
  icon: 'size-5 flex-shrink-0 text-muted-foreground transition-colors duration-150',
  /** Filled action icon - for icons using fill instead of stroke */
  iconFilled: 'size-5 flex-shrink-0 text-muted-foreground transition-colors duration-150 group-hover/action:fill-primary',
  /** External link indicator */
  external: 'size-3 ml-0.5 opacity-60',
} as const

// ============================================================================
// Latency Bar - Mini progress bar for duration visualization
// ============================================================================

export const LatencyBar = {
  /** Container for duration value + bar */
  container: 'flex flex-col items-center gap-0.5',
  /** Duration text value - muted to contrast with foreground date/time */
  value: 'text-sm tabular-nums text-muted-foreground',
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
  container: 'flex items-center gap-2 sticky top-0 z-10 bg-background py-4 -mt-4 -mx-8 px-8 transition-shadow duration-200 [clip-path:inset(0_-100%_-100%_0)]',
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
  /** Small muted label (xs size) */
  labelSmallMuted: [Typography.textXs, Typography.textMuted].join(' '),
  /** Toggle wrapper for switch + label */
  toggleWrapper: 'flex items-center gap-2',
  /** Secondary row below main filter bar */
  secondaryRow: 'flex items-center justify-end gap-2 -mt-2 mb-2 -mx-8 px-8',
  /** Smaller switch scale */
  switchSmall: 'scale-90 origin-right',
  /** Icon for filter cards */
  icon: 'w-4 h-4 text-muted-foreground',
  /** Filter controls group - date select, status select, refresh with even spacing */
  filterControls: 'flex items-center justify-evenly gap-4 mx-6',
  /** Actions group wrapper (theme switcher + refresh) - ml-auto pushes to far right */
  actionsGroup: 'flex items-center gap-2 ml-auto',
  /** Theme switcher spacing */
  themeSwitcher: '',
} as const

// ============================================================================
// Filter Select Widths
// ============================================================================

export const FilterSelect = {
  /** Date range select trigger width (dropdown uses dropdownMinWidth prop) */
  dateRange: 'w-[5.5rem]',
  /** Status filter select trigger width (dropdown uses dropdownMinWidth prop) */
  status: 'w-[4rem]',
  /** Refresh icon with hover transition */
  refreshIcon: 'w-4 h-4 transition-colors group-hover:text-primary',
} as const

// ============================================================================
// Dialog Overrides
// ============================================================================

export const DialogOverrides = {
  /** Centered header for dialogs */
  headerCentered: '!justify-center text-center',
  /** Centered footer for dialogs */
  footerCentered: '!justify-center',
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
// Logs Page Skeleton
// ============================================================================

export const LogsPageSkeleton = {
  /** Header skeleton sizes - PIXEL PERFECT from Playwright measurements */
  headerTitle: 'h-8 w-[57px]',       // 32×57px (actual measured)
  headerSearch: 'h-11 flex-1',       // 44px × flex
  headerDateSelect: 'h-11 w-[88px]', // 44×88px
  headerStatusSelect: 'h-11 w-16',   // 44×64px
  headerRefresh: 'h-8 w-8',          // 32×32px
  headerTheme: 'h-8 w-14',           // 32×56px

  /** Chart - MUST be visible Skeleton, not empty div */
  chartPlaceholder: 'h-[220px] w-full rounded-lg',

  /** Stats skeleton */
  statsToggle: 'h-5 w-9 rounded-full',
  statsLabel: 'h-4 w-28',
  statCard: 'h-[78px] w-[136px]',    // Explicit width matches actual StatCard content width

  /** Table row - FIXED height from measurement */
  tableRow: 'h-[52px] w-full',       // 52px (actual measured, was 41px)
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
