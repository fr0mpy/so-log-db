'use client'

import { useTranslations, aria } from '@stackone/i18n'
import { SIDENAV_DIMENSIONS } from '@stackone-ui/core/sidenav'
import { SidebarNav } from './SidebarNav'
import { SidebarThemeToggle } from './SidebarThemeToggle'
import { useSidebar } from './SidebarContext'
import { SidebarStyles as S } from './styles'

/**
 * Composed sidebar component for the agent-toolkit MFE
 * Uses app-level context for state sharing with MainContent
 *
 * Animation: Uses CSS width transition to preserve neumorphic shadow.
 * Width changes trigger reflow but shadow remains visible when collapsed.
 */
export function Sidebar() {
  const { isExpanded, expand, collapse } = useSidebar()
  const t = useTranslations()

  return (
    <aside
      className={S.root}
      style={{
        width: isExpanded ? SIDENAV_DIMENSIONS.expanded : SIDENAV_DIMENSIONS.collapsed,
      }}
      onMouseEnter={expand}
      onMouseLeave={collapse}
      role="navigation"
      aria-label={t(aria.mainNavigation)}
    >
      <div className={S.header}>
        <SidebarThemeToggle />
      </div>

      <SidebarNav />
    </aside>
  )
}
