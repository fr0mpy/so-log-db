'use client'

import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { formatTimestamp } from '@stackone/utils/formatters'
import { cn } from '@stackone-ui/core/utils'
import { Text } from '@stackone-ui/core/text'
import { Tag, type TagVariant } from '@stackone-ui/core/display'
import { Badge, type BadgeVariant } from '@stackone-ui/core/display'
import { UnderlyingRequestsStyles as S } from './styles'
import { RequestSection } from './RequestSection'
import { ResponseSection } from './ResponseSection'
import { LatencyBar } from '../../components/LatencyBar'
import type { UnderlyingRequestsTabProps, UnderlyingRequest } from './types'

/** Map HTTP method to Tag variant */
const METHOD_VARIANT: Record<string, TagVariant> = {
  GET: 'info',
  POST: 'success',
  PUT: 'warning',
  DELETE: 'destructive',
  PATCH: 'accent',
  HEAD: 'primary',
  OPTIONS: 'secondary',
}

/** Get status badge variant based on HTTP status code */
function getStatusVariant(status: number): BadgeVariant {
  if (status >= 200 && status < 300) return 'success'
  if (status >= 400 && status < 500) return 'warning'
  if (status >= 500) return 'destructive'
  return 'success'
}

interface UnderlyingRequestRowProps {
  request: UnderlyingRequest
  isExpanded: boolean
  onToggle: () => void
}

function UnderlyingRequestRow({ request, isExpanded, onToggle }: UnderlyingRequestRowProps) {
  const hasDetails = request.requestDetails || request.responseDetails

  return (
    <div>
      <button
        type="button"
        className={cn(S.row, isExpanded && S.rowExpanded)}
        onClick={onToggle}
        aria-expanded={isExpanded}
        disabled={!hasDetails}
      >
        <div className={S.methodCell}>
          <ChevronRight
            className={cn(
              S.expandIcon,
              isExpanded && S.expandIconExpanded,
              !hasDetails && 'opacity-0'
            )}
          />
          <Tag variant={METHOD_VARIANT[request.method] || 'muted'}>
            {request.method}
          </Tag>
          <Text variant="body2" truncate>{request.url.split('/').slice(-2).join('/')}</Text>
        </div>
        <Text variant="body2" color="muted">{formatTimestamp(request.timestamp)}</Text>
        <LatencyBar duration={request.duration} />
        <Badge variant={getStatusVariant(request.status)}>
          {request.status}
        </Badge>
      </button>

      {/* Expanded content */}
      {isExpanded && hasDetails && (
        <div className={S.expandedContent}>
          {request.requestDetails && (
            <RequestSection request={request.requestDetails} />
          )}
          {request.responseDetails && (
            <div className="mt-3">
              <ResponseSection response={request.responseDetails} />
            </div>
          )}
        </div>
      )}

      {/* No details available message */}
      {isExpanded && !hasDetails && (
        <div className={S.expandedContent}>
          <Text variant="body2" color="muted" italic>
            Details not available for this request
          </Text>
        </div>
      )}
    </div>
  )
}

/**
 * Underlying requests tab - table of nested API calls with expandable rows
 */
export function UnderlyingRequestsTab({ requests }: UnderlyingRequestsTabProps) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())

  const toggleRow = (id: string) => {
    setExpandedRows(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  if (!requests || requests.length === 0) {
    return (
      <div className={S.emptyState}>
        <Text variant="body2" color="muted">
          No underlying requests available for this log entry.
        </Text>
      </div>
    )
  }

  return (
    <div className={S.container}>
      {/* Request Rows */}
      {requests.map(request => (
        <UnderlyingRequestRow
          key={request.id}
          request={request}
          isExpanded={expandedRows.has(request.id)}
          onToggle={() => toggleRow(request.id)}
        />
      ))}
    </div>
  )
}
