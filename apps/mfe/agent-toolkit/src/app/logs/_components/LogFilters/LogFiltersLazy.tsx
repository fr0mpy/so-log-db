'use client'

import type { ComponentProps } from 'react'
import dynamic from 'next/dynamic'
import type { LogFilters as LogFiltersType } from './LogFilters'

type LogFiltersProps = ComponentProps<typeof LogFiltersType>

export const LogFiltersLazy = dynamic<LogFiltersProps>(() =>
  import('./LogFilters').then((mod) => mod.LogFilters),
)
