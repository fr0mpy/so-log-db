'use client'

import Image from 'next/image'
import { LogoStyles as S } from './styles'

export function Logo() {
  return (
    <div className={S.container} aria-hidden="true">
      <Image
        src="/design-review/logo.png"
        alt=""
        width={24}
        height={24}
        className={S.image}
        priority
      />
    </div>
  )
}
