'use client'

import Image from 'next/image'
import { useTranslations, aria } from '@stackone/i18n'
import { Routes } from '@/routes'
import { SidebarLogoStyles as S } from './styles'

/**
 * Logo icon that links back to the shell homepage
 * Displays in a rounded container with glass effect
 */
export function SidebarLogo() {
  const t = useTranslations()

  return (
    <a
      href={Routes.shell.home}
      className={S.container}
      aria-label={t(aria.goToHomepage)}
    >
      <Image
        src="/agent-toolkit/favicon.png"
        alt="StackOne Logo"
        width={24}
        height={24}
        className={S.image}
        priority
        unoptimized
      />
    </a>
  )
}
