/**
 * MFE App Styles
 *
 * Co-located styles following zero-inline-classnames pattern.
 * Raw Tailwind classes for IntelliSense support.
 */

// ============================================================================
// Typography Compositions
// ============================================================================

export const Text = {
  h1: 'text-3xl font-bold',
  h2: 'text-2xl font-bold',
  h3: 'text-xl font-semibold',
  body: 'text-sm',
  muted: 'text-sm text-muted-foreground',
  value: 'text-sm',
  valueTruncate: 'text-sm flex-1 truncate',
  label: 'text-sm font-medium text-muted-foreground',
  medium: 'font-medium',
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
  mainAnimated: 'flex-1 min-w-0 min-h-screen overflow-x-clip',
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
  title: 'text-3xl font-bold',
  description: 'text-sm text-muted-foreground',
  breadcrumb: {
    container: 'text-sm text-muted-foreground mb-2',
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
    'transition-[border-color] duration-200 ease-neu',
  ].join(' '),
  header: 'p-4 border-b border-border',
  content: 'p-6',
  /** CardContent with top padding for stats cards */
  contentPadded: 'pt-6',
  title: 'font-heading text-lg font-semibold text-foreground',
  description: 'text-sm text-muted-foreground',
} as const

// ============================================================================
// Stats Grid
// ============================================================================

export const Stats = {
  grid: 'grid grid-cols-1 md:grid-cols-3 gap-6 mb-8',
  card: 'bg-surface rounded-lg border border-border p-6',
  label: 'text-sm font-medium text-muted-foreground',
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
    'transition-[background-color] duration-200 ease-neu',
  ].join(' '),
  row: 'flex items-center gap-4',
  interactive: [
    'p-3 bg-muted/10 rounded',
    'hover:bg-muted/20',
    'transition-[background-color] duration-200 ease-neu',
    'cursor-pointer',
  ].join(' '),
} as const

// ============================================================================
// Badge (using Feedback patterns)
// ============================================================================

export const Badge = {
  base: 'inline-flex items-center rounded-theme-md px-2.5 py-0.5 text-xs font-medium',
  info: 'inline-flex items-center rounded-theme-md px-2.5 py-0.5 text-xs font-medium bg-info/10 text-info',
  success: 'inline-flex items-center rounded-theme-md px-2.5 py-0.5 text-xs font-medium bg-success/10 text-success',
  warning: 'inline-flex items-center rounded-theme-md px-2.5 py-0.5 text-xs font-medium bg-warning/10 text-warning',
  destructive: 'inline-flex items-center rounded-theme-md px-2.5 py-0.5 text-xs font-medium bg-destructive/10 text-destructive',
} as const

// ============================================================================
// Form Elements
// ============================================================================

