'use client'

import { Sun, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '../../utils'
import { THEME_TIMING, OFFSET, SPRING, OPACITY, ARIA, DURATION } from '../../config'
import { ThemeSwitcherStyles as S } from './styles'
import type { ThemeSwitcherProps } from './types'

export function ThemeSwitcher({ isDark, onToggle, className, ...props }: ThemeSwitcherProps) {
  return (
    <button
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? ARIA.switchToLight : ARIA.switchToDark}
      onClick={onToggle}
      className={cn(S.button, className)}
      {...props}
    >
      <motion.span
        className={S.knob}
        animate={{ x: isDark ? OFFSET.knob : 0 }}
        transition={{
          ...SPRING.snappy,
          delay: THEME_TIMING.knobDelay,
        }}
      >
        <span className={S.iconContainer}>
          <AnimatePresence mode="wait" initial={false}>
            {isDark ? (
              <motion.span
                key="moon"
                className={S.iconWrapper}
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
                <Moon className={S.icon.moon} />
              </motion.span>
            ) : (
              <motion.span
                key="sun"
                className={S.iconWrapper}
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
                <Sun className={S.icon.sun} />
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </motion.span>

      <motion.span className={S.trackIndicators}>
        <motion.span
          animate={{ opacity: isDark ? OPACITY.highlight : 0 }}
          transition={{ duration: DURATION.slow }}
        >
          <Sun className={S.trackIcon} />
        </motion.span>
        <motion.span
          animate={{ opacity: isDark ? 0 : OPACITY.highlight }}
          transition={{ duration: DURATION.slow }}
        >
          <Moon className={S.trackIcon} />
        </motion.span>
      </motion.span>
    </button>
  )
}
