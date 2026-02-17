'use client'

import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts'
import type { LogsChartProps, ChartDataPoint, LogEntry } from './types'
import { LogsChartStyles as S, RechartsStyles } from './styles'
import { useLogHover, useHoveredTime } from '../../app/logs/LogHoverContext'
import { DebouncedResponsiveContainer } from './DebouncedResponsiveContainer'
import { useSidebar } from '../SidebarContext'

/**
 * Aggregate logs by minute and status category
 */
function aggregateLogsByTime(logs: readonly LogEntry[]): ChartDataPoint[] {
  const grouped = new Map<string, ChartDataPoint>()

  for (const log of logs) {
    const date = new Date(log.timestamp)
    const time = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })

    if (!grouped.has(time)) {
      grouped.set(time, {
        time,
        success: 0,
        clientError: 0,
        serverError: 0,
      })
    }

    const point = grouped.get(time)!
    if (log.status >= 200 && log.status < 300) {
      point.success++
    } else if (log.status >= 400 && log.status < 500) {
      point.clientError++
    } else if (log.status >= 500) {
      point.serverError++
    }
  }

  return Array.from(grouped.values()).sort((a, b) => a.time.localeCompare(b.time))
}

/**
 * Custom tooltip with neumorphic styling
 */
function CustomTooltip({
  active,
  payload,
  label,
  translations,
}: {
  active?: boolean
  payload?: Array<{ dataKey: string; value: number; fill: string }>
  label?: string
  translations: LogsChartProps['translations']
}) {
  if (!active || !payload || payload.length === 0) return null

  const nonZeroPayload = payload.filter((entry) => entry.value > 0)
  if (nonZeroPayload.length === 0) return null

  const labelMap: Record<string, string> = {
    success: translations.success,
    clientError: translations.clientError,
    serverError: translations.serverError,
  }

  const total = nonZeroPayload.reduce((sum, entry) => sum + entry.value, 0)

  return (
    <div className={S.tooltip}>
      <p className={S.tooltipTitle}>{label}</p>
      {nonZeroPayload.map((entry) => (
        <div key={entry.dataKey} className={S.tooltipRow}>
          <span className={S.tooltipDot} style={{ backgroundColor: entry.fill }} />
          <span className={S.tooltipLabel}>{labelMap[entry.dataKey]}:</span>
          <span className={S.tooltipValue}>{entry.value}</span>
        </div>
      ))}
      <div className={S.tooltipTotal}>
        <span>Total:</span>
        <span className={S.tooltipValue}>{total}</span>
      </div>
    </div>
  )
}

export function LogsChart({ logs, translations }: LogsChartProps) {
  const data = aggregateLogsByTime(logs)
  const { setHoveredTime } = useLogHover()
  const hoveredTime = useHoveredTime()
  const { isAnimating } = useSidebar()

  // Only animate bars on initial mount, not on container resize
  const [isInitialRender, setIsInitialRender] = useState(true)
  useEffect(() => {
    const timer = setTimeout(() => setIsInitialRender(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleMouseMove = (state: { activeLabel?: string | number }) => {
    if (state?.activeLabel != null) {
      setHoveredTime(String(state.activeLabel))
    }
  }

  const handleMouseLeave = () => {
    setHoveredTime(null)
  }

  return (
    <div id="chart" tabIndex={-1} className={S.container}>
      <div className={S.wrapper}>
        <DebouncedResponsiveContainer debounceMs={200}>
          {({ width, height }) => (
            <BarChart
              width={width}
              height={height}
              data={data}
              margin={{ top: 20, right: 20, left: -10, bottom: 5 }}
              barCategoryGap="20%"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              // Remove chart from tab order - it's not keyboard accessible
              tabIndex={-1}
              aria-hidden="true"
              role="presentation"
            >
              <XAxis
                dataKey="time"
                axisLine={false}
                tickLine={false}
                tick={RechartsStyles.axisTick}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={RechartsStyles.axisTick}
                allowDecimals={false}
                width={30}
              />
              {/* Pause tooltip during sidebar animation to prevent jank */}
              {!isAnimating && (
                <Tooltip
                  content={<CustomTooltip translations={translations} />}
                  cursor={RechartsStyles.tooltipCursor}
                  isAnimationActive={false}
                />
              )}

              {/* Bars: semi-transparent by default, solid when hovered (from table or chart) */}
              <Bar
                dataKey="success"
                stackId="status"
                fill="var(--color-success)"
                radius={[0, 0, 0, 0]}
                activeBar={{ fillOpacity: 1 }}
                isAnimationActive={isInitialRender}
              >
                {data.map((entry) => (
                  <Cell
                    key={entry.time}
                    fillOpacity={hoveredTime === entry.time ? 1 : 0.5}
                  />
                ))}
              </Bar>
              <Bar
                dataKey="clientError"
                stackId="status"
                fill="var(--color-warning)"
                radius={[0, 0, 0, 0]}
                activeBar={{ fillOpacity: 1 }}
                isAnimationActive={isInitialRender}
              >
                {data.map((entry) => (
                  <Cell
                    key={entry.time}
                    fillOpacity={hoveredTime === entry.time ? 1 : 0.5}
                  />
                ))}
              </Bar>
              <Bar
                dataKey="serverError"
                stackId="status"
                fill="var(--color-destructive)"
                radius={[0, 0, 0, 0]}
                activeBar={{ fillOpacity: 1 }}
                isAnimationActive={isInitialRender}
              >
                {data.map((entry) => (
                  <Cell
                    key={entry.time}
                    fillOpacity={hoveredTime === entry.time ? 1 : 0.5}
                  />
                ))}
              </Bar>
            </BarChart>
          )}
        </DebouncedResponsiveContainer>
      </div>
    </div>
  )
}
