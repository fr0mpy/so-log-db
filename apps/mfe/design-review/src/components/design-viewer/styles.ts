import { Layout, Interactive } from '@stackone-ui/core/styles'

export const DesignViewerStyles = {
  container: ['flex flex-col gap-4'].join(' '),
  imageWrapper: [
    Layout.Position.relative,
    'w-full max-w-4xl mx-auto rounded-lg overflow-hidden border border-border',
  ].join(' '),
  image: 'w-full h-auto block',

  // Carousel
  carousel: [
    'flex items-center gap-4 p-4 bg-muted/50 rounded-lg',
  ].join(' '),
  carouselContent: [
    'flex-1 flex items-center gap-4 min-w-0',
  ].join(' '),
  carouselLabel: [
    'flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground',
    'flex items-center justify-center font-semibold',
  ].join(' '),
  carouselInfo: [
    'flex-1 min-w-0 flex flex-col gap-1',
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
