'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Button } from '@stackone-ui/core/button'
import { ScrollArea } from '@stackone-ui/core/scroll-area'
import { Drawer } from '@stackone-ui/core/drawer'
import { ThemeSwitcher } from '@stackone-ui/core/theme-switcher'
import { useIsMobile } from '@stackone-ui/core/hooks'
import { useTheme } from '@stackone-ui/core/providers'
import { cn } from '@stackone-ui/core/utils'
import { useTranslations, aria } from '@stackone/i18n'
import { componentRoutes, Routes } from '../routes'
import { LayoutStyles as S } from './styles'
import { GallerySidebarLogo } from './GallerySidebarLogo'

/** Sidebar navigation links */
interface SidebarNavProps {
  currentPath: string
  onNavigate?: () => void
}

function SidebarNav({ currentPath, onNavigate }: SidebarNavProps) {
  const isDesignTokens = currentPath === 'design-tokens'

  return (
    <nav className={S.nav}>
      {/* Design Tokens - Featured Section */}
      <Link
        href={Routes.designTokens}
        onClick={onNavigate}
        className={cn(
          S.navLink.base,
          'font-semibold',
          isDesignTokens ? S.navLink.active : S.navLink.inactive
        )}
      >
        Design Tokens
      </Link>

      {/* Separator */}
      <div className="my-2 border-t border-border" />

      {/* Component List */}
      {componentRoutes.map((route) => (
        <Link
          key={route.path}
          href={`/${route.path}`}
          onClick={onNavigate}
          className={cn(
            S.navLink.base,
            route.path === currentPath ? S.navLink.active : S.navLink.inactive
          )}
        >
          {route.name}
        </Link>
      ))}
    </nav>
  )
}

/** Gallery sidebar with desktop and mobile views */
export function GallerySidebar() {
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const { theme, toggle } = useTheme()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const t = useTranslations()

  // Extract component path from URL (remove leading slash)
  const currentPath = pathname.slice(1) || componentRoutes[0].path

  const handleMobileNavigation = () => {
    setSidebarOpen(false)
  }

  const openSidebar = () => {
    setSidebarOpen(true)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  return (
    <>
      {/* Desktop Sidebar - hidden on mobile */}
      <aside className={S.sidebar.desktop}>
        <ScrollArea className={S.sidebar.scrollArea}>
          <div className={S.sidebar.headerRow}>
            <GallerySidebarLogo />
            <h2 className={S.sidebar.title}>Components</h2>
            <ThemeSwitcher isDark={theme === 'dark'} onToggle={toggle} />
          </div>
          <SidebarNav currentPath={currentPath} />
        </ScrollArea>
      </aside>

      {/* Mobile Sidebar Drawer */}
      <Drawer
        open={sidebarOpen && isMobile}
        onClose={closeSidebar}
        title="Components"
        side="left"
      >
        <div className={S.sidebar.drawerHeaderRow}>
          <GallerySidebarLogo />
          <ThemeSwitcher isDark={theme === 'dark'} onToggle={toggle} />
        </div>
        <SidebarNav currentPath={currentPath} onNavigate={handleMobileNavigation} />
      </Drawer>

      {/* Mobile Menu Trigger */}
      <Button
        variant="secondary"
        size="md"
        className={S.sidebar.mobileTrigger}
        onClick={openSidebar}
        aria-label={t(aria.openNavigationMenu)}
      >
        <Menu className="h-5 w-5" />
      </Button>
    </>
  )
}
