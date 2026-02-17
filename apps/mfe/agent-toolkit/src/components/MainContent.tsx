'use client'

import { Suspense } from 'react'
import { Skeleton } from '@stackone-ui/core/skeleton'
import { useSidebar } from './SidebarContext'
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
 * Uses CSS margin transition - flex-1 makes it shrink when sidebar expands
 */
export function MainContent({ children }: MainContentProps) {
  const { isExpanded, collapsedWidth, expandedWidth } = useSidebar()

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className={AppLayout.mainAnimated}
      style={{
        marginLeft: isExpanded ? expandedWidth : collapsedWidth,
      }}
    >
      <Suspense fallback={<PageSkeletonFallback />}>{children}</Suspense>
    </main>
  )
}
