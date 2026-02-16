'use client'

import { Suspense } from 'react'
import { Skeleton } from '@stackone-ui/core/skeleton'
import { useSidebar } from './SidebarContext'
import { AppLayout, Spacing } from '../styles'

interface MainContentProps {
  children: React.ReactNode
}

/**
 * Generic skeleton fallback for page loading states
 * Provides structural placeholder to prevent CLS during hydration
 */
function PageSkeleton() {
  return (
    <div className={Spacing.spaceY4}>
      <Skeleton className="h-10 w-64" />
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-96 w-full" />
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
      className={AppLayout.mainAnimated}
      style={{
        marginLeft: isExpanded ? expandedWidth : collapsedWidth,
      }}
    >
      <Suspense fallback={<PageSkeleton />}>{children}</Suspense>
    </main>
  )
}
