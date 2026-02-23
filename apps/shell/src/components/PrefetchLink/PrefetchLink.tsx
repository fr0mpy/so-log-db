'use client'

import { usePrefetch } from '@/hooks'

interface PrefetchLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: React.ReactNode
}

/**
 * Anchor link with MFE prefetch on hover/focus.
 * Use for cross-zone navigation where Next.js <Link> doesn't work.
 */
export function PrefetchLink({ href, children, ...props }: PrefetchLinkProps) {
  const prefetchHandlers = usePrefetch(href)

  return (
    <a href={href} {...prefetchHandlers} {...props}>
      {children}
    </a>
  )
}
