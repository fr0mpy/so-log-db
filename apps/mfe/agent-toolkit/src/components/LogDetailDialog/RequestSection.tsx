'use client'

import { Text } from '@stackone-ui/core/text'
import { Collapsible } from '@stackone-ui/core/collapsible'
import { KeyValueList, JsonView } from '@stackone-ui/core/display'
import { Section as S } from './styles'
import type { RequestSectionProps } from './types'

/**
 * Collapsible request section with headers, query params, and body sub-sections
 *
 * Uses nested Collapsible components from UI library
 */
export function RequestSection({ request }: RequestSectionProps) {
  const hasHeaders = request.headers && Object.keys(request.headers).length > 0
  const hasQueryParams = request.queryParams && Object.keys(request.queryParams).length > 0
  const hasBody = request.body !== undefined && request.body !== null

  return (
    <Collapsible className={S.container}>
      <Collapsible.Trigger className={S.header}>
        <Text variant="body2" weight="medium">Request</Text>
      </Collapsible.Trigger>

      <Collapsible.Content className={S.content}>
        {/* Headers Sub-section */}
        {hasHeaders && (
          <Collapsible className={S.subSection}>
            <Collapsible.Trigger className={S.subHeader}>
              <Text variant="body2" className={S.subTitle}>Headers</Text>
            </Collapsible.Trigger>
            <Collapsible.Content className={S.subContent}>
              <KeyValueList items={request.headers} copyable />
            </Collapsible.Content>
          </Collapsible>
        )}

        {/* Query Parameters Sub-section */}
        {hasQueryParams && request.queryParams && (
          <Collapsible className={S.subSection}>
            <Collapsible.Trigger className={S.subHeader}>
              <Text variant="body2" className={S.subTitle}>Query Parameters</Text>
            </Collapsible.Trigger>
            <Collapsible.Content className={S.subContent}>
              <KeyValueList items={request.queryParams} copyable />
            </Collapsible.Content>
          </Collapsible>
        )}

        {/* Body Sub-section */}
        {hasBody && (
          <Collapsible className={S.subSection}>
            <Collapsible.Trigger className={S.subHeader}>
              <Text variant="body2" className={S.subTitle}>Body</Text>
            </Collapsible.Trigger>
            <Collapsible.Content className={S.subContent}>
              <JsonView data={request.body} />
            </Collapsible.Content>
          </Collapsible>
        )}
      </Collapsible.Content>
    </Collapsible>
  )
}
