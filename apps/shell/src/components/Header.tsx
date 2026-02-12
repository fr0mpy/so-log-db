'use client'

import { ThemeSwitcher } from '@stackone-ui/core'
import { useTheme } from '@stackone-ui/core/providers'
import { Layout } from '@stackone-ui/core/styles'

const styles = {
  header: [
    Layout.Flex.between,
    'fixed top-0 left-0 right-0 z-50',
    'px-4 py-3',
  ].join(' '),
} as const

export function Header() {
  const { theme, toggle } = useTheme()

  return (
    <header className={styles.header}>
      <div />
      <ThemeSwitcher isDark={theme === 'dark'} onToggle={toggle} />
    </header>
  )
}
