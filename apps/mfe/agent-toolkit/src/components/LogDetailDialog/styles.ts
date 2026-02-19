/**
 * LogDetailDialog Styles
 *
 * Co-located styles following zero-inline-classnames pattern.
 * Imports from @stackone-ui/core and composes dialog-specific patterns.
 */

import {
  Layout,
  Interactive,
  Overlay,
  Feedback,
  TypographyTokens as Typography,
} from '@stackone-ui/core/styles'

// ============================================================================
// Dialog Container
// ============================================================================

export const DialogStyles = {
  /** Nearly full-screen dialog content - wide for detailed log viewing */
  content: [
    '!w-[95vw] !max-w-[1800px]', // ! forces override of base dialog constraints
    '!h-[92vh] !max-h-[1000px]',
    'flex flex-col',
    'overflow-hidden',
  ].join(' '),
  /** Inner container with flex layout */
  inner: 'flex flex-col h-full',
  /** Scrollable content area - paper container */
  scrollArea: [
    'flex-1 overflow-auto',
    'bg-neu-base shadow-neu-pressed-sm',
    'rounded-lg m-4',
  ].join(' '),
  /** Close button positioning */
  closeButtonWrapper: 'absolute top-4 right-4 z-10',
} as const

// ============================================================================
// Icon Sizes
// ============================================================================

export const IconSize = {
  /** Standard small icon (16x16) */
  sm: 'w-4 h-4',
  /** Standard medium icon (20x20) */
  md: 'w-5 h-5',
  /** External link icon (12x12) */
  external: 'w-3 h-3 ml-1 inline',
} as const

// ============================================================================
// Header Bar (Top row with method, name, timestamp, status, close)
// ============================================================================

export const HeaderBar = {
  /** Header container - sticky top, border bottom */
  container: [
    'flex items-center justify-between',
    'px-6 py-4',
    'border-b border-border',
    'bg-surface',
  ].join(' '),
  /** Left side: method tag + request name */
  left: [Layout.Flex.center, 'gap-3'].join(' '),
  /** Right side: timestamp, duration, status - with padding for close button */
  right: [Layout.Flex.center, 'gap-4 pr-12'].join(' '),
  /** Timestamp stack - date on top, time below */
  timestamp: 'flex flex-col items-end tabular-nums',
} as const

// ============================================================================
// Metadata Row (Provider, Org, Source, Expires)
// ============================================================================

export const MetadataRow = {
  /** Container for metadata items */
  container: [
    'flex items-start gap-8',
    'px-6 py-4',
    'border-b border-border',
    'bg-muted/5',
  ].join(' '),
  /** Individual metadata item - vertical stack (label on top, value below) */
  item: 'flex flex-col gap-1',
  /** Value row with icon and text */
  valueRow: [Layout.Flex.center, 'gap-2'].join(' '),
  /** Icon for metadata item */
  icon: 'w-4 h-4 text-muted-foreground',
} as const

// ============================================================================
// URL Section
// ============================================================================

export const UrlSection = {
  /** URL container - neumorphic style matching sections */
  container: [
    'flex items-center gap-3',
    'mx-6 mt-4 px-4 py-3',
    'bg-neu-base shadow-neu-raised-sm rounded-lg',
  ].join(' '),
  /** URL label */
  label: [Typography.textSm, Typography.textMuted, 'shrink-0'].join(' '),
  /** URL value - monospace, truncated */
  value: 'flex-1 font-mono text-sm truncate',
  /** Copy button */
  copyButton: [
    'p-1.5 rounded',
    'hover:bg-muted/20',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
    Interactive.Transition.color,
  ].join(' '),
  /** Copy icon */
  copyIcon: 'w-4 h-4 text-muted-foreground',
  /** Copy icon when copied */
  copyIconSuccess: 'w-4 h-4 text-success',
} as const

// ============================================================================
// Tabs
// ============================================================================

export const TabsStyles = {
  /** Tabs list container - left-aligned, shrink-to-fit width */
  list: 'mx-6 my-4 !w-auto !self-start',
  /** Tab content area - paper container, grows with content */
  content: [
    'overflow-auto p-6',
    'mx-4 mb-4 rounded-lg',
    'bg-neu-base shadow-neu-pressed-sm',
  ].join(' '),
  /** Tabs root layout - flexible column */
  root: 'flex-1 flex flex-col min-h-0',
} as const

