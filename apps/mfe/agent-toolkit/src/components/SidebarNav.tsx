'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FileText, Search, Compass, type LucideIcon } from 'lucide-react'
import { useTranslations, navigation } from '@stackone/i18n'
import { cn } from '@stackone-ui/core/utils'
import { Routes, BASE_PATH } from '../routes'
import { useSidebar } from './SidebarContext'
import { SidebarNavStyles as S } from './styles'

/** Navigation items */
const NAV_ITEMS = [
  { href: Routes.logs.index, labelKey: navigation.logs, icon: FileText },
  { href: Routes.search, labelKey: navigation.search, icon: Search },
  { href: Routes.explore, labelKey: navigation.explore, icon: Compass },
] as const

interface NavItemProps {
  href: string
  icon: LucideIcon
  isActive: boolean
  isExpanded: boolean
  children: React.ReactNode
  'aria-label': string
}

function NavItem({
  href,
  icon: Icon,
  isActive,
  isExpanded,
  children,
  'aria-label': ariaLabel,
}: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        S.item.base,
        isExpanded ? S.item.widthExpanded : S.item.widthCollapsed,
        isActive ? S.item.active : S.item.inactive
      )}
      aria-label={ariaLabel}
      aria-current={isActive ? 'page' : undefined}
    >
      <Icon className={S.item.icon} strokeWidth={2.5} aria-hidden="true" />
      <span
        className={cn(
          S.item.label,
          isExpanded ? S.item.labelVisible : S.item.labelHidden
        )}
      >
        {children}
      </span>
    </Link>
  )
}

/**
 * Client-side sidebar navigation
 * Uses app-level context for expand state
 */
export function SidebarNav() {
  const pathname = usePathname()
  const t = useTranslations()
  const { isExpanded } = useSidebar()

  const isActive = (href: string) =>
    pathname === href || pathname === `${BASE_PATH}${href}`

  return (
    <nav className={S.nav}>
      {NAV_ITEMS.map((item) => (
        <NavItem
          key={item.href}
          icon={item.icon}
          href={item.href}
          isActive={isActive(item.href)}
          isExpanded={isExpanded}
          aria-label={t(item.labelKey)}
        >
          {t(item.labelKey)}
        </NavItem>
      ))}
    </nav>
  )
}
