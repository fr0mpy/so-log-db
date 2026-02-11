import type { HTMLAttributes, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'

export type ToolbarOrientation = 'horizontal' | 'vertical'

export interface ToolbarRootProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: ToolbarOrientation
}

export interface ToolbarButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
}

export interface ToolbarSeparatorProps extends HTMLAttributes<HTMLDivElement> {}

export interface ToolbarGroupProps extends HTMLAttributes<HTMLDivElement> {}

export interface ToolbarLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {}
