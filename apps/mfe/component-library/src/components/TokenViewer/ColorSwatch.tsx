'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { ColorSwatchStyles as S } from './styles'

interface ColorSwatchProps {
  name: string
  value: string
  cssVar?: string
  tailwind?: string
}

export function ColorSwatch({
  name,
  value,
  cssVar,
  tailwind,
}: ColorSwatchProps) {
  const [copied, setCopied] = useState<string | null>(null)

  const handleCopy = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(type)
      setTimeout(() => setCopied(null), 1500)
    } catch {
      // Clipboard API not available
    }
  }

  return (
    <div className={S.container}>
      <div
        className={S.color}
        style={{ backgroundColor: value }}
        title={value}
      />
      <div className={S.info}>
        <span className={S.name}>{name}</span>
        <button
          onClick={() => handleCopy(value, 'value')}
          className={S.value}
          title="Click to copy hex value"
        >
          {copied === 'value' ? (
            <Check className="inline w-3 h-3 mr-0.5" />
          ) : (
            <Copy className="inline w-3 h-3 mr-0.5 opacity-50" />
          )}
          {value}
        </button>
        {cssVar && (
          <button
            onClick={() => handleCopy(cssVar, 'cssVar')}
            className={S.cssVar}
            title="Click to copy CSS variable"
          >
            {copied === 'cssVar' && <Check className="inline w-3 h-3 mr-0.5" />}
            {cssVar}
          </button>
        )}
        {tailwind && (
          <button
            onClick={() => handleCopy(tailwind, 'tailwind')}
            className={S.tailwind}
            title="Click to copy Tailwind class"
          >
            {copied === 'tailwind' && <Check className="inline w-3 h-3 mr-0.5" />}
            {tailwind}
          </button>
        )}
      </div>
    </div>
  )
}
