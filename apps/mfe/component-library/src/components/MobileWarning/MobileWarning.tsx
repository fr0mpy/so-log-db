'use client'

import { MobileWarning as MobileWarningBase } from '@stackone-ui/core/mobile-warning'
import { useTranslations, mobileWarning } from '@stackone/i18n'

export function MobileWarning() {
  const t = useTranslations()

  return (
    <MobileWarningBase
      title={t(mobileWarning.title)}
      description={t(mobileWarning.description)}
      dismissLabel={t(mobileWarning.dismiss)}
      showClose={false}
    />
  )
}
