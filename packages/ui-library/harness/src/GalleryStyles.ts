/**
 * Gallery layout styles - responsive patterns for the component harness.
 * Uses mobile-first approach with progressive enhancement.
 */

import { ResponsiveSpacing, ResponsiveTypography, Responsive, SpacingTokens } from '@stackone-ui/core/styles'

export const GalleryStyles = {
  /** Main container - full viewport height with modern units */
  container: [
    Responsive.Container.fullHeight,
    'flex bg-background overflow-hidden',
  ].join(' '),

  /** Sidebar - hidden on mobile, visible on md+ */
  sidebar: {
    /** Desktop sidebar container */
    desktop: [
      Responsive.Sidebar.desktop,
      'md:flex-col border-r border-border bg-neu-base flex-shrink-0 overflow-hidden',
    ].join(' '),

    /** Mobile menu trigger button */
    mobileTrigger: Responsive.Sidebar.mobileFixed,

    /** Sidebar scroll area - Lenis handles overflow */
    scrollArea: 'h-full p-4',

    /** Sidebar header row */
    headerRow: 'flex items-center justify-between mb-4',

    /** Sidebar title */
    title: 'font-heading text-lg font-semibold text-foreground',

    /** Drawer header row (different padding) */
    drawerHeaderRow: 'flex items-center justify-between mb-4 px-2',
  },

  /** Main content area */
  main: [Responsive.Container.main, 'bg-background'].join(' '),

  /** Scrollable content wrapper - Lenis handles overflow */
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
    mobileOnly: Responsive.Sidebar.mobileTrigger,
  },

  /** Navigation controls - stack on mobile, row on tablet+ */
  navControls: {
    wrapper: [
      Responsive.Stack.adaptive,
      ResponsiveSpacing.sectionMargin,
    ].join(' '),
    /** Previous/Next buttons with hidden text on mobile */
    buttonText: Responsive.Text.srOnlyMobile,
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
