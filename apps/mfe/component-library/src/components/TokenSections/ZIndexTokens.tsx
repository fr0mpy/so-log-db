'use client'

import { useState } from 'react'
import { TokenViewer, TokenGridStyles as S, ZIndexTokenStyles } from '../TokenViewer'

interface ZIndexTokensProps {
  zIndex: Record<string, string>
}

export function ZIndexTokens({
  zIndex,
}: ZIndexTokensProps) {
  const [showJson, setShowJson] = useState(false)

  // Sort by z-index value
  const entries = Object.entries(zIndex).sort(
    (a, b) => parseInt(a[1]) - parseInt(b[1])
  )

  return (
    <div className={S.container}>
      <div className={S.section.header}>
        <div>
          <h2 className={S.section.title}>Z-Index</h2>
          <p className={S.section.subtitle}>
            Stacking context scale for layered elements
          </p>
        </div>
        <button
          onClick={() => setShowJson(!showJson)}
          className={S.section.toggle}
        >
          {showJson ? 'Show Visual' : 'Show JSON'}
        </button>
      </div>

      {showJson ? (
        <TokenViewer data={zIndex} />
      ) : (
        <div className={S.grid.zIndex}>
          {entries.map(([name, value], index) => (
            <div
              key={name}
              className={ZIndexTokenStyles.item}
              style={{
                zIndex: parseInt(value),
                transform: `translateY(${index * -4}px)`,
              }}
              title={`--z-${name}: ${value}`}
            >
              <p className={ZIndexTokenStyles.name}>{name}</p>
              <p className={ZIndexTokenStyles.value}>{value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
