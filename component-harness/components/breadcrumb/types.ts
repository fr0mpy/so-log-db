import type { HTMLAttributes, AnchorHTMLAttributes } from 'react'

export interface BreadcrumbRootProps extends HTMLAttributes<HTMLElement> {}

export interface BreadcrumbListProps extends HTMLAttributes<HTMLOListElement> {}

export interface BreadcrumbItemProps extends HTMLAttributes<HTMLLIElement> {}

export interface BreadcrumbLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {}

export interface BreadcrumbSeparatorProps extends HTMLAttributes<HTMLLIElement> {}

export interface BreadcrumbPageProps extends HTMLAttributes<HTMLSpanElement> {}
