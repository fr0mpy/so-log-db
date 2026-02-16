'use client'

import { useState, useMemo, useEffect } from 'react'
import { Search, RefreshCw } from 'lucide-react'
import { Switch } from '@stackone-ui/core/switch'
import { Button } from '@stackone-ui/core/button'
import { Select } from '@stackone-ui/core/select'
import { Input } from '@stackone-ui/core/input'
import { FilterRow, Text } from '../../styles'

interface LogFiltersProps {
  title: string
  translations: {
    placeholder: string
    dateRange: string
    backgroundLogs: string
    refresh: string
    last24Hours: string
    last7Days: string
    last30Days: string
    customRange: string
    allStatuses: string
    success2xx: string
    clientError4xx: string
    serverError5xx: string
    aria: {
      filterInput: string
      filterByStatus: string
      filterByTimeRange: string
    }
  }
}

export function LogFilters({ title, translations }: LogFiltersProps) {
  const [backgroundLogs, setBackgroundLogs] = useState(false)
  const [dateRange, setDateRange] = useState('last24Hours')
  const [status, setStatus] = useState('all')
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleRefresh = () => {
    // Trigger refresh - would be connected to data fetching in real implementation
    window.location.reload()
  }

  const dateRangeOptions = useMemo(
    () => [
      { value: 'last24Hours', label: translations.last24Hours },
      { value: 'last7Days', label: translations.last7Days },
      { value: 'last30Days', label: translations.last30Days },
      { value: 'customRange', label: translations.customRange },
    ],
    [translations]
  )

  const statusOptions = useMemo(
    () => [
      { value: 'all', label: translations.allStatuses },
      { value: '2xx', label: translations.success2xx },
      { value: '4xx', label: translations.clientError4xx },
      { value: '5xx', label: translations.serverError5xx },
    ],
    [translations]
  )

  const containerClass = isScrolled
    ? `${FilterRow.container} ${FilterRow.scrolled}`
    : FilterRow.container

  return (
    <>
      <div className={containerClass}>
        {/* Page Title */}
        <h1 className={Text.pageTitle}>{title}</h1>

        {/* Search Input */}
        <div className={FilterRow.searchWrapper}>
          <Input
            type="search"
            placeholder={translations.placeholder}
            aria-label={translations.aria.filterInput}
            leftIcon={<Search className="h-4 w-4" />}
          />
        </div>

        {/* Date Range Select */}
        <Select
          options={dateRangeOptions}
          value={dateRange}
          onValueChange={setDateRange}
          triggerMode="hover"
          width="auto"
        />

        {/* Status Filter Select */}
        <Select
          options={statusOptions}
          value={status}
          onValueChange={setStatus}
          triggerMode="hover"
          width="auto"
        />

        {/* Background Logs Toggle */}
        <div className={FilterRow.toggleWrapper}>
          <Switch
            checked={backgroundLogs}
            onCheckedChange={setBackgroundLogs}
            aria-label={translations.backgroundLogs}
          />
          <span className={FilterRow.label}>{translations.backgroundLogs}</span>
        </div>

        {/* Refresh Button */}
        <Button
          variant="outline"
          size="sm"
          iconOnly
          onClick={handleRefresh}
          aria-label={translations.refresh}
        >
          <RefreshCw className="w-4 h-4" strokeWidth={2.5} />
        </Button>
      </div>
    </>
  )
}
