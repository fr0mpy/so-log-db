import type { HTMLAttributes, ButtonHTMLAttributes } from 'react'

export interface PaginationRootProps extends HTMLAttributes<HTMLElement> {}

export interface PaginationContentProps extends HTMLAttributes<HTMLUListElement> {}

export interface PaginationItemProps extends HTMLAttributes<HTMLLIElement> {}

export interface PaginationLinkProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean
}

export interface PaginationPreviousProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export interface PaginationNextProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export interface PaginationEllipsisProps extends HTMLAttributes<HTMLSpanElement> {}
