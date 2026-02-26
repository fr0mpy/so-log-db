import type { ReactNode } from 'react'
import { Paper } from '@stackone-ui/core/paper'
import { LogStats } from '../../../styles'

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

export function StatCard({ label, value, trend, variant = 'default', children }: StatCardProps) {
  const valueClass =
    variant === 'success'
      ? LogStats.valueSuccess
      : variant === 'destructive'
        ? LogStats.valueDestructive
        : LogStats.value

  return (
    <Paper>
      <div className={LogStats.cell}>
        <span className={LogStats.label}>{label}</span>
        <div className={LogStats.valueRow}>
          <span className={valueClass}>{value}</span>
          <span className={LogStats.trendUp}>
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
