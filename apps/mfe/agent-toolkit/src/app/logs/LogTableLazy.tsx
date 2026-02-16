'use client'

import dynamic from 'next/dynamic'
import type { ComponentProps } from 'react'
import type { LogTable as LogTableType } from './LogTable'
import { DataTable, LogTableColumns } from '../../styles'
import { Skeleton } from '@stackone-ui/core/skeleton'
import { Card } from '@stackone-ui/core/card'
import { Paper } from '@stackone-ui/core/paper'

type LogTableProps = ComponentProps<typeof LogTableType>

/**
 * Skeleton for LogTable while loading
 * Matches the visual structure to prevent CLS
 */
function LogTableSkeleton() {
  return (
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

      {/* Body rows */}
      <Paper className={DataTable.bodyPaper}>
        <div className={DataTable.scrollArea}>
          {[...Array(10)].map((_, i) => (
            <div key={i} className={DataTable.rowWrapper}>
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
  )
}

/**
 * Code-split LogTable - loads @tanstack/react-virtual only when needed
 */
export const LogTableLazy = dynamic<LogTableProps>(
  () => import('./LogTable').then((mod) => mod.LogTable),
  {
    ssr: false,
    loading: () => <LogTableSkeleton />,
  }
)
