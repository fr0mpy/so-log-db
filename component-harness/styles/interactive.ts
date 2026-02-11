/**
 * Interactive element styles.
 * Buttons, transitions, focus states, and disabled states.
 */

// ============================================================================
// TRANSITIONS
// ============================================================================

/** Shadow transition */
export const TRANSITION_SHADOW = 'transition-shadow duration-200'

/** Color transition */
export const TRANSITION_COLOR = 'transition-[background-color] duration-200 ease-neu'

/** Border color transition */
export const TRANSITION_BORDER = 'transition-[border-color] duration-200 ease-neu'

/** All properties transition */
export const TRANSITION_ALL = 'transition-all duration-200'

// ============================================================================
// FOCUS STATES
// ============================================================================

/** Focus visible - remove outline */
export const FOCUS_OUTLINE_NONE = 'focus-visible:outline-none'

/** Focus visible - neu shadow */
export const FOCUS_NEU = 'focus-visible:outline-none focus-visible:shadow-neu-focus'

/** Focus visible - ring style */
export const FOCUS_RING = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'

/** Focus visible - combined raised + focus shadow */
export const FOCUS_RAISED = 'focus-visible:outline-none focus-visible:shadow-[var(--shadow-raised),var(--shadow-focus)]'

// ============================================================================
// DISABLED STATES
// ============================================================================

/** Standard disabled state */
export const DISABLED_BASE = 'disabled:pointer-events-none disabled:opacity-50'

/** Disabled with cursor */
export const DISABLED_CURSOR = 'disabled:cursor-not-allowed disabled:opacity-50'

// ============================================================================
// BUTTON BASE STYLES
// ============================================================================

/** Icon button base (square, centered) */
export const ICON_BUTTON_BASE = [
  'flex items-center justify-center',
  'h-10 w-10 cursor-pointer',
  'bg-neu-base shadow-neu-raised',
  'text-foreground transition-shadow duration-200',
  'hover:shadow-neu-raised-lg active:shadow-neu-pressed-sm',
  'focus-visible:outline-none focus-visible:shadow-[var(--shadow-raised),var(--shadow-focus)]',
  'disabled:pointer-events-none disabled:opacity-50',
].join(' ')

/** Stepper button left (number input) */
export const STEPPER_BUTTON_LEFT = `${ICON_BUTTON_BASE} rounded-l-theme-lg`

/** Stepper button right (number input) */
export const STEPPER_BUTTON_RIGHT = `${ICON_BUTTON_BASE} rounded-r-theme-lg`

/** Ghost button hover state */
export const GHOST_HOVER = 'hover:bg-neu-base hover:shadow-neu-raised-sm'

/** Active press state */
export const ACTIVE_PRESS = 'active:shadow-neu-pressed-sm'

/** Active scale state */
export const ACTIVE_SCALE = 'active:scale-[0.98]'

// ============================================================================
// CLOSE BUTTON STYLES
// ============================================================================

/** Modal close button position */
export const CLOSE_BUTTON_POSITION = 'absolute right-4 top-4'

/** Close button size (icon only) */
export const CLOSE_BUTTON_SIZE = 'h-8 w-8 min-h-8 min-w-8 p-0'

// ============================================================================
// NAVIGATION BUTTON STYLES
// ============================================================================

/** Pagination/Nav button base */
export const NAV_BUTTON_BASE = [
  'inline-flex items-center justify-center gap-1',
  'h-9 px-3 rounded-theme-lg',
  'text-sm font-medium cursor-pointer',
  'bg-transparent text-foreground',
  'transition-all duration-200',
  'hover:bg-neu-base hover:shadow-neu-raised-sm',
  'active:shadow-neu-pressed-sm active:scale-[0.98]',
  'focus-visible:outline-none focus-visible:shadow-neu-focus',
  'disabled:pointer-events-none disabled:opacity-50',
].join(' ')

/** Pagination link button */
export const PAGINATION_LINK_BASE = [
  'inline-flex items-center justify-center',
  'min-h-11 min-w-11 h-9 w-9 rounded-theme-lg',
  'text-sm font-medium cursor-pointer',
  'transition-shadow duration-200',
  'focus-visible:outline-none focus-visible:shadow-neu-focus',
  'disabled:pointer-events-none disabled:opacity-50',
].join(' ')
