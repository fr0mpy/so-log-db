'use client'

import Image from 'next/image'
import { Routes } from '@/routes'
import { LogoStyles as S } from './styles'

export function Logo() {
  return (
    <a href={Routes.shell.home} className={S.container} aria-label="Go to homepage">
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
