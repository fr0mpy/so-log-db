'use client'

import { useTranslations } from 'next-intl'
import { Text } from '@stackone-ui/core/text'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@stackone-ui/core/tabs'
import { DesignViewer } from '../components/design-viewer'
import { screenA, screenB } from '../data/screens'
import { Routes } from '../routes'
import { PageStyles as S } from './styles'

export default function DesignReviewPage() {
  const t = useTranslations()

  return (
    <main className={S.main}>
      <header className={S.header}>
        <Text variant="h1">{t('designReview.title')}</Text>
        <a href={Routes.shell.home} className={S.backLink}>
          {t('navigation.dashboard')}
        </a>
      </header>

      <div className={S.content}>
        <Tabs defaultValue="screen-a">
          <TabsList>
            <TabsTrigger value="screen-a">{t('designReview.screenA')}</TabsTrigger>
            <TabsTrigger value="screen-b">{t('designReview.screenB')}</TabsTrigger>
          </TabsList>

          <TabsContent value="screen-a" className={S.tabContent}>
            <DesignViewer screen={screenA} />
          </TabsContent>

          <TabsContent value="screen-b" className={S.tabContent}>
            <DesignViewer screen={screenB} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
