'use client'

import dynamic from 'next/dynamic'
import type { ComponentProps } from 'react'
import type { LogFilters as LogFiltersType } from './LogFilters'

type LogFiltersProps = ComponentProps<typeof LogFiltersType>

/**
 * Code-split LogFilters - loads Select/@base-ui only when needed.
 *
 * NOTE: No loading prop - SSR handles initial render, loading.tsx handles
 * route transitions. Adding loading prop with SSR causes content→skeleton→content flash.
 */
export const LogFiltersLazy = dynamic<LogFiltersProps>(
  () => import('./LogFilters').then((mod) => mod.LogFilters)
)
