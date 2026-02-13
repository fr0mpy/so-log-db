/**
 * Data Exploration
 *
 * Data Strategy: REST only
 * Drill into records, traces, and detailed data views
 */

export { metadata } from './metadata'

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

export default function ExplorePage() {
  return (
    <div>
      <header className={PageHeader.container}>
        <h1 className={PageHeader.title}>Explore</h1>
        <p className={PageHeader.description}>
          Drill into records, traces, and detailed data
        </p>
      </header>

      <div className={Grid.cols2}>
        <div className={Card.padded}>
          <h2 className={Text.h2}>Traces</h2>
          <p className={[Text.muted, Spacing.mb4].join(' ')}>
            Distributed traces across services
          </p>
          <div className={Spacing.spaceY2}>
            {['trace-001', 'trace-002', 'trace-003'].map((trace) => (
              <div key={trace} className={ListItem.interactive}>
                <div className={Layout.Flex.between}>
                  <span className={Text.mono}>{trace}</span>
                  <span className={Text.muted}>3 spans</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={Card.padded}>
          <h2 className={Text.h2}>Services</h2>
          <p className={[Text.muted, Spacing.mb4].join(' ')}>
            Service health and metrics
          </p>
          <div className={Spacing.spaceY2}>
            {['api-gateway', 'auth-service', 'data-service'].map((service) => (
              <div key={service} className={ListItem.interactive}>
                <div className={Layout.Flex.between}>
                  <span className={Text.medium}>{service}</span>
                  <span className={Badge.success}>healthy</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={InfoBox.base}>
        <h3 className={InfoBox.title}>Data Strategy: REST only</h3>
        <p className={Text.muted}>
          Detail views fetch fresh data from the API. No heavy filtering needed,
          so local SQLite is not used on this page.
        </p>
      </div>
    </div>
  )
}
