'use client'

import { useState, useEffect } from 'react'
import { Search, RefreshCw } from 'lucide-react'
import { Switch } from '@stackone-ui/core/switch'
import { Button } from '@stackone-ui/core/button'
import { ThemeSwitcher } from '@stackone-ui/core/theme-switcher'
import { useTheme } from '@stackone-ui/core/providers'
import { Select, type SelectOption } from '@stackone-ui/core/select'
import { Input } from '@stackone-ui/core/input'
import { Dialog } from '@stackone-ui/core/dialog'
import {
  DatePicker,
  Calendar,
  DateInput,
  type DateRange,
} from '@stackone-ui/core/date-picker'
import { FilterRow, Text, LoadingStyles, FilterSelect, DialogOverrides } from '../../styles'
import { DatePickerStyles } from '@stackone-ui/core/date-picker'

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
  // Filter state
  dateRange: string
  status: string
  searchQuery: string
  // Callbacks
  onDateRangeChange: (value: string) => void
  onStatusChange: (value: string) => void
  onSearchChange: (value: string) => void
  onRefresh: () => void
  isRefreshing: boolean
}

export function LogFilters({
  title,
  translations,
  dateRange,
  status,
  searchQuery,
  onDateRangeChange,
  onStatusChange,
  onSearchChange,
  onRefresh,
  isRefreshing,
}: LogFiltersProps) {
  const [backgroundLogs, setBackgroundLogs] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, toggle: toggleTheme } = useTheme()

  // DatePicker state
  const [datePickerOpen, setDatePickerOpen] = useState(false)
  const [customRange, setCustomRange] = useState<DateRange | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle custom range selection (just update state, don't close)
  const handleRangeChange = (range: DateRange | null) => {
    setCustomRange(range)
  }

  const dateRangeOptions: SelectOption[] = [
    { value: 'last24Hours', label: translations.last24Hours },
    { value: 'last7Days', label: translations.last7Days },
    { value: 'last30Days', label: translations.last30Days },
    {
      value: 'customRange',
      label: translations.customRange,
      onSelect: ({ closePopup }) => {
        closePopup()
        setDatePickerOpen(true)
        return true // Prevent default setValue
      },
    },
  ]

  const statusOptions = [
    { value: 'all', label: translations.allStatuses },
    { value: '2xx', label: translations.success2xx },
    { value: '4xx', label: translations.clientError4xx },
    { value: '5xx', label: translations.serverError5xx },
  ]

  const containerClass = isScrolled
    ? `${FilterRow.container} ${FilterRow.scrolled}`
    : FilterRow.container

  return (
    <>
      <div id="filters" tabIndex={-1} className={containerClass}>
        {/* Page Title */}
        <h1 className={Text.pageTitle}>{title}</h1>

        {/* Search Input */}
        <div className={FilterRow.searchWrapper}>
          <Input
            type="search"
            placeholder={translations.placeholder}
            aria-label={translations.aria.filterInput}
            leftIcon={<Search className="h-4 w-4" strokeWidth={2.5} />}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Date Range Select */}
        <Select
          options={dateRangeOptions}
          value={dateRange}
          onValueChange={(value) => {
            if (value !== 'customRange') {
              setCustomRange(null)
            }
            onDateRangeChange(value)
          }}
          triggerMode="hover"
          width="auto"
          variant="ghost"
          className={FilterSelect.dateRange}
        />

        {/* Status Filter Select */}
        <Select
          options={statusOptions}
          value={status}
          onValueChange={onStatusChange}
          triggerMode="hover"
          width="auto"
          variant="ghost"
          className={FilterSelect.status}
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

        {/* Actions Group (Theme + Refresh) */}
        <div className={FilterRow.actionsGroup}>
          <ThemeSwitcher
            isDark={theme === 'dark'}
            onToggle={toggleTheme}
          />
          <Button
            variant="inset"
            size="sm"
            iconOnly
            onClick={onRefresh}
            disabled={isRefreshing}
            aria-label={translations.refresh}
            className="group"
          >
            <RefreshCw
              className={`${FilterSelect.refreshIcon} ${isRefreshing ? LoadingStyles.spinning : ''}`}
              strokeWidth={2.5}
            />
          </Button>
        </div>
      </div>

      {/* Date Range Picker Dialog */}
      <Dialog.Root open={datePickerOpen} onOpenChange={setDatePickerOpen}>
        <Dialog.Content>
          <Dialog.Header className={DialogOverrides.headerCentered}>
            <Dialog.Title>{translations.customRange}</Dialog.Title>
          </Dialog.Header>
          <DatePicker.Root
            mode="range"
            rangeValue={customRange}
            onRangeChange={handleRangeChange}
            maxDate={new Date()}
          >
            <div className={DatePickerStyles.header.base}>
              <Calendar.Header />
              <Calendar.Nav />
            </div>
            <Calendar.Root>
              <Calendar.Grid />
            </Calendar.Root>
            <DateInput
              startPlaceholder="Filter from"
              endPlaceholder="Filter to"
            />
          </DatePicker.Root>
          <Dialog.Footer className={DialogOverrides.footerCentered}>
            <Button variant="ghost" onClick={() => setDatePickerOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                if (customRange?.start && customRange?.end) {
                  onDateRangeChange('customRange')
                  setDatePickerOpen(false)
                }
              }}
              disabled={!customRange?.start || !customRange?.end}
            >
              Apply
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
    </>
  )
}
