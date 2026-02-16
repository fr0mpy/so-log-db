'use client'

import { ThemeSwitcher } from '@stackone-ui/core/theme-switcher'
import { useTheme } from '@stackone-ui/core/providers'
import { useSidebar } from './SidebarContext'

/**
 * Theme toggle for sidebar - responsive to sidebar expand state
 * Shows compact icon-only mode when collapsed, full toggle when expanded
 */
export function SidebarThemeToggle() {
  const { theme, toggle } = useTheme()
  const { isExpanded } = useSidebar()

  return (
    <ThemeSwitcher
      isDark={theme === 'dark'}
      onToggle={toggle}
      compact={!isExpanded}
    />
  )
}
