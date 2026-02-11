import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'motion/react'
import { useState, useEffect } from 'react'
import { Progress } from '../display/progress'
import { LOADING, DURATION, LABEL } from '../../config'
import { ButtonStyles as S } from './styles'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  loadingText?: string
  ref?: React.Ref<HTMLButtonElement>
}

function Button({
  variant = 'primary',
  size = 'md',
  loading,
  loadingText = LABEL.loading,
  disabled,
  className,
  children,
  ref,
  ...props
}: ButtonProps) {
  const [loadingProgress, setLoadingProgress] = useState(0)

  useEffect(() => {
    if (!loading) {
      setLoadingProgress(0)
      return
    }
    const interval = setInterval(() => {
      setLoadingProgress((prev) => (prev >= LOADING.segments ? 0 : prev + 1))
    }, LOADING.intervalMs)
    return () => clearInterval(interval)
  }, [loading])

  return (
    <button
      ref={ref}
      className={cn(
        S.base,
        S.sizes[size],
        S.variants[variant],
        loading && S.loading,
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION.fast }}
            className={S.loadingContent}
          >
            <span className={S.loadingText}>{loadingText}</span>
            <Progress value={loadingProgress} max={LOADING.segments} segments={LOADING.segments} size="sm" />
          </motion.div>
        ) : (
          <motion.span
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION.fast }}
          >
            {children}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}

export { Button }
