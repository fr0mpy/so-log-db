'use client'

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@stackone-ui/core/tabs'
import { Text } from '@stackone-ui/core/text'
import { PageStyles as S } from './styles'
import { DesignViewer } from '../components/design-viewer'
import { Logo } from '../components/logo'
import { screenA, screenB } from '../data/screens'

interface DesignReviewClientProps {
  translations: {
    title: string
    overview: string
    screenA: string
    screenB: string
    overviewContent: string
  }
}

export function DesignReviewClient({ translations }: DesignReviewClientProps) {
  return (
    <main className={S.main}>
      <Tabs defaultValue="overview">
        <div className={S.stickyHeader}>
          <header className={S.header}>
            <Logo />
            <Text variant="h3">{translations.title}</Text>
          </header>
          <TabsList className={S.tabsList}>
            <TabsTrigger value="overview">{translations.overview}</TabsTrigger>
            <TabsTrigger value="screen-a">{translations.screenA}</TabsTrigger>
            <TabsTrigger value="screen-b">{translations.screenB}</TabsTrigger>
          </TabsList>
          <div className={S.headerSpacer} />
        </div>

        <div className={S.content}>
          <TabsContent value="overview" className={S.overviewContent}>
            <Text variant="body1">{translations.overviewContent}</Text>
          </TabsContent>

          <TabsContent value="screen-a" className={S.tabContent}>
            <DesignViewer screen={screenA} />
          </TabsContent>

          <TabsContent value="screen-b" className={S.tabContent}>
            <DesignViewer screen={screenB} />
          </TabsContent>
        </div>
      </Tabs>
    </main>
  )
}
