/**
 * Search Interface
 *
 * Data Strategy: Hybrid - REST + SQLite
 * Fast local search across 1000s of items using SQLite WASM
 *
 * Per architecture.md:
 * - First visit: REST fetch + background SQLite bootstrap
 * - Return visit: Instant SQLite query (~5-10ms)
 * - Background sync via PowerSync WebSocket
 */

import type { Metadata } from 'next'
import { ARIA } from '@stackone-ui/core/config'

/** SEO: Page-specific metadata */
export const metadata: Metadata = {
  title: 'Search',
  description: 'Fast local search across logs, traces, and events using SQLite',
}

/** Force static generation - page has no dynamic data */
export const dynamic = 'force-static'
import {
  PageHeader,
  Card,
  FormInput,
  InfoBox,
  Text,
  Layout,
  Spacing,
  Position,
} from '../../styles'

export default function SearchPage() {
  return (
    <div>
      <header className={PageHeader.container}>
        <h1 className={PageHeader.title}>Search</h1>
        <p className={PageHeader.description}>
          Fast local search with SQLite (1000s of items)
        </p>
      </header>

      <div className={Spacing.mb6}>
        <div className={Position.relative}>
          <input
            type="search"
            placeholder="Search logs, traces, events..."
            aria-label={ARIA.search}
            className={FormInput.large}
          />
          <div className={Position.searchIcon}>
            <span className={Text.muted}>SQLite ready</span>
          </div>
        </div>
      </div>

      <div className={[Layout.Flex.center, Spacing.gap4, Spacing.mb6].join(' ')}>
        <select aria-label={ARIA.filterByType} className={FormInput.select}>
          <option>All Types</option>
          <option>Logs</option>
          <option>Traces</option>
          <option>Events</option>
        </select>
        <select aria-label={ARIA.filterByTimeRange} className={FormInput.select}>
          <option>Last 24 hours</option>
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Custom range</option>
        </select>
      </div>

      <div className={Card.paddedCenter}>
        <p className={[Text.muted, Spacing.mb4].join(' ')}>
          Enter a search query to find logs, traces, and events
        </p>
        <p className={Text.muted}>
          Local SQLite enables instant search across large datasets
        </p>
      </div>

      <div className={InfoBox.info}>
        <h3 className={InfoBox.titleInfo}>Data Strategy: Hybrid</h3>
        <ul className={InfoBox.content}>
          <li>First visit: REST fetch for initial data + background SQLite bootstrap</li>
          <li>Return visit: Instant local SQLite query (~5-10ms)</li>
          <li>Background: PowerSync WebSocket keeps data in sync</li>
        </ul>
      </div>
    </div>
  )
}
