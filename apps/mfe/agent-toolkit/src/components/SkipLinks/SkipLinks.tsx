'use client'

import { useState, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { cn } from '@stackone-ui/core/utils'
import { SkipLinksStyles as S } from './styles'
import type { SkipLinkTarget } from './types'

/**
 * Skip link targets for the logs page
 * These IDs must match the tabindex="-1" elements in the page
 */
const SKIP_LINKS: SkipLinkTarget[] = [
  { id: 'filters', labelKey: 'skipLinks.filters' },
  { id: 'table', labelKey: 'skipLinks.table' },
  { id: 'pagination', labelKey: 'skipLinks.pagination' },
]

/**
 * Accessible skip links panel for keyboard navigation
 *
 * Appears as a slide-down bar when the user Tabs into the page,
 * allowing quick navigation to main page sections.
 *
 * @see https://a11y-guidelines.orange.com/en/articles/skip-links-best-practices/
 */
export function SkipLinks() {
  const [visible, setVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const t = useTranslations()

  const handleFocus = () => {
    setVisible(true)
  }

  const handleBlur = (e: React.FocusEvent) => {
    // Hide only if focus leaves the container entirely
    if (!containerRef.current?.contains(e.relatedTarget as Node)) {
      setVisible(false)
    }
  }

  const handleClick = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault()
    const target = document.getElementById(targetId)
    if (target) {
      target.focus()
      // Scroll into view smoothly
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setVisible(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent, targetId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      const target = document.getElementById(targetId)
      if (target) {
        target.focus()
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        setVisible(false)
      }
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn(S.container, visible && S.containerVisible)}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <nav className={S.nav} aria-label={t('skipLinks.ariaLabel')}>
        <ul className={S.list}>
          {SKIP_LINKS.map(({ id, labelKey }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={S.link}
                onClick={(e) => handleClick(e, id)}
                onKeyDown={(e) => handleKeyDown(e, id)}
              >
                {t(labelKey)}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
