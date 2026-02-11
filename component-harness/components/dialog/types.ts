import type { ReactNode, HTMLAttributes, ButtonHTMLAttributes } from 'react'

export interface DialogContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  blocking: boolean
}

export interface DialogRootProps {
  /** Controlled open state */
  open?: boolean
  /** Default open state for uncontrolled mode */
  defaultOpen?: boolean
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void
  /** When true, prevents closing via backdrop click or escape key (alert dialog behavior) */
  blocking?: boolean
  children: ReactNode
}

export interface DialogTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Render as child element instead of button */
  asChild?: boolean
}

export interface DialogPortalProps {
  children: ReactNode
}

export interface DialogBackdropProps extends HTMLAttributes<HTMLDivElement> {
  /** Whether clicks are blocked (for alert dialogs) */
  blocking?: boolean
}

export interface DialogPopupProps extends HTMLAttributes<HTMLDivElement> {
  'aria-labelledby'?: string
  'aria-describedby'?: string
}

export interface DialogHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export interface DialogTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

export interface DialogDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

export interface DialogFooterProps extends HTMLAttributes<HTMLDivElement> {}

export interface DialogCloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Render as child element instead of button */
  asChild?: boolean
}
