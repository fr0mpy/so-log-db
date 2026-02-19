'use client'

import { AppLayout } from '../styles'

interface MainContentProps {
  children: React.ReactNode
}

/**
 * Main content area that responds to sidebar expansion
 * Uses flex-1 to naturally fill remaining space beside sticky sidebar
 *
 * Note: Loading states are handled by route-level loading.tsx files,
 * not by a Suspense boundary here. This keeps the loading skeleton
 * specific to each route (e.g., LogsSkeleton for /logs).
 */
export function MainContent({ children }: MainContentProps) {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className={AppLayout.mainAnimated}
    >
      <div className={AppLayout.content}>{children}</div>
    </main>
  )
}
