/**
 * Layout and structural style constants.
 * Common flex patterns, spacing, and positioning utilities.
 */

// ============================================================================
// FLEX PATTERNS
// ============================================================================

/** Flex with centered items */
export const FLEX_CENTER = 'flex items-center'

/** Flex with centered items and justified center */
export const FLEX_CENTER_BOTH = 'flex items-center justify-center'

/** Inline-flex with centered items and justified center */
export const INLINE_FLEX_CENTER = 'inline-flex items-center justify-center'

/** Flex with space-between */
export const FLEX_BETWEEN = 'flex items-center justify-between'

/** Flex column */
export const FLEX_COL = 'flex flex-col'

/** Flex column with standard gap */
export const FLEX_COL_GAP = 'flex flex-col space-y-1.5'

// ============================================================================
// SPACING
// ============================================================================

/** Standard component padding */
export const PADDING_STANDARD = 'p-6'

/** Compact component padding */
export const PADDING_COMPACT = 'p-4'

/** Input field padding */
export const PADDING_INPUT = 'px-3 py-2'

/** No top padding (for content after header) */
export const PADDING_NO_TOP = 'pt-0'

// ============================================================================
// POSITIONING
// ============================================================================

/** Absolute center vertically */
export const ABSOLUTE_CENTER_Y = 'absolute top-1/2 -translate-y-1/2'

/** Fixed full screen */
export const FIXED_INSET = 'fixed inset-0'

/** Relative positioning */
export const RELATIVE = 'relative'

// ============================================================================
// SIZE PATTERNS
// ============================================================================

/** Standard icon size (small) */
export const ICON_SIZE_SM = 'h-4 w-4'

/** Standard icon size (medium) */
export const ICON_SIZE_MD = 'h-5 w-5'

/** Touch target minimum size */
export const TOUCH_TARGET = 'min-h-11 min-w-11'

/** Square button (icon only) */
export const SQUARE_BUTTON = 'h-10 w-10'

/** Standard input height */
export const INPUT_HEIGHT = 'h-10'
