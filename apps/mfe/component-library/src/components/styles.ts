/**
 * Component Library styles - adapted from harness GalleryStyles.
 * Uses the same responsive patterns with Next.js App Router structure.
 */

import { ResponsiveSpacing, ResponsiveTypography, SpacingTokens } from '@stackone-ui/core/styles'

export const LayoutStyles = {
  /** Main container - full viewport height with modern units */
  container: [
    'min-h-[100dvh]',
    'flex bg-background overflow-hidden',
  ].join(' '),

  /** Sidebar - hidden on mobile, visible on md+ */
  sidebar: {
    /** Desktop sidebar container */
    desktop: [
      'hidden md:flex w-64',
      'md:flex-col border-r border-border bg-neu-base flex-shrink-0 overflow-hidden',
    ].join(' '),

    /** Mobile menu trigger button */
    mobileTrigger: 'fixed bottom-4 right-4 z-50 md:hidden',

    /** Sidebar scroll area */
    scrollArea: 'h-full p-4',

    /** Sidebar header row */
    headerRow: 'flex items-center justify-between mb-4',

    /** Sidebar title */
    title: 'font-heading text-lg font-semibold text-foreground',

    /** Drawer header row (different padding) */
    drawerHeaderRow: 'flex items-center justify-between mb-4 px-2',
  },

  /** Main content area */
  main: 'flex-1 min-w-0 overflow-y-auto bg-background',

  /** Scrollable content wrapper */
  scrollArea: [
    'h-full',
    ResponsiveSpacing.galleryPadding,
  ].join(' '),

  /** Header section */
  header: {
    wrapper: ResponsiveSpacing.sectionMargin,
    /** Row that contains title and mobile theme toggle */
    row: 'flex items-start justify-between',
    title: [
      ResponsiveTypography.heading,
      'font-heading font-bold mb-2 text-foreground',
    ].join(' '),
    subtitle: 'text-muted-foreground',
    /** Mobile-only container for theme toggle */
    mobileOnly: 'md:hidden',
  },

  /** Navigation controls - stack on mobile, row on tablet+ */
  navControls: {
    wrapper: [
      'flex flex-col md:flex-row md:items-center md:justify-between gap-4',
      ResponsiveSpacing.sectionMargin,
    ].join(' '),
    /** Previous/Next buttons with hidden text on mobile */
    buttonText: 'sr-only md:not-sr-only',
    /** Component title */
    title: [
      ResponsiveTypography.componentTitle,
      'font-heading font-semibold text-foreground',
    ].join(' '),
  },

  /** Sidebar navigation */
  nav: SpacingTokens.spaceY1,

  /** Component preview panel */
  preview: [
    'rounded-theme-2xl bg-neu-base shadow-neu-raised',
    ResponsiveSpacing.previewPadding,
  ].join(' '),

  /** Component info footer */
  info: {
    wrapper: [
      'mt-4 md:mt-6',
      'p-3 md:p-4',
      'rounded-theme-lg bg-neu-base shadow-neu-raised-sm',
    ].join(' '),
    text: 'text-sm text-muted-foreground',
  },

  /** Skeleton loading state */
  skeleton: {
    container: 'animate-pulse space-y-4',
    title: 'h-8 bg-muted rounded-theme-md w-1/3',
    content: 'h-32 bg-muted rounded-theme-lg',
  },

  /** Sidebar navigation link - touch-friendly */
  navLink: {
    base: [
      'block w-full text-left',
      'px-3 py-3 min-h-11', // 44px touch target
      'rounded-theme-md text-sm font-medium transition-colors',
    ].join(' '),
    active: 'bg-primary text-primary-foreground shadow-neu-raised-sm',
    inactive: 'text-foreground hover:bg-muted',
  },
} as const

/** Sidebar logo styles - home link with glass effect */
export const GallerySidebarLogoStyles = {
  container: [
    'flex items-center justify-center flex-shrink-0',
    'size-10 rounded-theme-md',
    'bg-gradient-to-br from-[#10B981]/25 to-[#10B981]/15',
    'backdrop-blur-md cursor-pointer',
    'transition-all hover:from-[#10B981]/35 hover:to-[#10B981]/15',
  ].join(' '),
  image: 'size-6 object-contain',
} as const
