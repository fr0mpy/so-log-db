'use client'

import { useEffect, useRef, useState } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { cn } from '@stackone-ui/core/utils'
import { Card } from '@stackone-ui/core/card'
import { Paper } from '@stackone-ui/core/paper'
import { Pagination } from '@stackone-ui/core/pagination'
import { SelectCompound as Select } from '@stackone-ui/core/select'
import { PAGINATION, TABLE } from '../../config'
import { LogTableSkeleton } from './LogTableLazy'
import { ProviderIcon } from '../../components/ProviderIcon'
import { LatencyBar } from '../../components/LatencyBar'
import { SortableHeader } from '../../components/SortableHeader'
import { useLogHover } from './LogHoverContext'
import { Tooltip } from '@stackone-ui/core/tooltip'
import { useToast } from '@stackone-ui/core/toast'
import { Button } from '@stackone-ui/core/button'
import { replayRequest } from './actions'
import { useTableSort } from '../../hooks'
import type { LogEntry } from './types'
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
  LogPagination,
  PaginationSelect,
} from '../../styles'

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
      sortByColumn: string
    }
    pagination: {
      showing: string
      rowsPerPage: string
      show: Record<number, string>
    }
    actions: {
      replay: string
      replayDescription: string
      replayLoading: string
      replaySuccess: string
      replayError: string
      batchReplay: string
      batchReplayDescription: string
      requestTester: string
      requestTesterDescription: string
      integration: string
      account: string
    }
  }
  /** Callback when a row is clicked */
  onRowClick?: (log: LogEntry) => void
}

// Action Icons for row hover menu
const ReplayIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5.14v14l11-7-11-7z" />
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

