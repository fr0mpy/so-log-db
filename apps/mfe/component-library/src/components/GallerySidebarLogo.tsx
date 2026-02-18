'use client'

import Image from 'next/image'
import { Routes } from '../routes'
import { GallerySidebarLogoStyles as S } from './styles'

/**
 * Logo icon that links back to the shell homepage
 * Displays in a rounded container with glass effect
 */
export function GallerySidebarLogo() {
  return (
    <a
      href={Routes.shell.home}
      className={S.container}
      aria-label="Go to homepage"
    >
      <Image
        src="/component-library/favicon.png"
        alt="StackOne Logo"
        width={24}
        height={24}
        className={S.image}
        priority
      />
    </a>
  )
}
