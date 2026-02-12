/**
 * Log List View
 *
 * Data Strategy: REST + WebSocket
 * Real-time log viewing with filters and streaming
 */

import Link from 'next/link'
import {
  PageHeader,
  Card,
  FormInput,
  ListItem,
  Badge,
  Text,
  Layout,
  Spacing,
  Position,
} from '../../styles'

export default function LogsPage() {
  return (
    <div>
      <header className={PageHeader.container}>
        <h1 className={PageHeader.title}>Logs</h1>
        <p className={PageHeader.description}>Real-time log viewing and analysis</p>
      </header>

      <div className={[Layout.Flex.center, Spacing.gap4, Spacing.mb6].join(' ')}>
        <div className={Position.flex1}>
          <input
            type="search"
            placeholder="Filter logs..."
            className={FormInput.base}
          />
        </div>
        <select className={FormInput.select}>
          <option>All Levels</option>
          <option>Error</option>
          <option>Warning</option>
          <option>Info</option>
          <option>Debug</option>
        </select>
      </div>

      <div className={Card.base}>
        <div className={Card.header}>
          <p className={Text.muted}>Log entries will appear here</p>
        </div>

        {[1, 2, 3, 4, 5].map((i) => (
          <Link key={i} href={`/logs/${i}`} className={ListItem.base}>
            <div className={ListItem.row}>
              <span className={Badge.info}>INFO</span>
              <span className={Text.muted}>{new Date().toISOString()}</span>
              <span className={Text.monoTruncate}>
                Log entry placeholder {i}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
