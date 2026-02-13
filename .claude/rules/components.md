# Component Architecture

## Directory Structure

Components use a co-located pattern:

```
components/
└── component-name/
    ├── component-name.tsx   # Component logic
    ├── index.ts             # Barrel exports
    ├── types.ts             # TypeScript interfaces
    └── styles.ts            # Tailwind class objects
```

## Compound Component Pattern

Use namespace exports for multi-part components:

```tsx
// ✅ Correct - namespace pattern
<Dialog.Root>
  <Dialog.Trigger>Open</Dialog.Trigger>
  <Dialog.Content>...</Dialog.Content>
</Dialog.Root>

// Also support simple usage via Object.assign
<Dialog open={open} onClose={onClose} title="Title">
  Content
</Dialog>
```

**Implementation:**
```tsx
export const Dialog = Object.assign(DialogSimple, {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Content: DialogContent,
})

export { DialogRoot, DialogTrigger, DialogContent }
```

## Zero-Inline-Classnames Rule

**Components MUST NOT contain Tailwind className strings inline.**

```tsx
// ❌ NEVER — Inline classnames in components
<button className="flex items-center justify-center px-4 py-2 bg-primary">

// ✅ ALWAYS — Import from styles.ts
import { ButtonStyles } from './styles'
<button className={ButtonStyles.base}>
```

## Style Architecture

```
component-harness/styles/
├── index.ts              # Main barrel export
├── tokens/               # Primitive tokens (Spacing, Sizing, Typography)
└── patterns/             # Style compositions (namespaced)
    ├── form/             # Form.Label.base, Form.Input.base
    ├── layout/           # Layout.Flex.center, Layout.Position.absolute
    ├── interactive/      # Interactive.Focus.ring, Interactive.Cursor.pointer
    ├── overlay/          # Overlay.Dialog.backdrop, Overlay.Card.container
    ├── control/          # Control.Toggle.base, Control.Slider.track
    └── feedback/         # Feedback.Badge.primary, Feedback.Alert.success
```

## Co-located Styles

```tsx
// styles.ts — REQUIRED for every component
import { Layout, Interactive, Overlay } from '../../styles'

export const DialogStyles = {
  overlay: [
    Overlay.Dialog.backdrop,
    Interactive.Transition.all,
  ].join(' '),
  content: [
    Overlay.Dialog.content,
    Interactive.Focus.within,
  ].join(' '),
  title: Overlay.Dialog.title,
} as const

// component.tsx
import { DialogStyles as S } from './styles'
<div className={cn(S.overlay, className)} />
```

## Namespace Pattern

| Namespace | Examples |
|-----------|----------|
| `Form` | `Form.Input.base`, `Form.Label.base`, `Form.Helper.error` |
| `Layout` | `Layout.Flex.center`, `Layout.Flex.between`, `Layout.Position.absolute` |
| `Interactive` | `Interactive.Focus.ring`, `Interactive.Cursor.pointer`, `Interactive.Disabled.base` |
| `Overlay` | `Overlay.Dialog.backdrop`, `Overlay.Card.container`, `Overlay.Drawer.header` |
| `Control` | `Control.Toggle.base`, `Control.Toggle.checked`, `Control.Slider.track` |
| `Feedback` | `Feedback.Badge.primary`, `Feedback.Alert.success` |

## Ref Handling (React 19 Ready)

```tsx
// ✅ React 19 style - ref as prop
function Button({ ref, className, ...props }: ButtonProps) {
  return <button ref={ref} className={className} {...props} />
}

interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
  variant?: 'primary' | 'secondary'
}
```

**Note:** Project currently uses React 18.2.0. When React 19 is adopted, forwardRef can be removed.

## Framer Motion Type Conflicts

```tsx
// ✅ Correct - destructure conflicting props
function AnimatedDiv({
  onDrag,           // React HTML prop
  onDragStart,      // React HTML prop
  onDragEnd,        // React HTML prop
  onAnimationStart, // React HTML prop
  onAnimationEnd,   // React HTML prop
  ...props
}: Props) {
  return (
    <motion.div
      {...props}
    />
  )
}
```

## Shared Hooks

From `@/hooks`:

| Hook | Purpose |
|------|---------|
| `useControlledState` | Controlled/uncontrolled component state |
| `useBodyScrollLock` | Lock body scroll for modals/drawers |
| `useEscapeKey` | Dismiss on Escape key |
| `useClickOutside` | Close on outside click |
| `usePositioning` | Floating element positioning |

## Centralized Config

From `@/config`:

```tsx
import { SPRING, DURATION, OPACITY, ARIA, LABEL, SR_ONLY } from '@/config'

// Motion
<motion.div transition={SPRING.snappy} />
<motion.div animate={{ opacity: OPACITY.visible }} />

// Text/ARIA
<button aria-label={ARIA.close}>
<span className="sr-only">{SR_ONLY.loading}</span>
```
