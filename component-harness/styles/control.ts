/**
 * Shared styles for control components (Checkbox, Switch, Radio, Slider).
 * These components share common state patterns for checked/unchecked states.
 */

/** Base styles for toggle controls (checkbox, switch, radio) */
export const CONTROL_BASE = [
  'cursor-pointer appearance-none',
  'bg-neu-base border border-primary/30',
  'transition-all duration-200',
].join(' ')

/** Unchecked state shadow for controls */
export const CONTROL_UNCHECKED = 'shadow-neu-control-unchecked-inline'

/** Checked state styles for controls (without prefix) */
export const CONTROL_CHECKED = 'bg-primary shadow-neu-control-checked-inline'

/** Checked state with CSS selector prefix (for checkbox/radio) */
export const CONTROL_CHECKED_STATE = 'checked:bg-primary checked:shadow-neu-control-checked-inline'

/** Disabled state for controls */
export const CONTROL_DISABLED = 'disabled:cursor-not-allowed disabled:opacity-50'

/** Focus visible state for controls */
export const CONTROL_FOCUS = 'focus-visible:outline-none focus-visible:shadow-[var(--shadow-pressed-sm),var(--shadow-focus)]'

/** Complete unchecked control styles */
export const CONTROL_UNCHECKED_FULL = [
  CONTROL_BASE,
  CONTROL_UNCHECKED,
].join(' ')

/** Slider thumb styles for WebKit browsers */
export const SLIDER_THUMB_WEBKIT = [
  '[&::-webkit-slider-thumb]:appearance-none',
  '[&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5',
  '[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-neu-base',
  '[&::-webkit-slider-thumb]:shadow-neu-raised [&::-webkit-slider-thumb]:cursor-pointer',
  '[&::-webkit-slider-thumb]:transition-shadow [&::-webkit-slider-thumb]:duration-200',
  '[&::-webkit-slider-thumb]:hover:shadow-neu-raised-lg',
  '[&::-webkit-slider-thumb]:active:shadow-neu-pressed-sm',
].join(' ')

/** Slider thumb styles for Mozilla browsers */
export const SLIDER_THUMB_MOZ = [
  '[&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5',
  '[&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-neu-base',
  '[&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-neu-raised',
  '[&::-moz-range-thumb]:cursor-pointer',
].join(' ')

/** Combined slider thumb styles for all browsers */
export const SLIDER_THUMB = `${SLIDER_THUMB_WEBKIT} ${SLIDER_THUMB_MOZ}`

/** Slider track base styles */
export const SLIDER_TRACK_BASE = [
  'absolute left-0 right-0 top-1/2 -translate-y-1/2',
  'h-5 w-full cursor-pointer appearance-none bg-transparent',
].join(' ')

/** Label styles for controls */
export const CONTROL_LABEL = 'text-sm font-medium text-foreground cursor-pointer select-none'
