import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { forwardRef } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, disabled, className, children, ...props }, ref) => {
    const baseStyles = cn(
      'inline-flex items-center justify-center gap-2 font-medium cursor-pointer',
      'transition-[background-color] duration-200 ease-neu',
      'outline-none',
      'disabled:pointer-events-none disabled:opacity-50'
    )

    const variants = {
      primary: cn(
        'bg-primary text-primary-foreground',
        'shadow-[inset_0_1px_0_rgba(255,255,255,0.2),-4px_-4px_10px_rgba(255,255,255,0.3),4px_4px_10px_rgba(0,100,60,0.3)]',
        'hover:bg-[#008a52] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.3),-2px_-2px_8px_rgba(255,255,255,0.4),2px_2px_8px_rgba(0,100,60,0.4)]',
        'active:shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.2),inset_2px_2px_5px_rgba(0,80,50,0.3)]',
        'focus-visible:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),-4px_-4px_10px_rgba(255,255,255,0.3),4px_4px_10px_rgba(0,100,60,0.3),var(--shadow-focus)]'
      ),
      secondary: cn(
        'bg-secondary text-secondary-foreground',
        'shadow-[inset_0_1px_0_rgba(255,255,255,0.2),-4px_-4px_10px_rgba(255,255,255,0.3),4px_4px_10px_rgba(60,60,140,0.3)]',
        'hover:bg-[#4338ca] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.3),-2px_-2px_8px_rgba(255,255,255,0.4),2px_2px_8px_rgba(60,60,140,0.4)]',
        'active:shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.2),inset_2px_2px_5px_rgba(50,50,120,0.3)]',
        'focus-visible:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),-4px_-4px_10px_rgba(255,255,255,0.3),4px_4px_10px_rgba(60,60,140,0.3),var(--shadow-focus)]'
      ),
      outline: cn(
        'bg-neu-base text-foreground',
        'shadow-neu-raised',
        'hover:shadow-neu-raised-lg',
        'active:shadow-neu-pressed-sm',
        'focus-visible:shadow-[var(--shadow-raised),var(--shadow-focus)]'
      ),
      ghost: cn(
        'bg-transparent text-foreground',
        'hover:bg-neu-base hover:shadow-neu-raised-sm',
        'active:shadow-neu-pressed-sm',
        'focus-visible:shadow-neu-focus'
      ),
      destructive: cn(
        'bg-destructive text-destructive-foreground',
        'shadow-[inset_0_1px_0_rgba(255,255,255,0.2),-4px_-4px_10px_rgba(255,255,255,0.3),4px_4px_10px_rgba(180,40,40,0.3)]',
        'hover:bg-[#b91c1c] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.3),-2px_-2px_8px_rgba(255,255,255,0.4),2px_2px_8px_rgba(180,40,40,0.4)]',
        'active:shadow-[inset_-2px_-2px_5px_rgba(255,255,255,0.2),inset_2px_2px_5px_rgba(150,30,30,0.3)]',
        'focus-visible:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),-4px_-4px_10px_rgba(255,255,255,0.3),4px_4px_10px_rgba(180,40,40,0.3),0_0_0_3px_rgba(239,55,55,0.25)]'
      ),
    }

    const sizes = {
      sm: 'h-9 px-3 text-sm rounded-theme-lg min-h-11 min-w-11',
      md: 'h-10 px-5 text-sm rounded-theme-xl min-h-11 min-w-11',
      lg: 'h-12 px-6 text-base rounded-theme-xl min-h-11 min-w-11',
    }

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          loading && 'relative [&>*]:invisible',
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        <AnimatePresence>
          {loading && (
            <motion.span
              className="absolute !visible"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <motion.span
                className="block"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              >
                <Loader2 className="h-4 w-4" />
              </motion.span>
            </motion.span>
          )}
        </AnimatePresence>
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
