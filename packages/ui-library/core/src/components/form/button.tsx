'use client'

import { cn } from '@/utils/cn'
import { motion, AnimatePresence } from 'motion/react'
import { useState, useEffect, isValidElement, cloneElement } from 'react'
import { Progress } from '../display/progress'
import { LOADING, DURATION, LABEL } from '../../config'
import { ButtonStyles as S } from './styles'

export type ButtonVariant = 'primary' | 'secondary' | 'text' | 'ghost' | 'destructive'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  loadingText?: string
  asChild?: boolean
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
  asChild,
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

  const buttonClassName = cn(
    S.base,
    S.sizes[size],
    S.variants[variant],
    loading && S.loading,
    className
  )

  // When asChild is true, clone the child element with button styles
  if (asChild && isValidElement(children)) {
    return cloneElement(children as React.ReactElement<{ className?: string }>, {
      className: cn(buttonClassName, (children as React.ReactElement<{ className?: string }>).props.className),
    })
  }

  return (
    <button
      ref={ref}
      className={buttonClassName}
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
            <Progress value={loadingProgress} max={LOADING.segments} segments={LOADING.segments} size="sm" inverted />
          </motion.div>
        ) : (
          <motion.span
            key="content"
            className={S.content}
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
