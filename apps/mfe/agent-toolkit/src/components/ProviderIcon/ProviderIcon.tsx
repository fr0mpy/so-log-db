'use client'

import { useState, useEffect } from 'react'
import { cn } from '@stackone-ui/core/utils'
import { getProviderLogoUrl, isKnownProvider } from '../../config/providers'
import {
  ProviderIconStyles as S,
  ProviderFallbackColors,
  type ProviderFallbackColor,
} from './styles'

interface ProviderIconProps {
  /** Provider name (e.g., 'Attio', 'Salesforce') */
  name: string
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Optional className override */
  className?: string
  /** Color for fallback letter avatar */
  fallbackColor?: ProviderFallbackColor
}

/** Determine fallback color based on provider name */
function getFallbackColorForProvider(name: string): ProviderFallbackColor {
  const lower = name.toLowerCase()
  if (lower === 'attio') return 'primary'
  if (lower === 'humaans') return 'secondary'
  return 'muted'
}

/**
 * ProviderIcon displays a provider's logo with graceful fallback to letter avatar.
 *
 * - Fetches logo from Clearbit API
 * - Shows first letter of provider name while loading or on error
 * - Cached by service worker with stale-while-revalidate strategy
 */
export function ProviderIcon({ name, size = 'sm', className, fallbackColor }: ProviderIconProps) {
  const [imageStatus, setImageStatus] = useState<'loading' | 'loaded' | 'error'>('loading')

  const logoUrl = getProviderLogoUrl(name)
  const hasLogo = logoUrl !== null && isKnownProvider(name)

  const resolvedFallbackColor = fallbackColor ?? getFallbackColorForProvider(name)
  const fallbackLetter = name.charAt(0).toUpperCase()

  const handleImageLoad = () => {
    setImageStatus('loaded')
  }

  const handleImageError = () => {
    setImageStatus('error')
  }

  // Reset status when name changes
  useEffect(() => {
    if (hasLogo) {
      setImageStatus('loading')
    }
  }, [name, hasLogo])

  // Show fallback while loading, on error, or for unknown providers
  const showFallback = !hasLogo || imageStatus !== 'loaded'
  const showImage = hasLogo && imageStatus !== 'error'

  return (
    <div className={cn(S.container, S.sizes[size], className)}>
      {/* Always render fallback, visible when needed */}
      <div
        className={cn(
          S.fallbackWrapper,
          S.sizes[size],
          S.fallbackLetter,
          ProviderFallbackColors[resolvedFallbackColor],
          showFallback ? 'opacity-100' : 'opacity-0',
          S.imageTransition
        )}
        aria-hidden={!showFallback}
      >
        {fallbackLetter}
      </div>

      {/* Render image when provider has logo */}
      {showImage && (
        <img
          src={logoUrl}
          alt={`${name} logo`}
          className={cn(
            S.image,
            S.sizes[size],
            S.imageTransition,
            imageStatus === 'loaded' ? S.imageVisible : S.imageHidden
          )}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
        />
      )}
    </div>
  )
}
