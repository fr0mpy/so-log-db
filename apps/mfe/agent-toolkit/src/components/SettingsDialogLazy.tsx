'use client'

import dynamic from 'next/dynamic'

interface SettingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * Code-split SettingsDialog - loads language switcher only when needed.
 *
 * Defers settings UI until user opens the settings menu.
 */
export const SettingsDialogLazy = dynamic<SettingsDialogProps>(
  () => import('./SettingsDialog').then((mod) => mod.SettingsDialog)
)
