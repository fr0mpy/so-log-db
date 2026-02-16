/**
 * Data Exploration
 *
 * Data Strategy: REST only
 * Drill into records, traces, and detailed data views
 */

export { metadata } from './metadata'

import { getTranslations, explore, status } from '@stackone/i18n'
import {
  PageHeader,
  Card,
  Grid,
  ListItem,
  Badge,
  Text,
  InfoBox,
  Layout,
  Spacing,
} from '../../styles'

export default async function ExplorePage() {
  const t = await getTranslations()

  return (
    <div>
      <header className={PageHeader.container}>
        <h1 className={PageHeader.title}>{t(explore.title)}</h1>
        <p className={PageHeader.description}>
          {t(explore.description)}
        </p>
      </header>

      <div className={Grid.cols2}>
        <div className={Card.padded}>
          <h2 className={Text.h2}>{t(explore.traces.title)}</h2>
          <p className={[Text.muted, Spacing.mb4].join(' ')}>
            {t(explore.traces.description)}
          </p>
          <div className={Spacing.spaceY2}>
            {['trace-001', 'trace-002', 'trace-003'].map((trace) => (
              <div key={trace} className={ListItem.interactive}>
                <div className={Layout.Flex.between}>
                  <span className={Text.value}>{trace}</span>
                  <span className={Text.muted}>{t(explore.traces.spans, { count: 3 })}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={Card.padded}>
          <h2 className={Text.h2}>{t(explore.services.title)}</h2>
          <p className={[Text.muted, Spacing.mb4].join(' ')}>
            {t(explore.services.description)}
          </p>
          <div className={Spacing.spaceY2}>
            {['api-gateway', 'auth-service', 'data-service'].map((service) => (
              <div key={service} className={ListItem.interactive}>
                <div className={Layout.Flex.between}>
                  <span className={Text.medium}>{service}</span>
                  <span className={Badge.success}>{t(status.healthy)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={InfoBox.base}>
        <h3 className={InfoBox.title}>{t(explore.dataStrategy.title)}</h3>
        <p className={Text.muted}>
          {t(explore.dataStrategy.description)}
        </p>
      </div>
    </div>
  )
}
