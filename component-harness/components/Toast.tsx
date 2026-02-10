import { cn } from '@/lib/utils'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import { useState, useEffect, useCallback, createContext, useContext, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'motion/react'

type ToastVariant = 'info' | 'success' | 'warning' | 'destructive'
type ToastPosition = 'top' | 'bottom' | 'left' | 'right'

interface ToastData {
  id: string
  variant: ToastVariant
  position: ToastPosition
  title?: string
  description?: string
  duration?: number
}

interface ToastContextValue {
  toasts: ToastData[]
  addToast: (toast: Omit<ToastData, 'id'>) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([])

  const addToast = useCallback((toast: Omit<ToastData, 'id'>) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
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

function ToastContainer({ toasts, onRemove }: { toasts: ToastData[]; onRemove: (id: string) => void }) {
  const positions: ToastPosition[] = ['top', 'bottom', 'left', 'right']

  return createPortal(
    <>
      {positions.map((position) => {
        const positionToasts = toasts.filter((t) => t.position === position)
        if (positionToasts.length === 0) return null

        const containerStyles = {
          top: 'top-4 left-1/2 -translate-x-1/2 flex-col',
          bottom: 'bottom-4 left-1/2 -translate-x-1/2 flex-col-reverse',
          left: 'left-4 top-1/2 -translate-y-1/2 flex-col',
          right: 'right-4 top-1/2 -translate-y-1/2 flex-col',
        }

        return (
          <div
            key={position}
            className={cn('fixed z-toast flex gap-2 pointer-events-none', containerStyles[position])}
          >
            <AnimatePresence mode="popLayout">
              {positionToasts.map((toast) => (
                <ToastItem key={toast.id} toast={toast} onClose={() => onRemove(toast.id)} />
              ))}
            </AnimatePresence>
          </div>
        )
      })}
    </>,
    document.body
  )
}

function ToastItem({ toast, onClose }: { toast: ToastData; onClose: () => void }) {
  const [isVisible, setIsVisible] = useState(true)
  const duration = toast.duration ?? 5000

  const handleClose = useCallback(() => {
    setIsVisible(false)
  }, [])

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(handleClose, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, handleClose])

  const variantStyles = {
    info: 'bg-primary/10 text-primary border-primary/20',
    success: 'bg-success/10 text-success border-success/20',
    warning: 'bg-warning/10 text-warning border-warning/20',
    destructive: 'bg-destructive/10 text-destructive border-destructive/20',
  }

  const motionVariants = {
    top: {
      initial: { y: '-100vh', opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: '-100vh', opacity: 0 },
    },
    bottom: {
      initial: { y: '100vh', opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: '100vh', opacity: 0 },
    },
    left: {
      initial: { x: '-100vw', opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: '-100vw', opacity: 0 },
    },
    right: {
      initial: { x: '100vw', opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: '100vw', opacity: 0 },
    },
  }

  const icons = {
    info: Info,
    success: CheckCircle,
    warning: AlertTriangle,
    destructive: AlertCircle,
  }

  const Icon = icons[toast.variant]

  return (
    <AnimatePresence mode="wait" onExitComplete={onClose}>
      {isVisible && (
        <motion.div
          layout
          role="alert"
          initial={motionVariants[toast.position].initial}
          animate={motionVariants[toast.position].animate}
          exit={motionVariants[toast.position].exit}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 30,
          }}
          className={cn(
            'w-full max-w-sm rounded-theme-lg border p-4 shadow-neu-raised pointer-events-auto',
            'flex items-start gap-3',
            variantStyles[toast.variant]
          )}
        >
          <Icon className="h-5 w-5 flex-shrink-0" />
          <div className="flex-1">
            {toast.title && <div className="font-semibold">{toast.title}</div>}
            {toast.description && <div className="text-sm opacity-90 mt-1">{toast.description}</div>}
          </div>
          <button
            onClick={handleClose}
            className={cn(
              'rounded-theme-sm opacity-70 cursor-pointer min-h-11 min-w-11',
              'transition-opacity hover:opacity-100',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2'
            )}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Standalone Toast component for simple usage
interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: ToastVariant
  position?: ToastPosition
  title?: string
  description?: string
  duration?: number
  onClose?: () => void
}

function Toast({
  variant = 'info',
  position = 'top',
  title,
  description,
  duration = 5000,
  onClose,
  className,
  children,
  ...props
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [shouldRender, setShouldRender] = useState(true)

  const handleClose = useCallback(() => {
    setIsVisible(false)
  }, [])

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(handleClose, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, handleClose])

  const handleExitComplete = () => {
    setShouldRender(false)
    onClose?.()
  }

  if (!shouldRender) return null

  const variantStyles = {
    info: 'bg-primary/10 text-primary border-primary/20',
    success: 'bg-success/10 text-success border-success/20',
    warning: 'bg-warning/10 text-warning border-warning/20',
    destructive: 'bg-destructive/10 text-destructive border-destructive/20',
  }

  const positionStyles = {
    top: 'top-4 left-1/2',
    bottom: 'bottom-4 left-1/2',
    left: 'left-4 top-1/2',
    right: 'right-4 top-1/2',
  }

  const motionVariants = {
    top: {
      initial: { y: '-100vh', x: '-50%', opacity: 0 },
      animate: { y: 0, x: '-50%', opacity: 1 },
      exit: { y: '-100vh', x: '-50%', opacity: 0 },
    },
    bottom: {
      initial: { y: '100vh', x: '-50%', opacity: 0 },
      animate: { y: 0, x: '-50%', opacity: 1 },
      exit: { y: '100vh', x: '-50%', opacity: 0 },
    },
    left: {
      initial: { x: '-100vw', y: '-50%', opacity: 0 },
      animate: { x: 0, y: '-50%', opacity: 1 },
      exit: { x: '-100vw', y: '-50%', opacity: 0 },
    },
    right: {
      initial: { x: '100vw', y: '-50%', opacity: 0 },
      animate: { x: 0, y: '-50%', opacity: 1 },
      exit: { x: '100vw', y: '-50%', opacity: 0 },
    },
  }

  const icons = {
    info: Info,
    success: CheckCircle,
    warning: AlertTriangle,
    destructive: AlertCircle,
  }

  const Icon = icons[variant]

  return createPortal(
    <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
      {isVisible && (
        <motion.div
          role="alert"
          initial={motionVariants[position].initial}
          animate={motionVariants[position].animate}
          exit={motionVariants[position].exit}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 30,
          }}
          className={cn(
            'fixed z-toast w-full max-w-sm rounded-theme-lg border p-4 shadow-neu-raised',
            'flex items-start gap-3',
            positionStyles[position],
            variantStyles[variant],
            className
          )}
          {...props}
        >
          <Icon className="h-5 w-5 flex-shrink-0" />
          <div className="flex-1">
            {title && <div className="font-semibold">{title}</div>}
            {description && <div className="text-sm opacity-90 mt-1">{description}</div>}
            {children}
          </div>
          <button
            onClick={handleClose}
            className={cn(
              'rounded-theme-sm opacity-70 cursor-pointer min-h-11 min-w-11',
              'transition-opacity hover:opacity-100',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2'
            )}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

Toast.displayName = 'Toast'

export { Toast }
