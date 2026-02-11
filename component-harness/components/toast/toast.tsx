import { cn } from '@/lib/utils'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import { useState, useEffect, useCallback, createContext, useContext } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'motion/react'
import { TOAST, SPRING, SR_ONLY } from '../../config'
import {
  ToastStyles as S,
  variantStyles,
  iconStyles,
  containerStyles,
} from './styles'
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

function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return createPortal(
    <>
      {positions.map((position) => {
        const positionToasts = toasts.filter((t) => t.position === position)
        if (positionToasts.length === 0) return null

        return (
          <div
            key={position}
            className={cn(S.container.base, containerStyles[position])}
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

function ToastRoot({ toast, onClose, ref }: ToastRootProps) {
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
          className={cn(S.root.base, variantStyles[toast.variant])}
        >
          <ToastIcon variant={toast.variant} />
          <div className={S.content}>
            {toast.title && <ToastTitle>{toast.title}</ToastTitle>}
            {toast.description && <ToastDescription>{toast.description}</ToastDescription>}
          </div>
          <ToastClose onClose={handleClose} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function ToastIcon({ variant, className }: ToastIconProps) {
  const Icon = icons[variant]
  return <Icon className={cn(S.icon, iconStyles[variant], className)} />
}

function ToastTitle({ className, children, ...props }: ToastTitleProps) {
  return (
    <div className={cn(S.title, className)} {...props}>
      {children}
    </div>
  )
}

function ToastDescription({ className, children, ...props }: ToastDescriptionProps) {
  return (
    <div className={cn(S.description, className)} {...props}>
      {children}
    </div>
  )
}

function ToastClose({ onClose, className }: ToastCloseProps) {
  return (
    <button
      onClick={onClose}
      className={cn(S.closeButton, className)}
    >
      <X className={S.closeIcon} />
      <span className={S.srOnly}>{SR_ONLY.close}</span>
    </button>
  )
}

export const Toast = {
  Provider: ToastProvider,
  Container: ToastContainer,
  Root: ToastRoot,
  Icon: ToastIcon,
  Title: ToastTitle,
  Description: ToastDescription,
  Close: ToastClose,
}
