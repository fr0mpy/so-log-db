'use client'

import Image from 'next/image'
import { useTranslations, aria } from '@stackone/i18n'
import { Routes } from '@/routes'
import { LogoStyles as S } from './styles'

export function Logo() {
  const t = useTranslations()

  return (
    <a href={Routes.shell.home} className={S.container} aria-label={t(aria.goToHomepage)}>
      <Image
        src="/design-review/favicon.png"
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
