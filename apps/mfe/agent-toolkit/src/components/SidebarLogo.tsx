'use client'

import Image from 'next/image'
import { Routes } from '@/routes'
import { SidebarLogoStyles as S } from './styles'

/**
 * Logo icon that links back to the shell homepage
 * Displays in a rounded container with glass effect
 */
export function SidebarLogo() {
  return (
    <a
      href={Routes.shell.home}
      className={S.container}
      aria-label="Go to homepage"
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
