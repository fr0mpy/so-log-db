'use client'

import { useEffect, useRef, useState } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { cn } from '@stackone-ui/core/utils'
import { Card } from '@stackone-ui/core/card'
import { Paper } from '@stackone-ui/core/paper'
import { Pagination } from '@stackone-ui/core/pagination'
import { SelectCompound as Select } from '@stackone-ui/core/select'
import { Skeleton } from '@stackone-ui/core/skeleton'
import { PAGINATION, TABLE } from '../../config'
import { ProviderIcon } from '../../components/ProviderIcon'
import { LatencyBar } from '../../components/LatencyBar'
import { useLogHover } from './LogHoverContext'
import { Tooltip } from '@stackone-ui/core/tooltip'
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
  RowActions,
  TableIcon,
  LogPagination,
  TableRowSkeleton,
  PaginationSelect,
} from '../../styles'

interface LogEntry {
  id: string
  timestamp: string
  provider: { name: string; version: string }
  originOwner: string
  source: string
  request: { method: string; name: string }
  duration: number
  status: number
}

interface LogTableProps {
  logs: readonly LogEntry[]
  translations: {
    table: {
      requested: string
      provider: string
      originOwner: string
      source: string
      request: string
      duration: string
      status: string
    }
    dates: {
      today: string
      yesterday: string
    }
    aria: {
      viewLogDetails: string
      pagination: string
    }
    pagination: {
      showing: string
      rowsPerPage: string
      show: Record<number, string>
    }
    actions: {
      replay: string
      replayDescription: string
      batchReplay: string
      batchReplayDescription: string
      requestTester: string
      requestTesterDescription: string
      integration: string
      account: string
    }
  }
}

// Chevron components for sortable headers and row actions
const ChevronDown = () => (
  <svg
    className={TableIcon.sortIndicator}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
)

// Action Icons for row hover menu
const ReplayIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
)

const BatchReplayIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
)

const RequestTesterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

const IntegrationIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
  </svg>
)

const AccountIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
)

function formatDate(iso: string, todayLabel: string, yesterdayLabel: string): string {
  const date = new Date(iso)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  const isToday = date.toDateString() === today.toDateString()
  const isYesterday = date.toDateString() === yesterday.toDateString()

  if (isToday) return todayLabel
  if (isYesterday) return yesterdayLabel

  const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase()
  const day = date.getDate().toString().padStart(2, '0')
  return `${month} ${day}`
}

function formatTime(iso: string): string {
  const date = new Date(iso)
  return date.toLocaleTimeString('en-US', { hour12: false })
}

/** Extract HH:MM format for chart coordination (matches chart aggregation) */
function getTimeSlot(iso: string): string {
  const date = new Date(iso)
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

function getStatusBadgeStyle(status: number): string {
  if (status >= 200 && status < 300) return StatusBadge.success
  if (status >= 400 && status < 500) return StatusBadge.warning
  if (status >= 500) return StatusBadge.error
  return StatusBadge.success
}

function getMethodBadgeStyle(method: string): string {
  return MethodBadge[method as keyof typeof MethodBadge] || MethodBadge.base
}

/** Generate page numbers with ellipsis for pagination */
function generatePaginationNumbers(current: number, total: number, siblings = 1): (number | 'ellipsis')[] {
  const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i)

  const totalNumbers = siblings * 2 + 3 // siblings + current + first + last
  const totalBlocks = totalNumbers + 2 // + 2 ellipsis

  if (total <= totalBlocks) {
    return range(1, total)
  }

  const leftSiblingIndex = Math.max(current - siblings, 1)
  const rightSiblingIndex = Math.min(current + siblings, total)

  const showLeftEllipsis = leftSiblingIndex > 2
  const showRightEllipsis = rightSiblingIndex < total - 1

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftRange = range(1, 3 + 2 * siblings)
    return [...leftRange, 'ellipsis', total]
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightRange = range(total - (2 + 2 * siblings), total)
    return [1, 'ellipsis', ...rightRange]
  }

  const middleRange = range(leftSiblingIndex, rightSiblingIndex)
  return [1, 'ellipsis', ...middleRange, 'ellipsis', total]
}

