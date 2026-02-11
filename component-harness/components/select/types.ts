import type { ReactNode } from 'react'

export interface SelectOption {
  value: string
  label: string
}

export interface SelectRootProps {
  children: ReactNode
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  searchable?: boolean
}

export interface SelectTriggerProps {
  children?: ReactNode
  className?: string
  placeholder?: string
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
}

export interface SelectOptionProps {
  value: string
  children: ReactNode
  className?: string
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
  triggerRef: React.RefObject<HTMLButtonElement>
  dropdownRef: React.RefObject<HTMLDivElement>
  dropdownPosition: { top: number; left: number; width: number }
  disabled?: boolean
  searchable?: boolean
}
