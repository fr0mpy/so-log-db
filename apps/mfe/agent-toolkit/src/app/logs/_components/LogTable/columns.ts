import { logs } from '@stackone/i18n'
import { LogTableColumns } from '../../../../styles'

/**
 * Column configuration for LogTable headers.
 * Maps column IDs to their i18n keys and style classes.
 */
export const LOG_TABLE_COLUMNS = [
  { id: 'requested', labelKey: logs.table.requested, className: LogTableColumns.requested },
  { id: 'provider', labelKey: logs.table.provider, className: LogTableColumns.provider },
  { id: 'originOwner', labelKey: logs.table.originOwner, className: LogTableColumns.originOwner },
  { id: 'source', labelKey: logs.table.source, className: LogTableColumns.source },
  { id: 'request', labelKey: logs.table.request, className: LogTableColumns.request },
  { id: 'duration', labelKey: logs.table.duration, className: LogTableColumns.duration },
  { id: 'status', labelKey: logs.table.status, className: LogTableColumns.status },
] as const

export type LogTableColumnId = (typeof LOG_TABLE_COLUMNS)[number]['id']
