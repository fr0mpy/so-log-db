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

import { getTranslations, search, dataTypes, timeRanges, aria } from '@stackone/i18n'

export { metadata } from './metadata'

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

export default async function SearchPage() {
  const t = await getTranslations()

  return (
    <div>
      <header className={PageHeader.container}>
        <h1 className={PageHeader.title}>{t(search.title)}</h1>
        <p className={PageHeader.description}>
          {t(search.description)}
        </p>
      </header>

      <div className={Spacing.mb6}>
        <div className={Position.relative}>
          <input
            type="search"
            placeholder={t(search.placeholder)}
            aria-label={t(aria.search)}
            className={FormInput.large}
          />
          <div className={Position.searchIcon}>
            <span className={Text.muted}>{t(search.sqliteReady)}</span>
          </div>
        </div>
      </div>

      <div className={[Layout.Flex.center, Spacing.gap4, Spacing.mb6].join(' ')}>
        <select aria-label={t(aria.filterByType)} className={FormInput.select}>
          <option>{t(dataTypes.all)}</option>
          <option>{t(dataTypes.logs)}</option>
          <option>{t(dataTypes.traces)}</option>
          <option>{t(dataTypes.events)}</option>
        </select>
        <select aria-label={t(aria.filterByTimeRange)} className={FormInput.select}>
          <option>{t(timeRanges.last24Hours)}</option>
          <option>{t(timeRanges.last7Days)}</option>
          <option>{t(timeRanges.last30Days)}</option>
          <option>{t(timeRanges.customRange)}</option>
        </select>
      </div>

      <div className={Card.paddedCenter}>
        <p className={[Text.muted, Spacing.mb4].join(' ')}>
          {t(search.emptyState.primary)}
        </p>
        <p className={Text.muted}>
          {t(search.emptyState.secondary)}
        </p>
      </div>

      <div className={InfoBox.info}>
        <h3 className={InfoBox.titleInfo}>{t(search.dataStrategy.title)}</h3>
        <ul className={InfoBox.content}>
          <li>{t(search.dataStrategy.items.firstVisit)}</li>
          <li>{t(search.dataStrategy.items.returnVisit)}</li>
          <li>{t(search.dataStrategy.items.background)}</li>
        </ul>
      </div>
    </div>
  )
}
