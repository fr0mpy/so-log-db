import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import { forwardRef, createContext, useContext, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useControlledState } from '../../hooks/useControlledState'
import { SPRING, DURATION } from '@/config'
import type {
  AccordionContextValue,
  AccordionRootProps,
  AccordionItemProps,
  AccordionHeaderProps,
  AccordionTriggerProps,
  AccordionContentProps,
} from './types'

const AccordionContext = createContext<AccordionContextValue | undefined>(undefined)

const useAccordionContext = () => {
  const context = useContext(AccordionContext)
  if (!context) {
    throw new Error('Accordion components must be used within an Accordion.Root')
  }
  return context
}

// ============================================================================
// Accordion.Root
// ============================================================================

const AccordionRoot = forwardRef<HTMLDivElement, AccordionRootProps>(
  ({ type = 'single', defaultValue, value, onValueChange, className, children, ...props }, ref) => {
    const normalizeValue = (val: string | string[] | undefined): string[] => {
      if (val === undefined) return []
      return Array.isArray(val) ? val : [val]
    }

    const [openItems, setOpenItems] = useControlledState<string[]>(
      value !== undefined ? normalizeValue(value) : undefined,
      normalizeValue(defaultValue),
      onValueChange
    )

    const toggleItem = useCallback((itemValue: string) => {
      if (type === 'single') {
        setOpenItems(prev => prev.includes(itemValue) ? [] : [itemValue])
      } else {
        setOpenItems(prev =>
          prev.includes(itemValue)
            ? prev.filter((item) => item !== itemValue)
            : [...prev, itemValue]
        )
      }
    }, [type, setOpenItems])

    return (
      <AccordionContext.Provider value={{ openItems, toggleItem, type }}>
        <div ref={ref} className={cn('w-full', className)} {...props}>
          {children}
        </div>
      </AccordionContext.Provider>
    )
  }
)
AccordionRoot.displayName = 'Accordion.Root'

// ============================================================================
// Accordion.Item
// ============================================================================

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-value={value}
        className={cn('mb-2 rounded-theme-lg bg-neu-base shadow-neu-raised-sm', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
AccordionItem.displayName = 'Accordion.Item'

// ============================================================================
// Accordion.Header
// ============================================================================

const AccordionHeader = forwardRef<HTMLDivElement, AccordionHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
AccordionHeader.displayName = 'Accordion.Header'

// ============================================================================
// Accordion.Trigger
// ============================================================================

const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ value, className, children, ...props }, ref) => {
    const { openItems, toggleItem } = useAccordionContext()
    const isOpen = openItems.includes(value)

    return (
      <button
        ref={ref}
        type="button"
        onClick={() => toggleItem(value)}
        aria-expanded={isOpen}
        className={cn(
          'flex w-full items-center justify-between px-4 py-4 font-medium cursor-pointer',
          'rounded-theme-lg hover:text-primary',
          'transition-colors duration-neu ease-neu',
          'focus-visible:outline-none focus-visible:shadow-neu-focus',
          className
        )}
        {...props}
      >
        {children}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={SPRING.default}
          className="flex items-center justify-center"
        >
          <ChevronDown className="h-4 w-4 shrink-0" />
        </motion.span>
      </button>
    )
  }
)
AccordionTrigger.displayName = 'Accordion.Trigger'

// ============================================================================
// Accordion.Content
// ============================================================================

const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ value, className, children, ...props }, ref) => {
    const { openItems } = useAccordionContext()
    const isOpen = openItems.includes(value)

    // Destructure drag-related props to avoid conflicts with Framer Motion's drag types
    const { onDrag, onDragEnd, onDragStart, ...motionSafeProps } = props as Record<string, unknown>

    return (
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            ref={ref}
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: 'auto',
              opacity: 1,
              transition: {
                height: { ...SPRING.default },
                opacity: { duration: DURATION.normal, delay: DURATION.instant }
              }
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { ...SPRING.default },
                opacity: { duration: DURATION.fast }
              }
            }}
            className="overflow-hidden"
            {...motionSafeProps}
          >
            <div
              className={cn(
                'px-4 pb-4 pt-0 text-sm text-muted-foreground',
                className
              )}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }
)
AccordionContent.displayName = 'Accordion.Content'

// ============================================================================
// Namespace Export
// ============================================================================

// Namespace Export (callable as Root + namespace)
export const Accordion = Object.assign(AccordionRoot, {
  Root: AccordionRoot,
  Item: AccordionItem,
  Header: AccordionHeader,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
})

// Individual exports for backward compatibility
export { AccordionItem, AccordionHeader, AccordionTrigger, AccordionContent }
