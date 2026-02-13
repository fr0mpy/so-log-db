// Common keys
export const brand = { name: 'brand.name' } as const

export const navigation = {
  dashboard: 'navigation.dashboard',
  logs: 'navigation.logs',
  search: 'navigation.search',
  explore: 'navigation.explore',
  connectors: 'navigation.connectors',
} as const

export const aria = {
  close: 'aria.close',
  loading: 'aria.loading',
  search: 'aria.search',
  filterByType: 'aria.filterByType',
  filterByTimeRange: 'aria.filterByTimeRange',
  filterByLevel: 'aria.filterByLevel',
  filterInput: 'aria.filterInput',
  previousSlide: 'aria.previousSlide',
  nextSlide: 'aria.nextSlide',
  goToSlide: 'aria.goToSlide',
  morePages: 'aria.morePages',
  previousPage: 'aria.previousPage',
  nextPage: 'aria.nextPage',
  decreaseValue: 'aria.decreaseValue',
  increaseValue: 'aria.increaseValue',
  breadcrumb: 'aria.breadcrumb',
  switchToLight: 'aria.switchToLight',
  switchToDark: 'aria.switchToDark',
  pagination: 'aria.pagination',
  selectLanguage: 'aria.selectLanguage',
} as const

export const labels = {
  previous: 'labels.previous',
  next: 'labels.next',
  loading: 'labels.loading',
} as const

export const placeholder = {
  search: 'placeholder.search',
  select: 'placeholder.select',
} as const

export const srOnly = {
  loading: 'srOnly.loading',
  close: 'srOnly.close',
  morePages: 'srOnly.morePages',
} as const

export const logLevels = {
  all: 'logLevels.all',
  error: 'logLevels.error',
  warning: 'logLevels.warning',
  info: 'logLevels.info',
  debug: 'logLevels.debug',
} as const

export const timeRanges = {
  last24Hours: 'timeRanges.last24Hours',
  last7Days: 'timeRanges.last7Days',
  last30Days: 'timeRanges.last30Days',
  customRange: 'timeRanges.customRange',
} as const

export const dataTypes = {
  all: 'dataTypes.all',
  logs: 'dataTypes.logs',
  traces: 'dataTypes.traces',
  events: 'dataTypes.events',
} as const

export const status = {
  healthy: 'status.healthy',
  unhealthy: 'status.unhealthy',
  degraded: 'status.degraded',
} as const

// Connectors MFE keys
export const metadata = {
  title: 'metadata.title',
  description: 'metadata.description',
} as const

export const sidebar = {
  title: 'sidebar.title',
  subtitle: 'sidebar.subtitle',
} as const

export const dashboard = {
  title: 'dashboard.title',
  description: 'dashboard.description',
  metadata: {
    title: 'dashboard.metadata.title',
    description: 'dashboard.metadata.description',
  },
  stats: {
    totalLogs: 'dashboard.stats.totalLogs',
    errors24h: 'dashboard.stats.errors24h',
    warnings24h: 'dashboard.stats.warnings24h',
  },
  cards: {
    viewLogs: {
      title: 'dashboard.cards.viewLogs.title',
      description: 'dashboard.cards.viewLogs.description',
    },
    search: {
      title: 'dashboard.cards.search.title',
      description: 'dashboard.cards.search.description',
    },
  },
} as const

export const logs = {
  title: 'logs.title',
  description: 'logs.description',
  metadata: {
    title: 'logs.metadata.title',
    description: 'logs.metadata.description',
  },
  placeholder: 'logs.placeholder',
  emptyState: 'logs.emptyState',
  entryPlaceholder: 'logs.entryPlaceholder',
} as const

export const logDetail = {
  title: 'logDetail.title',
  breadcrumbLog: 'logDetail.breadcrumbLog',
  metadata: {
    title: 'logDetail.metadata.title',
    description: 'logDetail.metadata.description',
  },
  fields: {
    logId: 'logDetail.fields.logId',
    timestamp: 'logDetail.fields.timestamp',
    level: 'logDetail.fields.level',
    message: 'logDetail.fields.message',
    metadata: 'logDetail.fields.metadata',
  },
  messagePlaceholder: 'logDetail.messagePlaceholder',
} as const

export const search = {
  title: 'search.title',
  description: 'search.description',
  metadata: {
    title: 'search.metadata.title',
    description: 'search.metadata.description',
  },
  placeholder: 'search.placeholder',
  sqliteReady: 'search.sqliteReady',
  emptyState: {
    primary: 'search.emptyState.primary',
    secondary: 'search.emptyState.secondary',
  },
  dataStrategy: {
    title: 'search.dataStrategy.title',
    items: {
      firstVisit: 'search.dataStrategy.items.firstVisit',
      returnVisit: 'search.dataStrategy.items.returnVisit',
      background: 'search.dataStrategy.items.background',
    },
  },
} as const

export const explore = {
  title: 'explore.title',
  description: 'explore.description',
  metadata: {
    title: 'explore.metadata.title',
    description: 'explore.metadata.description',
  },
  traces: {
    title: 'explore.traces.title',
    description: 'explore.traces.description',
    spans: 'explore.traces.spans',
  },
  services: {
    title: 'explore.services.title',
    description: 'explore.services.description',
  },
  dataStrategy: {
    title: 'explore.dataStrategy.title',
    description: 'explore.dataStrategy.description',
  },
} as const

// Shell keys
export const home = {
  title: 'home.title',
  description: 'home.description',
  connectors: 'home.connectors',
} as const
