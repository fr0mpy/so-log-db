/**
 * Shared Tailwind class strings for form input components.
 * Used by Input, Textarea, NumberInput, and Select components.
 */

/** Base styles shared by all text-like inputs */
export const FORM_INPUT_BASE = [
  'flex w-full rounded-theme-lg px-3 py-2',
  'bg-neu-base shadow-neu-pressed-sm',
  'text-sm text-foreground placeholder:text-muted-foreground',
  'transition-[border-color,box-shadow] duration-200 ease-neu',
  'border border-transparent',
  'focus:outline-none',
  'disabled:cursor-not-allowed disabled:opacity-50',
].join(' ')

/** Hover state for inputs */
export const FORM_INPUT_HOVER = 'hover:shadow-neu-pressed hover:border-primary'

/** Focus state for inputs */
export const FORM_INPUT_FOCUS = 'focus:shadow-neu-pressed focus:border-primary'

/** Error state for inputs */
export const FORM_INPUT_ERROR = 'border-destructive'

/** Success state for inputs */
export const FORM_INPUT_SUCCESS = 'border-success'

/** Standard height for single-line inputs */
export const FORM_INPUT_HEIGHT = 'h-10'

/** Label styles */
export const FORM_LABEL = 'block text-sm font-medium text-foreground mb-1.5'

/** Helper text styles */
export const FORM_HELPER_TEXT = 'mt-1.5 text-xs'

/** Helper text error variant */
export const FORM_HELPER_ERROR = 'text-destructive'

/** Helper text success variant */
export const FORM_HELPER_SUCCESS = 'text-success'

/** Helper text default variant */
export const FORM_HELPER_DEFAULT = 'text-muted-foreground'

/**
 * Compose input classes based on state
 */
export function getInputClasses(options: {
  hasError?: boolean
  hasSuccess?: boolean
  className?: string
}): string {
  const { hasError, hasSuccess, className } = options

  return [
    FORM_INPUT_BASE,
    FORM_INPUT_HEIGHT,
    !hasError && !hasSuccess && FORM_INPUT_HOVER,
    FORM_INPUT_FOCUS,
    hasError && FORM_INPUT_ERROR,
    hasSuccess && FORM_INPUT_SUCCESS,
    className,
  ]
    .filter(Boolean)
    .join(' ')
}

// ============================================================================
// NUMBER INPUT SPECIFIC
// ============================================================================

/** Number input field (no border radius, centered text) */
export const NUMBER_INPUT_FIELD = [
  'flex h-10 w-full px-3 py-2',
  'bg-neu-base shadow-neu-pressed-sm',
  'text-sm text-foreground text-center placeholder:text-muted-foreground',
  'transition-[border-color] duration-200 ease-neu',
  'border-y border-transparent',
  'focus:outline-none',
  'disabled:cursor-not-allowed disabled:opacity-50',
  // Hide spin buttons
  '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
].join(' ')

/** Number input with hover/focus (no error/success) */
export const NUMBER_INPUT_INTERACTIVE = 'hover:shadow-neu-pressed hover:border-primary focus:shadow-neu-pressed focus:border-primary'

/** Number input error state */
export const NUMBER_INPUT_ERROR = 'border-destructive hover:shadow-neu-pressed focus:shadow-neu-pressed'

/** Number input success state */
export const NUMBER_INPUT_SUCCESS = 'border-success hover:shadow-neu-pressed focus:shadow-neu-pressed'

// ============================================================================
// TEXTAREA SPECIFIC
// ============================================================================

/** Textarea base (min height, resize) */
export const TEXTAREA_BASE = [
  FORM_INPUT_BASE,
  'min-h-[80px] resize-y',
].join(' ')

// ============================================================================
// LABEL VARIATIONS
// ============================================================================

/** Label with tracking (NumberInput style) */
export const FORM_LABEL_TRACKING = 'mb-1.5 block font-body text-sm font-medium tracking-wide text-foreground'

// ============================================================================
// HELPER TEXT UTILITIES
// ============================================================================

/**
 * Get helper text classes based on state
 */
export function getHelperTextClasses(options: {
  hasError?: boolean
  hasSuccess?: boolean
}): string {
  const { hasError, hasSuccess } = options

  return [
    FORM_HELPER_TEXT,
    hasError ? FORM_HELPER_ERROR : hasSuccess ? FORM_HELPER_SUCCESS : FORM_HELPER_DEFAULT,
  ].join(' ')
}
