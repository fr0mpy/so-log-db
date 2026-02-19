import { Layout, Interactive } from '@stackone-ui/core/styles'

export const DesignViewerStyles = {
  container: ['flex flex-col gap-4'].join(' '),
  imageWrapper: [
    Layout.Position.relative,
    'w-full max-w-4xl mx-auto rounded-lg overflow-hidden border border-border',
  ].join(' '),
  image: 'w-full h-auto block',

  // Carousel
  carouselWrapper: [
    'flex items-center justify-between gap-4 w-full',
  ].join(' '),
  navButton: [
    Interactive.Focus.ring,
    'flex-shrink-0 w-12 h-12 rounded-full',
    'flex items-center justify-center',
    'bg-primary text-primary-foreground',
    'cursor-pointer transition-all duration-200',
    'hover:bg-primary/90',
  ].join(' '),
  carousel: [
    'flex-1 flex items-center justify-center gap-4 p-4 bg-muted/50 rounded-lg',
  ].join(' '),
  carouselContent: [
    'flex items-center justify-center gap-4 min-w-0 text-center',
  ].join(' '),
  carouselLabel: [
    'flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground',
    'flex items-center justify-center font-semibold',
  ].join(' '),
  carouselInfo: [
    'min-w-0 flex flex-col items-center gap-1 text-center',
  ].join(' '),

  // Indicators
  indicators: [
    'flex items-center justify-center gap-2 flex-wrap',
  ].join(' '),
  indicator: [
    Interactive.Focus.ring,
    'w-8 h-8 rounded-full bg-muted text-muted-foreground',
    'flex items-center justify-center text-xs font-medium',
    'cursor-pointer hover:bg-muted/80 transition-colors',
  ].join(' '),
  indicatorActive: [
    Interactive.Focus.ring,
    'w-8 h-8 rounded-full bg-primary text-primary-foreground',
    'flex items-center justify-center text-xs font-medium',
    'cursor-pointer transition-colors',
  ].join(' '),
} as const
