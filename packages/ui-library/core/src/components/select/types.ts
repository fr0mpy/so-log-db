import type { ReactNode, Ref } from 'react'

export interface SelectOption {
  value: string
  label: string
}

export type SelectTriggerMode = 'click' | 'hover'
export type SelectWidth = 'full' | 'auto'
export type SelectPlacement = 'bottom' | 'top'

export interface SelectRootProps {
  children: ReactNode
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  searchable?: boolean
  triggerMode?: SelectTriggerMode
  width?: SelectWidth
  placement?: SelectPlacement
}

export interface SelectTriggerProps {
  children?: ReactNode
  className?: string
  placeholder?: string
  ref?: Ref<HTMLButtonElement>
}

export interface SelectValueProps {
  placeholder?: string
}

export interface SelectIconProps {
  className?: string
}

export interface SelectPortalProps {
  children: ReactNode
}

export interface SelectPositionerProps {
  children: ReactNode
}

export interface SelectPopupProps {
  children: ReactNode
  className?: string
  ref?: Ref<HTMLDivElement>
}

export interface SelectOptionProps {
  value: string
  children: ReactNode
  className?: string
  ref?: Ref<HTMLButtonElement>
}

export interface SelectSearchProps {
  placeholder?: string
  className?: string
}

export interface SelectContextValue {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  value: string
  setValue: (value: string) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  triggerRef: React.RefObject<HTMLButtonElement | null>
  dropdownRef: React.RefObject<HTMLDivElement | null>
  dropdownPosition: { top: number; left: number; minWidth: number }
  lockedPositionRef: React.RefObject<{ top: number; left: number; minWidth: number } | null>
  disabled?: boolean
  searchable?: boolean
  triggerMode: SelectTriggerMode
  width: SelectWidth
  placement: SelectPlacement
}
