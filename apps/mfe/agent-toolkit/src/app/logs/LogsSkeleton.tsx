import { Skeleton } from '@stackone-ui/core/skeleton'
import { Spacing, FilterRow, SkeletonHeight } from '../../styles'
import { LogsContentSkeleton } from './LogsContentSkeleton'

/**
 * Full page skeleton for logs - used by loading.tsx
 * Mirrors the exact page structure to prevent CLS
 *
 * Heights use SkeletonHeight tokens which are tightly coupled to
 * ComponentHeight in @stackone-ui/core - no manual sync needed.
 */
export function LogsSkeleton() {
  return (
    <div className={Spacing.spaceY4}>
      {/* Filter Row Skeleton */}
      <div className={FilterRow.container}>
        {/* Title: text-2xl line-height */}
        <Skeleton className={`${SkeletonHeight.text2xl} w-12`} />
        {/* Search Input */}
        <div className={FilterRow.searchWrapper}>
          <Skeleton className={`${SkeletonHeight.input} w-full rounded-lg`} />
        </div>
        {/* Selects */}
        <Skeleton className={`${SkeletonHeight.select} w-[6.5rem] rounded-lg`} />
        <Skeleton className={`${SkeletonHeight.select} w-[5rem] rounded-lg`} />
        {/* Switch + label */}
        <div className={FilterRow.toggleWrapper}>
          <Skeleton className={`${SkeletonHeight.switch} rounded-full`} />
          <Skeleton className={`${SkeletonHeight.textXs} w-28`} />
        </div>
        {/* Refresh button */}
        <Skeleton className={`${SkeletonHeight.iconButtonSm} rounded-full`} />
      </div>

      {/* Content Skeleton - shared with LogsPageContent refresh state */}
      <LogsContentSkeleton />
    </div>
  )
}
