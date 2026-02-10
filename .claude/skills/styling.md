---
description: USE WHEN generating, modifying, or reviewing UI components, working with Tailwind CSS theming, design tokens, or component recipes. Enforces token usage, mobile-first patterns, and recipe compliance.
---

# Styling System

Apply this skill when generating, modifying, or reviewing UI components.

## How the Token System Works

The styling system uses a **CSS Variable → Tailwind → Component** architecture:

```
styling-config.json          tailwind.config.ts           Component
─────────────────────────────────────────────────────────────────────
"primary": "#00FF41"    →    primary: 'var(--color-primary)'    →    bg-primary
"success": "#00FF41"    →    success: 'var(--color-success)'    →    bg-success
"warning": "#FFB800"    →    warning: 'var(--color-warning)'    →    bg-warning
```

**Key insight:** You use SEMANTIC CLASS NAMES (like `bg-primary`, `bg-success`) that are already mapped to CSS variables. The actual hex values in `styling-config.json` are injected into CSS variables at runtime.

**DO NOT:**
- Try to interpolate `{tokens.*}` placeholders - there is no interpolation engine
- Use the hex values from config directly - they're for CSS variables only
- Use generic Tailwind colors (`bg-green-500`) - these bypass the token system

**DO:**
- Use semantic Tailwind classes: `bg-primary`, `bg-success`, `bg-warning`, `bg-destructive`
- Read `tokens.radius` from config and use that exact class (e.g., `rounded-none`)
- Trust that the CSS variables will provide the correct colors at runtime

## ⚠️ MANDATORY ENFORCEMENT

**Before writing ANY UI code, you MUST:**

1. Read `.claude/styling-config.json` if it exists
2. Check for component recipes in `.claude/component-recipes/`
3. If generating a component that has a recipe, follow it exactly

**NEVER:**
- Use hardcoded hex colors (`#XXXXXX`) - use semantic tokens
- Use hardcoded RGB/RGBA values - use semantic tokens
- Use non-semantic Tailwind colors (`bg-blue-500`) - use `bg-primary`, `bg-secondary`, etc.
- Use `focus:` for focus states - use `focus-visible:` for keyboard accessibility
- Omit `cursor-pointer` on interactive elements
- Use desktop-first responsive patterns (`max-sm:`, `max-md:`)

## When to Apply

- Creating new UI components (buttons, cards, inputs, modals, etc.)
- Modifying existing component styles
- Reviewing code for styling consistency
- User asks about design tokens or component patterns

## Configuration Loading

Before generating any UI code:

1. **Check for config** at `.claude/styling-config.json`
2. **Check for recipes** in `.claude/component-recipes/`
3. If neither exists, suggest running `/setup-styling` to configure the design system

## Token Usage

When `.claude/styling-config.json` exists, use semantic tokens instead of hardcoded values:

| ❌ NEVER Use | ✅ ALWAYS Use |
|--------------|---------------|
| `#3b82f6` | `bg-primary` / `text-primary` |
| `#00FF41` | `bg-primary` / `text-primary` |
| `bg-blue-500` | `bg-primary` |
| `bg-red-500` | `bg-destructive` |
| `bg-green-500` | `bg-success` |
| `bg-yellow-500` | `bg-warning` |
| `text-gray-500` | `text-muted-foreground` |
| `rounded-lg` (assumed) | Value from `tokens.radius` |
| `shadow-md` (assumed) | Value from `tokens.shadows` |
| `focus:ring-2` | `focus-visible:ring-2` |

### Complete Token Reference

```
COLORS (use Tailwind utility prefix: bg-, text-, border-)
─────────────────────────────────────────────────────────
tokens.colors.primary            → bg-primary, text-primary, border-primary
tokens.colors.primary-foreground → text-primary-foreground
tokens.colors.secondary          → bg-secondary, text-secondary
tokens.colors.secondary-foreground → text-secondary-foreground
tokens.colors.destructive        → bg-destructive, text-destructive
tokens.colors.destructive-foreground → text-destructive-foreground
tokens.colors.success            → bg-success, text-success
tokens.colors.success-foreground → text-success-foreground
tokens.colors.warning            → bg-warning, text-warning
tokens.colors.warning-foreground → text-warning-foreground
tokens.colors.accent             → bg-accent, text-accent
tokens.colors.accent-foreground  → text-accent-foreground
tokens.colors.muted              → bg-muted
tokens.colors.muted-foreground   → text-muted-foreground
tokens.colors.surface            → bg-surface (cards, panels)
tokens.colors.background         → bg-background (page)
tokens.colors.foreground         → text-foreground
tokens.colors.border             → border-border

TYPOGRAPHY
───────────────────────────────────────────────────────
tokens.typography.families.heading → font-heading
tokens.typography.families.body    → font-body
tokens.typography.families.code    → font-mono
tokens.typography.classes.*        → Pre-composed typography classes

LAYOUT
───────────────────────────────────────────────────────
tokens.radius                    → border radius class (e.g., rounded-none, rounded-md)
tokens.shadows.*                 → shadow-elevation-sm, shadow-elevation-md, etc.
tokens.spacing.tight/normal/loose → p-1, p-2, p-4, etc.
```

## Recipe Compliance

If a recipe exists in `.claude/component-recipes/[component].md`:

1. **Read the recipe first** - MANDATORY
2. Follow the defined structure exactly
3. Use the exact variants specified
4. Apply the Tailwind classes from the recipe
5. Include all required states (hover, focus-visible, disabled)

