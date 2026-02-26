'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Text } from '@stackone-ui/core/text'
import { useTranslations, aria } from '@stackone/i18n'
import { DesignViewerStyles as S } from './styles'
import type { DesignViewerProps } from './types'

export function DesignViewer({ screen }: DesignViewerProps) {
  const t = useTranslations()
  const [activeIndex, setActiveIndex] = useState(0)
  const activeHotspot = screen.hotspots[activeIndex]

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? screen.hotspots.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === screen.hotspots.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className={S.container}>
      <div className={S.imageWrapper}>
        <Image
          src={screen.imageSrc}
          alt={screen.name}
          width={1280}
          height={800}
          className={S.image}
          priority
        />
      </div>

      <div className={S.carouselWrapper}>
        <button
          className={S.navButton}
          onClick={handlePrev}
          aria-label={t(aria.previousAnnotation)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div className={S.carousel}>
          <div className={S.carouselInfo}>
            <Text variant="body1" weight="semibold">
              {activeHotspot.title}
            </Text>
            <Text variant="caption" color="muted">
              {activeHotspot.description}
            </Text>
          </div>
        </div>

        <button
          className={S.navButton}
          onClick={handleNext}
          aria-label={t(aria.nextAnnotation)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      <div className={S.indicators}>
        {screen.hotspots.map((hotspot, index) => (
          <button
            key={hotspot.label}
            className={index === activeIndex ? S.indicatorActive : S.indicator}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to ${hotspot.label}: ${hotspot.title}`}
          >
            {hotspot.label}
          </button>
        ))}
      </div>
    </div>
  )
}
