'use client'

import { Suspense } from 'react'
import { Spinner } from '@stackone-ui/core/spinner'
import { AppLayout, LoadingStyles } from '../styles'

interface MainContentProps {
  children: React.ReactNode
}

/**
 * Fallback shown while page content is loading.
 * Uses Spinner for a lightweight, consistent loading indicator.
 */
function LoadingFallback() {
  return (
    <div className={LoadingStyles.page}>
      <Spinner size="lg" />
    </div>
  )
}

/**
 * Main content area that responds to sidebar expansion.
 * Includes Suspense boundary to catch any suspended children
 * and show a loading state while they resolve.
 */
export function MainContent({ children }: MainContentProps) {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className={AppLayout.mainAnimated}
    >
      <div className={AppLayout.content}>
        <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
      </div>
    </main>
  )
}
