import { Paper } from "@stackone-ui/core/paper";
import { Skeleton } from "@stackone-ui/core/skeleton";
import {
  FilterRow,
  Grid,
  LogStats,
  DataTable,
  LogsPageSkeleton as Skel,
} from "../../styles";

/**
 * Skeleton for logs page - uses EXACT same layout classes as real components
 * to prevent CLS. Only Skeleton components + Paper wrapper for table.
 */
export function LogsContentSkeleton() {
  return (
    <>
      <div id="filters" className={FilterRow.container}>
        <Skeleton className={Skel.headerTitle} />
        <div className={FilterRow.searchWrapper}>
          <Skeleton className={Skel.headerSearch} />
        </div>
        <div className={FilterRow.filterControls}>
          <Skeleton className={Skel.headerDateSelect} />
          <Skeleton className={Skel.headerStatusSelect} />
          <Skeleton className={Skel.headerRefresh} />
        </div>
        <Skeleton className={Skel.headerTheme} />
      </div>

      <div className={Grid.chartStats}>
        <div className={Skel.chartPlaceholder} />

        <div className={LogStats.wrapper}>
          <div className={LogStats.controls}>
            <Skeleton className={Skel.statsToggle} />
            <Skeleton className={Skel.statsLabel} />
          </div>
          <div className={LogStats.grid}>
            <Skeleton className={Skel.statCard} />
            <Skeleton className={Skel.statCard} />
            <Skeleton className={Skel.statCard} />
            <Skeleton className={Skel.statCard} />
          </div>
        </div>
      </div>

      <div className={DataTable.scrollWrapper}>
        <Paper className={DataTable.bodyPaper}>
          {[...Array(10)].map((_, i) => (
            <Skeleton key={i} className={Skel.tableRow} />
          ))}
        </Paper>
      </div>
    </>
  );
}
