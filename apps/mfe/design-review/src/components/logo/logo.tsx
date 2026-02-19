'use client'

import Image from 'next/image'
import { Routes } from '@/routes'
import { LogoStyles as S } from './styles'

export function Logo() {
  return (
    <a href={Routes.shell.home} className={S.container} aria-label="Back to home">
      <Image
        src="/design-review/logo.png"
        alt=""
        width={24}
        height={24}
        className={S.image}
        priority
      />
    </a>
  )
}
