import { Paper } from '@stackone-ui/core/paper'
import { LogStats } from '../../styles'
import type { ReactNode } from 'react'

interface StatCardProps {
  label: string
  value: string | number
  trend: {
    delta: number
    isPositive: boolean // true = up arrow, false = down arrow
    prefix?: string // e.g., "+", "-"
    suffix?: string // e.g., "%", "ms"
  }
  variant?: 'default' | 'success' | 'destructive'
  children?: ReactNode
  /** Debug attribute for position tracking */
  'data-ui'?: string
}

const ArrowUp = () => (
  <svg className={LogStats.trendArrow} viewBox="0 0 12 12" fill="currentColor">
    <path d="M6 2L10 7H2L6 2Z" />
  </svg>
)

const ArrowDown = () => (
  <svg className={LogStats.trendArrow} viewBox="0 0 12 12" fill="currentColor">
    <path d="M6 10L2 5H10L6 10Z" />
  </svg>
)

export function StatCard({ label, value, trend, variant = 'default', children, 'data-ui': dataUi }: StatCardProps) {
  const valueClass =
    variant === 'success'
      ? LogStats.valueSuccess
      : variant === 'destructive'
        ? LogStats.valueDestructive
        : LogStats.value

  return (
    <Paper data-ui={dataUi}>
      <div className={LogStats.cell} data-ui={dataUi ? `${dataUi}-cell` : undefined}>
        <span className={LogStats.label} data-ui={dataUi ? `${dataUi}-label` : undefined}>{label}</span>
        <div className={LogStats.valueRow} data-ui={dataUi ? `${dataUi}-value-row` : undefined}>
          <span className={valueClass} data-ui={dataUi ? `${dataUi}-value` : undefined}>{value}</span>
          <span className={LogStats.trendUp} data-ui={dataUi ? `${dataUi}-trend` : undefined}>
            {trend.isPositive ? <ArrowUp /> : <ArrowDown />}
            {trend.prefix}
            {trend.delta}
            {trend.suffix}
          </span>
        </div>
        {children}
      </div>
    </Paper>
  )
}
