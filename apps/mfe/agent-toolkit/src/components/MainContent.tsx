'use client'

import { Suspense } from 'react'
import { Skeleton } from '@stackone-ui/core/skeleton'
import { AppLayout, Spacing, PageSkeleton } from '../styles'

interface MainContentProps {
  children: React.ReactNode
}

/**
 * Generic skeleton fallback for page loading states
 * Provides structural placeholder to prevent CLS during hydration
 */
function PageSkeletonFallback() {
  return (
    <div className={Spacing.spaceY4}>
      <Skeleton className={PageSkeleton.title} />
      <Skeleton className={PageSkeleton.chart} />
      <Skeleton className={PageSkeleton.table} />
    </div>
  )
}

/**
 * Main content area that responds to sidebar expansion
 * Uses flex-1 to naturally fill remaining space beside sticky sidebar
 */
export function MainContent({ children }: MainContentProps) {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className={AppLayout.mainAnimated}
    >
      <div className={AppLayout.content}>
        <Suspense fallback={<PageSkeletonFallback />}>{children}</Suspense>
      </div>
    </main>
  )
}
