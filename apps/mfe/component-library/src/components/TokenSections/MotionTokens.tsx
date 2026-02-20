'use client'

import { useState } from 'react'
import { motion as Motion } from 'motion/react'
import { DURATION } from '@stackone-ui/core/config'
import { TokenViewer, TokenGridStyles as S, MotionTokenStyles } from '../TokenViewer'
import { SpringDemo } from './SpringDemo'

interface MotionTokensProps {
  motion: Record<string, string>
}

const DURATION_ENTRIES = Object.entries(DURATION).map(([name, value]) => ({
  name,
  value,
  ms: Math.round(value * 1000),
}))

export function MotionTokens({
  motion,
}: MotionTokensProps) {
  const [showJson, setShowJson] = useState(false)

  return (
    <div className={S.container}>
      <div className={S.section.header}>
        <div>
          <h2 className={S.section.title}>Motion</h2>
          <p className={S.section.subtitle}>
            Animation durations and spring physics from @stackone-ui/core/config
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
            <p className={S.section.subtitle}>Durations (DURATION)</p>
            <div className={S.grid.motion}>
              {DURATION_ENTRIES.map(({ name, value, ms }) => (
                <div key={name} className={MotionTokenStyles.item}>
                  <p className={MotionTokenStyles.name}>{name}</p>
                  <p className={MotionTokenStyles.value}>
                    DURATION.{name}: {value}s ({ms}ms)
                  </p>
                  <div className={MotionTokenStyles.demoTrack}>
                    <Motion.div
                      animate={{ x: [0, 80, 0] }}
                      transition={{
                        duration: value,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className={MotionTokenStyles.demoBox}
                      title={`Animation with ${ms}ms duration`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Spring Physics */}
          <div className={S.section.wrapper}>
            <p className={S.section.subtitle}>Spring Physics (SPRING)</p>
            <SpringDemo />
          </div>
        </div>
      )}
    </div>
  )
}
