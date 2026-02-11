import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion, AnimatePresence } from 'motion/react'
import { forwardRef, useState, useEffect } from 'react'
import { Progress } from '../display/progress'
import { LOADING, DURATION, LABEL } from '../../config'

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-1 font-medium cursor-pointer',
    'transition-[background-color] duration-200 ease-neu',
    'outline-none',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-primary text-primary-foreground',
          'shadow-neu-variant-primary',
          'hover:bg-primary-hover hover:shadow-neu-raised-lg',
          'active:shadow-neu-pressed-sm',
          'focus-visible:shadow-[var(--shadow-variant-primary),var(--shadow-focus)]',
        ],
        secondary: [
          'bg-secondary text-secondary-foreground',
          'shadow-neu-variant-secondary',
          'hover:bg-secondary-hover hover:shadow-neu-raised-lg',
          'active:shadow-neu-pressed-sm',
          'focus-visible:shadow-[var(--shadow-variant-secondary),var(--shadow-focus)]',
        ],
        outline: [
          'bg-neu-base text-foreground',
          'shadow-neu-raised',
          'hover:shadow-neu-raised-lg',
          'active:shadow-neu-pressed-sm',
          'focus-visible:shadow-[var(--shadow-raised),var(--shadow-focus)]',
        ],
        ghost: [
          'bg-transparent text-foreground',
          'hover:bg-neu-base hover:shadow-neu-raised-sm',
          'active:shadow-neu-pressed-sm',
          'focus-visible:shadow-neu-focus',
        ],
        destructive: [
          'bg-destructive text-destructive-foreground',
          'shadow-neu-variant-destructive',
          'hover:bg-destructive-hover hover:shadow-neu-raised-lg',
          'active:shadow-neu-pressed-sm',
          'focus-visible:shadow-[var(--shadow-variant-destructive),var(--shadow-focus)]',
        ],
      },
      size: {
        sm: 'h-9 px-3 text-sm rounded-theme-lg min-h-11 min-w-11',
        md: 'h-10 px-5 text-sm rounded-theme-xl min-h-11 min-w-11',
        lg: 'h-12 px-6 text-base rounded-theme-xl min-h-11 min-w-11',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export type ButtonVariant = VariantProps<typeof buttonVariants>['variant']
export type ButtonSize = VariantProps<typeof buttonVariants>['size']

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
  loadingText?: string
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, loading, loadingText = LABEL.loading, disabled, className, children, ...props }, ref) => {
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
          buttonVariants({ variant, size }),
          loading && 'flex-col py-2',
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
              className="flex flex-col items-center gap-1 w-full px-2"
            >
              <span className="text-xs font-semibold tracking-wider">{loadingText}</span>
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
)

Button.displayName = 'Button'

export { Button, buttonVariants }
