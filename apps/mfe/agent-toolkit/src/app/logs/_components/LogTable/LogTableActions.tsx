'use client'

import { memo } from 'react'
import { Play, Layers, Monitor, Puzzle, User } from 'lucide-react'
import { Button } from '@stackone-ui/core/button'
import { Tooltip } from '@stackone-ui/core/tooltip'
import { useTranslations, logs } from '@stackone/i18n'
import { LogTableStyles } from './styles'
import { RowActions } from '../../../../styles'

interface LogTableActionsProps {
  logId: string
  onReplay: (logId: string, e: React.MouseEvent) => void
  onActionKeyDown: (e: React.KeyboardEvent) => void
}

/**
 * Action buttons for a log table row.
 * Primary actions (Replay, Request Tester) are always visible.
 * Secondary actions (Batch Replay, Integration, Account) are hidden on smaller screens.
 */
export const LogTableActions = memo(({
  logId,
  onReplay,
  onActionKeyDown,
}: LogTableActionsProps) => {
  const t = useTranslations()

  const handleStopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  return (
    <div className={RowActions.container}>
      {/* Primary actions - always visible */}
      <Tooltip content={t(logs.actions.replayDescription)}>
        <Button
          variant="inset"
          iconOnly
          size="sm"
          className={LogTableStyles.actionButton}
          aria-label={t(logs.actions.replay)}
          onClick={(e: React.MouseEvent) => onReplay(logId, e)}
          onKeyDown={onActionKeyDown}
        >
          <Play className={RowActions.iconFilled} />
        </Button>
      </Tooltip>
      <Tooltip content={t(logs.actions.requestTesterDescription)}>
        <Button
          variant="inset"
          iconOnly
          size="sm"
          aria-label={t(logs.actions.requestTester)}
          onClick={handleStopPropagation}
          onKeyDown={onActionKeyDown}
        >
          <Monitor className={RowActions.icon} />
        </Button>
      </Tooltip>

      {/* Secondary actions - hidden on <lg screens */}
      <Tooltip content={t(logs.actions.batchReplayDescription)}>
        <Button
          variant="inset"
          iconOnly
          size="sm"
          className={LogTableStyles.hiddenLgVisible}
          aria-label={t(logs.actions.batchReplay)}
          onClick={handleStopPropagation}
          onKeyDown={onActionKeyDown}
        >
          <Layers className={RowActions.icon} />
        </Button>
      </Tooltip>
      <Tooltip content={t(logs.actions.integration)}>
        <Button
          variant="inset"
          iconOnly
          size="sm"
          className={LogTableStyles.hiddenLgVisible}
          aria-label={t(logs.actions.integration)}
          onClick={handleStopPropagation}
          onKeyDown={onActionKeyDown}
        >
          <Puzzle className={RowActions.icon} />
        </Button>
      </Tooltip>
      <Tooltip content={t(logs.actions.account)}>
        <Button
          variant="inset"
          iconOnly
          size="sm"
          className={LogTableStyles.hiddenLgVisible}
          aria-label={t(logs.actions.account)}
          onClick={handleStopPropagation}
          onKeyDown={onActionKeyDown}
        >
          <User className={RowActions.icon} />
        </Button>
      </Tooltip>
    </div>
  )
})
