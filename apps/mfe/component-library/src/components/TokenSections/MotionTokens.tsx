'use client'

import { useState } from 'react'
import { TokenViewer, TokenGridStyles as S, MotionTokenStyles } from '../TokenViewer'

interface MotionTokensProps {
  motion: Record<string, string>
}

export function MotionTokens({
  motion,
}: MotionTokensProps) {
  const [showJson, setShowJson] = useState(false)

  // Separate duration and spring tokens
  const durationTokens = Object.entries(motion).filter(([name]) =>
    name.startsWith('duration-')
  )
  const springTokens = Object.entries(motion).filter(([name]) =>
    name.startsWith('spring-')
  )

  return (
    <div className={S.container}>
      <div className={S.section.header}>
        <div>
          <h2 className={S.section.title}>Motion</h2>
          <p className={S.section.subtitle}>
            Animation durations and spring physics
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
        <TokenViewer data={motion} />
      ) : (
        <div className="space-y-8">
          {/* Duration Tokens */}
          <div className={S.section.wrapper}>
            <p className={S.section.subtitle}>Durations</p>
            <div className={S.grid.motion}>
              {durationTokens.map(([name, value]) => (
                <div key={name} className={MotionTokenStyles.item}>
                  <p className={MotionTokenStyles.name}>{name.replace('duration-', '')}</p>
                  <p className={MotionTokenStyles.value}>
                    --motion-{name}: {value}
                  </p>
                  <div
                    className={`${MotionTokenStyles.demo} animate-pulse`}
                    style={{
                      animationDuration: value,
                      animationIterationCount: 'infinite',
                    }}
                    title={`Animation with ${value} duration`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Spring Tokens */}
          <div className={S.section.wrapper}>
            <p className={S.section.subtitle}>Spring Physics</p>
            <div className={S.grid.motion}>
              {springTokens.map(([name, value]) => (
                <div key={name} className={MotionTokenStyles.item}>
                  <p className={MotionTokenStyles.name}>
                    {name.replace('spring-', '').replace(/-/g, ' ')}
                  </p>
                  <p className={MotionTokenStyles.value}>
                    --motion-{name}: {value}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Used for spring-based animations
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
