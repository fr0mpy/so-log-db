'use client'

import { LatencyBar as S } from '../../styles'

interface LatencyConfig {
  thresholds: {
    fast: { max: number; color: string }
    medium: { max: number; color: string }
    slow: { max: number | null; color: string }
  }
  display: {
    segmentMs: number
    maxSegments: number
    maxDisplayMs: number
  }
}

// Static segment indices to avoid Array.from() on every render
const SEGMENT_INDICES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const

// Default config - can be overridden by fetched config
const DEFAULT_CONFIG: LatencyConfig = {
  thresholds: {
    fast: { max: 100, color: 'success' },
    medium: { max: 500, color: 'warning' },
    slow: { max: null, color: 'destructive' },
  },
  display: {
    segmentMs: 100,
    maxSegments: 10,
    maxDisplayMs: 1000,
  },
}

interface LatencyBarProps {
  /** Duration in milliseconds */
  duration: number
  /** Optional config override */
  config?: LatencyConfig
}

function getColorForDuration(
  duration: number,
  thresholds: LatencyConfig['thresholds'],
): 'success' | 'warning' | 'destructive' {
  if (duration < thresholds.fast.max) return 'success'
  if (duration < thresholds.medium.max) return 'warning'
  return 'destructive'
}

function formatDuration(ms: number): string {
  return ms >= 1000 ? `${(ms / 1000).toFixed(1)}s` : `${ms}ms`
}

export function LatencyBar({ duration, config = DEFAULT_CONFIG }: LatencyBarProps) {
  const { thresholds, display } = config
  const { segmentMs, maxSegments } = display

  // Calculate filled segments (each segment = segmentMs)
  const filledSegments = Math.min(
    Math.ceil(duration / segmentMs),
    maxSegments,
  )

  // Get color based on duration thresholds
  const color = getColorForDuration(duration, thresholds)
  const segmentColorClass = S.segment[color]

  return (
    <div className={S.container}>
      <span className={S.value}>{formatDuration(duration)}</span>
      <div className={S.bar}>
        {SEGMENT_INDICES.slice(0, maxSegments).map((i) => (
          <div
            key={i}
            className={[
              S.segment.base,
              i < filledSegments ? segmentColorClass : S.segment.empty,
            ].join(' ')}
          />
        ))}
      </div>
    </div>
  )
}
