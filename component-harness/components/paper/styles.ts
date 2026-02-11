import { Overlay } from '../../styles'

export const PaperStyles = {
  root: {
    base: Overlay.Paper.base,
    inset: Overlay.Paper.inset,
    effects: 'shadow-neu-pressed transition-shadow duration-200 ease-neu',
  },
  header: Overlay.Card.header,
  title: Overlay.Card.title,
  description: Overlay.Card.description,
  content: Overlay.Card.content,
  footer: Overlay.Card.footer,
} as const
