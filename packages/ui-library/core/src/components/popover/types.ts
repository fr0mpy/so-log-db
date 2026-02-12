import type { Side } from '../../hooks'

export interface PopoverRootProps {
  children: React.ReactNode
  /** Controlled open state */
  open?: boolean
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void
  /** Default open state for uncontrolled mode */
  defaultOpen?: boolean
}

export interface PopoverTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Render as child element instead of button */
  asChild?: boolean
  children: React.ReactNode
  ref?: React.Ref<HTMLButtonElement>
}

export interface PopoverPortalProps {
  children: React.ReactNode
  /** Container element for the portal */
  container?: HTMLElement
}

export interface PopoverPositionerProps {
  children: React.ReactNode
  /** Which side to position the popover on */
  side?: Side
  className?: string
}

export interface PopoverPopupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  ref?: React.Ref<HTMLDivElement>
}

export interface PopoverArrowProps {
  className?: string
}

export interface PopoverCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Render as child element instead of button */
  asChild?: boolean
  children?: React.ReactNode
  ref?: React.Ref<HTMLButtonElement>
}

export interface PopoverContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  triggerRef: React.RefObject<HTMLButtonElement | null>
  side: Side
  setSide: (side: Side) => void
}
