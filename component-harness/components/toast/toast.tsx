import { cn } from '@/lib/utils'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import { useState, useEffect, useCallback, createContext, useContext, forwardRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'motion/react'
import { TOAST, SPRING, SR_ONLY } from '../../config'
import type {
  ToastVariant,
  ToastPosition,
  ToastData,
  ToastContextValue,
  ToastProviderProps,
  ToastContainerProps,
  ToastRootProps,
  ToastIconProps,
  ToastTitleProps,
  ToastDescriptionProps,
  ToastCloseProps,
  MotionVariant,
} from './types'

// Module-level constants to avoid recreation on each render
const variantStyles: Record<ToastVariant, string> = {
  info: 'border-primary/40',
  success: 'border-success/40',
  warning: 'border-warning/40',
  destructive: 'border-destructive/40',
}

const iconStyles: Record<ToastVariant, string> = {
  info: 'text-primary',
  success: 'text-success',
  warning: 'text-warning',
  destructive: 'text-destructive',
}

const icons: Record<ToastVariant, typeof Info> = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  destructive: AlertCircle,
}

const motionVariants: Record<ToastPosition, MotionVariant> = {
  top: {
    initial: { y: '-100%', opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: '-100%', opacity: 0 },
  },
  'top-left': {
    initial: { x: '-100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 },
  },
  'top-right': {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '100%', opacity: 0 },
  },
  bottom: {
    initial: { y: '100%', opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: '100%', opacity: 0 },
  },
  'bottom-left': {
    initial: { x: '-100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 },
  },
  'bottom-right': {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '100%', opacity: 0 },
  },
  left: {
    initial: { x: '-100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 },
  },
  right: {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '100%', opacity: 0 },
  },
}

const containerStyles: Record<ToastPosition, string> = {
  top: 'top-4 left-1/2 -translate-x-1/2 flex-col',
  'top-left': 'top-4 left-4 flex-col',
  'top-right': 'top-4 right-4 flex-col',
  bottom: 'bottom-4 left-1/2 -translate-x-1/2 flex-col-reverse',
  'bottom-left': 'bottom-4 left-4 flex-col-reverse',
  'bottom-right': 'bottom-4 right-4 flex-col-reverse',
  left: 'left-4 top-1/2 -translate-y-1/2 flex-col',
  right: 'right-4 top-1/2 -translate-y-1/2 flex-col',
}

const positions: ToastPosition[] = ['top', 'top-left', 'top-right', 'bottom', 'bottom-left', 'bottom-right', 'left', 'right']

const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastData[]>([])

  const addToast = useCallback((toast: Omit<ToastData, 'id'>) => {
    const id = crypto.randomUUID()
    setToasts((prev) => [...prev, { ...toast, id }])
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  )
}
ToastProvider.displayName = 'Toast.Provider'

function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return createPortal(
    <>
      {positions.map((position) => {
        const positionToasts = toasts.filter((t) => t.position === position)
        if (positionToasts.length === 0) return null

        return (
          <div
            key={position}
            className={cn('fixed z-toast flex gap-2 pointer-events-none', containerStyles[position])}
          >
            <AnimatePresence mode="popLayout">
              {positionToasts.map((toast) => (
                <ToastRoot key={toast.id} toast={toast} onClose={() => onRemove(toast.id)} />
              ))}
            </AnimatePresence>
          </div>
        )
      })}
    </>,
    document.body
  )
}
ToastContainer.displayName = 'Toast.Container'

const ToastRoot = forwardRef<HTMLDivElement, ToastRootProps>(({ toast, onClose }, ref) => {
  const [isVisible, setIsVisible] = useState(true)
  const duration = toast.duration ?? TOAST.defaultDuration

  const handleClose = useCallback(() => {
    setIsVisible(false)
  }, [])

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(handleClose, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, handleClose])

  return (
    <AnimatePresence mode="wait" onExitComplete={onClose}>
      {isVisible && (
        <motion.div
          ref={ref}
          layout
          role="alert"
          initial={motionVariants[toast.position].initial}
          animate={motionVariants[toast.position].animate}
          exit={motionVariants[toast.position].exit}
          transition={SPRING.bouncy}
          className={cn(
            'w-full max-w-sm rounded-theme-lg border p-4 shadow-neu-raised pointer-events-auto',
            'flex items-start gap-3 text-foreground bg-background',
            variantStyles[toast.variant]
          )}
        >
          <ToastIcon variant={toast.variant} />
          <div className="flex-1">
            {toast.title && <ToastTitle>{toast.title}</ToastTitle>}
            {toast.description && <ToastDescription>{toast.description}</ToastDescription>}
          </div>
          <ToastClose onClose={handleClose} />
        </motion.div>
      )}
    </AnimatePresence>
  )
})
ToastRoot.displayName = 'Toast.Root'

function ToastIcon({ variant, className }: ToastIconProps) {
  const Icon = icons[variant]
  return <Icon className={cn('h-5 w-5 flex-shrink-0', iconStyles[variant], className)} />
}
ToastIcon.displayName = 'Toast.Icon'

function ToastTitle({ className, children, ...props }: ToastTitleProps) {
  return (
    <div className={cn('font-semibold', className)} {...props}>
      {children}
    </div>
  )
}
ToastTitle.displayName = 'Toast.Title'

function ToastDescription({ className, children, ...props }: ToastDescriptionProps) {
  return (
    <div className={cn('text-sm opacity-80 mt-1', className)} {...props}>
      {children}
    </div>
  )
}
ToastDescription.displayName = 'Toast.Description'

function ToastClose({ onClose, className }: ToastCloseProps) {
  return (
    <button
      onClick={onClose}
      className={cn(
        'rounded-theme-sm opacity-70 cursor-pointer min-h-11 min-w-11',
        'transition-opacity hover:opacity-100 text-foreground',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2',
        className
      )}
    >
      <X className="h-4 w-4" />
      <span className="sr-only">{SR_ONLY.close}</span>
    </button>
  )
}
ToastClose.displayName = 'Toast.Close'

export const Toast = {
  Provider: ToastProvider,
  Container: ToastContainer,
  Root: ToastRoot,
  Icon: ToastIcon,
  Title: ToastTitle,
  Description: ToastDescription,
  Close: ToastClose,
}
