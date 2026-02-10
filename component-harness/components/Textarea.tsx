import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-theme-lg px-3 py-2',
          'bg-neu-base shadow-neu-pressed-sm',
          'text-sm text-foreground placeholder:text-muted-foreground',
          'transition-[border-color] duration-200 resize-y',
          'border border-transparent',
          'focus:outline-none',
          'disabled:cursor-not-allowed disabled:opacity-50',
          // Default state: hover and focus use same styling
          !error && 'hover:shadow-neu-pressed hover:border-primary focus:shadow-neu-pressed focus:border-primary',
          // Error state: keep destructive border on hover/focus
          error && 'border-destructive hover:shadow-neu-pressed focus:shadow-neu-pressed',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Textarea.displayName = 'Textarea'

export { Textarea }
