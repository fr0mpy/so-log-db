'use client'

import { useState } from 'react'
import { TokenViewer, TokenGridStyles as S, RadiusTokenStyles } from '../TokenViewer'

interface RadiusTokensProps {
  radius: Record<string, string>
}

export function RadiusTokens({
  radius,
}: RadiusTokensProps) {
  const [showJson, setShowJson] = useState(false)

  const entries = Object.entries(radius)

  return (
    <div className={S.container}>
      <div className={S.section.header}>
        <div>
          <h2 className={S.section.title}>Border Radius</h2>
          <p className={S.section.subtitle}>
            Consistent corner rounding across components
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
        <TokenViewer data={radius} />
      ) : (
        <div className={S.grid.radius}>
          {entries.map(([name, value]) => (
            <div key={name} className="text-center">
              <div
                className={RadiusTokenStyles.box}
                style={{ borderRadius: value }}
                title={`--radius-${name}: ${value}`}
              />
              <p className={RadiusTokenStyles.label}>
                {name}
                <br />
                <span className="text-muted-foreground">{value}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
