import { Layout, Overlay } from '../../styles'
import type { DrawerSide } from './types'

export const DrawerStyles = {
  backdrop: Overlay.Drawer.backdrop,
  header: Overlay.Drawer.header,
  title: Overlay.Drawer.title,
  portal: 'fixed inset-0 z-50',
  content: {
    base: 'fixed z-50 bg-neu-base shadow-neu-raised-lg flex flex-col',
  },
  scrollArea: 'flex-1 overflow-auto',
  scrollAreaPadded: 'flex-1 p-6',
  closeButton: 'ml-auto',
  closeIcon: Layout.Size.iconSm,
} as const

// Responsive drawer positions - full width on mobile with max constraint, fixed on tablet+
export const SIDE_POSITIONS: Record<DrawerSide, string> = {
  left: 'left-0 top-0 h-full w-full max-w-[calc(100vw-3rem)] md:w-80 md:max-w-none',
  right: 'right-0 top-0 h-full w-full max-w-[calc(100vw-3rem)] md:w-80 md:max-w-none',
  top: 'top-0 left-0 w-full h-auto max-h-[80vh] md:h-80 md:max-h-none',
  bottom: 'bottom-0 left-0 w-full h-auto max-h-[80vh] md:h-80 md:max-h-none',
}
