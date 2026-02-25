import { Skeleton } from '@stackone-ui/core/skeleton'
import { Spacing, FilterRow, SkeletonHeight, LogsPageSkeleton } from '../../../styles'
import { LogsContentSkeleton } from './LogsContent'

/**
 * Full page skeleton for logs - used by loading.tsx
 * Mirrors the exact page structure to prevent CLS
 *
 * Heights use SkeletonHeight tokens which are tightly coupled to
 * ComponentHeight in @stackone-ui/core - no manual sync needed.
 * Updated: Pixel-perfect measurements verified with Playwright
 */
export function LogsSkeleton() {
  return (
    <div className={Spacing.spaceY4}>
      {/* Filter Row Skeleton - PIXEL PERFECT measurements */}
      <div className={FilterRow.container}>
        {/* Title: 57×32px + 20px margin-right (matches Text.pageTitle mr-5) */}
        <Skeleton className={`${SkeletonHeight.text2xl} w-[57px] mr-5`} />
        {/* Search Input: flex×44px */}
        <div className={FilterRow.searchWrapper}>
          <Skeleton className={`${SkeletonHeight.input} w-full rounded-lg`} />
        </div>
        {/* Filter Controls: Date 88×44, Status 64×44, Refresh 32×32 */}
        <div className={FilterRow.filterControls}>
          <Skeleton className={`${SkeletonHeight.select} w-[88px] rounded-lg`} />
          <Skeleton className={`${SkeletonHeight.select} w-16 rounded-lg`} />
          <Skeleton className={`${SkeletonHeight.iconButtonSm} rounded-full`} />
        </div>
        {/* Theme Switcher: 56×32px */}
        <Skeleton className={LogsPageSkeleton.headerTheme} />
      </div>

      {/* Content Skeleton - shared with LogsPageContent refresh state */}
      <LogsContentSkeleton />
    </div>
  )
}
