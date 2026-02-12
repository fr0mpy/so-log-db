/**
 * Motion styles using namespace pattern.
 * Extends config/motion.ts with Framer Motion variants.
 * Usage: Motion.Variants.fadeIn, Motion.Spring.default
 */

import { SPRING, DURATION, OFFSET } from '../config/motion'

// ============================================================================
// FRAMER MOTION VARIANTS
// ============================================================================

export const Variants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  fadeInUp: {
    initial: { opacity: 0, y: OFFSET.slide },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: OFFSET.slide },
  },
  fadeInDown: {
    initial: { opacity: 0, y: -OFFSET.slide },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -OFFSET.slide },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
  slideInRight: {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '100%' },
  },
  slideInLeft: {
    initial: { x: '-100%' },
    animate: { x: 0 },
    exit: { x: '-100%' },
  },
  slideInTop: {
    initial: { y: '-100%' },
    animate: { y: 0 },
    exit: { y: '-100%' },
  },
  slideInBottom: {
    initial: { y: '100%' },
    animate: { y: 0 },
    exit: { y: '100%' },
  },
} as const

// ============================================================================
// TRANSITION PRESETS
// ============================================================================

export const Transition = {
  spring: SPRING.default,
  springBouncy: SPRING.bouncy,
  springGentle: SPRING.gentle,
  springSnappy: SPRING.snappy,
  fast: { duration: DURATION.fast },
  normal: { duration: DURATION.normal },
  slow: { duration: DURATION.slow },
} as const

// ============================================================================
// NAMESPACE EXPORT
// ============================================================================

export const Motion = {
  Variants,
  Transition,
  Spring: SPRING,
  Duration: DURATION,
  Offset: OFFSET,
} as const

export type MotionVariant = keyof typeof Variants
