import { Sun, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '../lib/utils'

interface ThemeSwitcherProps {
  isDark: boolean
  onToggle: () => void
  className?: string
}

// Animation timing constants
const TIMING = {
  iconExit: 0.12,      // Icon exits first
  knobDelay: 0.08,     // Knob starts slightly after exit begins
  knobDuration: 0.25,  // Knob slide duration
  iconEntryDelay: 0.28, // Icon enters after knob settles
  iconEntry: 0.2,      // Icon entry duration
} as const

// Spring config for satisfying bounce
const knobSpring = {
  type: 'spring',
  stiffness: 500,
  damping: 30,
} as const

export function ThemeSwitcher({ isDark, onToggle, className }: ThemeSwitcherProps) {
  return (
    <button
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={onToggle}
      className={cn(
        'relative w-14 h-8 rounded-full cursor-pointer',
        'bg-neu-base shadow-neu-pressed',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        className
      )}
    >
      {/* Sliding knob with spring physics */}
      <motion.span
        className={cn(
          'absolute top-1 left-1 w-6 h-6 rounded-full cursor-pointer',
          'bg-neu-base shadow-neu-raised',
          'flex items-center justify-center overflow-hidden'
        )}
        animate={{ x: isDark ? 24 : 0 }}
        transition={{
          ...knobSpring,
          delay: TIMING.knobDelay,
        }}
      >
        {/* Icon container */}
        <span className="relative w-4 h-4 cursor-pointer">
          <AnimatePresence mode="wait" initial={false}>
            {isDark ? (
              // Moon - descends from top
              <motion.span
                key="moon"
                className="absolute inset-0 flex items-center justify-center cursor-pointer"
                initial={{ y: -16, opacity: 0 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  transition: {
                    y: { duration: TIMING.iconEntry, delay: TIMING.iconEntryDelay, ease: 'easeOut' },
                    opacity: { duration: TIMING.iconEntry * 0.6, delay: TIMING.iconEntryDelay + 0.05 },
                  },
                }}
                exit={{
                  y: -16,
                  opacity: 0,
                  transition: {
                    y: { duration: TIMING.iconExit, ease: 'easeIn' },
                    opacity: { duration: TIMING.iconExit * 0.8 },
                  },
                }}
              >
                <Moon className="w-4 h-4 text-indigo-400" />
              </motion.span>
            ) : (
              // Sun - rises from bottom
              <motion.span
                key="sun"
                className="absolute inset-0 flex items-center justify-center cursor-pointer"
                initial={{ y: 16, opacity: 0 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  transition: {
                    y: { duration: TIMING.iconEntry, delay: TIMING.iconEntryDelay, ease: 'easeOut' },
                    opacity: { duration: TIMING.iconEntry * 0.6, delay: TIMING.iconEntryDelay + 0.05 },
                  },
                }}
                exit={{
                  y: 16,
                  opacity: 0,
                  transition: {
                    y: { duration: TIMING.iconExit, ease: 'easeIn' },
                    opacity: { duration: TIMING.iconExit * 0.8 },
                  },
                }}
              >
                <Sun className="w-4 h-4 text-amber-500" />
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </motion.span>

      {/* Track indicators */}
      <motion.span
        className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none"
      >
        <motion.span
          animate={{ opacity: isDark ? 0.2 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Sun className="w-3 h-3 text-foreground" />
        </motion.span>
        <motion.span
          animate={{ opacity: isDark ? 0 : 0.2 }}
          transition={{ duration: 0.3 }}
        >
          <Moon className="w-3 h-3 text-foreground" />
        </motion.span>
      </motion.span>
    </button>
  )
}
