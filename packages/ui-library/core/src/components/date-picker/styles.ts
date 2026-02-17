/**
 * DatePicker component styles following zero-inline-classnames pattern.
 * All Tailwind classes are defined here and imported into components.
 */

import { Layout, Interactive, Overlay, Form } from '../../styles'
import { ComponentHeight } from '../../styles/tokens/sizing'

export const DatePickerStyles = {
  // ==========================================================================
  // Trigger (similar to Select trigger)
  // ==========================================================================
  trigger: {
    base: [
      `relative flex ${ComponentHeight.select} items-center justify-between gap-3 rounded-theme-lg`,
      'bg-neu-base shadow-neu-raised px-4 py-2 text-sm text-foreground cursor-pointer',
      'focus-visible:outline-none focus-visible:shadow-[var(--shadow-raised),var(--shadow-focus)]',
      'disabled:cursor-not-allowed disabled:opacity-50',
    ].join(' '),
    open: 'z-popover',
    width: {
      full: 'w-full',
      auto: 'w-auto',
    },
  },

  // ==========================================================================
  // Value display
  // ==========================================================================
  value: {
    base: 'flex items-center gap-2 truncate',
    placeholder: 'text-muted-foreground',
    icon: 'h-4 w-4 opacity-50 flex-shrink-0',
  },

  // ==========================================================================
  // Backdrop (for modal behavior)
  // ==========================================================================
  backdrop: Overlay.Dialog.backdrop,

  // ==========================================================================
  // Popup container (dialog-like)
  // ==========================================================================
  popup: {
    base: [
      'fixed z-popover',
      'rounded-theme-lg border border-border',
      'bg-background shadow-theme-xl',
      'overflow-hidden',
    ].join(' '),
    positioning: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  },

  // ==========================================================================
  // Content layout (with optional presets sidebar)
  // ==========================================================================
  content: {
    base: 'flex flex-col',
    withPresets: 'flex-row',
    main: 'flex flex-col flex-1',
  },

  // ==========================================================================
  // Header
  // ==========================================================================
  header: {
    base: 'flex items-center justify-between px-4 py-3 border-b border-border',
    centered: 'flex items-center justify-center px-4 py-3 border-b border-border',
    title: 'text-sm font-medium',
    closeButton: [
      Interactive.CloseButton.position,
      Interactive.CloseButton.size,
    ].join(' '),
    closeIcon: Layout.Size.iconSm,
  },

  // ==========================================================================
  // Presets sidebar
  // ==========================================================================
  presets: {
    container: [
      'w-40 border-r border-border',
      'bg-muted/30 p-2',
      'flex flex-col gap-1',
    ].join(' '),
    item: {
      base: [
        'w-full px-3 py-2 text-sm text-left rounded-theme-sm',
        'hover:bg-muted focus-visible:bg-muted focus-visible:outline-none',
        'transition-colors cursor-pointer',
      ].join(' '),
      active: 'bg-primary text-primary-foreground hover:bg-primary/90',
    },
  },

  // ==========================================================================
  // Calendar container
  // ==========================================================================
  calendar: {
    container: 'p-4',
    header: 'flex items-center justify-between mb-4',
    title: {
      base: [
        'text-sm font-medium cursor-pointer',
        'hover:text-primary transition-colors',
        'focus-visible:outline-none focus-visible:text-primary',
      ].join(' '),
    },
    nav: {
      container: 'flex items-center gap-1',
      button: [
        'h-8 w-8 flex items-center justify-center rounded-theme-sm',
        'hover:bg-muted focus-visible:bg-muted focus-visible:outline-none',
        'transition-colors cursor-pointer',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent',
      ].join(' '),
      icon: 'h-4 w-4',
    },
  },

  // ==========================================================================
  // Calendar grid
  // ==========================================================================
  grid: {
    table: 'w-full border-collapse',
    headerRow: '',
    headerCell: 'h-8 w-8 text-xs font-medium text-muted-foreground text-center',
    bodyRow: '',
    bodyCell: 'p-0',
    // Cell backgrounds for range (creates solid bar)
    // No rounding on cells - the buttons provide the rounded edges visually
    cellRangeMiddle: 'bg-[color-mix(in_srgb,var(--color-primary)_25%,transparent)]',
    cellRangeHover: 'bg-[color-mix(in_srgb,var(--color-primary)_15%,transparent)]',
  },

  // ==========================================================================
  // Day cell
  // ==========================================================================
  day: {
    base: [
      'h-8 w-full p-0 text-sm',
      'flex items-center justify-center rounded-theme-sm',
      'hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
      'transition-colors cursor-pointer',
    ].join(' '),
    today: 'ring-1 ring-inset ring-primary font-semibold',
    selected: 'bg-primary text-primary-foreground hover:bg-primary/90',
    outsideMonth: 'text-muted-foreground/50',
    disabled: 'opacity-30 cursor-not-allowed hover:bg-transparent',
    // Range selection states (button styles - cell provides continuous background)
    rangeStart: 'bg-primary text-primary-foreground !rounded-r-none !rounded-l-theme-sm',
    rangeEnd: 'bg-primary text-primary-foreground !rounded-l-none !rounded-r-theme-sm',
    rangeMiddle: '!rounded-none hover:bg-[color-mix(in_srgb,var(--color-primary)_40%,transparent)]',
    rangeHover: '!rounded-none',
  },

  // ==========================================================================
  // Month/Year grid (for view switching)
  // ==========================================================================
  monthYear: {
    grid: 'grid grid-cols-3 gap-2 p-4',
    cell: {
      base: [
        'h-10 px-2 text-sm',
        'flex items-center justify-center rounded-theme-sm',
        'hover:bg-muted focus-visible:bg-muted focus-visible:outline-none',
        'transition-colors cursor-pointer',
      ].join(' '),
      selected: 'bg-primary text-primary-foreground hover:bg-primary/90',
      current: 'border border-primary',
      disabled: 'opacity-30 cursor-not-allowed hover:bg-transparent',
    },
  },

  // ==========================================================================
  // Date input fields
  // ==========================================================================
  input: {
    container: 'flex items-center justify-center gap-2 px-4 py-3 border-t border-border',
    row: 'flex items-center gap-2',
    group: 'flex flex-col gap-1',
    field: [
      Form.Input.base,
      'w-32 text-center text-sm',
    ].join(' '),
    separator: 'text-muted-foreground text-sm',
    label: 'text-xs text-muted-foreground',
  },

  // ==========================================================================
  // Footer with actions
  // ==========================================================================
  footer: {
    container: 'flex items-center justify-end gap-2 px-4 py-3 border-t border-border',
  },

  // ==========================================================================
  // Screen reader only text
  // ==========================================================================
  srOnly: 'sr-only',

  // ==========================================================================
  // Live region for announcements
  // ==========================================================================
  liveRegion: 'sr-only',
} as const
