'use client'

import { useState } from 'react'
import { TokenViewer, TokenGridStyles as S, SpacingTokenStyles } from '../TokenViewer'

interface SpacingTokensProps {
  spacing: Record<string, string>
}

export function SpacingTokens({
  spacing,
}: SpacingTokensProps) {
  const [showJson, setShowJson] = useState(false)

  const entries = Object.entries(spacing).sort(
    (a, b) => parseFloat(a[0]) - parseFloat(b[0]),
  )

  // Calculate max width for visual scale
  const maxRem = Math.max(...entries.map(([, val]) => parseFloat(val)))

  return (
    <div className={S.container}>
      <div className={S.section.header}>
        <div>
          <h2 className={S.section.title}>Spacing</h2>
          <p className={S.section.subtitle}>
            Consistent spacing scale for margins, padding, and gaps
          </p>
        </div>
        <button
          onClick={() => setShowJson(!showJson)}
          className={S.section.toggle}
        >
          {showJson ? 'Show Visual' : 'Show JSON'}
        </button>
      </div>

      {showJson
        ? <TokenViewer data={spacing} />
        : (
          <div className={S.grid.spacing}>
            {entries.map(([key, value]) => {
              const remValue = parseFloat(value)
              const widthPercent = (remValue / maxRem) * 100

              return (
                <div key={key} className={SpacingTokenStyles.item}>
                  <span className={SpacingTokenStyles.label}>{key}</span>
                  <div
                    className={SpacingTokenStyles.bar}
                    style={{ width: `${Math.max(widthPercent, 8)}%`, minWidth: '1rem' }}
                    title={`--spacing-${key}: ${value}`}
                  />
                  <span className={SpacingTokenStyles.value}>{value}</span>
                </div>
              )
            })}
          </div>
        )}
    </div>
  )
}
