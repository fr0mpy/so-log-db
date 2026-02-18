'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { TokenViewerStyles as S } from './styles'

interface TokenViewerProps {
  data: object
  title?: string
  showCopy?: boolean
}

/** Check if a string is a valid hex color */
function isHexColor(str: string): boolean {
  return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(str)
}

/** Check if a string contains rgba/rgb color */
function isRgbaColor(str: string): boolean {
  return /^rgba?\s*\(/.test(str)
}

/** Render a JSON value with syntax highlighting and color swatches */
function renderValue(value: unknown, indent: number): React.ReactNode {
  const indentStr = '  '.repeat(indent)

  if (value === null) {
    return <span className={S.json.null}>null</span>
  }

  if (typeof value === 'boolean') {
    return <span className={S.json.boolean}>{String(value)}</span>
  }

  if (typeof value === 'number') {
    return <span className={S.json.number}>{value}</span>
  }

  if (typeof value === 'string') {
    const isColor = isHexColor(value) || isRgbaColor(value)
    if (isColor) {
      return (
        <span className={S.colorValue}>
          <span
            className={S.colorSquare}
            style={{ backgroundColor: value }}
            title={value}
          />
          <span className={S.json.string}>"{value}"</span>
        </span>
      )
    }
    return <span className={S.json.string}>"{value}"</span>
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return (
        <>
          <span className={S.json.bracket}>[</span>
          <span className={S.json.bracket}>]</span>
        </>
      )
    }
    return (
      <>
        <span className={S.json.bracket}>[</span>
        {'\n'}
        {value.map((item, index) => (
          <span key={index}>
            {indentStr}  {renderValue(item, indent + 1)}
            {index < value.length - 1 && <span className={S.json.comma}>,</span>}
            {'\n'}
          </span>
        ))}
        {indentStr}<span className={S.json.bracket}>]</span>
      </>
    )
  }

  if (typeof value === 'object') {
    const entries = Object.entries(value)
    if (entries.length === 0) {
      return (
        <>
          <span className={S.json.bracket}>{'{'}</span>
          <span className={S.json.bracket}>{'}'}</span>
        </>
      )
    }
    return (
      <>
        <span className={S.json.bracket}>{'{'}</span>
        {'\n'}
        {entries.map(([key, val], index) => (
          <span key={key}>
            {indentStr}  <span className={S.json.key}>"{key}"</span>
            <span className={S.json.colon}>: </span>
            {renderValue(val, indent + 1)}
            {index < entries.length - 1 && <span className={S.json.comma}>,</span>}
            {'\n'}
          </span>
        ))}
        {indentStr}<span className={S.json.bracket}>{'}'}</span>
      </>
    )
  }

  return String(value)
}

export function TokenViewer({
  data,
  title,
  showCopy = true,
}: TokenViewerProps) {
  const [copied, setCopied] = useState(false)

  const renderedContent = renderValue(data, 0)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(data, null, 2))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API not available
    }
  }

  return (
    <div className={S.container}>
      {(title || showCopy) && (
        <div className={S.header.wrapper}>
          {title && <h3 className={S.header.title}>{title}</h3>}
          {showCopy && (
            <button
              onClick={handleCopy}
              className={`${S.copyButton} ${copied ? S.copied : ''}`}
              aria-label={copied ? 'Copied!' : 'Copy JSON'}
            >
              {copied ? (
                <>
                  <Check className="inline w-3 h-3 mr-1" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="inline w-3 h-3 mr-1" />
                  Copy
                </>
              )}
            </button>
          )}
        </div>
      )}
      <pre className={S.pre}>{renderedContent}</pre>
    </div>
  )
}
