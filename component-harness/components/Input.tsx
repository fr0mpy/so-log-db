import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: boolean
  success?: boolean
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, error, success, helperText, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined)
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1.5 block font-body text-sm font-medium tracking-wide text-foreground"
          >
            {label}
          </label>
        )}
        <div className="relative w-full">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            type={type}
            className={cn(
              'flex h-10 w-full rounded-theme-lg px-3 py-2',
              'bg-neu-base shadow-neu-pressed-sm',
              'text-sm text-foreground placeholder:text-muted-foreground',
              'transition-[border-color] duration-200 ease-neu',
              'border border-transparent',
              'focus:outline-none',
              'disabled:cursor-not-allowed disabled:opacity-50',
              // Default state: hover and focus use same styling
              !error && !success && 'hover:shadow-neu-pressed hover:border-primary focus:shadow-neu-pressed focus:border-primary',
              // Error state: keep destructive border on hover/focus
              error && 'border-destructive hover:shadow-neu-pressed focus:shadow-neu-pressed',
              // Success state: keep success border on hover/focus
              success && 'border-success hover:shadow-neu-pressed focus:shadow-neu-pressed',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className
            )}
            ref={ref}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {rightIcon}
            </div>
          )}
        </div>
        {helperText && (
          <p
            className={cn(
              'mt-1.5 text-xs',
              error && 'text-destructive',
              success && 'text-success',
              !error && !success && 'text-muted-foreground'
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