## Interactive Element Rules

All interactive elements MUST have:

1. **`cursor-pointer`** - Visual affordance for clickability
2. **`focus-visible:` states** - Keyboard accessibility (NOT `focus:`)
3. **Minimum 44x44px touch target** - Mobile accessibility

### Elements requiring cursor-pointer:
- Buttons (`<button>`, `role="button"`)
- Clickable cards or list items
- Links styled as buttons
- Toggle switches, checkboxes, radio buttons
- Dropdown triggers
- Tab buttons
- Any element with an `onClick` handler

```tsx
// ✅ CORRECT - cursor-pointer AND focus-visible
<button className="cursor-pointer focus-visible:ring-2 focus-visible:ring-primary ...">
  Click me
</button>

// ❌ INCORRECT - missing cursor-pointer, using focus instead of focus-visible
<button className="focus:ring-2 ...">Click me</button>
```

## Mobile-First Design (REQUIRED)

All components MUST be built mobile-first. This means:

1. **Default styles target mobile** - Base classes without breakpoint prefixes are for mobile
2. **Progressive enhancement** - Add `sm:`, `md:`, `lg:`, `xl:` prefixes for larger screens
3. **Touch-friendly targets** - Minimum 44x44px touch targets on interactive elements
4. **Responsive typography** - Use responsive text sizes (`text-sm md:text-base lg:text-lg`)
5. **Flexible layouts** - Use `flex-col` by default, `sm:flex-row` for larger screens
6. **Full-width on mobile** - Components should be `w-full` on mobile, constrained on larger screens

### Mobile-First Pattern Examples

```tsx
// ✅ CORRECT - Mobile first
<div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
<div className="p-4 md:p-6 lg:p-8">
<button className="w-full sm:w-auto px-4 py-3 min-h-[44px] cursor-pointer">
<h1 className="text-lg md:text-xl lg:text-2xl">

// ❌ INCORRECT - Desktop first (NEVER do this)
<div className="flex flex-row gap-4 max-sm:flex-col max-sm:gap-2">
<div className="p-8 max-md:p-6 max-lg:p-4">
```

### Responsive Breakpoint Reference

| Prefix | Min Width | Typical Device |
|--------|-----------|----------------|
| (none) | 0px | Mobile phones |
| `sm:` | 640px | Large phones / small tablets |
| `md:` | 768px | Tablets |
| `lg:` | 1024px | Laptops |
| `xl:` | 1280px | Desktops |
| `2xl:` | 1536px | Large desktops |

## Component Generation Checklist

**YOU MUST verify ALL items before delivering any UI component:**

### Critical (MUST pass)
- [ ] No hardcoded hex colors (`#XXXXXX`)
- [ ] No hardcoded rgb/rgba values
- [ ] No non-semantic Tailwind colors (`bg-blue-500`, `text-red-600`, etc.)
- [ ] All interactive elements have `cursor-pointer`
- [ ] Using `focus-visible:` NOT `focus:` for focus states
- [ ] No desktop-first patterns (`max-sm:`, `max-md:`)

### Required
- [ ] Loaded styling config (if exists)
- [ ] Checked for component recipe (if exists)
- [ ] Using token-based colors from config
- [ ] Radius matches config (`tokens.radius`)
- [ ] Shadow uses elevation system (`shadow-elevation-*`)
- [ ] All interactive states included (hover, focus-visible, disabled)
- [ ] Touch targets are minimum 44x44px

### Mobile-First
- [ ] Base styles target mobile (no breakpoint prefix)
- [ ] Larger screen styles use `sm:`/`md:`/`lg:` prefixes
- [ ] Layout is flexible (`flex-col` → `sm:flex-row` pattern)

## Auditing (when asked to review/audit)

Scan UI files for violations:

### 🚨 Critical Violations (MUST FIX)
- Hardcoded hex colors (`#[0-9a-fA-F]{3,8}`)
- Hardcoded rgb/rgba values (`rgb(`, `rgba(`)
- Non-semantic Tailwind colors (`bg-blue-500`, `text-red-600`, etc.)
- Using `focus:` instead of `focus-visible:`
- Interactive elements missing `cursor-pointer`
- Desktop-first responsive patterns (`max-sm:`, `max-md:`, `max-lg:`)
- Touch targets smaller than 44x44px on interactive elements

### ⚠️ Warnings
- Missing responsive breakpoints for layout/spacing/typography
- Inconsistent border radius across components
- Inconsistent shadow depth
- Spacing that doesn't match density setting
- Inline styles with color/spacing values

### Audit Output Format

```
Styling Audit Report
====================
Configuration: [loaded | not found]
Files scanned: [count]

🚨 CRITICAL VIOLATIONS:
- file.tsx:24 → Hardcoded `#3b82f6` → Use `bg-primary`
- file.tsx:53 → Using `focus:` → Use `focus-visible:`
- file.tsx:78 → Missing `cursor-pointer` on <button>

⚠️ WARNINGS:
- file.tsx:12 → `rounded-xl` but config is `rounded-lg`

Compliance: [X]% ([Y] critical, [Z] warnings)
```

## Fallback Behavior

If no styling config exists:
- Use sensible defaults: `rounded-md`, `shadow-sm`, system font
- Warn about inconsistency risk
- Suggest: "Run `/setup-styling` to define your project's design tokens"
