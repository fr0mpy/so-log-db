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
    'outline-none',
    Interactive.Disabled.base,
  ].join(' '),

  /** Loading state modifier */
  loading: 'flex-col py-2',

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

  /** Size variants */
  sizes: {
    sm: [
      SizingTokens.h9,
      SpacingTokens.px3,
      TypographyTokens.textSm,
      'rounded-theme-lg',
      SizingTokens.minTouch,
    ].join(' '),
    md: [
      SizingTokens.h10,
      SpacingTokens.px5,
      TypographyTokens.textSm,
      'rounded-theme-xl',
      SizingTokens.minTouch,
    ].join(' '),
    lg: [
      SizingTokens.h12,
      SpacingTokens.px6,
      TypographyTokens.textBase,
      'rounded-theme-xl',
      SizingTokens.minTouch,
    ].join(' '),
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
    outline: [
      'bg-neu-base text-foreground',
      'shadow-neu-raised',
      'hover:shadow-neu-raised-lg',
      'active:shadow-neu-pressed-sm',
      'focus-visible:shadow-[var(--shadow-raised),var(--shadow-focus)]',
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

  /** Checkbox input */
  input: [
    SizingTokens.square4,
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
