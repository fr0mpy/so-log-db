/**
 * LogsChart Styles
 *
 * Neumorphic chart styling - CSS-based for performance.
 * Bars are solid/opaque by default, with hover effects.
 */

import { Layout } from '@stackone-ui/core/styles'

export const LogsChartStyles = {
  // Container - removed paint containment to allow tooltip shadows to render
  container: 'w-full [contain:layout_style]',
  // Allow tooltip shadow to escape, disable transitions on SVG elements to prevent resize glitches
  // Remove focus outline and focusability from SVG elements - chart is not keyboard interactive
  wrapper: 'h-[220px] overflow-visible [&_svg]:![transition:none] [&_rect]:![transition:none] [&_svg]:![outline:none] [&_svg_*]:![outline:none] [&_svg]:focus:![outline:none] [&_*:focus]:![outline:none]',

  // Neumorphic Tooltip
  tooltip: [
    'bg-surface rounded-xl p-4',
    'shadow-neu-raised border border-border/50',
  ].join(' '),
  tooltipTitle: 'text-sm font-semibold mb-3 text-foreground',
  tooltipRow: [Layout.Flex.center, 'gap-2 text-sm mb-1'].join(' '),
  tooltipDot: 'w-3 h-3 rounded-full shadow-neu-pressed-sm',
  tooltipLabel: 'text-muted-foreground',
  tooltipValue: 'font-semibold text-foreground ml-auto',
  tooltipTotal: [
    Layout.Flex.center,
    'gap-2 text-sm mt-2 pt-2 border-t border-border',
    'font-medium text-foreground',
  ].join(' '),

  // Neumorphic Legend
  legend: [Layout.Flex.center, 'gap-6 mt-4 justify-center'].join(' '),
  legendItem: [Layout.Flex.center, 'gap-2'].join(' '),
  legendText: 'text-sm text-muted-foreground',

  // Legend dots with neumorphic styling
  legendDotSuccess: [
    'w-4 h-4 rounded-full bg-success',
    'shadow-neu-badge-success',
  ].join(' '),
  legendDotWarning: [
    'w-4 h-4 rounded-full bg-warning',
    'shadow-neu-badge-warning',
  ].join(' '),
  legendDotError: [
    'w-4 h-4 rounded-full bg-destructive',
    'shadow-neu-badge-destructive',
  ].join(' '),
} as const

/**
 * Recharts-specific style objects
 * These must be JS objects (not Tailwind classes) due to Recharts API requirements.
 * Using CSS variables for theming integration.
 */
export const RechartsStyles = {
  /** Axis tick style - must be JS object for Recharts */
  axisTick: {
    fontSize: 11,
    fill: 'var(--color-muted-foreground)',
  },
  /** Tooltip cursor style - must be JS object for Recharts */
  tooltipCursor: {
    fill: 'var(--color-muted)',
    opacity: 0.1,
  },
} as const
