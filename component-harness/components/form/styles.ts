/**
 * Form component styles - zero inline classnames pattern.
 * All form components import from this central styles file.
 */

import {
  Layout,
  Interactive,
  Control,
  Form,
  SpacingTokens,
  SizingTokens,
  TypographyTokens,
  TouchTarget,
} from '../../styles'

// ============================================================================
// BUTTON STYLES
// ============================================================================

export const ButtonStyles = {
  /** Base styles for all buttons */
  base: [
    Layout.Flex.inline,
    SpacingTokens.gap1,
    TypographyTokens.fontMedium,
    Interactive.Cursor.pointer,
    Interactive.Transition.color,
    'outline-none whitespace-nowrap',
    Interactive.Disabled.base,
  ].join(' '),

  /** Loading state modifier */
  loading: 'flex-col py-1.5 disabled:opacity-100',

  /** Loading content wrapper */
  loadingContent: [
    Layout.Flex.col,
    'items-center',
    SpacingTokens.gap1,
    SizingTokens.wFull,
    SpacingTokens.px2,
  ].join(' '),

  /** Loading text */
  loadingText: [
    TypographyTokens.textXs,
    TypographyTokens.fontSemibold,
    TypographyTokens.trackingWide,
  ].join(' '),

  /** Content wrapper for children */
  content: [
    Layout.Flex.inline,
    SpacingTokens.gap1,
  ].join(' '),

  /** Size variants - sleek modern heights with subtle rounding */
  sizes: {
    sm: [
      SizingTokens.h8,
      SpacingTokens.px3,
      TypographyTokens.textSm,
      'rounded-theme-md',
    ].join(' '),
    md: [
      SizingTokens.h9,
      SpacingTokens.px4,
      TypographyTokens.textSm,
      'rounded-theme-md',
    ].join(' '),
    lg: [
      SizingTokens.h10,
      SpacingTokens.px5,
      TypographyTokens.textSm,
      'rounded-theme-md',
    ].join(' '),
  },

  /** Icon-only button sizes (square) */
  iconOnly: {
    sm: [
      SizingTokens.square8,
      SpacingTokens.p0,
      'rounded-theme-md',
    ].join(' '),
    md: [
      SizingTokens.square9,
      SpacingTokens.p0,
      'rounded-theme-md',
    ].join(' '),
    lg: [
      SizingTokens.square10,
      SpacingTokens.p0,
      'rounded-theme-md',
    ].join(' '),
  },

  /** Icon sizing within buttons */
  icon: {
    sm: SizingTokens.iconSm,
    md: SizingTokens.iconSm,
    lg: SizingTokens.iconMd,
  },

  /** Variant styles */
  variants: {
    primary: [
      'bg-primary text-primary-foreground',
      'shadow-neu-variant-primary',
      'hover:bg-primary-hover hover:shadow-neu-raised-lg',
      'active:shadow-neu-pressed-sm',
      'focus-visible:shadow-[var(--shadow-variant-primary),var(--shadow-focus)]',
    ].join(' '),
    secondary: [
      'bg-secondary text-secondary-foreground',
      'shadow-neu-variant-secondary',
      'hover:bg-secondary-hover hover:shadow-neu-raised-lg',
      'active:shadow-neu-pressed-sm',
      'focus-visible:shadow-[var(--shadow-variant-secondary),var(--shadow-focus)]',
    ].join(' '),
    text: [
      'bg-transparent text-foreground',
      'hover:text-primary',
      'active:opacity-80',
      'focus-visible:shadow-neu-focus',
    ].join(' '),
    ghost: [
      'bg-transparent text-foreground',
      Interactive.Hover.ghost,
      'active:shadow-neu-pressed-sm',
      'focus-visible:shadow-neu-focus',
    ].join(' '),
    destructive: [
      'bg-destructive text-destructive-foreground',
      'shadow-neu-variant-destructive',
      'hover:bg-destructive-hover hover:shadow-neu-raised-lg',
      'active:shadow-neu-pressed-sm',
      'focus-visible:shadow-[var(--shadow-variant-destructive),var(--shadow-focus)]',
    ].join(' '),
  },
} as const

