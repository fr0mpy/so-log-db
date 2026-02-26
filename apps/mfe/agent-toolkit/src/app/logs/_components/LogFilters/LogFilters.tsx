'use client'

import { useState, useEffect } from 'react'
import { Search, RefreshCw } from 'lucide-react'
import { Button } from '@stackone-ui/core/button'
import {
  DatePicker,
  Calendar,
  DateInput,
  type DateRange,
} from '@stackone-ui/core/date-picker'
import { DatePickerStyles } from '@stackone-ui/core/date-picker'
import { Dialog } from '@stackone-ui/core/dialog'
import { Input } from '@stackone-ui/core/input'
import { useTheme } from '@stackone-ui/core/providers'
import { Select, type SelectOption } from '@stackone-ui/core/select'
import { ThemeSwitcher } from '@stackone-ui/core/theme-switcher'
import { useTranslations, logs, aria } from '@stackone/i18n'
import { FilterRow, Text, LoadingStyles, FilterSelect, DialogOverrides } from '../../../../styles'
import {
  DateRange as DateRangeValues,
  Status,
  type DateRangeValue,
  type StatusValue,
} from '../../_lib'

interface LogFiltersProps {
  title: string
  dateRange: DateRangeValue
  status: StatusValue
  searchQuery: string
  onDateRangeChange: (value: DateRangeValue) => void
  onStatusChange: (value: StatusValue) => void
  onSearchChange: (value: string) => void
  onRefresh: () => void
  isRefreshing: boolean
}

export function LogFilters({
  title,
  dateRange,
  status,
  searchQuery,
  onDateRangeChange,
  onStatusChange,
  onSearchChange,
  onRefresh,
  isRefreshing,
}: LogFiltersProps) {
  const t = useTranslations()
  const { theme, toggle: toggleTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)

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
    { value: DateRangeValues.last24Hours, label: t(logs.filters.last24Hours) },
    { value: DateRangeValues.last7Days, label: t(logs.filters.last7Days) },
    { value: DateRangeValues.last30Days, label: t(logs.filters.last30Days) },
    {
      value: DateRangeValues.customRange,
      label: t(logs.filters.customRange),
      onSelect: ({ closePopup }) => {
        closePopup()
        setDatePickerOpen(true)
        return true // Prevent default setValue
      },
    },
  ]

  const statusOptions: SelectOption[] = [
    { value: Status.all, label: t(logs.filters.allStatuses) },
    { value: Status.success, label: t(logs.filters.success2xx) },
    { value: Status.clientError, label: t(logs.filters.clientError4xx) },
    { value: Status.serverError, label: t(logs.filters.serverError5xx) },
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
            placeholder={t(logs.placeholder)}
            aria-label={t(aria.filterInput)}
            leftIcon={<Search className="h-4 w-4" strokeWidth={2.5} />}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Filter Controls (Date + Status + Refresh) */}
        <div className={FilterRow.filterControls}>
          {/* Date Range Select */}
          <Select
            options={dateRangeOptions}
            value={dateRange}
            onValueChange={(value) => {
              if (value !== DateRangeValues.customRange) {
                setCustomRange(null)
              }
              onDateRangeChange(value as DateRangeValue)
            }}
            triggerMode="hover"
            width="auto"
            variant="ghost"
            className={FilterSelect.dateRange}
            dropdownMinWidth="6.5rem"
          />

          {/* Status Filter Select */}
          <Select
            options={statusOptions}
            value={status}
            onValueChange={(value) => onStatusChange(value as StatusValue)}
            triggerMode="hover"
            width="auto"
            variant="ghost"
            className={FilterSelect.status}
            dropdownMinWidth="5rem"
          />

          {/* Refresh Button */}
          <Button
            variant="inset"
            size="sm"
            iconOnly
            onClick={onRefresh}
            disabled={isRefreshing}
            aria-label={t(logs.filters.refresh)}
            className="group"
          >
            <RefreshCw
              className={`${FilterSelect.refreshIcon} ${isRefreshing ? LoadingStyles.spinning : ''}`}
              strokeWidth={2.5}
            />
          </Button>
        </div>

        {/* Theme Switcher - standalone */}
        <ThemeSwitcher
          isDark={theme === 'dark'}
          onToggle={toggleTheme}
          className={FilterRow.themeSwitcher}
        />
      </div>

      {/* Date Range Picker Dialog */}
      <Dialog.Root open={datePickerOpen} onOpenChange={setDatePickerOpen}>
        <Dialog.Content>
          <Dialog.Header className={DialogOverrides.headerCentered}>
            <Dialog.Title>{t(logs.filters.customRange)}</Dialog.Title>
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
