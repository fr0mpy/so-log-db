import { Card } from '@stackone-ui/core/card'
import { Paper } from '@stackone-ui/core/paper'
import { Skeleton } from '@stackone-ui/core/skeleton'
import {
  Spacing,
  Grid,
  LogStats,
  FilterRow,
  DataTable,
  LogTableColumns,
} from '../../styles'

/**
 * Full page skeleton for logs - used by loading.tsx
 * Mirrors the exact page structure to prevent CLS
 */
export function LogsSkeleton() {
  return (
    <div className={Spacing.spaceY4}>
      {/* Filter Row Skeleton */}
      <div className={FilterRow.container}>
        <Skeleton className="h-8 w-16" />
        <div className={FilterRow.searchWrapper}>
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
        <Skeleton className="h-10 w-20 rounded-lg" />
        <Skeleton className="h-10 w-16 rounded-lg" />
        <div className={FilterRow.toggleWrapper}>
          <Skeleton className="h-5 w-9 rounded-full" />
          <Skeleton className="h-4 w-28" />
        </div>
        <Skeleton className="h-9 w-9 rounded-lg" />
      </div>

      {/* Chart + Stats Row Skeleton */}
      <div className={Grid.chartStats}>
        {/* Chart Card */}
        <Card>
          <Card.Content className="h-[220px] flex items-end pb-0">
            <Skeleton variant="rectangular" className="w-full h-[180px]" />
          </Card.Content>
        </Card>

        {/* Stats 2x2 Grid - uses Paper like actual StatCard */}
        <div className={LogStats.grid}>
          {[...Array(4)].map((_, i) => (
            <Paper key={i}>
              <div className={LogStats.cell}>
                <Skeleton className="h-3 w-24 mb-2" />
                <div className={LogStats.valueRow}>
                  <Skeleton className="h-7 w-16" />
                  <Skeleton className="h-4 w-12" />
                </div>
              </div>
            </Paper>
          ))}
        </div>
      </div>

      {/* Table Skeleton */}
      <div className={DataTable.scrollWrapper}>
        {/* Header */}
        <Card className={DataTable.headerCard}>
          <div className={DataTable.headerRow}>
            <div className={`${DataTable.headerCell} ${LogTableColumns.requested}`}>
              <Skeleton className="h-4 w-20" />
            </div>
            <div className={`${DataTable.headerCell} ${LogTableColumns.provider}`}>
              <Skeleton className="h-4 w-20" />
            </div>
            <div className={`${DataTable.headerCell} ${LogTableColumns.originOwner}`}>
              <Skeleton className="h-4 w-24" />
            </div>
            <div className={`${DataTable.headerCell} ${LogTableColumns.source}`}>
              <Skeleton className="h-4 w-16" />
            </div>
            <div className={`${DataTable.headerCell} ${LogTableColumns.request}`}>
              <Skeleton className="h-4 w-20" />
            </div>
            <div className={`${DataTable.headerCell} ${LogTableColumns.duration}`}>
              <Skeleton className="h-4 w-20" />
            </div>
            <div className={`${DataTable.headerCell} ${LogTableColumns.status}`}>
              <Skeleton className="h-4 w-14" />
            </div>
          </div>
        </Card>

        {/* Body Rows */}
        <Paper className={DataTable.bodyPaper}>
          <div className={DataTable.scrollArea}>
            {[...Array(10)].map((_, i) => (
              <div key={i} className={DataTable.rowWrapperSkeleton}>
                <div className="flex items-center min-w-[900px] py-3">
                  <div className={`${DataTable.cell} ${LogTableColumns.requested}`}>
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div className={`${DataTable.cell} ${LogTableColumns.provider}`}>
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div className={`${DataTable.cell} ${LogTableColumns.originOwner}`}>
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                  <div className={`${DataTable.cell} ${LogTableColumns.source}`}>
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                  <div className={`${DataTable.cell} ${LogTableColumns.request}`}>
                    <Skeleton className="h-4 w-full" />
                  </div>
                  <div className={`${DataTable.cell} ${LogTableColumns.duration}`}>
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div className={`${DataTable.cell} ${LogTableColumns.status}`}>
                    <Skeleton className="h-6 w-12 rounded-full" />
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
