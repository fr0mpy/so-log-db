'use client'

import { useState } from 'react'
import { ColorSwatch, TokenViewer, TokenGridStyles as S } from '../TokenViewer'

interface ColorTokensProps {
  colors: Record<string, string>
  title: string
  mode?: 'light' | 'dark'
}

/** Map color name to CSS variable and Tailwind class */
function getColorMeta(name: string) {
  // Map semantic names to their Tailwind equivalents
  const tailwindMap: Record<string, string> = {
    'primary': 'bg-primary',
    'primary-foreground': 'text-primary-foreground',
    'primary-hover': 'hover:bg-primary-hover',
    'secondary': 'bg-secondary',
    'secondary-foreground': 'text-secondary-foreground',
    'secondary-hover': 'hover:bg-secondary-hover',
    'background': 'bg-background',
    'foreground': 'text-foreground',
    'surface': 'bg-surface',
    'muted': 'bg-muted',
    'muted-foreground': 'text-muted-foreground',
    'border': 'border-border',
    'destructive': 'bg-destructive',
    'destructive-foreground': 'text-destructive-foreground',
    'destructive-hover': 'hover:bg-destructive-hover',
    'accent': 'bg-accent',
    'accent-foreground': 'text-accent-foreground',
    'success': 'bg-success',
    'success-foreground': 'text-success-foreground',
    'warning': 'bg-warning',
    'warning-foreground': 'text-warning-foreground',
    'info': 'bg-info',
    'info-foreground': 'text-info-foreground',
    'neu-base': 'bg-neu-base',
    'neu-light': 'bg-neu-light',
    'neu-dark': 'bg-neu-dark',
  }

  return {
    cssVar: `--color-${name}`,
    tailwind: tailwindMap[name] || `bg-${name}`,
  }
}

export function ColorTokens({
  colors,
  title,
}: ColorTokensProps) {
  const [showJson, setShowJson] = useState(false)

  const entries = Object.entries(colors)

  // Group colors by category
  const semanticColors = entries.filter(([name]) =>
    ['primary', 'secondary', 'destructive', 'success', 'warning', 'info', 'accent'].some(
      (prefix) => name.startsWith(prefix),
    ),
  )
  const neutralColors = entries.filter(([name]) =>
    ['background', 'foreground', 'surface', 'muted', 'border'].some(
      (prefix) => name.startsWith(prefix),
    ),
  )
  const neuColors = entries.filter(([name]) => name.startsWith('neu-'))
  const spinnerColors = entries.filter(([name]) => name.startsWith('spinner-'))

  const renderColorGrid = (colorList: [string, string][], subtitle: string) => (
    <div className={S.section.wrapper}>
      <p className={S.section.subtitle}>{subtitle}</p>
      <div className={S.grid.colors}>
        {colorList.map(([name, value]) => {
          const meta = getColorMeta(name)
          return (
            <ColorSwatch
              key={name}
              name={name}
              value={value}
              cssVar={meta.cssVar}
              tailwind={meta.tailwind}
            />
          )
        })}
      </div>
    </div>
  )

  return (
    <div className={S.container}>
      <div className={S.section.header}>
        <h2 className={S.section.title}>{title}</h2>
        <button
          onClick={() => setShowJson(!showJson)}
          className={S.section.toggle}
        >
          {showJson ? 'Show Swatches' : 'Show JSON'}
        </button>
      </div>

      {showJson
        ? <TokenViewer data={colors} />
        : (
          <div className="space-y-6">
            {semanticColors.length > 0 && renderColorGrid(semanticColors, 'Semantic Colors')}
            {neutralColors.length > 0 && renderColorGrid(neutralColors, 'Neutral Colors')}
            {neuColors.length > 0 && renderColorGrid(neuColors, 'Neumorphic Colors')}
            {spinnerColors.length > 0 && renderColorGrid(spinnerColors, 'Spinner Colors')}
          </div>
        )}
    </div>
  )
}
