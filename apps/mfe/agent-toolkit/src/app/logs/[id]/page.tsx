/**
 * Log Detail View
 *
 * Data Strategy: REST
 * Detailed view of a single log entry with context
 */

import type { Metadata } from 'next'
import { getTranslations, navigation, logDetail, aria } from '@stackone/i18n'
import { PageHeader, Card, Badge, Text, Code, Spacing } from '../../../styles'
import { Routes } from '../../../routes'
import { createMetadata } from './metadata'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  return createMetadata(id)
}

/** Generate static params for known log IDs */
export function generateStaticParams() {
  // Pre-render placeholder IDs used in logs list
  return [1, 2, 3, 4, 5].map((id) => ({ id: String(id) }))
}

export default async function LogDetailPage({ params }: PageProps) {
  const { id } = await params
  const t = await getTranslations()

  return (
    <div>
      <header className={PageHeader.container}>
        <nav aria-label={t(aria.breadcrumb)} className={PageHeader.breadcrumb.container}>
          <a href={Routes.logs.index} className={PageHeader.breadcrumb.link}>
            {t(navigation.logs)}
          </a>
          <span className={PageHeader.breadcrumb.separator}>/</span>
          <span>{t(logDetail.breadcrumbLog, { id })}</span>
        </nav>
        <h1 className={PageHeader.title}>{t(logDetail.title)}</h1>
      </header>

      <div className={Card.padded}>
        <dl className={Spacing.spaceY4}>
          <div>
            <dt className={Text.label}>{t(logDetail.fields.logId)}</dt>
            <dd className={Text.value}>{id}</dd>
          </div>
          <div>
            <dt className={Text.label}>{t(logDetail.fields.timestamp)}</dt>
            <dd>{new Date().toISOString()}</dd>
          </div>
          <div>
            <dt className={Text.label}>{t(logDetail.fields.level)}</dt>
            <dd>
              <span className={Badge.info}>INFO</span>
            </dd>
          </div>
          <div>
            <dt className={Text.label}>{t(logDetail.fields.message)}</dt>
            <dd className={Code.block}>
              {t(logDetail.messagePlaceholder, { id })}
            </dd>
          </div>
          <div>
            <dt className={Text.label}>{t(logDetail.fields.metadata)}</dt>
            <dd className={[Code.block, Text.pre].join(' ')}>
              {JSON.stringify({ service: 'api', traceId: 'abc123', spanId: 'def456' }, null, 2)}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
