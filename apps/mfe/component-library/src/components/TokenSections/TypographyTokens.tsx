'use client'

import { useState } from 'react'
import { TokenViewer, TokenGridStyles as S } from '../TokenViewer'

interface TypographyTokensProps {
  fonts: Record<string, string>
}

const TypographyStyles = {
  sample: {
    wrapper: 'p-4 rounded-theme-lg bg-neu-base shadow-neu-raised-sm space-y-2',
    label: 'font-mono text-xs text-muted-foreground',
    text: 'text-foreground',
  },
  scale: {
    wrapper: 'space-y-3',
    item: 'flex items-baseline gap-4',
    size: 'font-mono text-xs text-muted-foreground w-16 flex-shrink-0',
  },
} as const

export function TypographyTokens({
  fonts,
}: TypographyTokensProps) {
  const [showJson, setShowJson] = useState(false)

  const fontEntries = Object.entries(fonts)

  // Text size scale
  const textSizes = [
    { name: 'text-xs', size: '0.75rem', sample: 'Extra small text' },
    { name: 'text-sm', size: '0.875rem', sample: 'Small text' },
    { name: 'text-base', size: '1rem', sample: 'Base text size' },
    { name: 'text-lg', size: '1.125rem', sample: 'Large text' },
    { name: 'text-xl', size: '1.25rem', sample: 'Extra large text' },
    { name: 'text-2xl', size: '1.5rem', sample: 'Heading 2XL' },
    { name: 'text-3xl', size: '1.875rem', sample: 'Heading 3XL' },
    { name: 'text-4xl', size: '2.25rem', sample: 'Heading 4XL' },
  ]

  return (
    <div className={S.container}>
      <div className={S.section.header}>
        <div>
          <h2 className={S.section.title}>Typography</h2>
          <p className={S.section.subtitle}>
            Font families and text size scale
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
        ? <TokenViewer data={fonts} />
        : (
          <div className={S.grid.typography}>
            {/* Font Families */}
            <div className={S.section.wrapper}>
              <p className={S.section.subtitle}>Font Families</p>
              <div className="space-y-4">
                {fontEntries.map(([name, value]) => (
                  <div key={name} className={TypographyStyles.sample.wrapper}>
                    <p className={TypographyStyles.sample.label}>
                      --font-{name}
                    </p>
                    <p
                      className={`${TypographyStyles.sample.text} text-2xl`}
                      style={{ fontFamily: value }}
                    >
                      The quick brown fox jumps over the lazy dog
                    </p>
                    <p className="font-mono text-xs text-muted-foreground truncate">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Text Size Scale */}
            <div className={S.section.wrapper}>
              <p className={S.section.subtitle}>Text Size Scale</p>
              <div className={TypographyStyles.scale.wrapper}>
                {textSizes.map(({ name, size, sample }) => (
                  <div key={name} className={TypographyStyles.scale.item}>
                    <span className={TypographyStyles.scale.size}>
                      {name}
                      <br />
                      <span className="text-muted-foreground/60">{size}</span>
                    </span>
                    <span className={`text-foreground ${name}`}>{sample}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
    </div>
  )
}
