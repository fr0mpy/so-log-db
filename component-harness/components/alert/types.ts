import type { HTMLAttributes } from 'react'

export type AlertVariant = 'info' | 'success' | 'warning' | 'destructive'

export interface AlertRootProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant
}

export interface AlertIconProps {
  variant: AlertVariant
  className?: string
}

export interface AlertTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

export interface AlertDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}
