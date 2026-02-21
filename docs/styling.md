# Styling

Zero-inline-classnames pattern with centralized namespace styles.

## Core Rule

Components MUST NOT contain Tailwind className strings inline. All styles must be in:
1. `styles/` directory - Centralized patterns
2. `components/[name]/styles.ts` - Component-specific styles

```tsx
// Never do this
<button className="flex items-center px-4 py-2 bg-primary">

// Always do this
import { ButtonStyles } from './styles'
<button className={ButtonStyles.base}>
```

## Component Structure

```
components/
└── button/
    ├── button.tsx    # Component (no inline classnames)
    ├── styles.ts     # All styles
    ├── types.ts      # TypeScript interfaces
    └── index.ts      # Barrel exports
```

## Namespace Pattern

```typescript
// components/button/styles.ts
import { Interactive, Layout } from '../../styles'

export const ButtonStyles = {
  base: [
    Layout.Flex.centerInline,
    Interactive.Button.base,
    Interactive.Focus.ring,
  ].join(' '),

  variants: {
    primary: 'bg-primary text-primary-foreground shadow-neu-raised',
    secondary: 'bg-secondary text-secondary-foreground',
  },
} as const
```

## Available Namespaces

| Namespace | Purpose | Examples |
|-----------|---------|----------|
| `Form` | Inputs, labels | `Form.Input.base`, `Form.Label.tracking` |
| `Layout` | Flex, spacing | `Layout.Flex.center`, `Layout.Spacing.standard` |
| `Interactive` | Focus, transitions | `Interactive.Focus.ring`, `Interactive.Cursor.pointer` |
| `Overlay` | Modals, cards | `Overlay.Dialog.backdrop`, `Overlay.Card.container` |
| `Control` | Toggle, slider | `Control.Toggle.base`, `Control.Slider.track` |
| `Feedback` | Badge, alert | `Feedback.Badge.primary`, `Feedback.Alert.success` |

## Text Component Rule

Never use raw `<p>`, `<span>`, `<h1>`-`<h6>` tags. Always use `<Text>`:

```tsx
// Never
<p className={styles.description}>Text</p>
<h1 className={styles.title}>Title</h1>

// Always
import { Text } from '@stackone-ui/core/text'
<Text variant="body2" color="muted">Text</Text>
<Text variant="h1">Title</Text>
```

### Text Variants

| Variant | Renders As | Use For |
|---------|------------|---------|
| `h1`-`h6` | `<h1>`-`<h6>` | Headings |
| `body1` | `<p>` | Standard body (default) |
| `body2` | `<p>` | Smaller body |
| `caption` | `<span>` | Small labels |
| `code` | `<code>` | Inline code |

## Compound Components

Multi-part components use Object.assign for namespace pattern:

```tsx
export const Dialog = Object.assign(DialogSimple, {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Content: DialogContent,
})

// Usage
<Dialog open={open} onClose={onClose} title="Title">Content</Dialog>

// Or compound
<Dialog.Root>
  <Dialog.Trigger>Open</Dialog.Trigger>
  <Dialog.Content>...</Dialog.Content>
</Dialog.Root>
```

## Style Architecture

```
styles/
├── index.ts          # Barrel export
├── tokens/           # Primitives (Spacing, Sizing, Typography)
└── patterns/         # Compositions
    ├── form/         # Form.Label, Form.Input
    ├── layout/       # Layout.Flex, Layout.Position
    ├── interactive/  # Interactive.Focus, Interactive.Cursor
    ├── overlay/      # Overlay.Dialog, Overlay.Card
    ├── control/      # Control.Toggle, Control.Slider
    └── feedback/     # Feedback.Badge, Feedback.Alert
```

## Config Constants

```tsx
import { SPRING, DURATION, ARIA, LABEL } from '@/config'

<motion.div transition={SPRING.snappy} />
<button aria-label={ARIA.close} />
```

## Checklist

- [ ] No inline Tailwind classnames in JSX
- [ ] `styles.ts` exists for component
- [ ] Imports from `../../styles`
- [ ] Uses `focus-visible:` not `focus:`
- [ ] Has `cursor-pointer` on interactive elements
- [ ] Uses `<Text>` not raw text elements
