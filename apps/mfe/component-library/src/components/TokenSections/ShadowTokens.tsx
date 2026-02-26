'use client'

import { useState } from 'react'
import { TokenViewer, TokenGridStyles as S, ShadowTokenStyles } from '../TokenViewer'

interface ShadowTokensProps {
  shadows: {
    light: Record<string, string>
    dark: Record<string, string>
  }
}

export function ShadowTokens({
  shadows,
}: ShadowTokensProps) {
  const [showJson, setShowJson] = useState(false)
  const [mode, setMode] = useState<'light' | 'dark'>('light')

  const currentShadows = mode === 'light' ? shadows.light : shadows.dark
  const entries = Object.entries(currentShadows)

  // Group shadows by type
  const raisedShadows = entries.filter(([name]) => name.startsWith('raised'))
  const pressedShadows = entries.filter(([name]) => name.startsWith('pressed'))
  const variantShadows = entries.filter(([name]) => name.startsWith('variant-'))
  const controlShadows = entries.filter(([name]) => name.startsWith('control-'))
  const otherShadows = entries.filter(
    ([name]) =>
      !name.startsWith('raised')
      && !name.startsWith('pressed')
      && !name.startsWith('variant-')
      && !name.startsWith('control-'),
  )

  const renderShadowGrid = (shadowList: [string, string][], subtitle: string) => (
    <div className={S.section.wrapper}>
      <p className={S.section.subtitle}>{subtitle}</p>
      <div className={S.grid.shadows}>
        {shadowList.map(([name, value]) => (
          <div key={name} className="space-y-2">
            <div
              className={ShadowTokenStyles.box}
              style={{ boxShadow: value }}
              title={`--shadow-${name}`}
            />
            <p className={ShadowTokenStyles.label}>{name}</p>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className={S.container}>
      <div className={S.section.header}>
        <div>
          <h2 className={S.section.title}>Shadows</h2>
          <p className={S.section.subtitle}>
            Neumorphic shadows for depth and interaction states
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className={S.modeToggle.wrapper}>
            <button
              onClick={() => setMode('light')}
              className={`${S.modeToggle.button} ${mode === 'light' ? S.modeToggle.active : S.modeToggle.inactive}`}
            >
              Light
            </button>
            <button
              onClick={() => setMode('dark')}
              className={`${S.modeToggle.button} ${mode === 'dark' ? S.modeToggle.active : S.modeToggle.inactive}`}
            >
              Dark
            </button>
          </div>
          <button
            onClick={() => setShowJson(!showJson)}
            className={S.section.toggle}
          >
            {showJson ? 'Show Visual' : 'Show JSON'}
          </button>
        </div>
      </div>

      {showJson
        ? <TokenViewer data={currentShadows} title={`${mode} mode shadows`} />
        : (
          <div className="space-y-8">
            {raisedShadows.length > 0 && renderShadowGrid(raisedShadows, 'Raised (Elevated)')}
            {pressedShadows.length > 0 && renderShadowGrid(pressedShadows, 'Pressed (Inset)')}
            {otherShadows.length > 0 && renderShadowGrid(otherShadows, 'Utility')}
            {variantShadows.length > 0 && renderShadowGrid(variantShadows, 'Variant')}
            {controlShadows.length > 0 && renderShadowGrid(controlShadows, 'Control')}
          </div>
        )}
    </div>
  )
}
