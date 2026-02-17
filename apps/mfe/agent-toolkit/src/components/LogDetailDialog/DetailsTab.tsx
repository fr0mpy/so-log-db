'use client'

import { UrlBar } from '@stackone-ui/core/display'
import { RequestSection } from './RequestSection'
import { ResponseSection } from './ResponseSection'
import { ErrorExplainer } from './ErrorExplainer'
import type { DetailsTabProps } from './types'

/**
 * Details tab content - composes URL, Request, Response, and Error Explainer sections
 */
export function DetailsTab({ log }: DetailsTabProps) {
  // Show error explainer for 4xx and 5xx status codes
  const showErrorExplainer = log.responseDetails.status >= 400

  return (
    <div className="space-y-4">
      {/* URL Section */}
      <UrlBar url={log.url} />

      {/* Request Section */}
      <RequestSection request={log.requestDetails} />

      {/* Response Section */}
      <ResponseSection response={log.responseDetails} />

      {/* Error Explainer - shown for error status codes */}
      <ErrorExplainer show={showErrorExplainer} />
    </div>
  )
}
