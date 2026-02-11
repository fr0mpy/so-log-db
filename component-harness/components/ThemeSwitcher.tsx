import { Sun, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '../lib/utils'
import { THEME_TIMING, OFFSET, SPRING, OPACITY, ARIA, DURATION } from '@/config'

interface ThemeSwitcherProps {
  isDark: boolean
  onToggle: () => void
  className?: string
}

export function ThemeSwitcher({ isDark, onToggle, className }: ThemeSwitcherProps) {
  return (
    <button
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? ARIA.switchToLight : ARIA.switchToDark}
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
        animate={{ x: isDark ? OFFSET.knob : 0 }}
        transition={{
          ...SPRING.snappy,
          delay: THEME_TIMING.knobDelay,
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
                initial={{ y: -OFFSET.icon, opacity: 0 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  transition: {
                    y: { duration: THEME_TIMING.iconEntry, delay: THEME_TIMING.iconEntryDelay, ease: 'easeOut' },
                    opacity: { duration: THEME_TIMING.iconEntry * 0.6, delay: THEME_TIMING.iconEntryDelay + 0.05 },
                  },
                }}
                exit={{
                  y: -OFFSET.icon,
                  opacity: 0,
                  transition: {
                    y: { duration: THEME_TIMING.iconExit, ease: 'easeIn' },
                    opacity: { duration: THEME_TIMING.iconExit * 0.8 },
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
                initial={{ y: OFFSET.icon, opacity: 0 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  transition: {
                    y: { duration: THEME_TIMING.iconEntry, delay: THEME_TIMING.iconEntryDelay, ease: 'easeOut' },
                    opacity: { duration: THEME_TIMING.iconEntry * 0.6, delay: THEME_TIMING.iconEntryDelay + 0.05 },
                  },
                }}
                exit={{
                  y: OFFSET.icon,
                  opacity: 0,
                  transition: {
                    y: { duration: THEME_TIMING.iconExit, ease: 'easeIn' },
                    opacity: { duration: THEME_TIMING.iconExit * 0.8 },
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
          animate={{ opacity: isDark ? OPACITY.highlight : 0 }}
          transition={{ duration: DURATION.slow }}
        >
          <Sun className="w-3 h-3 text-foreground" />
        </motion.span>
        <motion.span
          animate={{ opacity: isDark ? 0 : OPACITY.highlight }}
          transition={{ duration: DURATION.slow }}
        >
          <Moon className="w-3 h-3 text-foreground" />
        </motion.span>
      </motion.span>
    </button>
  )
}
