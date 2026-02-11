/**
 * Overlay component styles.
 * Modal, Dialog, Drawer, and Card patterns.
 */

// ============================================================================
// BACKDROP STYLES
// ============================================================================

/** Dialog backdrop */
export const DIALOG_BACKDROP = 'fixed inset-0 z-modal bg-foreground/80 backdrop-blur-sm'

/** Drawer backdrop */
export const DRAWER_BACKDROP = 'fixed inset-0 bg-foreground/60 backdrop-blur-sm'

// ============================================================================
// MODAL CONTAINER STYLES
// ============================================================================

/** Modal portal container (centers content) */
export const MODAL_PORTAL = 'fixed inset-0 z-modal flex items-center justify-center p-4'

/** Dialog popup container */
export const DIALOG_CONTENT = [
  'relative z-modal w-full max-w-lg rounded-theme-xl p-6',
  'bg-neu-base shadow-neu-raised-lg',
].join(' ')

// ============================================================================
// MODAL HEADER/FOOTER STYLES
// ============================================================================

/** Dialog header */
export const DIALOG_HEADER = 'flex flex-col space-y-1.5 pb-4'

/** Dialog footer */
export const DIALOG_FOOTER = 'flex items-center justify-end gap-2 pt-4'

/** Drawer header */
export const DRAWER_HEADER = 'flex items-center justify-between p-6'

// ============================================================================
// MODAL TYPOGRAPHY
// ============================================================================

/** Modal/Card title */
export const MODAL_TITLE = 'font-heading text-lg font-semibold text-foreground'

/** Modal/Card description */
export const MODAL_DESCRIPTION = 'text-sm text-muted-foreground'

// ============================================================================
// CARD STYLES
// ============================================================================

/** Card container */
export const CARD_CONTAINER = [
  'rounded-theme-xl bg-neu-base shadow-neu-raised',
  'transition-shadow duration-200 ease-neu',
].join(' ')

/** Card header */
export const CARD_HEADER = 'flex flex-col space-y-1.5 p-6'

/** Card content */
export const CARD_CONTENT = 'p-6 pt-0'

/** Card footer */
export const CARD_FOOTER = 'flex items-center p-6 pt-0'

// ============================================================================
// PAPER STYLES
// ============================================================================

/** Paper container base */
export const PAPER_BASE = 'rounded-theme-xl bg-neu-base'

/** Paper elevated */
export const PAPER_ELEVATED = 'rounded-theme-xl bg-neu-base shadow-neu-raised'

/** Paper inset */
export const PAPER_INSET = 'rounded-theme-xl bg-neu-base shadow-neu-pressed-sm'
