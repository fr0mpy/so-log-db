import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import { forwardRef, useEffect } from 'react'

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean
  onClose: () => void
  title?: string
  description?: string
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ open, onClose, title, description, className, children, ...props }, ref) => {
    useEffect(() => {
      if (open) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
      return () => {
        document.body.style.overflow = ''
      }
    }, [open])

    if (!open) return null

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="fixed inset-0 bg-foreground/80 backdrop-blur-sm"
          onClick={onClose}
        />
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'modal-title' : undefined}
          aria-describedby={description ? 'modal-description' : undefined}
          className={cn(
            'relative z-50 w-full max-w-lg rounded-theme-xl',
            'bg-neu-base shadow-neu-raised-lg p-6',
            'animate-in fade-in-0 zoom-in-95',
            className
          )}
          {...props}
        >
          <button
            onClick={onClose}
            className={cn(
              'absolute right-4 top-4 rounded-theme-lg p-1.5 cursor-pointer min-h-11 min-w-11',
              'bg-neu-base shadow-neu-raised-sm',
              'transition-shadow duration-200 hover:shadow-neu-raised',
              'active:shadow-neu-pressed-sm',
              'focus-visible:outline-none focus-visible:shadow-[var(--shadow-raised-sm),var(--shadow-focus)]'
            )}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>

          {(title || description) && (
            <div className="mb-4 pr-8">
              {title && (
                <h2 id="modal-title" className="font-heading text-lg font-semibold text-foreground">
                  {title}
                </h2>
              )}
              {description && (
                <p id="modal-description" className="mt-1.5 text-sm text-muted-foreground">
                  {description}
                </p>
              )}
            </div>
          )}

          {children}
        </div>
      </div>
    )
  }
)

Modal.displayName = 'Modal'

export { Modal }
