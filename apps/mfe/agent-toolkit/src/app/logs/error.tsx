'use client'

import { useEffect } from 'react'
import { Button } from '@stackone-ui/core/button'
import { Text } from '@stackone-ui/core/text'
import { useTranslations } from '@stackone/i18n'
import { error as errorKeys } from '@stackone/i18n'
import { ErrorStyles as S } from './styles'

export default function LogsError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const t = useTranslations()

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div role="alert" className={S.container}>
      <Text variant="h2">{t(errorKeys.title)}</Text>
      <Text variant="body1" className={S.description}>
        {t(errorKeys.description)}
      </Text>
      <Button onClick={reset} variant="primary">
        {t(errorKeys.tryAgain)}
      </Button>
    </div>
  )
}
