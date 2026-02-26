'use client'

import { useState } from 'react'
import { Settings } from 'lucide-react'
import { Select } from '@stackone-ui/core/select'
import { SIDENAV_DIMENSIONS } from '@stackone-ui/core/sidenav'
import { cn } from '@stackone-ui/core/utils'
import { useTranslations, aria, navigation } from '@stackone/i18n'
import { SettingsDialogLazy as SettingsDialog } from './SettingsDialogLazy'
import { useSidebar } from './SidebarContext'
import { SidebarLogo } from './SidebarLogo'
import { SidebarNav } from './SidebarNav'
import { SidebarStyles as S } from './styles'

const PROJECTS = [
  { value: 'project-a', label: 'Project A' },
  { value: 'project-b', label: 'Project B' },
  { value: 'project-c', label: 'Project C' },
]

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
  const [selectedProject, setSelectedProject] = useState<string>('project-a')
  const [settingsOpen, setSettingsOpen] = useState(false)

  const labelClasses = cn(
    S.footerLabel,
    isExpanded ? S.footerLabelVisible : S.footerLabelHidden,
  )

  return (
    /* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions -- aside expands on hover for UX, not an interactive control */
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
        <div className={S.headerRow}>
          <SidebarLogo />
          <div
            className={S.projectSelector}
            style={{ opacity: isExpanded ? 1 : 0, pointerEvents: isExpanded ? 'auto' : 'none' }}
          >
            <Select
              options={PROJECTS}
              value={selectedProject}
              onValueChange={setSelectedProject}
              triggerMode="hover"
              width="full"
              placeholder="Select project"
              className={S.projectTrigger}
            />
          </div>
        </div>
      </div>

      <SidebarNav />

      <div className={S.footer}>
        <button
          className={S.footerItem}
          aria-label={t(aria.settings)}
          onClick={() => setSettingsOpen(true)}
        >
          <Settings className={S.footerIcon} />
          <span className={labelClasses}>{t(navigation.settings)}</span>
        </button>
      </div>

      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
    </aside>
  )
}