export function LogTable({ logs, translations, onRowClick }: LogTableProps) {
  const { table, dates, aria, pagination: paginationLabels, actions } = translations
  const { setHoveredTime } = useLogHover()
  const { addToast, removeToast } = useToast()
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Sorting state - default to newest first
  const { sortedData, sortState, handleSort } = useTableSort(logs, {
    column: 'requested',
    direction: 'desc',
  })

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState<number>(PAGINATION.defaultPageSize)

  // Keyboard navigation state for roving tabindex
  const [focusedRowIndex, setFocusedRowIndex] = useState<number>(-1)

  // Track if component is mounted to prevent flash of empty content
  const [isMounted, setIsMounted] = useState(false)

  // Calculate pagination using sorted data
  const totalPages = Math.ceil(sortedData.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, sortedData.length)
  const paginatedLogs = sortedData.slice(startIndex, endIndex)

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

  const handleReplay = async (logId: string, e: React.MouseEvent) => {
    e.stopPropagation()

    const loadingId = addToast({
      variant: 'loading',
      position: 'bottom-right',
      title: actions.replayLoading,
      duration: 0,
    })

    const result = await replayRequest(logId)

    if (result.success) {
      addToast({
        variant: 'success',
        position: 'bottom-right',
        title: actions.replaySuccess,
        duration: 3000,
      })
    } else {
      addToast({
        variant: 'destructive',
        position: 'bottom-right',
        title: actions.replayError,
        description: result.error,
        duration: 5000,
      })
    }

    setTimeout(() => removeToast(loadingId), 300)
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
        // Open log detail dialog for the focused row
        if (focusedRowIndex >= 0 && onRowClick) {
          e.preventDefault()
          const log = paginatedLogs[focusedRowIndex]
          if (log) {
            onRowClick(log)
          }
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

  // Reset to page 1 when sort changes
  useEffect(() => {
    setCurrentPage(1)
    scrollContainerRef.current?.scrollTo({ top: 0 })
  }, [sortState.column, sortState.direction])

  // Set mounted after first render to prevent flash of empty content
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Show skeleton during virtualizer initialization to prevent flash of empty content
  // The virtualizer needs one render cycle to measure the scroll container
  if (!isMounted) {
    return <LogTableSkeleton />
  }

  // Static row classes - hover is handled by CSS only for smooth scrolling
  const rowClasses = [DataTable.rowWrapper, DataTable.row].join(' ')

  return (
    <div className={DataTable.scrollWrapper}>
      {/* Sticky Header Card - no bottom border-radius */}
      <Card className={DataTable.headerCard} data-ui="header">
        <div className={DataTable.header} data-ui="header-inner">
          <div className={DataTable.headerRow} data-ui="header-row">
            <SortableHeader
              column="requested"
              sortState={sortState}
              onSort={handleSort}
              className={LogTableColumns.requested}
              ariaLabel={aria.sortByColumn.replace('{column}', table.requested)}
            >
              {table.requested}
            </SortableHeader>
            <SortableHeader
              column="provider"
              sortState={sortState}
              onSort={handleSort}
              className={LogTableColumns.provider}
              ariaLabel={aria.sortByColumn.replace('{column}', table.provider)}
            >
              {table.provider}
            </SortableHeader>
            <SortableHeader
              column="originOwner"
              sortState={sortState}
              onSort={handleSort}
              className={LogTableColumns.originOwner}
              ariaLabel={aria.sortByColumn.replace('{column}', table.originOwner)}
            >
              {table.originOwner}
            </SortableHeader>
            <SortableHeader
              column="source"
              sortState={sortState}
              onSort={handleSort}
              className={LogTableColumns.source}
              ariaLabel={aria.sortByColumn.replace('{column}', table.source)}
            >
              {table.source}
            </SortableHeader>
            <SortableHeader
              column="request"
              sortState={sortState}
              onSort={handleSort}
              className={LogTableColumns.request}
              ariaLabel={aria.sortByColumn.replace('{column}', table.request)}
            >
              {table.request}
            </SortableHeader>
            <SortableHeader
              column="duration"
              sortState={sortState}
              onSort={handleSort}
              className={LogTableColumns.duration}
              ariaLabel={aria.sortByColumn.replace('{column}', table.duration)}
            >
              {table.duration}
            </SortableHeader>
            <SortableHeader
              column="status"
              sortState={sortState}
              onSort={handleSort}
              className={LogTableColumns.status}
              ariaLabel={aria.sortByColumn.replace('{column}', table.status)}
            >
              {table.status}
            </SortableHeader>
            <div className={cn(DataTable.headerCell, LogTableColumns.actions)} data-ui="hcell-actions" />
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
            {/* Render visible rows */}
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
                  onClick={() => onRowClick?.(log)}
                >
                  <div className={cn(DataTable.cell, LogTableColumns.requested)} data-ui="cell-requested">
                    <div className={TimestampCell.container}>
                      <span className={TimestampCell.date}>
                        {formatDate(log.timestamp, dates.today, dates.yesterday)}
                      </span>
                      <span className={TimestampCell.time}>{formatTime(log.timestamp)}</span>
                    </div>
                  </div>
                  <div className={cn(DataTable.cell, LogTableColumns.provider)} data-ui="cell-provider">
                    <div className={ProviderAvatar.container}>
                      {/* Tooltip shows provider info on mobile when text is hidden */}
                      <Tooltip content={`${log.provider.name} ${log.provider.version.toUpperCase()}`}>
                        <span className="flex">
                          <ProviderIcon name={log.provider.name} size="sm" />
                        </span>
                      </Tooltip>
                      <div className={ProviderAvatar.textWrapper}>
                        <span className={ProviderAvatar.name}>{log.provider.name}</span>
                        <span className={ProviderAvatar.version}>{log.provider.version.toUpperCase()}</span>
                      </div>
                    </div>
                  </div>
                  <div className={cn(DataTable.cellTruncate, LogTableColumns.originOwner)} data-ui="cell-owner">
                    <span className={Text.muted}>{log.originOwner}</span>
                  </div>
                  <div className={cn(DataTable.cellTight, LogTableColumns.source)} data-ui="cell-source">
                    <span className={SourceCell.text}>{log.source}</span>
                  </div>
                  <div className={cn(DataTable.cellTight, LogTableColumns.request)} data-ui="cell-request">
                    <div className={RequestCell.container}>
                      <div className={RequestCell.methodWrapper}>
                        <span className={cn(MethodBadge.base, getMethodBadgeStyle(log.request.method))}>
                          {log.request.method}
                        </span>
                      </div>
                      {/* Tooltip shows full request name when truncated */}
                      <Tooltip content={log.request.name}>
                        <span className={RequestCell.name}>{log.request.name}</span>
                      </Tooltip>
                    </div>
                  </div>
                  <div className={cn(DataTable.cellRight, LogTableColumns.duration)} data-ui="cell-duration">
                    <LatencyBar duration={log.duration} />
                  </div>
                  <div className={cn(DataTable.cell, LogTableColumns.status)} data-ui="cell-status">
                    <span className={cn(StatusBadge.base, getStatusBadgeStyle(log.status))}>
                      {log.status}
                    </span>
                  </div>
                  <div className={cn(DataTable.cell, LogTableColumns.actions)} role="gridcell">
                    <div className={RowActions.container}>
                      {/* Primary actions - always visible */}
                      <Tooltip content={actions.replayDescription}>
                        <Button
                          variant="inset"
                          iconOnly
                          size="sm"
                          className="group/action"
                          aria-label={actions.replay}
                          onClick={(e: React.MouseEvent) => handleReplay(log.id, e)}
                          onKeyDown={handleActionKeyDown}
                        >
                          <ReplayIcon className={RowActions.iconFilled} />
                        </Button>
                      </Tooltip>
                      <Tooltip content={actions.requestTesterDescription}>
                        <Button
                          variant="inset"
                          iconOnly
                          size="sm"
                          aria-label={actions.requestTester}
                          onClick={(e: React.MouseEvent) => e.stopPropagation()}
                          onKeyDown={handleActionKeyDown}
                        >
                          <RequestTesterIcon className={RowActions.icon} />
                        </Button>
                      </Tooltip>
                      {/* Secondary actions - hidden on <lg screens */}
                      <Tooltip content={actions.batchReplayDescription}>
                        <Button
                          variant="inset"
                          iconOnly
                          size="sm"
                          className="hidden lg:inline-flex"
                          aria-label={actions.batchReplay}
                          onClick={(e: React.MouseEvent) => e.stopPropagation()}
                          onKeyDown={handleActionKeyDown}
                        >
                          <BatchReplayIcon className={RowActions.icon} />
                        </Button>
                      </Tooltip>
                      <Tooltip content={actions.integration}>
                        <Button
                          variant="inset"
                          iconOnly
                          size="sm"
                          className="hidden lg:inline-flex"
                          aria-label={actions.integration}
                          onClick={(e: React.MouseEvent) => e.stopPropagation()}
                          onKeyDown={handleActionKeyDown}
                        >
                          <IntegrationIcon className={RowActions.icon} />
                        </Button>
                      </Tooltip>
                      <Tooltip content={actions.account}>
                        <Button
                          variant="inset"
                          iconOnly
                          size="sm"
                          className="hidden lg:inline-flex"
                          aria-label={actions.account}
                          onClick={(e: React.MouseEvent) => e.stopPropagation()}
                          onKeyDown={handleActionKeyDown}
                        >
                          <AccountIcon className={RowActions.icon} />
                        </Button>
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
            variant="ghost"
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
