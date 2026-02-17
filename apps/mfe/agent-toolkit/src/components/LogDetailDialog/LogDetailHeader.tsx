'use client'

import { Building2, Globe, Clock } from 'lucide-react'
import { Text } from '@stackone-ui/core/text'
import { Tag, type TagVariant } from '@stackone-ui/core/display'
import { Badge, type BadgeVariant } from '@stackone-ui/core/display'
import { HeaderBar as HB, MetadataRow as MR } from './styles'
import { ProviderIcon } from '../../components/ProviderIcon'
import { LatencyBar } from '../../components/LatencyBar'
import type { LogDetailHeaderProps } from './types'

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

/** Format date for display - matches table format */
function formatDate(iso: string): string {
  const date = new Date(iso)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  const isToday = date.toDateString() === today.toDateString()
  const isYesterday = date.toDateString() === yesterday.toDateString()

  if (isToday) return 'TODAY'
  if (isYesterday) return 'YESTERDAY'

  const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase()
  const day = date.getDate().toString().padStart(2, '0')
  return `${month} ${day}`
}

/** Format time for display */
function formatTime(iso: string): string {
  const date = new Date(iso)
  return date.toLocaleTimeString('en-US', { hour12: false })
}


/**
 * Header component showing request info and metadata pills
 *
 * Two rows:
 * 1. Method badge, request name, timestamp, duration, status
 * 2. Provider, Organization, Source, Expires
 */
export function LogDetailHeader({ log }: LogDetailHeaderProps) {
  return (
    <>
      {/* Top Header Bar */}
      <div className={HB.container}>
        <div className={HB.left}>
          <Tag variant={METHOD_VARIANT[log.request.method] || 'muted'}>
            {log.request.method}
          </Tag>
          <Text variant="body1" weight="medium">
            {log.provider.name}: {log.request.name.replace(new RegExp(`^${log.provider.name}\\s*`, 'i'), '')}
          </Text>
        </div>
        <div className={HB.right}>
          <div className={HB.timestamp}>
            <Text variant="caption">
              {formatDate(log.timestamp)}
            </Text>
            <Text variant="body2">
              {formatTime(log.timestamp)}
            </Text>
          </div>
          <LatencyBar duration={log.duration} />
          <Badge variant={getStatusVariant(log.status)}>
            {log.status}
          </Badge>
        </div>
      </div>

      {/* Metadata Row */}
      <div className={MR.container}>
        {/* Provider */}
        <div className={MR.item}>
          <Text variant="caption" color="muted">Provider</Text>
          <div className={MR.valueRow}>
            <ProviderIcon name={log.provider.name} size="sm" />
            <Text variant="body2" weight="medium">{log.provider.name}</Text>
          </div>
        </div>

        {/* Organization */}
        <div className={MR.item}>
          <Text variant="caption" color="muted">Organization</Text>
          <div className={MR.valueRow}>
            <Building2 className={MR.icon} />
            <Text variant="body2" weight="medium">{log.originOwner}</Text>
          </div>
        </div>

        {/* Source */}
        <div className={MR.item}>
          <Text variant="caption" color="muted">Source</Text>
          <div className={MR.valueRow}>
            <Globe className={MR.icon} />
            <Text variant="body2" weight="medium">{log.source}</Text>
          </div>
        </div>

        {/* Expires (if available) */}
        {log.expires && (
          <div className={MR.item}>
            <Text variant="caption" color="muted">Expires</Text>
            <div className={MR.valueRow}>
              <Clock className={MR.icon} />
              <Text variant="body2" weight="medium">{log.expires}</Text>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
