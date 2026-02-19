'use client'

import { useTranslations } from 'next-intl'
import { Paper } from '@stackone-ui/core/paper'
import { Text } from '@stackone-ui/core/text'
import { HomeStyles as S } from './styles'
import { Routes } from '../lib/routes'

export default function HomePage() {
  const t = useTranslations()

  return (
    <main className={S.main}>
      <nav className={S.nav}>
        <Paper className={S.paper}>
          <Paper.Header>
            <Paper.Title>
              <a href={Routes.designReview} className={S.link}>
                {t('navigation.designReview')}
              </a>
            </Paper.Title>
            <Paper.Description>
              <Text color="muted">{t('home.designReviewDescription')}</Text>
            </Paper.Description>
          </Paper.Header>
        </Paper>

        <Paper className={S.paper}>
          <Paper.Header>
            <Paper.Title>
              <a href={Routes.agentToolkit} className={S.link}>
                {t('navigation.agentToolkit')}
              </a>
            </Paper.Title>
            <Paper.Description>
              <Text color="muted">{t('home.agentToolkitDescription')}</Text>
            </Paper.Description>
          </Paper.Header>
        </Paper>

        <Paper className={S.paper}>
          <Paper.Header>
            <Paper.Title>
              <a href={Routes.componentLibrary} className={S.link}>
                {t('navigation.componentLibrary')}
              </a>
            </Paper.Title>
            <Paper.Description>
              <Text color="muted">{t('home.componentLibraryDescription')}</Text>
            </Paper.Description>
          </Paper.Header>
        </Paper>

        <Paper className={S.paper}>
          <Paper.Header>
            <Paper.Title>
              <a
                href={Routes.github}
                target="_blank"
                rel="noopener noreferrer"
                className={S.link}
              >
                {t('navigation.github')}
              </a>
            </Paper.Title>
            <Paper.Description>
              <Text color="muted">{t('home.githubDescription')}</Text>
            </Paper.Description>
          </Paper.Header>
        </Paper>
      </nav>
    </main>
  )
}
