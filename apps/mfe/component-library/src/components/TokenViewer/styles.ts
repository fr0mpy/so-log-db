/**
 * TokenViewer styles - JSON viewer with syntax highlighting and color swatches.
 */

export const TokenViewerStyles = {
  container: [
    'rounded-theme-lg bg-neu-base shadow-neu-raised-sm',
    'p-4 overflow-auto max-h-96',
  ].join(' '),

  pre: [
    'font-mono text-sm leading-relaxed',
    'text-foreground whitespace-pre-wrap',
  ].join(' '),

  json: {
    key: 'text-primary font-medium',
    string: 'text-success',
    number: 'text-info',
    boolean: 'text-warning',
    null: 'text-muted-foreground italic',
    bracket: 'text-muted-foreground',
    colon: 'text-muted-foreground',
    comma: 'text-muted-foreground',
  },

  colorValue: 'inline-flex items-center gap-1.5',

  colorSquare: [
    'inline-block w-3 h-3 rounded-sm',
    'border border-border shadow-sm',
    'flex-shrink-0',
  ].join(' '),

  header: {
    wrapper: 'flex items-center justify-between mb-3',
    title: 'font-heading font-semibold text-foreground',
    actions: 'flex items-center gap-2',
  },

  copyButton: [
    'px-2 py-1 text-xs rounded-theme-md',
    'bg-muted hover:bg-muted-foreground/10',
    'text-muted-foreground hover:text-foreground',
    'transition-colors',
  ].join(' '),

  copied: 'text-success',
} as const

export const ColorSwatchStyles = {
  container: [
    'flex items-center gap-3 p-3',
    'rounded-theme-md bg-neu-base shadow-neu-raised-sm',
    'hover:shadow-neu-raised transition-shadow',
  ].join(' '),

  color: [
    'w-12 h-12 rounded-theme-md',
    'border border-border shadow-neu-flat',
    'flex-shrink-0',
  ].join(' '),

  info: 'flex flex-col gap-0.5 min-w-0',

  name: 'font-medium text-foreground truncate',

  value: [
    'font-mono text-xs text-muted-foreground',
    'bg-muted px-1.5 py-0.5 rounded',
    'inline-block',
  ].join(' '),

  cssVar: [
    'font-mono text-xs text-primary',
    'truncate',
  ].join(' '),

  tailwind: [
    'font-mono text-xs text-secondary',
    'truncate',
  ].join(' '),
} as const

export const TokenGridStyles = {
  container: 'space-y-6',

  section: {
    wrapper: 'space-y-3',
    header: 'flex items-center justify-between',
    title: 'font-heading font-semibold text-lg text-foreground',
    subtitle: 'text-sm text-muted-foreground',
    toggle: [
      'px-3 py-1.5 text-sm rounded-theme-md',
      'bg-muted hover:bg-muted-foreground/10',
      'text-muted-foreground hover:text-foreground',
      'transition-colors font-medium',
    ].join(' '),
  },

  grid: {
    colors: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3',
    spacing: 'flex flex-wrap items-end gap-4',
    shadows: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4',
    radius: 'flex flex-wrap items-center gap-4',
    typography: 'space-y-4',
    motion: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4',
    zIndex: 'flex flex-wrap gap-4',
  },

  modeToggle: {
    wrapper: 'flex items-center gap-2 p-1 rounded-theme-md bg-muted',
    button: 'px-3 py-1.5 text-sm rounded-theme-sm transition-colors',
    active: 'bg-primary text-primary-foreground shadow-neu-raised-sm',
    inactive: 'text-muted-foreground hover:text-foreground',
  },
} as const

export const SpacingTokenStyles = {
  item: 'flex items-center gap-3',
  bar: 'h-6 bg-primary rounded-theme-sm shadow-neu-raised-sm',
  label: 'font-mono text-sm text-muted-foreground w-8',
  value: 'font-mono text-xs text-foreground',
} as const

export const ShadowTokenStyles = {
  box: [
    'w-full h-24 rounded-theme-lg bg-neu-base',
    'flex items-center justify-center',
  ].join(' '),
  label: 'font-mono text-xs text-muted-foreground',
} as const

export const RadiusTokenStyles = {
  box: [
    'w-16 h-16 bg-primary',
    'flex items-center justify-center',
  ].join(' '),
  label: 'mt-2 font-mono text-xs text-muted-foreground text-center',
} as const

export const MotionTokenStyles = {
  item: [
    'p-4 rounded-theme-lg bg-neu-base shadow-neu-raised-sm',
    'space-y-2',
  ].join(' '),
  name: 'font-medium text-foreground',
  value: 'font-mono text-sm text-muted-foreground',
  demo: 'h-8 bg-primary rounded-theme-md',
} as const

export const ZIndexTokenStyles = {
  item: [
    'relative p-4 rounded-theme-lg',
    'bg-primary text-primary-foreground',
    'shadow-neu-raised-sm',
    'min-w-24 text-center',
  ].join(' '),
  name: 'font-medium',
  value: 'font-mono text-sm opacity-80',
} as const
