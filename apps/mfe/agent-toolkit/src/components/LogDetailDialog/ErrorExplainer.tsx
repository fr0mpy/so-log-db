'use client'

import { useState } from 'react'
import { ChevronRight, Sparkles, ThumbsUp, ThumbsDown, ExternalLink, Loader2 } from 'lucide-react'
import { cn } from '@stackone-ui/core/utils'
import { useTranslations, aria } from '@stackone/i18n'
import { useErrorExplainer } from './hooks'
import { ErrorExplainerStyles as S, Section } from './styles'
import type { ErrorExplainerProps } from './types'

/**
 * AI-powered error explanation section
 *
 * Displays a collapsible section that can generate AI explanations
 * for error responses with feedback functionality.
 */
export function ErrorExplainer({ show }: ErrorExplainerProps) {
  const t = useTranslations()
  const [isExpanded, setIsExpanded] = useState(false)
  const { state, generate, submitFeedback } = useErrorExplainer()

  if (!show) {
    return null
  }

  return (
    <div className={S.container}>
      {/* Header */}
      <button
        type="button"
        className={S.header}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-controls="error-explainer-content"
      >
        <div className={S.headerLeft}>
          <ChevronRight
            className={cn(Section.chevron, isExpanded && Section.chevronExpanded)}
          />
          <Sparkles className={S.sparkleIcon} />
          <span className={S.title}>Error Explainer</span>
        </div>
        <div className={Section.headerRight}>
          {state.status === 'idle' && (
            <span
              className={S.generateLink}
              onClick={(e) => {
                e.stopPropagation()
                setIsExpanded(true)
                void generate()
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  e.stopPropagation()
                  setIsExpanded(true)
                  void generate()
                }
              }}
              role="button"
              tabIndex={0}
            >
              Open to Generate
            </span>
          )}
          <span className={S.viaBadge}>via Advanced Logs</span>
        </div>
      </button>

      {/* Content */}
      {isExpanded && (
        <div id="error-explainer-content" className={S.content}>
          {/* Idle state */}
          {state.status === 'idle' && (
            <button
              type="button"
              className={S.generateLink}
              onClick={generate}
            >
              Click to generate an AI-powered explanation for this error
            </button>
          )}

          {/* Generating state */}
          {state.status === 'generating' && (
            <div className={S.loading}>
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
              <span className={S.loadingText}>
                Generating Explainer & Resolution Steps
              </span>
            </div>
          )}

          {/* Complete state */}
          {state.status === 'complete' && state.explanation && (
            <>
              {/* Explanation text */}
              <div
                className={S.explanation}
                dangerouslySetInnerHTML={{
                  __html: state.explanation
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\n/g, '<br/>'),
                }}
              />

              {/* Sources */}
              {state.sources && state.sources.length > 0 && (
                <div className={S.sources}>
                  <span className="text-xs text-muted-foreground">Sources:</span>
                  {state.sources.map((source, index) => (
                    <a
                      key={index}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={S.sourceLink}
                    >
                      {source.title}
                      <ExternalLink className="w-3 h-3 ml-1 inline" />
                    </a>
                  ))}
                </div>
              )}

              {/* Feedback */}
              <div className={S.feedback}>
                <span className={S.feedbackLabel}>Was this helpful?</span>
                <div className={S.feedbackButtons}>
                  <button
                    type="button"
                    className={cn(
                      S.feedbackButton,
                      state.feedback === 'positive' && S.feedbackButtonActive,
                    )}
                    onClick={() => submitFeedback('positive')}
                    aria-label={t(aria.markAsHelpful)}
                    aria-pressed={state.feedback === 'positive'}
                  >
                    <ThumbsUp
                      className={cn(
                        S.feedbackIcon,
                        state.feedback === 'positive' ? 'text-success' : 'text-muted-foreground',
                      )}
                    />
                  </button>
                  <button
                    type="button"
                    className={cn(
                      S.feedbackButton,
                      state.feedback === 'negative' && S.feedbackButtonActive,
                    )}
                    onClick={() => submitFeedback('negative')}
                    aria-label={t(aria.markAsNotHelpful)}
                    aria-pressed={state.feedback === 'negative'}
                  >
                    <ThumbsDown
                      className={cn(
                        S.feedbackIcon,
                        state.feedback === 'negative' ? 'text-destructive' : 'text-muted-foreground',
                      )}
                    />
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Error state */}
          {state.status === 'error' && (
            <div className="text-destructive text-sm">
              Failed to generate explanation. Please try again.
            </div>
          )}
        </div>
      )}
    </div>
  )
}
