'use client'

import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useCallback } from 'react'
import {
  FilterParams,
  FilterDefaults,
  type DateRangeValue,
  type StatusValue,
} from './constants'

export interface LogFilters {
  dateRange: DateRangeValue
  status: StatusValue
  search: string
}

export interface UseLogFiltersReturn {
  filters: LogFilters
  setDateRange: (value: DateRangeValue) => void
  setStatus: (value: StatusValue) => void
  setSearch: (value: string) => void
}

export function useLogFilters(): UseLogFiltersReturn {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const filters: LogFilters = {
    dateRange: (searchParams.get(FilterParams.dateRange) as DateRangeValue) ?? FilterDefaults.dateRange,
    status: (searchParams.get(FilterParams.status) as StatusValue) ?? FilterDefaults.status,
    search: searchParams.get(FilterParams.search) ?? FilterDefaults.search,
  }

  const updateParams = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())

      if (value === '' || value === FilterDefaults[key as keyof typeof FilterDefaults]) {
        params.delete(key)
      } else {
        params.set(key, value)
      }

      const query = params.toString()
      router.push(query ? `${pathname}?${query}` : pathname, { scroll: false })
    },
    [searchParams, router, pathname]
  )

  const setDateRange = useCallback(
    (value: DateRangeValue) => updateParams(FilterParams.dateRange, value),
    [updateParams]
  )

  const setStatus = useCallback(
    (value: StatusValue) => updateParams(FilterParams.status, value),
    [updateParams]
  )

  const setSearch = useCallback(
    (value: string) => updateParams(FilterParams.search, value),
    [updateParams]
  )

  return {
    filters,
    setDateRange,
    setStatus,
    setSearch,
  }
}
