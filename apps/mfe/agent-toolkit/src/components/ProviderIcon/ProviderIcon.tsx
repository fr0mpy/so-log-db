'use client'

import { useState, useRef } from 'react'
import { cn } from '@stackone-ui/core/utils'
import {
  ProviderIconStyles as S,
  ProviderFallbackColors,
  type ProviderFallbackColor,
} from './styles'
import { getProviderLogoUrl, isKnownProvider } from '../../config/providers'

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
  const prevNameRef = useRef(name)

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

  // Reset status only when name actually changes (not on initial mount)
  if (prevNameRef.current !== name) {
    prevNameRef.current = name
    if (hasLogo && imageStatus !== 'loading') {
      setImageStatus('loading')
    }
  }

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
          S.imageTransition,
        )}
        aria-hidden={!showFallback}
      >
        {fallbackLetter}
      </div>

      {/* Render image when provider has logo */}
      {showImage && (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions -- onLoad/onError are lifecycle events, not user interactions
        <img
          src={logoUrl}
          alt={`${name} logo`}
          className={cn(
            S.image,
            S.sizes[size],
            S.imageTransition,
            imageStatus === 'loaded' ? S.imageVisible : S.imageHidden,
          )}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
        />
      )}
    </div>
  )
}
