import type { HTMLAttributes, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'

export interface NavigationRootProps extends HTMLAttributes<HTMLElement> {}

export interface NavigationListProps extends HTMLAttributes<HTMLUListElement> {}

export interface NavigationItemProps extends HTMLAttributes<HTMLLIElement> {
  hasDropdown?: boolean
}

export interface NavigationTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export interface NavigationContentProps extends HTMLAttributes<HTMLDivElement> {}

export interface NavigationLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {}
