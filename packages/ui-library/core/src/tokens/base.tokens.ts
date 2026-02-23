/**
 * Base Token Definitions (Structural)
 *
 * SINGLE SOURCE OF TRUTH for structural tokens.
 * Run `pnpm build:tokens` to regenerate:
 *   - themes/base.css
 *   - tailwind.preset.ts (partial)
 *
 * These tokens are static and bundled with the app.
 */

// =============================================================================
// Spacing
// =============================================================================

export const spacing = {
  "1": "0.25rem",
  "2": "0.5rem",
  "3": "0.75rem",
  "4": "1rem",
  "5": "1.25rem",
  "6": "1.5rem",
  "8": "2rem",
  "10": "2.5rem",
  "12": "3rem",
  "16": "4rem",
} as const;

// =============================================================================
// Border Radius
// =============================================================================

export const radius = {
  sm: "0.375rem",
  md: "0.625rem",
  lg: "1rem",
  xl: "1.5rem",
  "2xl": "2rem",
} as const;

// =============================================================================
// Z-Index
// =============================================================================

export const zIndex = {
  dropdown: "100",
  sticky: "200",
  modal: "300",
  popover: "400",
  tooltip: "600",
  toast: "9900",
} as const;

// =============================================================================
// Motion
// =============================================================================

export const motion = {
  duration: {
    fast: "150ms",
    normal: "200ms",
    slow: "300ms",
    spinner: "3s",
  },
  spring: {
    stiffness: "300",
    damping: "30",
    stiffnessBouncy: "400",
  },
} as const;

// =============================================================================
// Shadows (Light Mode)
// =============================================================================

export const shadowLight = {
  raised:
    "-6px -6px 14px rgba(255, 255, 255, 0.88), 6px 6px 14px rgba(175, 175, 175, 0.52)",
  raisedSm:
    "-3px -3px 8px rgba(255, 255, 255, 0.88), 3px 3px 8px rgba(175, 175, 175, 0.52)",
  raisedLg:
    "-8px -8px 20px rgba(255, 255, 255, 0.9), 8px 8px 20px rgba(175, 175, 175, 0.58)",
  pressed:
    "inset -4px -4px 8px rgba(255, 255, 255, 0.88), inset 4px 4px 8px rgba(175, 175, 175, 0.52)",
  pressedSm:
    "inset -2px -2px 5px rgba(255, 255, 255, 0.75), inset 2px 2px 5px rgba(175, 175, 175, 0.44)",
  flat: "inset 1px 1px 2px rgba(175, 175, 175, 0.32), inset -1px -1px 2px rgba(255, 255, 255, 0.55)",
  focus: "0 0 0 3px rgba(0, 175, 102, 0.6)",
  insetHighlight: "inset 0 1px 0 rgba(255, 255, 255, 0.2)",
  variantPrimary:
    "inset 0 1px 0 rgba(255, 255, 255, 0.2), -4px -4px 10px rgba(255, 255, 255, 0.3), 4px 4px 10px rgba(0, 100, 60, 0.3)",
  variantSecondary:
    "inset 0 1px 0 rgba(255, 255, 255, 0.2), -4px -4px 10px rgba(255, 255, 255, 0.3), 4px 4px 10px rgba(60, 60, 140, 0.3)",
  variantDestructive:
    "inset 0 1px 0 rgba(255, 255, 255, 0.2), -4px -4px 10px rgba(255, 255, 255, 0.3), 4px 4px 10px rgba(180, 40, 40, 0.3)",
  variantSuccess:
    "inset 0 1px 0 rgba(255, 255, 255, 0.2), -4px -4px 10px rgba(255, 255, 255, 0.3), 4px 4px 10px rgba(0, 100, 60, 0.2)",
  variantWarning:
    "inset 0 1px 0 rgba(255, 255, 255, 0.2), -4px -4px 10px rgba(255, 255, 255, 0.3), 4px 4px 10px rgba(180, 80, 0, 0.2)",
  controlUnchecked:
    "inset -2px -2px 4px rgba(255, 255, 255, 0.7), inset 2px 2px 5px rgba(0, 60, 40, 0.35)",
  controlChecked:
    "inset 0 1px 0 rgba(255, 255, 255, 0.25), inset 2px 2px 5px rgba(0, 80, 50, 0.35)",
} as const;

// =============================================================================
// Shadows (Dark Mode) - Only shadows that differ from light mode
// =============================================================================