// ============================================================================
// Collapsible Sections (Request/Response)
// ============================================================================

export const Section = {
  /** Section container - neumorphic style */
  container: 'bg-neu-base shadow-neu-raised-sm rounded-lg overflow-hidden',
  /** Section header - extends Collapsible.Trigger with extra padding */
  header: 'px-4 py-3',
  /** Header left side: chevron + title */
  headerLeft: [Layout.Flex.center, 'gap-2'].join(' '),
  /** Section title */
  title: [Typography.textSm, Typography.fontMedium].join(' '),
  /** Header right side: badge */
  headerRight: [Layout.Flex.center, 'gap-2'].join(' '),
  /** Chevron icon - rotates when expanded */
  chevron: 'w-4 h-4 text-muted-foreground transition-transform',
  /** Chevron when expanded */
  chevronExpanded: 'rotate-90',
  /** Section content area */
  content: 'px-4 py-3',
  /** Sub-section (Headers, Query Params, Body) */
  subSection: '',
  /** Sub-section header - no bg hover, only text/chevron turns primary */
  subHeader: 'px-4 py-2 hover:!bg-transparent',
  /** Sub-section title - uses group-hover to match chevron behavior */
  subTitle: [
    Typography.textSm,
    Typography.textMuted,
    'group-hover:text-primary',
    Interactive.Transition.color,
  ].join(' '),
  /** Sub-section content */
  subContent: 'px-4 pb-3',
} as const

// ============================================================================
// Key-Value List (for headers, query params)
// ============================================================================

export const KeyValueStyles = {
  /** List container */
  container: 'space-y-0',
  /** Individual row - left-aligned layout */
  row: [
    'flex items-start gap-4',
    'py-2 px-2',
    'border-b border-border/30 last:border-b-0',
    'hover:bg-muted/5',
    Interactive.Transition.color,
  ].join(' '),
  /** Key text - fixed width for alignment */
  key: [Typography.textSm, Typography.textMuted, 'shrink-0 w-40'].join(' '),
  /** Value container - takes remaining space */
  valueContainer: [Layout.Flex.center, 'gap-2 flex-1 min-w-0'].join(' '),
  /** Value text - left-aligned, not pushed right */
  value: [Typography.textSm, 'font-mono truncate'].join(' '),
  /** Copy button (small) */
  copyButton: [
    'p-1 rounded opacity-0 group-hover:opacity-100',
    'hover:bg-muted/20',
    'focus-visible:opacity-100',
    'transition-opacity duration-150',
  ].join(' '),
  /** Row with hover - enables copy button visibility */
  rowHover: 'group',
} as const

// ============================================================================
// JSON Body Display
// ============================================================================

export const JsonBodyStyles = {
  /** Container for JSON content */
  container: [
    'bg-muted/10 rounded-lg',
    'p-4 overflow-auto',
    'max-h-[300px]',
  ].join(' '),
  /** JSON text - monospace, syntax colored */
  content: 'font-mono text-xs whitespace-pre leading-relaxed',
  /** Syntax colors */
  syntax: {
    key: 'text-primary',
    string: 'text-success',
    number: 'text-warning',
    boolean: 'text-info',
    null: 'text-muted-foreground',
  },
  /** Not available state */
  notAvailable: [Typography.textSm, Typography.textMuted, 'italic'].join(' '),
} as const

// ============================================================================
// Error Explainer
// ============================================================================

