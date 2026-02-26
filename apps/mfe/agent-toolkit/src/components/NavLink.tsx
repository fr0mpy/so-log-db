'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@stackone-ui/core/utils'
import { NavLinkStyles } from './styles'
import { BASE_PATH } from '../routes'

interface NavLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

export function NavLink({ href, children, className }: NavLinkProps) {
  const pathname = usePathname()
  // Check both with and without basePath (pathname may include basePath in some contexts)
  const isActive = pathname === href || pathname === `${BASE_PATH}${href}`

  return (
    <Link
      href={href}
      prefetch={false}
      className={cn(
        NavLinkStyles.base,
        isActive ? NavLinkStyles.active : NavLinkStyles.inactive,
        className,
      )}
    >
      {children}
    </Link>
  )
}
