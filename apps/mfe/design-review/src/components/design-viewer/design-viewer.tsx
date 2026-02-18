'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Text } from '@stackone-ui/core/text'
import { Button } from '@stackone-ui/core/button'
import type { DesignViewerProps } from './types'
import { DesignViewerStyles as S } from './styles'

export function DesignViewer({ screen }: DesignViewerProps) {
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

      <div className={S.carousel}>
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrev}
          aria-label="Previous annotation"
        >
          ←
        </Button>

        <div className={S.carouselContent}>
          <div className={S.carouselLabel}>
            <Text variant="subtitle" weight="semibold">
              {activeHotspot.label}
            </Text>
          </div>
          <div className={S.carouselInfo}>
            <Text variant="body1" weight="semibold">
              {activeHotspot.title}
            </Text>
            <Text variant="caption" color="muted">
              {activeHotspot.description}
            </Text>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleNext}
          aria-label="Next annotation"
        >
          →
        </Button>
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
