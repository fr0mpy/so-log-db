/**
 * Loading State Styles
 *
 * Follows zero-inline-classnames pattern for loading.tsx files.
 */

import { Layout } from '@stackone-ui/core/styles'

/**
 * Note: min-h-[50vh] is an arbitrary value because Tailwind doesn't provide
 * a 50% viewport height token. This provides a reasonable loading container
 * height without taking up the full screen.
 */
export const LoadingStyles = {
  /** Full-page centered loading container (50vh min-height for visible loading state) */
  page: [Layout.Flex.centerBoth, 'min-h-[50vh]'].join(' '),
} as const
