import type { Side } from '../../hooks'

export interface HoverCardRootProps {
  children: React.ReactNode
  /** Controlled open state */
  open?: boolean
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void
  /** Default open state for uncontrolled mode */
  defaultOpen?: boolean
  /** Delay before showing (ms) */
  openDelay?: number
  /** Delay before hiding (ms) */
  closeDelay?: number
}

export interface HoverCardTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Render as child element instead of div wrapper */
  asChild?: boolean
  children: React.ReactNode
  ref?: React.Ref<HTMLDivElement>
}

export interface HoverCardPortalProps {
  children: React.ReactNode
  /** Container element for the portal */
  container?: HTMLElement
}

export interface HoverCardPositionerProps {
  children: React.ReactNode
  /** Which side to position the hover card on */
  side?: Side
  className?: string
}

export interface HoverCardPopupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  ref?: React.Ref<HTMLDivElement>
}

export interface HoverCardArrowProps {
  className?: string
}

export interface HoverCardContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  triggerRef: React.RefObject<HTMLElement | null>
  side: Side
  setSide: (side: Side) => void
  openDelay: number
  closeDelay: number
}
