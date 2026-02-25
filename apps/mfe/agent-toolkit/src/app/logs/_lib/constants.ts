/**
 * Filter value constants for logs page
 */

export const DateRange = {
  last24Hours: 'last24Hours',
  last7Days: 'last7Days',
  last30Days: 'last30Days',
  customRange: 'customRange',
} as const

export type DateRangeValue = (typeof DateRange)[keyof typeof DateRange]

export const Status = {
  all: 'all',
  success: '2xx',
  clientError: '4xx',
  serverError: '5xx',
} as const

export type StatusValue = (typeof Status)[keyof typeof Status]

/** URL search param keys */
export const FilterParams = {
  dateRange: 'range',
  status: 'status',
  search: 'q',
} as const

/** Default filter values */
export const FilterDefaults = {
  dateRange: DateRange.last24Hours,
  status: Status.all,
  search: '',
} as const
