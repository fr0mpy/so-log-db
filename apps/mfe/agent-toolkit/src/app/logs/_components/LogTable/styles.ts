/**
 * LogTable Styles
 *
 * Co-located styles following zero-inline-classnames pattern.
 * These are specific to LogTable and not shared in the global styles.
 */

export const LogTableStyles = {
  /** Wrapper for tooltip trigger - flex display for proper alignment */
  tooltipWrapper: 'flex',

  /** Action button group modifier for hover states */
  actionButton: 'group/action',

  /** Hidden on mobile, visible on large screens (secondary actions) */
  hiddenLgVisible: 'hidden lg:inline-flex',
} as const
