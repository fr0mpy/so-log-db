import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import { forwardRef, useState, createContext, useContext } from 'react'
import { motion, AnimatePresence } from 'motion/react'

// Spring config for natural feel
const spring = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 30,
}

interface AccordionContextValue {
  openItems: string[]
  toggleItem: (value: string) => void
  type: 'single' | 'multiple'
}

const AccordionContext = createContext<AccordionContextValue | undefined>(undefined)

const useAccordionContext = () => {
  const context = useContext(AccordionContext)
  if (!context) {
    throw new Error('Accordion components must be used within an Accordion provider')
  }
  return context
}

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'single' | 'multiple'
  defaultValue?: string | string[]
}

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  ({ type = 'single', defaultValue, className, children, ...props }, ref) => {
    const [openItems, setOpenItems] = useState<string[]>(
      Array.isArray(defaultValue) ? defaultValue : defaultValue ? [defaultValue] : []
    )

    const toggleItem = (value: string) => {
      if (type === 'single') {
        setOpenItems(openItems.includes(value) ? [] : [value])
      } else {
        setOpenItems(
          openItems.includes(value)
            ? openItems.filter((item) => item !== value)
            : [...openItems, value]
        )
      }
    }

    return (
      <AccordionContext.Provider value={{ openItems, toggleItem, type }}>
        <div ref={ref} className={cn('w-full', className)} {...props}>
          {children}
        </div>
      </AccordionContext.Provider>
    )
  }
)
Accordion.displayName = 'Accordion'

interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('mb-2 rounded-theme-lg bg-neu-base shadow-neu-raised-sm', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
AccordionItem.displayName = 'AccordionItem'

interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}

const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ value, className, children, ...props }, ref) => {
    const { openItems, toggleItem } = useAccordionContext()
    const isOpen = openItems.includes(value)

    return (
      <button
        ref={ref}
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
          transition={spring}
          className="flex items-center justify-center"
        >
          <ChevronDown className="h-4 w-4 shrink-0" />
        </motion.span>
      </button>
    )
  }
)
AccordionTrigger.displayName = 'AccordionTrigger'

interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ value, className, children, ...props }, ref) => {
    const { openItems } = useAccordionContext()
    const isOpen = openItems.includes(value)

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
                height: { ...spring },
                opacity: { duration: 0.2, delay: 0.1 }
              }
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { ...spring },
                opacity: { duration: 0.15 }
              }
            }}
            className="overflow-hidden"
            {...props}
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
AccordionContent.displayName = 'AccordionContent'

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