export const shadowDark = {
  raised:
    "-6px -6px 14px rgba(255, 255, 255, 0.06), 6px 6px 14px rgba(0, 0, 0, 0.5)",
  raisedSm:
    "-3px -3px 8px rgba(255, 255, 255, 0.06), 3px 3px 8px rgba(0, 0, 0, 0.5)",
  raisedLg:
    "-8px -8px 20px rgba(255, 255, 255, 0.07), 8px 8px 20px rgba(0, 0, 0, 0.55)",
  pressed:
    "inset -4px -4px 8px rgba(255, 255, 255, 0.06), inset 4px 4px 8px rgba(0, 0, 0, 0.5)",
  pressedSm:
    "inset -2px -2px 5px rgba(255, 255, 255, 0.04), inset 2px 2px 5px rgba(0, 0, 0, 0.35)",
  flat: "inset 1px 1px 2px rgba(0, 0, 0, 0.25), inset -1px -1px 2px rgba(255, 255, 255, 0.04)",
  focus: "0 0 0 3px rgba(0, 175, 102, 0.6)",
  insetHighlight: "inset 0 1px 0 rgba(255, 255, 255, 0.1)",
  variantPrimary:
    "inset 0 1px 0 rgba(255, 255, 255, 0.1), -3px -3px 8px rgba(255, 255, 255, 0.1), 3px 3px 8px rgba(0, 0, 0, 0.4)",
  variantSecondary:
    "inset 0 1px 0 rgba(255, 255, 255, 0.1), -3px -3px 8px rgba(255, 255, 255, 0.1), 3px 3px 8px rgba(0, 0, 0, 0.4)",
  variantDestructive:
    "inset 0 1px 0 rgba(255, 255, 255, 0.1), -3px -3px 8px rgba(255, 255, 255, 0.1), 3px 3px 8px rgba(0, 0, 0, 0.4)",
  variantSuccess:
    "inset 0 1px 0 rgba(255, 255, 255, 0.1), -3px -3px 8px rgba(255, 255, 255, 0.1), 3px 3px 8px rgba(0, 0, 0, 0.4)",
  variantWarning:
    "inset 0 1px 0 rgba(255, 255, 255, 0.1), -3px -3px 8px rgba(255, 255, 255, 0.1), 3px 3px 8px rgba(0, 0, 0, 0.4)",
  controlUnchecked:
    "inset -2px -2px 4px rgba(255, 255, 255, 0.08), inset 2px 2px 5px rgba(0, 0, 0, 0.45)",
  controlChecked:
    "inset 0 1px 0 rgba(255, 255, 255, 0.15), inset 2px 2px 5px rgba(0, 0, 0, 0.4)",
} as const;

// =============================================================================
// Static Shadows (Not theme-dependent, same in light/dark)
// These are used for badges and specific controls
// =============================================================================

export const shadowStatic = {
  grooveH:
    "inset 0 1px 1px rgba(174, 174, 174, 0.5), inset 0 -1px 1px rgba(255, 255, 255, 0.7)",
  grooveV:
    "inset 1px 0 1px rgba(174, 174, 174, 0.5), inset -1px 0 1px rgba(255, 255, 255, 0.7)",
  badgePrimary:
    "inset 0 1px 0 rgba(255,255,255,0.2), -2px -2px 4px rgba(255,255,255,0.2), 2px 2px 4px rgba(0,100,60,0.2)",
  badgeSecondary:
    "inset 0 1px 0 rgba(255,255,255,0.2), -2px -2px 4px rgba(255,255,255,0.2), 2px 2px 4px rgba(60,60,140,0.2)",
  badgeDestructive:
    "inset 0 1px 0 rgba(255,255,255,0.2), -2px -2px 4px rgba(255,255,255,0.2), 2px 2px 4px rgba(180,40,40,0.2)",
  badgeSuccess:
    "inset 0 1px 0 rgba(255,255,255,0.2), -2px -2px 4px rgba(255,255,255,0.2), 2px 2px 4px rgba(0,100,60,0.2)",
  badgeWarning:
    "inset 0 1px 0 rgba(255,255,255,0.2), -2px -2px 4px rgba(255,255,255,0.2), 2px 2px 4px rgba(180,80,0,0.2)",
  badgeInfo:
    "inset 0 1px 0 rgba(255,255,255,0.2), -2px -2px 4px rgba(255,255,255,0.2), 2px 2px 4px rgba(59,130,246,0.3)",
  badgeAi:
    "inset 0 1px 0 rgba(255,255,255,0.2), -2px -2px 4px rgba(255,255,255,0.2), 2px 2px 4px rgba(139,92,246,0.3)",
  controlUncheckedInline:
    "inset 2px 2px 4px rgba(0,60,40,0.25), inset -1px -1px 2px rgba(255,255,255,0.4)",
  controlCheckedInline:
    "inset -2px -2px 5px rgba(255,255,255,0.2), inset 2px 2px 5px rgba(0,80,50,0.3)",
  radioIndicator:
    "inset -1px -1px 2px rgba(255,255,255,0.3), inset 1px 1px 2px rgba(0,80,50,0.3)",
} as const;

