// Common keys
export const brand = { name: 'brand.name' } as const

export const skipLinks = {
  ariaLabel: 'skipLinks.ariaLabel',
  filters: 'skipLinks.filters',
  table: 'skipLinks.table',
  pagination: 'skipLinks.pagination',
} as const

export const navigation = {
  dashboard: 'navigation.dashboard',
  logs: 'navigation.logs',
  search: 'navigation.search',
  explore: 'navigation.explore',
  agentToolkit: 'navigation.agentToolkit',
  componentLibrary: 'navigation.componentLibrary',
  settings: 'navigation.settings',
  theme: 'navigation.theme',
} as const

export const aria = {
  close: 'aria.close',
  loading: 'aria.loading',
  search: 'aria.search',
  settings: 'aria.settings',
  filterByType: 'aria.filterByType',
  filterByTimeRange: 'aria.filterByTimeRange',
  filterByLevel: 'aria.filterByLevel',
  filterByStatus: 'aria.filterByStatus',
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
  viewLogDetails: 'aria.viewLogDetails',
  sortByColumn: 'aria.sortByColumn',
  mainNavigation: 'aria.mainNavigation',
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

export const settings = {
  title: 'settings.title',
  language: 'settings.language',
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

// Agent Toolkit MFE keys
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
  metadata: {
    title: 'logs.metadata.title',
    description: 'logs.metadata.description',
  },
  placeholder: 'logs.placeholder',
  emptyState: 'logs.emptyState',
  entryPlaceholder: 'logs.entryPlaceholder',
  table: {
    requested: 'logs.table.requested',
    provider: 'logs.table.provider',
    originOwner: 'logs.table.originOwner',
    source: 'logs.table.source',
    request: 'logs.table.request',
    duration: 'logs.table.duration',
    status: 'logs.table.status',
  },
  filters: {
    allStatuses: 'logs.filters.allStatuses',
    success2xx: 'logs.filters.success2xx',
    clientError4xx: 'logs.filters.clientError4xx',
    serverError5xx: 'logs.filters.serverError5xx',
    dateRange: 'logs.filters.dateRange',
    backgroundLogs: 'logs.filters.backgroundLogs',
    fullWidth: 'logs.filters.fullWidth',
    refresh: 'logs.filters.refresh',
    last24Hours: 'logs.filters.last24Hours',
    last7Days: 'logs.filters.last7Days',
    last30Days: 'logs.filters.last30Days',
    customRange: 'logs.filters.customRange',
  },
  dates: {
    today: 'logs.dates.today',
    yesterday: 'logs.dates.yesterday',
  },
  chart: {
    title: 'logs.chart.title',
    success: 'logs.chart.success',
    clientError: 'logs.chart.clientError',
    serverError: 'logs.chart.serverError',
  },
  stats: {
    successRate: 'logs.stats.successRate',
    avgLatency: 'logs.stats.avgLatency',
    totalRequests: 'logs.stats.totalRequests',
    errorRate: 'logs.stats.errorRate',
    success: 'logs.stats.success',
    errors: 'logs.stats.errors',
    clientErrors: 'logs.stats.clientErrors',
    serverErrors: 'logs.stats.serverErrors',
    vsLastPeriod: 'logs.stats.vsLastPeriod',
    ms: 'logs.stats.ms',
  },
  pagination: {
    showing: 'logs.pagination.showing',
    rowsPerPage: 'logs.pagination.rowsPerPage',
    show: 'logs.pagination.show',
    showRowsPerPage: 'logs.pagination.showRowsPerPage',
  },
  actions: {
    replay: 'logs.actions.replay',
    replayDescription: 'logs.actions.replayDescription',
    replayLoading: 'logs.actions.replayLoading',
    replaySuccess: 'logs.actions.replaySuccess',
    replayError: 'logs.actions.replayError',
    batchReplay: 'logs.actions.batchReplay',
    batchReplayDescription: 'logs.actions.batchReplayDescription',
    requestTester: 'logs.actions.requestTester',
    requestTesterDescription: 'logs.actions.requestTesterDescription',
    integration: 'logs.actions.integration',
    account: 'logs.actions.account',
  },
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
  // Dialog-specific keys
  dialog: {
    title: 'logDetail.dialog.title',
  },
  tabs: {
    details: 'logDetail.tabs.details',
    underlyingRequests: 'logDetail.tabs.underlyingRequests',
  },
  sections: {
    url: 'logDetail.sections.url',
    request: 'logDetail.sections.request',
    response: 'logDetail.sections.response',
    headers: 'logDetail.sections.headers',
    queryParams: 'logDetail.sections.queryParams',
    body: 'logDetail.sections.body',
  },
  labels: {
    provider: 'logDetail.labels.provider',
    organization: 'logDetail.labels.organization',
    source: 'logDetail.labels.source',
    expires: 'logDetail.labels.expires',
    notAvailable: 'logDetail.labels.notAvailable',
    copyUrl: 'logDetail.labels.copyUrl',
    copied: 'logDetail.labels.copied',
  },
  errorExplainer: {
    title: 'logDetail.errorExplainer.title',
    openToGenerate: 'logDetail.errorExplainer.openToGenerate',
    generating: 'logDetail.errorExplainer.generating',
    viaAdvancedLogs: 'logDetail.errorExplainer.viaAdvancedLogs',
    feedbackHelpful: 'logDetail.errorExplainer.feedbackHelpful',
    feedbackNotHelpful: 'logDetail.errorExplainer.feedbackNotHelpful',
  },
  underlying: {
    requested: 'logDetail.underlying.requested',
    request: 'logDetail.underlying.request',
    duration: 'logDetail.underlying.duration',
    status: 'logDetail.underlying.status',
    detailsNotAvailable: 'logDetail.underlying.detailsNotAvailable',
  },
  aria: {
    dialogTitle: 'logDetail.aria.dialogTitle',
    copyUrl: 'logDetail.aria.copyUrl',
    toggleSection: 'logDetail.aria.toggleSection',
    expandRow: 'logDetail.aria.expandRow',
    navigatePrevious: 'logDetail.aria.navigatePrevious',
    navigateNext: 'logDetail.aria.navigateNext',
  },
  actions: {
    close: 'logDetail.actions.close',
    navigate: 'logDetail.actions.navigate',
  },
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

// DatePicker keys
export const datePicker = {
  aria: {
    dialog: 'datePicker.aria.dialog',
    calendar: 'datePicker.aria.calendar',
    previousMonth: 'datePicker.aria.previousMonth',
    nextMonth: 'datePicker.aria.nextMonth',
    selectDate: 'datePicker.aria.selectDate',
    selectRange: 'datePicker.aria.selectRange',
  },
  presets: {
    today: 'datePicker.presets.today',
    yesterday: 'datePicker.presets.yesterday',
    last7Days: 'datePicker.presets.last7Days',
    last30Days: 'datePicker.presets.last30Days',
    thisMonth: 'datePicker.presets.thisMonth',
    lastMonth: 'datePicker.presets.lastMonth',
  },
  labels: {
    startDate: 'datePicker.labels.startDate',
    endDate: 'datePicker.labels.endDate',
    selectDate: 'datePicker.labels.selectDate',
    selectRange: 'datePicker.labels.selectRange',
    apply: 'datePicker.labels.apply',
    cancel: 'datePicker.labels.cancel',
    clear: 'datePicker.labels.clear',
  },
} as const

// Shell keys
export const home = {
  title: 'home.title',
  description: 'home.description',
  agentToolkit: 'home.agentToolkit',
} as const
