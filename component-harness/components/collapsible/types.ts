import type { HTMLAttributes, ButtonHTMLAttributes } from 'react'

export interface CollapsibleContextValue {
  open: boolean
  setOpen: (open: boolean) => void
}

export interface CollapsibleRootProps extends HTMLAttributes<HTMLDivElement> {
  /** Default open state */
  defaultOpen?: boolean
  /** Controlled open state */
  open?: boolean
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void
}

export interface CollapsibleTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Render as child element instead of button */
  asChild?: boolean
}

export interface CollapsibleContentProps extends HTMLAttributes<HTMLDivElement> {}
