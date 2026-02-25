'use client'

import { memo } from 'react'
import { useTranslations, logs } from '@stackone/i18n'
import { formatDate, formatTime } from '@stackone/utils/formatters'
import { cn } from '@stackone-ui/core/utils'
import { Tooltip } from '@stackone-ui/core/tooltip'
import { LogTableStyles } from './styles'
import { LogTableActions } from './LogTableActions'
import { ProviderIcon } from '../../../../components/ProviderIcon'
import { LatencyBar } from '../../../../components/LatencyBar'
import {
  Text,
  DataTable,
  LogTableColumns,
  ProviderAvatar,
  MethodBadge,
  StatusBadge,
  SourceCell,
  TimestampCell,
  RequestCell,
} from '../../../../styles'
import type { LogEntry } from '../../_lib'

interface LogTableRowProps {
  log: LogEntry
  index: number
  isFocused: boolean
  rowClasses: string
  style: React.CSSProperties
  onMouseEnter: () => void
  onMouseLeave: () => void
  onClick: () => void
  onReplay: (logId: string, e: React.MouseEvent) => void
  onActionKeyDown: (e: React.KeyboardEvent) => void
}

const RequestNameCell = memo(function RequestNameCell({ name }: { name: string }) {
  return <span className={RequestCell.name}>{name}</span>
})

function getStatusBadgeStyle(status: number): string {
  if (status >= 200 && status < 300) return StatusBadge.success
  if (status >= 400 && status < 500) return StatusBadge.warning
  if (status >= 500) return StatusBadge.error
  return StatusBadge.success
}

function getMethodBadgeStyle(method: string): string {
  return MethodBadge[method as keyof typeof MethodBadge] || MethodBadge.base
}

/**
 * A single row in the LogTable.
 * Renders all cells for a log entry including actions.
 */
export const LogTableRow = memo(function LogTableRow({
  log,
  index,
  isFocused,
  rowClasses,
  style,
  onMouseEnter,
  onMouseLeave,
  onClick,
  onReplay,
  onActionKeyDown,
}: LogTableRowProps) {
  const t = useTranslations()

  return (
    <div
      role="row"
      data-row-index={index}
      aria-rowindex={index + 1}
      className={cn(rowClasses, isFocused && DataTable.rowFocused)}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {/* Timestamp */}
      <div className={cn(DataTable.cell, LogTableColumns.requested)}>
        <div className={TimestampCell.container}>
          <span className={TimestampCell.date}>
            {formatDate(log.timestamp, {
              todayLabel: t(logs.dates.today),
              yesterdayLabel: t(logs.dates.yesterday),
            })}
          </span>
          <span className={TimestampCell.time}>{formatTime(log.timestamp)}</span>
        </div>
      </div>

      {/* Provider */}
      <div className={cn(DataTable.cell, LogTableColumns.provider)}>
        <div className={ProviderAvatar.container}>
          <Tooltip content={`${log.provider.name} ${log.provider.version.toUpperCase()}`}>
            <span className={LogTableStyles.tooltipWrapper}>
              <ProviderIcon name={log.provider.name} size="sm" />
            </span>
          </Tooltip>
          <div className={ProviderAvatar.textWrapper}>
            <span className={ProviderAvatar.name}>{log.provider.name}</span>
            <span className={ProviderAvatar.version}>{log.provider.version.toUpperCase()}</span>
          </div>
        </div>
      </div>

      {/* Origin Owner */}
      <div className={cn(DataTable.cellTruncate, LogTableColumns.originOwner)}>
        <span className={Text.muted}>{log.originOwner}</span>
      </div>

      {/* Source */}
      <div className={cn(DataTable.cellTight, LogTableColumns.source)}>
        <span className={SourceCell.text}>{log.source}</span>
      </div>

      {/* Request */}
      <div className={cn(DataTable.cellTight, LogTableColumns.request)}>
        <div className={RequestCell.container}>
          <div className={RequestCell.methodWrapper}>
            <span className={cn(MethodBadge.base, getMethodBadgeStyle(log.request.method))}>
              {log.request.method}
            </span>
          </div>
          <RequestNameCell name={log.request.name} />
        </div>
      </div>

      {/* Duration */}
      <div className={cn(DataTable.cellRight, LogTableColumns.duration)}>
        <LatencyBar duration={log.duration} />
      </div>

      {/* Status */}
      <div className={cn(DataTable.cell, LogTableColumns.status)}>
        <span className={cn(StatusBadge.base, getStatusBadgeStyle(log.status))}>{log.status}</span>
      </div>

      {/* Actions */}
      <div className={cn(DataTable.cell, LogTableColumns.actions)} role="gridcell">
        <LogTableActions logId={log.id} onReplay={onReplay} onActionKeyDown={onActionKeyDown} />
      </div>
    </div>
  )
})
