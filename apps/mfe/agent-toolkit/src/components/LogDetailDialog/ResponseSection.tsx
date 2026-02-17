'use client'

import { Text } from '@stackone-ui/core/text'
import { Collapsible } from '@stackone-ui/core/collapsible'
import { KeyValueList, JsonView } from '@stackone-ui/core/display'
import { Section as S } from './styles'
import type { ResponseSectionProps } from './types'

/**
 * Collapsible response section with headers and body sub-sections
 *
 * Uses nested Collapsible components from UI library.
 * Handles "Not available" state for response body.
 */
export function ResponseSection({ response }: ResponseSectionProps) {
  const hasHeaders = response.headers && Object.keys(response.headers).length > 0

  return (
    <Collapsible className={S.container}>
      <Collapsible.Trigger className={S.header}>
        <Text variant="body2" weight="medium">Response</Text>
      </Collapsible.Trigger>

      <Collapsible.Content className={S.content}>
        {/* Headers Sub-section */}
        {hasHeaders && (
          <Collapsible className={S.subSection}>
            <Collapsible.Trigger className={S.subHeader}>
              <Text variant="body2" className={S.subTitle}>Headers</Text>
            </Collapsible.Trigger>
            <Collapsible.Content className={S.subContent}>
              <KeyValueList items={response.headers} copyable />
            </Collapsible.Content>
          </Collapsible>
        )}

        {/* Body Sub-section */}
        <Collapsible className={S.subSection}>
          <Collapsible.Trigger className={S.subHeader}>
            <div className="flex items-center justify-between w-full">
              <Text variant="body2" className={S.subTitle}>Body</Text>
              {!response.bodyAvailable && (
                <Text variant="caption" color="muted" italic>Not available</Text>
              )}
            </div>
          </Collapsible.Trigger>
          <Collapsible.Content className={S.subContent}>
            {response.bodyAvailable && response.body ? (
              <JsonView data={response.body} />
            ) : (
              <Text variant="body2" color="muted" italic>
                Response body is not available for this request.
              </Text>
            )}
          </Collapsible.Content>
        </Collapsible>
      </Collapsible.Content>
    </Collapsible>
  )
}
