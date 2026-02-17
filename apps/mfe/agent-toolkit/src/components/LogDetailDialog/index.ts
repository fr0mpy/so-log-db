// Main component
export { LogDetailDialog } from './LogDetailDialog'

// Sub-components (for potential reuse)
export { LogDetailHeader } from './LogDetailHeader'
export { DetailsTab } from './DetailsTab'
export { UnderlyingRequestsTab } from './UnderlyingRequestsTab'
export { RequestSection } from './RequestSection'
export { ResponseSection } from './ResponseSection'
export { ErrorExplainer } from './ErrorExplainer'

// Hooks
export { useErrorExplainer } from './hooks'

// Types
export type {
  LogEntry,
  LogEntryDetail,
  RequestDetails,
  ResponseDetails,
  HttpHeaders,
  QueryParams,
  UnderlyingRequest,
  ErrorExplainerState,
  LogDetailDialogProps,
} from './types'

// Re-export UI library components for convenience
export { KeyValueList, JsonView, UrlBar } from '@stackone-ui/core/display'
export { useCopyToClipboard } from '@stackone-ui/core/hooks'
