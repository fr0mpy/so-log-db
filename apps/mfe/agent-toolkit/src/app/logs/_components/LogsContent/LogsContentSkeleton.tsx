import { Paper } from '@stackone-ui/core/paper'
import { Skeleton } from '@stackone-ui/core/skeleton'
import {
  Grid,
  LogStats,
  DataTable,
  LogsPageSkeleton as Skel,
} from '../../../../styles'

/**
 * Skeleton for logs content (chart, stats, table) - NO header.
 * Header skeleton is in LogsSkeleton.tsx to avoid duplication.
 * Used by LogsPageContent during refresh state.
 */
export function LogsContentSkeleton() {
  return (
    <>
      <div className={Grid.chartStats}>
        {/* Chart - VISIBLE skeleton, not empty div */}
        <Skeleton className={Skel.chartPlaceholder} />

        <div className={LogStats.wrapper}>
          <div className={LogStats.controls}>
            <Skeleton className={Skel.statsToggle} />
            <Skeleton className={Skel.statsLabel} />
          </div>
          <div className={LogStats.grid}>
            {/* Stat cards - wrapped in Paper to match real StatCard structure */}
            <Paper><Skeleton className={Skel.statCard} /></Paper>
            <Paper><Skeleton className={Skel.statCard} /></Paper>
            <Paper><Skeleton className={Skel.statCard} /></Paper>
            <Paper><Skeleton className={Skel.statCard} /></Paper>
          </div>
        </div>
      </div>

      <div className={DataTable.scrollWrapper}>
        <Paper className={DataTable.bodyPaper}>
          {[...Array(10)].map((_, i) =>
            <Skeleton key={i} className={Skel.tableRow} />,
          )}
        </Paper>
      </div>
    </>
  )
}
