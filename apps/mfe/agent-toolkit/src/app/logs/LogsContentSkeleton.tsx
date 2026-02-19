import { Card } from '@stackone-ui/core/card'
import { Paper } from '@stackone-ui/core/paper'
import { Skeleton } from '@stackone-ui/core/skeleton'
import { Grid, LogStats, DataTable, LogTableColumns, TableRowSkeleton } from '../../styles'

/**
 * Content skeleton for logs page - stats and table.
 * Chart renders instantly so no skeleton needed for it.
 * Used by LogsSkeleton (full page) and LogsPageContent (refresh state).
 */
export function LogsContentSkeleton() {
  return (
    <div>
      {/* Chart + Stats Row */}
      <div className={Grid.chartStats} data-skel="chart-stats">
        {/* Chart area - empty placeholder, chart renders instantly */}
        <div data-skel="chart" className="flex-1 min-w-0 h-[220px]" />

        {/* Stats with controls - matches LogsPageContent structure */}
        <div className={LogStats.wrapper} data-skel="stats-wrapper">
          {/* Controls at top right - Background Logs toggle */}
          <div className={LogStats.controls} data-skel="controls">
            <Skeleton className="h-5 w-9 rounded-full" />
            <Skeleton className="h-4 w-28" />
          </div>

          {/* Stats 2x2 Grid */}
          <div className={LogStats.grid} data-skel="stats">
            {[...Array(4)].map((_, i) => (
              <Paper key={i} data-skel={`stat-${i}`}>
                <div className={LogStats.cell} data-skel="cell">
                  <Skeleton className="h-8 w-24" data-skel="label" />
                  <div className={LogStats.valueRow} data-skel="value-row">
                    <Skeleton className="h-8 w-16" data-skel="value" />
                    <Skeleton className="h-5 w-12" data-skel="trend" />
                  </div>
                </div>
              </Paper>
            ))}
          </div>
        </div>
      </div>

      {/* Table Skeleton */}
      <div className={DataTable.scrollWrapper} data-skel="table">
        {/* Header */}
        <Card className={DataTable.headerCard} data-skel="header">
          <div className={DataTable.headerRow} data-skel="header-row">
            <div className={`${DataTable.headerCell} ${LogTableColumns.requested}`} data-skel="hcell-requested">
              <Skeleton className="h-4 w-20" />
            </div>
            <div className={`${DataTable.headerCell} ${LogTableColumns.provider}`} data-skel="hcell-provider">
              <Skeleton className="h-4 w-20" />
            </div>
            <div className={`${DataTable.headerCell} ${LogTableColumns.originOwner}`} data-skel="hcell-owner">
              <Skeleton className="h-4 w-24" />
            </div>
            <div className={`${DataTable.headerCell} ${LogTableColumns.source}`} data-skel="hcell-source">
              <Skeleton className="h-4 w-16" />
            </div>
            <div className={`${DataTable.headerCell} ${LogTableColumns.request}`} data-skel="hcell-request">
              <Skeleton className="h-4 w-20" />
            </div>
            <div className={`${DataTable.headerCell} ${LogTableColumns.duration}`} data-skel="hcell-duration">
              <Skeleton className="h-4 w-20" />
            </div>
            <div className={`${DataTable.headerCell} ${LogTableColumns.status}`} data-skel="hcell-status">
              <Skeleton className="h-4 w-14" />
            </div>
            <div className={`${DataTable.headerCell} ${LogTableColumns.actions}`} data-skel="hcell-actions" />
          </div>
        </Card>

        {/* Body Rows */}
        <Paper className={DataTable.bodyPaper} data-skel="body">
          <div className={DataTable.scrollArea} data-skel="scroll-area">
            {[...Array(10)].map((_, i) => (
              <div key={i} className={DataTable.rowWrapperSkeleton} data-skel={`row-${i}`}>
                <div className={TableRowSkeleton.innerRow} data-skel="row-inner">
                  {/* Requested: date + time stacked */}
                  <div className={`${DataTable.cell} ${LogTableColumns.requested}`} data-skel="cell-requested">
                    <div className={TableRowSkeleton.stack}>
                      <Skeleton className="h-3 w-12" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>
                  {/* Provider: icon + text */}
                  <div className={`${DataTable.cell} ${LogTableColumns.provider}`} data-skel="cell-provider">
                    <div className={TableRowSkeleton.rowWithIcon}>
                      <Skeleton className="h-6 w-6 rounded-full" />
                      <div className={TableRowSkeleton.hiddenMdStack}>
                        <Skeleton className="h-3.5 w-16" />
                        <Skeleton className="h-2.5 w-8" />
                      </div>
                    </div>
                  </div>
                  {/* Origin Owner: single line */}
                  <div className={`${DataTable.cell} ${LogTableColumns.originOwner}`} data-skel="cell-owner">
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                  {/* Source: single line */}
                  <div className={`${DataTable.cell} ${LogTableColumns.source}`} data-skel="cell-source">
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                  {/* Request: method badge + name */}
                  <div className={`${DataTable.cell} ${LogTableColumns.request}`} data-skel="cell-request">
                    <div className={TableRowSkeleton.rowWithIcon}>
                      <Skeleton className="h-5 w-12 rounded" />
                      <Skeleton className="hidden sm:block h-4 flex-1" />
                    </div>
                  </div>
                  {/* Duration: text + bar */}
                  <div className={`${DataTable.cell} ${LogTableColumns.duration}`} data-skel="cell-duration">
                    <div className={TableRowSkeleton.centeredStack}>
                      <Skeleton className="h-4 w-10" />
                      <Skeleton className="h-1 w-16 rounded-full" />
                    </div>
                  </div>
                  {/* Status: badge */}
                  <div className={`${DataTable.cell} ${LogTableColumns.status}`} data-skel="cell-status">
                    <Skeleton className="h-6 w-10 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Paper>
      </div>
    </div>
  )
}
