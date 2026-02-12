/**
 * Log Detail View
 *
 * Data Strategy: REST
 * Detailed view of a single log entry with context
 */

import { PageHeader, Card, Badge, Text, Code, Spacing } from '../../../styles'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function LogDetailPage({ params }: PageProps) {
  const { id } = await params

  return (
    <div>
      <header className={PageHeader.container}>
        <nav className={PageHeader.breadcrumb.container}>
          <a href="/logs" className={PageHeader.breadcrumb.link}>Logs</a>
          <span className={PageHeader.breadcrumb.separator}>/</span>
          <span>Log {id}</span>
        </nav>
        <h1 className={PageHeader.title}>Log Detail</h1>
      </header>

      <div className={Card.padded}>
        <dl className={Spacing.spaceY4}>
          <div>
            <dt className={Text.label}>Log ID</dt>
            <dd className={Text.mono}>{id}</dd>
          </div>
          <div>
            <dt className={Text.label}>Timestamp</dt>
            <dd>{new Date().toISOString()}</dd>
          </div>
          <div>
            <dt className={Text.label}>Level</dt>
            <dd>
              <span className={Badge.info}>INFO</span>
            </dd>
          </div>
          <div>
            <dt className={Text.label}>Message</dt>
            <dd className={Code.block}>
              Log message placeholder for entry {id}
            </dd>
          </div>
          <div>
            <dt className={Text.label}>Metadata</dt>
            <dd className={[Code.block, Text.pre].join(' ')}>
              {JSON.stringify({ service: 'api', traceId: 'abc123', spanId: 'def456' }, null, 2)}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
