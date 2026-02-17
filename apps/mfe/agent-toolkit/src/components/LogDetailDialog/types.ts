/**
 * Types for LogDetailDialog component
 *
 * Extended log entry types with full request/response details
 * and underlying requests for the detail dialog view.
 */

// ============================================================================
// Base Types (imported from page, re-exported with extensions)
// ============================================================================

/** Base log entry - matches existing LogEntry in page.tsx */
export interface LogEntry {
  id: string
  timestamp: string
  provider: { name: string; version: string }
  originOwner: string
  source: string
  request: { method: string; name: string }
  duration: number
  status: number
}

// ============================================================================
// Request/Response Details
// ============================================================================

/** HTTP headers as key-value pairs */
export type HttpHeaders = Record<string, string>

/** Query parameters as key-value pairs */
export type QueryParams = Record<string, string | number>

/** Request details - shown in collapsible section */
export interface RequestDetails {
  method: string
  headers: HttpHeaders
  queryParams?: QueryParams
  body?: unknown
}

/** Response details - shown in collapsible section */
export interface ResponseDetails {
  status: number
  headers: HttpHeaders
  body?: unknown
  bodyAvailable: boolean
}

// ============================================================================
// Underlying Requests
// ============================================================================

/** Underlying request (nested API calls) */
export interface UnderlyingRequest {
  id: string
  timestamp: string
  method: string
  url: string
  duration: number
  status: number
  requestDetails?: RequestDetails
  responseDetails?: ResponseDetails
}

// ============================================================================
// Extended Log Entry
// ============================================================================

/** Extended log entry with full details for dialog view */
export interface LogEntryDetail extends LogEntry {
  url: string
  expires?: string
  requestDetails: RequestDetails
  responseDetails: ResponseDetails
  underlyingRequests?: UnderlyingRequest[]
}

// ============================================================================
// Error Explainer
// ============================================================================

/** Error explainer state machine */
export type ErrorExplainerStatus = 'idle' | 'generating' | 'complete' | 'error'

/** Error explainer source link */
export interface ExplainerSource {
  title: string
  url: string
}

/** Error explainer full state */
export interface ErrorExplainerState {
  status: ErrorExplainerStatus
  explanation?: string
  sources?: ExplainerSource[]
  feedback?: 'positive' | 'negative'
}

// ============================================================================
// Component Props
// ============================================================================

/** Main dialog props */
export interface LogDetailDialogProps {
  /** The log to display, or null if no log selected */
  log: LogEntryDetail | null
  /** All logs for navigation */
  logs: readonly LogEntryDetail[]
  /** Whether the dialog is open */
  open: boolean
  /** Callback when open state changes */
  onOpenChange: (open: boolean) => void
  /** Callback when navigating to a different log */
  onNavigate?: (log: LogEntryDetail) => void
}

/** Header props */
export interface LogDetailHeaderProps {
  log: LogEntryDetail
}

/** URL section props */
export interface UrlSectionProps {
  url: string
}

/** Details tab props */
export interface DetailsTabProps {
  log: LogEntryDetail
}

/** Request section props */
export interface RequestSectionProps {
  request: RequestDetails
}

/** Response section props */
export interface ResponseSectionProps {
  response: ResponseDetails
}

/** Error explainer props */
export interface ErrorExplainerProps {
  /** Whether to show the error explainer (typically for error status codes) */
  show: boolean
}

/** Underlying requests tab props */
export interface UnderlyingRequestsTabProps {
  requests: UnderlyingRequest[]
}

/** Key-value list props */
export interface KeyValueListProps {
  items: Record<string, string | number>
  /** Whether to show copy buttons on values */
  copyable?: boolean
}

/** JSON body props */
export interface JsonBodyProps {
  data: unknown
  /** Label for the section */
  label?: string
}

// ============================================================================
// Hook Return Types
// ============================================================================

/** useCopyToClipboard return type */
export interface UseCopyToClipboardReturn {
  /** Copy text to clipboard */
  copy: (text: string) => Promise<void>
  /** Whether copy was recently successful */
  copied: boolean
  /** Reset copied state */
  reset: () => void
}

/** useErrorExplainer return type */
export interface UseErrorExplainerReturn {
  /** Current state */
  state: ErrorExplainerState
  /** Generate explanation */
  generate: () => Promise<void>
  /** Submit feedback */
  submitFeedback: (feedback: 'positive' | 'negative') => void
  /** Reset state */
  reset: () => void
}