export function LogTable({ logs, translations }: LogTableProps) {
  const { table, dates, aria, pagination: paginationLabels, actions } = translations
  const { setHoveredTime } = useLogHover()
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState<number>(PAGINATION.defaultPageSize)

  // Keyboard navigation state for roving tabindex
  const [focusedRowIndex, setFocusedRowIndex] = useState<number>(-1)

  // Calculate pagination
  const totalPages = Math.ceil(logs.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, logs.length)
  const paginatedLogs = logs.slice(startIndex, endIndex)

  // Reset to page 1 when page size changes
  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize)
    setCurrentPage(1)
    scrollContainerRef.current?.scrollTo({ top: 0 })
  }

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    scrollContainerRef.current?.scrollTo({ top: 0 })
  }

  // Virtualize rows for performance
  const virtualizer = useVirtualizer({
    count: paginatedLogs.length,
    getScrollElement: () => scrollContainerRef.current,
    estimateSize: () => TABLE.rowHeight,
    overscan: 5, // Render 5 extra rows above/below viewport
  })

  const handleRowMouseEnter = (timestamp: string) => {
    setHoveredTime(getTimeSlot(timestamp))
  }

  const handleRowMouseLeave = () => {
    setHoveredTime(null)
  }

  // Keyboard navigation for table rows (roving tabindex pattern)
  const handleTableKeyDown = (e: React.KeyboardEvent) => {
    const rowCount = paginatedLogs.length
    if (rowCount === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setFocusedRowIndex((prev) => {
          const next = prev < 0 ? 0 : Math.min(prev + 1, rowCount - 1)
          // Scroll row into view
          const row = scrollContainerRef.current?.querySelector(`[data-row-index="${next}"]`)
          row?.scrollIntoView({ block: 'nearest' })
          return next
        })
        break
      case 'ArrowUp':
        e.preventDefault()
        setFocusedRowIndex((prev) => {
          const next = prev < 0 ? 0 : Math.max(prev - 1, 0)
          const row = scrollContainerRef.current?.querySelector(`[data-row-index="${next}"]`)
          row?.scrollIntoView({ block: 'nearest' })
          return next
        })
        break
      case 'Enter':
        // Focus first action button in the focused row
        if (focusedRowIndex >= 0) {
          e.preventDefault()
          const row = scrollContainerRef.current?.querySelector(
            `[data-row-index="${focusedRowIndex}"]`
          )
          const firstButton = row?.querySelector('button') as HTMLButtonElement
          firstButton?.focus()
        }
        break
      case 'Home':
        e.preventDefault()
        setFocusedRowIndex(0)
        scrollContainerRef.current?.scrollTo({ top: 0 })
        break
      case 'End':
        e.preventDefault()
        setFocusedRowIndex(rowCount - 1)
        break
    }
  }

  // Handle Escape from action buttons to return focus to table
  const handleActionKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      scrollContainerRef.current?.focus()
    }
  }

  // Reset focused row when page changes
  useEffect(() => {
    setFocusedRowIndex(-1)
  }, [currentPage, pageSize])

  // Static row classes - hover is handled by CSS only for smooth scrolling
  const rowClasses = [DataTable.rowWrapper, DataTable.row].join(' ')

  return (
    <div className={DataTable.scrollWrapper}>
      {/* Sticky Header Card - no bottom border-radius */}
      <Card className={DataTable.headerCard} data-ui="header">
        <div className={DataTable.header} data-ui="header-inner">
          <div className={DataTable.headerRow} data-ui="header-row">
            <div className={[DataTable.headerCellSortable, LogTableColumns.requested].join(' ')} data-ui="hcell-requested">
              {table.requested}
              <ChevronDown />
            </div>
            <div className={[DataTable.headerCell, LogTableColumns.provider].join(' ')} data-ui="hcell-provider">
              {table.provider}
            </div>
            <div className={[DataTable.headerCell, LogTableColumns.originOwner].join(' ')} data-ui="hcell-owner">
              {table.originOwner}
            </div>
            <div className={[DataTable.headerCell, LogTableColumns.source].join(' ')} data-ui="hcell-source">
              {table.source}
            </div>
            <div className={[DataTable.headerCell, LogTableColumns.request].join(' ')} data-ui="hcell-request">
              {table.request}
            </div>
            <div className={[DataTable.headerCellSortable, LogTableColumns.duration].join(' ')} data-ui="hcell-duration">
              {table.duration}
              <ChevronDown />
            </div>
            <div className={[DataTable.headerCell, LogTableColumns.status].join(' ')} data-ui="hcell-status">
              {table.status}
            </div>
            <div className={[DataTable.headerCell, LogTableColumns.actions].join(' ')} data-ui="hcell-actions" />
          </div>
        </div>
      </Card>

      {/* Virtualized Scrollable Body */}
      <Paper className={DataTable.bodyPaper} data-ui="body">
        <div
          id="table"
          ref={scrollContainerRef}
          className={DataTable.scrollArea}
          data-ui="scroll-area"
          tabIndex={0}
          role="grid"
          aria-label={aria.viewLogDetails}
          aria-rowcount={paginatedLogs.length}
          onKeyDown={handleTableKeyDown}
        >
          {/* Total height container for scroll */}
          <div
            style={{
              height: virtualizer.getTotalSize() > 0 ? `${virtualizer.getTotalSize()}px` : 'auto',
              width: '100%',
              position: 'relative',
            }}
          >
            {/* Skeleton rows while virtualizer initializes */}
            {virtualizer.getVirtualItems().length === 0 &&
              [...Array(pageSize)].map((_, i) => (
                <div key={`skeleton-${i}`} className={DataTable.rowWrapper}>
                  <div className={DataTable.row} style={{ height: `${TABLE.rowHeight}px` }}>
                    {/* Requested: date + time stacked */}
                    <div className={[DataTable.cell, LogTableColumns.requested].join(' ')}>
                      <div className={TableRowSkeleton.stack}>
                        <Skeleton className="h-3 w-12" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </div>
                    {/* Provider: icon + text */}
                    <div className={[DataTable.cell, LogTableColumns.provider].join(' ')}>
                      <div className={TableRowSkeleton.rowWithIcon}>
                        <Skeleton className="h-6 w-6 rounded-full" />
                        <div className={TableRowSkeleton.hiddenMdStack}>
                          <Skeleton className="h-3.5 w-16" />
                          <Skeleton className="h-2.5 w-8" />
                        </div>
                      </div>
                    </div>
                    {/* Origin Owner: single line */}
                    <div className={[DataTable.cell, LogTableColumns.originOwner].join(' ')}>
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                    {/* Source: single line */}
                    <div className={[DataTable.cell, LogTableColumns.source].join(' ')}>
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                    {/* Request: method badge + name */}
                    <div className={[DataTable.cell, LogTableColumns.request].join(' ')}>
                      <div className={TableRowSkeleton.rowWithIcon}>
                        <Skeleton className="h-5 w-12 rounded" />
                        <Skeleton className="hidden sm:block h-4 flex-1" />
                      </div>
                    </div>
                    {/* Duration: text + bar */}
                    <div className={[DataTable.cell, LogTableColumns.duration].join(' ')}>
                      <div className={TableRowSkeleton.centeredStack}>
                        <Skeleton className="h-4 w-10" />
                        <Skeleton className="h-1 w-16 rounded-full" />
                      </div>
                    </div>
                    {/* Status: badge */}
                    <div className={[DataTable.cell, LogTableColumns.status].join(' ')}>
                      <Skeleton className="h-6 w-10 rounded-full" />
                    </div>
                  </div>
                </div>
              ))}
            {/* Render visible rows once virtualizer is ready */}
            {virtualizer.getVirtualItems().map((virtualRow) => {
              const log = paginatedLogs[virtualRow.index]
              const isFocused = focusedRowIndex === virtualRow.index
              return (
                <div
                  key={log.id}
                  role="row"
                  data-row-index={virtualRow.index}
                  aria-rowindex={virtualRow.index + 1}
                  className={cn(rowClasses, isFocused && DataTable.rowFocused)}
                  data-ui={`row-${virtualRow.index}`}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                  onMouseEnter={() => handleRowMouseEnter(log.timestamp)}
                  onMouseLeave={handleRowMouseLeave}
                >
                  <div className={[DataTable.cell, LogTableColumns.requested].join(' ')} data-ui="cell-requested">
                    <div className={TimestampCell.container}>
                      <span className={TimestampCell.date}>
                        {formatDate(log.timestamp, dates.today, dates.yesterday)}
                      </span>
                      <span className={TimestampCell.time}>{formatTime(log.timestamp)}</span>
                    </div>
                  </div>
                  <div className={[DataTable.cell, LogTableColumns.provider].join(' ')} data-ui="cell-provider">
                    <div className={ProviderAvatar.container}>
                      <ProviderIcon name={log.provider.name} size="sm" />
                      <div className={ProviderAvatar.textWrapper}>
                        <span className={ProviderAvatar.name}>{log.provider.name}</span>
                        <span className={ProviderAvatar.version}>{log.provider.version.toUpperCase()}</span>
                      </div>
                    </div>
                  </div>
                  <div className={[DataTable.cellTruncate, LogTableColumns.originOwner].join(' ')} data-ui="cell-owner">
                    <span className={Text.muted}>{log.originOwner}</span>
                  </div>
                  <div className={[DataTable.cell, LogTableColumns.source].join(' ')} data-ui="cell-source">
                    <span className={SourceCell.text}>{log.source}</span>
                  </div>
                  <div className={[DataTable.cell, LogTableColumns.request].join(' ')} data-ui="cell-request">
                    <div className={RequestCell.container}>
                      <div className={RequestCell.methodWrapper}>
                        <span className={[MethodBadge.base, getMethodBadgeStyle(log.request.method)].join(' ')}>
                          {log.request.method}
                        </span>
                      </div>
                      <span className={RequestCell.name}>{log.request.name}</span>
                    </div>
                  </div>
                  <div className={[DataTable.cellRight, LogTableColumns.duration].join(' ')} data-ui="cell-duration">
                    <LatencyBar duration={log.duration} />
                  </div>
                  <div className={[DataTable.cell, LogTableColumns.status].join(' ')} data-ui="cell-status">
                    <span className={[StatusBadge.base, getStatusBadgeStyle(log.status)].join(' ')}>
                      {log.status}
                    </span>
                  </div>
                  <div className={[DataTable.cell, LogTableColumns.actions].join(' ')} role="gridcell">
                    <div className={RowActions.container}>
                      <Tooltip content={actions.replayDescription}>
                        <button
                          type="button"
                          className={RowActions.button}
                          aria-label={actions.replay}
                          onClick={(e) => e.stopPropagation()}
                          onKeyDown={handleActionKeyDown}
                        >
                          <ReplayIcon className={RowActions.icon} />
                        </button>
                      </Tooltip>
                      <Tooltip content={actions.batchReplayDescription}>
                        <button
                          type="button"
                          className={RowActions.button}
                          aria-label={actions.batchReplay}
                          onClick={(e) => e.stopPropagation()}
                          onKeyDown={handleActionKeyDown}
                        >
                          <BatchReplayIcon className={RowActions.icon} />
                        </button>
                      </Tooltip>
                      <Tooltip content={actions.requestTesterDescription}>
                        <button
                          type="button"
                          className={RowActions.button}
                          aria-label={actions.requestTester}
                          onClick={(e) => e.stopPropagation()}
                          onKeyDown={handleActionKeyDown}
                        >
                          <RequestTesterIcon className={RowActions.icon} />
                        </button>
                      </Tooltip>
                      <Tooltip content={actions.integration}>
                        <button
                          type="button"
                          className={RowActions.button}
                          aria-label={actions.integration}
                          onClick={(e) => e.stopPropagation()}
                          onKeyDown={handleActionKeyDown}
                        >
                          <IntegrationIcon className={RowActions.icon} />
                        </button>
                      </Tooltip>
                      <Tooltip content={actions.account}>
                        <button
                          type="button"
                          className={RowActions.button}
                          aria-label={actions.account}
                          onClick={(e) => e.stopPropagation()}
                          onKeyDown={handleActionKeyDown}
                        >
                          <AccountIcon className={RowActions.icon} />
                        </button>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Paper>

      {/* Pagination */}
      <div id="pagination" tabIndex={-1} className={LogPagination.container}>
        <div className={LogPagination.controls}>
          <Select.Root
            value={String(pageSize)}
            onValueChange={(value) => handlePageSizeChange(Number(value))}
            triggerMode="hover"
            width="auto"
            placement="top"
          >
            <Select.Trigger aria-label={paginationLabels.rowsPerPage}>
              <span className={PaginationSelect.triggerText}>{paginationLabels.show[pageSize]}</span>
              <Select.Icon />
            </Select.Trigger>
            <Select.Portal>
              <Select.Positioner>
                <Select.Popup>
                  <div className={PaginationSelect.optionsContainer}>
                    {PAGINATION.pageSizeOptions.map((size) => (
                      <Select.Option key={size} value={String(size)}>
                        {size}
                      </Select.Option>
                    ))}
                  </div>
                </Select.Popup>
              </Select.Positioner>
            </Select.Portal>
          </Select.Root>
          <Pagination aria-label={aria.pagination}>
            <Pagination.Content>
              <Pagination.Item>
                <Pagination.Previous
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage <= 1}
                />
              </Pagination.Item>
              {generatePaginationNumbers(currentPage, totalPages).map((page, index) =>
                page === 'ellipsis' ? (
                  <Pagination.Item key={`ellipsis-${index}`}>
                    <Pagination.Ellipsis />
                  </Pagination.Item>
                ) : (
                  <Pagination.Item key={page}>
                    <Pagination.Link
                      isActive={currentPage === page}
                      onClick={() => handlePageChange(page as number)}
                    >
                      {page}
                    </Pagination.Link>
                  </Pagination.Item>
                )
              )}
              <Pagination.Item>
                <Pagination.Next
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                />
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        </div>
      </div>
    </div>
  )
}