export const ErrorExplainerStyles = {
  /** Container - distinct AI purple gradient styling */
  container: [
    'border border-ai/30 rounded-lg',
    'overflow-hidden',
    'bg-gradient-to-r from-ai-from/10 to-ai-to/10',
  ].join(' '),
  /** Header row */
  header: [
    'flex items-center justify-between',
    'w-full px-4 py-3',
    'hover:bg-ai/10',
    'cursor-pointer',
    Interactive.Transition.color,
  ].join(' '),
  /** Header left with sparkle icon */
  headerLeft: [Layout.Flex.center, 'gap-2'].join(' '),
  /** Title with AI purple color */
  title: [Typography.textSm, Typography.fontMedium, 'text-ai'].join(' '),
  /** Sparkle icon - AI purple */
  sparkleIcon: 'w-4 h-4 text-ai',
  /** "Open to Generate" link */
  generateLink: [
    Typography.textSm,
    'text-ai hover:text-ai-hover hover:underline cursor-pointer',
  ].join(' '),
  /** "via Advanced Logs" badge - AI gradient */
  viaBadge: [
    Feedback.Badge.base,
    'bg-gradient-to-r from-ai-from/20 to-ai-to/20 text-ai text-xs shadow-neu-badge-ai',
  ].join(' '),
  /** Content area */
  content: 'p-4',
  /** Loading state */
  loading: [Layout.Flex.center, 'gap-2'].join(' '),
  /** Loading text */
  loadingText: [Typography.textSm, 'text-ai'].join(' '),
  /** Explanation text */
  explanation: 'prose prose-sm max-w-none',
  /** Sources section */
  sources: 'mt-4 space-y-2',
  /** Source link */
  sourceLink: [Typography.textSm, 'text-ai hover:text-ai-hover hover:underline'].join(' '),
  /** Feedback row */
  feedback: [Layout.Flex.center, 'gap-4 mt-4 pt-4 border-t border-ai/20'].join(' '),
  /** Feedback label */
  feedbackLabel: [Typography.textSm, Typography.textMuted].join(' '),
  /** Feedback buttons container */
  feedbackButtons: [Layout.Flex.center, 'gap-2'].join(' '),
  /** Feedback button */
  feedbackButton: [
    'p-1.5 rounded',
    'hover:bg-ai/20',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ai',
    Interactive.Transition.color,
  ].join(' '),
  /** Feedback button active */
  feedbackButtonActive: 'bg-ai/20',
  /** Feedback icon */
  feedbackIcon: 'w-4 h-4',
} as const

// ============================================================================
// Underlying Requests Tab
// ============================================================================

export const UnderlyingRequestsStyles = {
  /** Container */
  container: 'space-y-3',
  /** Empty state */
  emptyState: [
    'flex flex-col items-center justify-center',
    'py-12 text-center',
  ].join(' '),
  /** Request row - neumorphic card style */
  row: [
    'w-full',
    'grid grid-cols-[1fr_auto_auto_auto] items-center gap-4',
    'px-4 py-3',
    'bg-neu-base shadow-neu-raised-sm rounded-lg',
    'group', // Enable group-hover for children
    Interactive.Cursor.pointer,
    Interactive.Transition.all,
    'hover:shadow-neu-raised',
  ].join(' '),
  /** Row expanded state */
  rowExpanded: 'shadow-neu-raised',
  /** Cell with method tag and URL */
  methodCell: [Layout.Flex.center, 'gap-3'].join(' '),
  /** Expand icon - follows collapsible pattern */
  expandIcon: [
    'w-4 h-4',
    'text-muted-foreground',
    'group-hover:text-primary',
    'transition-all duration-200',
  ].join(' '),
  /** Expand icon rotated */
  expandIconExpanded: 'rotate-90 text-primary',
  /** Expanded content - grouped with left accent border */
  expandedContent: [
    'mt-3 ml-6 pl-4 space-y-3',
    'border-l-2 border-primary/30',
  ].join(' '),
} as const

// ============================================================================
// Footer
// ============================================================================

export const FooterStyles = {
  /** Footer container */
  container: [
    'flex items-center justify-end',
    'px-6 py-4',
  ].join(' '),
  /** Navigation controls */
  navigation: [Layout.Flex.center, 'gap-1'].join(' '),
} as const

// ============================================================================
// Utility Styles
// ============================================================================

export const UtilityStyles = {
  /** Screen reader only */
  srOnly: 'sr-only',
  /** Visually hidden but accessible */
  visuallyHidden: 'absolute w-px h-px p-0 -m-px overflow-hidden clip-rect-0 whitespace-nowrap border-0',
} as const

// Re-export for convenience
export { Layout, Interactive, Overlay, Feedback }