export const FormInput = {
  base: [
    'w-full',
    'px-3 py-2',
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
    'px-3 py-2',
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
  content: 'text-sm text-muted-foreground space-y-1',
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
  label: 'text-xs text-muted-foreground font-medium uppercase tracking-wide',
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
  subtext: 'text-xs text-muted-foreground',
  /** Error breakdown section - vertical stack, left-aligned labels */
  breakdown: 'flex flex-col items-start gap-0',
  breakdownItem: 'flex items-center gap-1',
  breakdownLabel: 'text-xs text-muted-foreground',
  breakdownValue: 'text-xs font-semibold',
  breakdownValueWarning: 'text-xs text-warning font-bold',
  breakdownValueDestructive: 'text-xs text-destructive font-bold',
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

  /**
   * CSS Grid template for log table - SHARED between header and body rows.
   * Uses CSS variables from globals.css for consistent column widths.
   * Grid guarantees header-cell alignment at all responsive breakpoints.
   */
  gridRow: [
    'grid',
    'grid-cols-[var(--log-col-requested)_var(--log-col-provider)_var(--log-col-origin)_var(--log-col-source)_var(--log-col-request)_var(--log-col-duration)_var(--log-col-status)_var(--log-col-actions)]',
    'gap-x-[var(--log-col-gap)]',
    'px-4',
    'items-center',
  ].join(' '),

  /** Header row - uses shared grid template */
  headerRow: [
    'grid',
    'grid-cols-[var(--log-col-requested)_var(--log-col-provider)_var(--log-col-origin)_var(--log-col-source)_var(--log-col-request)_var(--log-col-duration)_var(--log-col-status)_var(--log-col-actions)]',
    'gap-x-[var(--log-col-gap)]',
    'px-4',
    'items-center',
  ].join(' '),

  /** Cell base padding - truncate allows headers to shrink gracefully */
  headerCell: 'py-3 truncate overflow-hidden',
  headerCellSortable: [
    'py-3 truncate overflow-hidden',
    'cursor-pointer hover:bg-muted/10 select-none',
  ].join(' '),
  headerCellRight: 'py-3 truncate overflow-hidden text-right',

  /** Body row - uses shared grid template with interactive states */
  row: [
    'group grid',
    'grid-cols-[var(--log-col-requested)_var(--log-col-provider)_var(--log-col-origin)_var(--log-col-source)_var(--log-col-request)_var(--log-col-duration)_var(--log-col-status)_var(--log-col-actions)]',
    'gap-x-[var(--log-col-gap)]',
    'px-4',
    'items-center',
    'hover:bg-muted/10',
    'hover:shadow-neu-raised-sm',
    '[&:not(:has(button:active))]:active:shadow-neu-pressed-sm',
    'transition-[background-color,box-shadow,border-color] duration-200 ease-neu',
    'motion-reduce:transition-none',
    'cursor-pointer',
  ].join(' '),

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
  /** Cell base - grid handles alignment, truncate adds ellipsis */
  cell: 'py-3 flex items-center overflow-hidden min-w-0 truncate',
  /** Same as cell - grid provides consistent spacing */
  cellTight: 'py-3 flex items-center overflow-hidden min-w-0 truncate',
  cellRight: 'py-3 text-right text-sm flex items-center justify-end min-w-0 truncate',
  cellTruncate: 'py-3 truncate flex items-center overflow-hidden min-w-0',
  scrollArea: 'max-h-[60vh] overflow-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary',
} as const

// ============================================================================
// Log Table Column Classes
// ============================================================================

/**
 * Column-specific styles for the CSS Grid-based log table.
 * Widths are controlled by CSS variables in globals.css - these classes
 * handle overflow, visibility, and content alignment only.
 *
 * Column visibility is controlled by CSS variable width (0px = hidden):
 * - Origin Owner: hidden below lg (--log-col-origin: 0px)
 * - Source: hidden below md (--log-col-source: 0px)
 * - Duration: hidden on mobile (--log-col-duration: 0px)
 */
export const LogTableColumns = {
  /** Timestamp - always visible */
  requested: 'overflow-hidden',
  /** Provider - shows full content on md+, icon only below */
  provider: 'overflow-hidden min-w-0',
  /** Origin Owner - content hidden when column collapses (CSS variable = 0px) */
  originOwner: 'overflow-hidden min-w-0',
  /** Source - content hidden when column collapses */
  source: 'overflow-hidden min-w-0',
  /** Request - primary content column, truncates */
  request: 'overflow-hidden min-w-0',
  /** Duration - right-aligned, hidden on mobile via CSS variable */
  duration: 'overflow-hidden min-w-0 justify-end',
  /** Status - always visible, centered badge, extra left spacing from duration */
  status: 'overflow-hidden pl-2',
  /** Actions - centered action buttons */
  actions: 'overflow-hidden flex justify-center',
} as const

// ============================================================================
// Provider Avatar
// ============================================================================

export const ProviderAvatar = {
  container: 'flex items-center gap-2 min-w-0',
  icon: 'w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold text-white shrink-0',
  /** Wrapper for name + version - hidden below md for icon-only mode, min-w-0 enables truncation */
  textWrapper: 'hidden md:flex flex-col min-w-0 overflow-hidden',
  /** Name truncates based on flex container width (no fixed max-w) */
  name: 'font-medium leading-tight truncate',
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
  base: 'inline-flex items-center rounded-theme-md px-2 py-0.5 text-xs font-semibold border',
  GET: 'bg-info-muted text-info border-info',
  POST: 'bg-success-muted text-success border-success',
  PUT: 'bg-warning-muted text-warning border-warning',
  DELETE: 'bg-destructive-muted text-destructive border-destructive',
  PATCH: 'bg-accent-muted text-accent border-accent',
  HEAD: 'bg-primary-muted text-primary border-primary',
  OPTIONS: 'bg-secondary-muted text-secondary border-secondary',
} as const

// ============================================================================
// Status Badge (for HTTP status codes) - solid backgrounds with white text
// ============================================================================

export const StatusBadge = {
  base: 'inline-flex items-center rounded-theme-md px-2 py-0.5 text-xs font-semibold border',
  success: 'bg-success text-white border-success',
  warning: 'bg-warning text-white border-warning',
  error: 'bg-destructive text-white border-destructive',
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
  container: 'flex items-center gap-2 min-w-0',
  icon: 'w-4 h-4 rounded bg-muted/30 flex items-center justify-center text-[10px] text-muted-foreground shrink-0',
  /** Source text - truncates based on flex container width */
  text: 'text-sm truncate flex-1',
} as const

// ============================================================================
// Timestamp Cell
// ============================================================================

export const TimestampCell = {
  container: 'block',
  /** Date hidden on mobile - only time shown to save space */
  date: 'hidden sm:block text-xs text-muted-foreground',
  time: 'block text-sm',
} as const

// ============================================================================
// Request Cell
// ============================================================================

export const RequestCell = {
  container: 'flex items-center w-full gap-2 overflow-hidden min-w-0',
  /** Method badge - narrower on mobile, expands on sm+ */
  methodWrapper: 'w-12 sm:w-16 flex justify-center shrink-0',
  /** Request name - hidden on mobile, flex-1 to fill remaining space and truncate */
  name: 'hidden sm:block truncate text-sm text-muted-foreground flex-1',
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
  /** Duration text value - hidden on sm (bar only), visible md+ */
  value: 'hidden md:block text-sm tabular-nums text-muted-foreground',
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
  /** Base sort indicator (deprecated - use SortIndicatorStyles instead) */
  sortIndicator: 'w-4 h-4 ml-1 inline-block text-muted-foreground',
  /** Active sort indicator - primary color when sorting */
  sortIndicatorActive: 'w-4 h-4 ml-1 inline-block text-primary',
  /** Inactive sort indicator - subtle, appears on hover */
  sortIndicatorInactive: 'w-4 h-4 ml-1 inline-block text-muted-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity',
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
  label: 'text-sm font-medium',
  /** Muted filter label for secondary info */
  labelMuted: 'text-sm text-muted-foreground',
  /** Small muted label (xs size) */
  labelSmallMuted: 'text-xs text-muted-foreground',
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
  /** Row layout - matches DataTable.row gap and padding */
  innerRow: 'flex items-center w-full gap-8 px-4',
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
  headerTheme: 'h-8 w-14 rounded-full', // 32×56px theme switcher

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

// ============================================================================
// Log Table Skeleton Sizes
// ============================================================================

export const LogTableSkeletonSizes = {
  /** Header cell skeleton widths */
  headerRequested: 'h-4 w-20',
  headerProvider: 'h-4 w-20',
  headerOrigin: 'h-4 w-24',
  headerSource: 'h-4 w-16',
  headerRequest: 'h-4 w-20',
  headerDuration: 'h-4 w-20',
  headerStatus: 'h-4 w-14',
  /** Row cell skeleton sizes */
  cellTimestamp: 'h-10 w-full',
  cellProvider: 'h-10 w-full',
  cellText: 'h-4 w-3/4',
  cellFull: 'h-4 w-full',
  cellDuration: 'h-4 w-16',
  cellStatus: 'h-6 w-12 rounded-full',
  /** Row container - matches DataTable.row grid layout */
  rowInner: [
    'grid',
    'grid-cols-[var(--log-col-requested)_var(--log-col-provider)_var(--log-col-origin)_var(--log-col-source)_var(--log-col-request)_var(--log-col-duration)_var(--log-col-status)_var(--log-col-actions)]',
    'gap-x-[var(--log-col-gap)]',
    'px-4 py-3',
    'items-center',
  ].join(' '),
} as const

// Loading styles
export { LoadingStyles, SkeletonHeight } from './loading'
