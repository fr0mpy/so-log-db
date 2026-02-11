import { Layout, Overlay, Interactive } from '../../styles'

export const DialogStyles = {
  backdrop: Overlay.Dialog.backdrop,
  backdropBlocking: 'cursor-not-allowed',
  portal: Overlay.Dialog.portal,
  content: Overlay.Dialog.content,
  header: Overlay.Dialog.header,
  title: Overlay.Dialog.title,
  description: Overlay.Dialog.description,
  footer: Overlay.Dialog.footer,
  closeButton: [
    Interactive.CloseButton.position,
    Interactive.CloseButton.size,
  ].join(' '),
  closeIcon: Layout.Size.iconSm,
} as const