// ============================================================================
// CHECKBOX STYLES
// ============================================================================

export const CheckboxStyles = {
  /** Container wrapper */
  container: [
    Layout.Flex.center,
    SpacingTokens.gap2,
  ].join(' '),

  /** Checkbox input - 16px visual size with expanded touch area for WCAG 2.5.8 compliance */
  input: [
    SizingTokens.square4,
    TouchTarget.controlAreaLg, // Expands touch target to 44px+ while keeping 16px visual
    'rounded-theme-sm',
    Control.Toggle.base,
    Control.Toggle.unchecked,
    Control.Toggle.focus,
    Control.Toggle.checkedState,
    Control.Toggle.disabled,
  ].join(' '),

  /** Label text */
  label: Control.Toggle.label,
} as const

// ============================================================================
// SWITCH STYLES
// ============================================================================

export const SwitchStyles = {
  /** Container wrapper */
  container: [
    Layout.Flex.center,
    SpacingTokens.gap2,
  ].join(' '),

  /** Track base */
  track: {
    base: [
      Layout.Position.relative,
      'inline-flex',
      SizingTokens.h4,
      SizingTokens.w8,
      Interactive.Cursor.pointer,
      'items-center rounded-full',
      Interactive.Transition.all,
    ].join(' '),
    uncheckedBorder: 'border border-primary/30',
    disabled: 'cursor-not-allowed opacity-50',
  },

  /** Hidden input */
  input: 'sr-only peer',

  /** Thumb (knob) */
  thumb: {
    base: [
      'inline-block',
      SizingTokens.square3,
      'transform rounded-full',
      'bg-neu-base shadow-neu-raised-sm',
      Interactive.Transition.transform,
    ].join(' '),
    checked: 'translate-x-4',
    unchecked: 'translate-x-0.5',
  },

  /** Track states */
  checked: Control.Toggle.checked,
  unchecked: Control.Toggle.unchecked,

  /** Label text */
  label: Control.Toggle.label,
} as const

// ============================================================================
// SLIDER STYLES
// ============================================================================

export const SliderStyles = {
  /** Container wrapper */
  container: [
    Layout.Position.relative,
    SizingTokens.wFull,
    SpacingTokens.py2,
  ].join(' '),

  /** Track background */
  trackBg: [
    Layout.Position.relative,
    SizingTokens.h2,
    SizingTokens.wFull,
    'overflow-hidden rounded-full',
    'bg-neu-base shadow-neu-pressed-sm',
  ].join(' '),

  /** Fill indicator */
  fill: [
    'absolute',
    SizingTokens.hFull,
    SizingTokens.wFull,
    'origin-left bg-primary',
  ].join(' '),

  /** Range input */
  input: [
    Control.Slider.track,
    Control.Slider.thumb,
    'focus-visible:outline-none',
  ].join(' '),
} as const

// ============================================================================
// INPUT STYLES (for CVA integration)
// ============================================================================

export const InputStyles = {
  /** Container wrapper */
  container: SizingTokens.wFull,

  /** Input wrapper (relative for icons) */
  wrapper: [
    Layout.Position.relative,
    SizingTokens.wFull,
  ].join(' '),

  /** Disabled compound variants */
  disabledErrorBorder: 'border-destructive/50',
  disabledSuccessBorder: 'border-success/50',
} as const

// ============================================================================
// TEXTAREA STYLES
// ============================================================================

export const TextareaStyles = {
  base: Form.Textarea.base,
  interactive: Form.Textarea.interactive,
  error: Form.Textarea.error,
  success: Form.Textarea.success,
} as const

// ============================================================================
// NUMBER INPUT STYLES
// ============================================================================

export const NumberInputStyles = {
  /** Container wrapper */
  container: SizingTokens.wFull,

  /** Input wrapper with flexbox */
  wrapper: [
    Layout.Position.relative,
    Layout.Flex.center,
  ].join(' '),
} as const
