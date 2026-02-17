'use client'

import { LogsChartStyles as S } from './styles'

/**
 * Chart skeleton - matches chart dimensions to prevent CLS.
 * Uses the same wrapper styles as the real chart.
 */
export function LogsChartSkeleton() {
  return (
    <div className={S.container}>
      <div className={S.wrapper} />
    </div>
  )
}