// =============================================================================
// Animations (Keyframes + Durations)
// =============================================================================

export const animations = {
  keyframes: {
    accordionExpand: {
      from: { gridTemplateRows: "0fr" },
      to: { gridTemplateRows: "1fr" },
    },
    accordionCollapse: {
      from: { gridTemplateRows: "1fr" },
      to: { gridTemplateRows: "0fr" },
    },
    contentFadeIn: {
      from: { opacity: "0", transform: "translateY(-4px)" },
      to: { opacity: "1", transform: "translateY(0)" },
    },
    contentFadeOut: {
      from: { opacity: "1", transform: "translateY(0)" },
      to: { opacity: "0", transform: "translateY(-4px)" },
    },
    backdropFadeIn: {
      from: { opacity: "0" },
      to: { opacity: "1" },
    },
    backdropFadeOut: {
      from: { opacity: "1" },
      to: { opacity: "0" },
    },
    slideInRight: {
      from: { transform: "translateX(100%)" },
      to: { transform: "translateX(0)" },
    },
    slideOutRight: {
      from: { transform: "translateX(0)" },
      to: { transform: "translateX(100%)" },
    },
    slideInLeft: {
      from: { transform: "translateX(-100%)" },
      to: { transform: "translateX(0)" },
    },
    slideOutLeft: {
      from: { transform: "translateX(0)" },
      to: { transform: "translateX(-100%)" },
    },
    slideInTop: {
      from: { transform: "translateY(-100%)" },
      to: { transform: "translateY(0)" },
    },
    slideOutTop: {
      from: { transform: "translateY(0)" },
      to: { transform: "translateY(-100%)" },
    },
    slideInBottom: {
      from: { transform: "translateY(100%)" },
      to: { transform: "translateY(0)" },
    },
    slideOutBottom: {
      from: { transform: "translateY(0)" },
      to: { transform: "translateY(100%)" },
    },
  },
  // Animation definitions: [keyframe-name, duration, easing, delay?]
  definitions: {
    accordionExpand: ["accordion-expand", "300ms", "ease-neu", "forwards"],
    accordionCollapse: ["accordion-collapse", "300ms", "ease-neu", "forwards"],
    contentFadeIn: ["content-fade-in", "200ms", "ease-neu", "100ms forwards"],
    contentFadeOut: ["content-fade-out", "150ms", "ease-neu", "forwards"],
    backdropIn: ["backdrop-fade-in", "300ms", "ease-neu", "forwards"],
    backdropOut: ["backdrop-fade-out", "200ms", "ease-neu", "forwards"],
    drawerInRight: ["slide-in-right", "300ms", "ease-neu", "forwards"],
    drawerOutRight: ["slide-out-right", "200ms", "ease-neu", "forwards"],
    drawerInLeft: ["slide-in-left", "300ms", "ease-neu", "forwards"],
    drawerOutLeft: ["slide-out-left", "200ms", "ease-neu", "forwards"],
    drawerInTop: ["slide-in-top", "300ms", "ease-neu", "forwards"],
    drawerOutTop: ["slide-out-top", "200ms", "ease-neu", "forwards"],
    drawerInBottom: ["slide-in-bottom", "300ms", "ease-neu", "forwards"],
    drawerOutBottom: ["slide-out-bottom", "200ms", "ease-neu", "forwards"],
  },
} as const;

// =============================================================================
// Aggregate Export
// =============================================================================

export const baseTokens = {
  spacing,
  radius,
  zIndex,
  motion,
  shadow: {
    light: shadowLight,
    dark: shadowDark,
    static: shadowStatic,
  },
  animations,
} as const;

export type BaseTokens = typeof baseTokens;
