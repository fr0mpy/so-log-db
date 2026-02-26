'use client'

import { useCallback, useEffect } from 'react'
import { X, ChevronUp, ChevronDown } from 'lucide-react'
import { Button } from '@stackone-ui/core/button'
import { Dialog } from '@stackone-ui/core/dialog'
import { Tabs } from '@stackone-ui/core/tabs'
import { useTranslations, aria } from '@stackone/i18n'
import { DetailsTab } from './DetailsTab'
import { LogDetailHeader } from './LogDetailHeader'
import { DialogStyles, TabsStyles, FooterStyles, IconSize } from './styles'
import { UnderlyingRequestsTab } from './UnderlyingRequestsTab'
import type { LogDetailDialogProps, LogEntryDetail } from './types'

/**
 * Nearly full-screen dialog showing detailed log information
 *
 * Features:
 * - Header with request info and metadata pills
 * - Tabs for Details and Underlying Requests
 * - Keyboard navigation between logs (arrow keys)
 * - Close via Escape, backdrop click, or close button
 */
export function LogDetailDialog({
  log,
  logs,
  open,
  onOpenChange,
  onNavigate,
}: LogDetailDialogProps) {
  const t = useTranslations()
  // Find current log index for navigation
  const currentIndex = log ? logs.findIndex(l => l.id === log.id) : -1
  const canNavigatePrevious = currentIndex > 0
  const canNavigateNext = currentIndex < logs.length - 1 && currentIndex !== -1

  // Navigate to previous/next log
  const navigateToPrevious = useCallback(() => {
    if (canNavigatePrevious && onNavigate) {
      onNavigate(logs[currentIndex - 1] as LogEntryDetail)
    }
  }, [canNavigatePrevious, currentIndex, logs, onNavigate])

  const navigateToNext = useCallback(() => {
    if (canNavigateNext && onNavigate) {
      onNavigate(logs[currentIndex + 1] as LogEntryDetail)
    }
  }, [canNavigateNext, currentIndex, logs, onNavigate])

  // Keyboard navigation
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle arrow keys when not focused on an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault()
        navigateToPrevious()
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault()
        navigateToNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, navigateToPrevious, navigateToNext])

  if (!log) {
    return null
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content className={DialogStyles.content} showClose={false}>
        <div className={DialogStyles.inner}>
          {/* Header */}
          <LogDetailHeader log={log} />

          {/* Close button - positioned absolutely */}
          <div className={DialogStyles.closeButtonWrapper}>
            <Button
              variant="inset"
              size="sm"
              iconOnly
              onClick={() => onOpenChange(false)}
              aria-label={t(aria.close)}
            >
              <X className={IconSize.sm} />
            </Button>
          </div>

          {/* Tabs */}
          <Tabs.Root defaultValue="details" className={TabsStyles.root}>
            <Tabs.List className={TabsStyles.list}>
              <Tabs.Trigger value="details">Details</Tabs.Trigger>
              <Tabs.Trigger value="underlying">Underlying Requests</Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="details" className={TabsStyles.content}>
              <DetailsTab log={log} />
            </Tabs.Content>

            <Tabs.Content value="underlying" className={TabsStyles.content}>
              <UnderlyingRequestsTab requests={log.underlyingRequests || []} />
            </Tabs.Content>
          </Tabs.Root>

          {/* Footer with navigation */}
          <div className={FooterStyles.container}>
            <div className={FooterStyles.navigation}>
              <Button
                variant="inset"
                size="sm"
                iconOnly
                onClick={navigateToPrevious}
                disabled={!canNavigatePrevious}
                aria-label={t(aria.previousLog)}
              >
                <ChevronUp className={IconSize.sm} />
              </Button>
              <Button
                variant="inset"
                size="sm"
                iconOnly
                onClick={navigateToNext}
                disabled={!canNavigateNext}
                aria-label={t(aria.nextLog)}
              >
                <ChevronDown className={IconSize.sm} />
              </Button>
            </div>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  )
}
