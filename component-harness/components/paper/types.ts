import type { HTMLAttributes } from 'react'

export interface PaperRootProps extends HTMLAttributes<HTMLDivElement> {
  /** Depth of the inward press effect */
  depth?: 'sm' | 'md'
}

export interface PaperHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export interface PaperTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

export interface PaperDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

export interface PaperContentProps extends HTMLAttributes<HTMLDivElement> {}

export interface PaperFooterProps extends HTMLAttributes<HTMLDivElement> {}
