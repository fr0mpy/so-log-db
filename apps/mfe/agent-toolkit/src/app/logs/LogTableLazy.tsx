'use client'

import dynamic from 'next/dynamic'
import type { ComponentProps } from 'react'
import type { LogTable as LogTableType } from './LogTable'
import { DataTable, LogTableColumns, LogTableSkeletonSizes } from '../../styles'
import { Skeleton } from '@stackone-ui/core/skeleton'
import { Card } from '@stackone-ui/core/card'
import { Paper } from '@stackone-ui/core/paper'

type LogTableProps = ComponentProps<typeof LogTableType>

/**
 * Skeleton for LogTable while loading
 * Matches the visual structure to prevent CLS
 * Exported for use by LogTable during virtualizer initialization
 */
export function LogTableSkeleton() {
  return (
    <div className={DataTable.scrollWrapper}>
      {/* Header */}
      <Card className={DataTable.headerCard}>
        <div className={DataTable.headerRow}>
          <div className={`${DataTable.headerCell} ${LogTableColumns.requested}`}>
            <Skeleton className={LogTableSkeletonSizes.headerRequested} />
          </div>
          <div className={`${DataTable.headerCell} ${LogTableColumns.provider}`}>
            <Skeleton className={LogTableSkeletonSizes.headerProvider} />
          </div>
          <div className={`${DataTable.headerCell} ${LogTableColumns.originOwner}`}>
            <Skeleton className={LogTableSkeletonSizes.headerOrigin} />
          </div>
          <div className={`${DataTable.headerCell} ${LogTableColumns.source}`}>
            <Skeleton className={LogTableSkeletonSizes.headerSource} />
          </div>
          <div className={`${DataTable.headerCell} ${LogTableColumns.request}`}>
            <Skeleton className={LogTableSkeletonSizes.headerRequest} />
          </div>
          <div className={`${DataTable.headerCell} ${LogTableColumns.duration}`}>
            <Skeleton className={LogTableSkeletonSizes.headerDuration} />
          </div>
          <div className={`${DataTable.headerCell} ${LogTableColumns.status}`}>
            <Skeleton className={LogTableSkeletonSizes.headerStatus} />
          </div>
        </div>
      </Card>

      {/* Body rows */}
      <Paper className={DataTable.bodyPaper}>
        <div className={DataTable.scrollArea}>
          {[...Array(10)].map((_, i) => (
            <div key={i} className={DataTable.rowWrapper}>
              <div className={LogTableSkeletonSizes.rowInner}>
                <div className={`${DataTable.cell} ${LogTableColumns.requested}`}>
                  <Skeleton className={LogTableSkeletonSizes.cellTimestamp} />
                </div>
                <div className={`${DataTable.cell} ${LogTableColumns.provider}`}>
                  <Skeleton className={LogTableSkeletonSizes.cellProvider} />
                </div>
                <div className={`${DataTable.cell} ${LogTableColumns.originOwner}`}>
                  <Skeleton className={LogTableSkeletonSizes.cellText} />
                </div>
                <div className={`${DataTable.cell} ${LogTableColumns.source}`}>
                  <Skeleton className={LogTableSkeletonSizes.cellText} />
                </div>
                <div className={`${DataTable.cell} ${LogTableColumns.request}`}>
                  <Skeleton className={LogTableSkeletonSizes.cellFull} />
                </div>
                <div className={`${DataTable.cell} ${LogTableColumns.duration}`}>
                  <Skeleton className={LogTableSkeletonSizes.cellDuration} />
                </div>
                <div className={`${DataTable.cell} ${LogTableColumns.status}`}>
                  <Skeleton className={LogTableSkeletonSizes.cellStatus} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Paper>
    </div>
  )
}

/**
 * Code-split LogTable - loads @tanstack/react-virtual only when needed.
 *
 * NOTE: No loading prop - SSR handles initial render, loading.tsx handles
 * route transitions. Adding loading prop with SSR causes content→skeleton→content flash.
 * LogTableSkeleton is still exported for use by LogTable during virtualizer initialization.
 */
export const LogTableLazy = dynamic<LogTableProps>(
  () => import('./LogTable').then((mod) => mod.LogTable)
)
