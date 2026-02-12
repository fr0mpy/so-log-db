# Project Context

This project uses dynamic context management via `.claude/CONTEXT.md`.
Run the `context-loader` agent if context is stale or missing.

See `.claude/CONTEXT.md` for:
- Project structure and file tree
- Detected stack and dependencies
- Key directories and their purposes

---

## Behavioral Rules

### Action Announcements

For every operation, announce before starting and report results:

| Event | Format |
|-------|--------|
| Starting action | `🔧 ACTION: [what]` |
| Action done | `✅ DONE: [result]` |
| Failed | `❌ FAILED: [reason]` |

**Agent deduplication:** Each agent runs ONCE per user prompt, max. Before invoking, check if already used this turn. If already ran, use cached findings and output `⏭️ SKIP: [agent] (cached)`.

### Code Standards

For every piece of code, follow these patterns:

| ❌ Hardcoded/Assumed | ✅ Dynamic/Discovered |
|----------------------|----------------------|
| `src/components/*.tsx` | Glob for `**/*.tsx`, group by directory |
| `users[0], users[1]` | `users.map()` or `users.forEach()` |
| `'#007AFF'` | `theme.colors.primary` |
| `'https://api...'` | `config.API_BASE_URL` |
| `if (x > 50)` | `if (x > CONFIG.THRESHOLD)` |
| `duration: 0.3` | `DURATION.slow` from config |
| `aria-label="Close"` | `ARIA.close` from config |

**Principles:**
1. **Discover, don't assume** — Scan for what exists, don't hardcode paths
2. **Iterate, don't index** — Use `.map()`, `.filter()`, `.find()` not `[0]`, `[1]`
3. **Configure, don't embed** — Values that might change go in config
4. **Categorize by pattern** — Group by naming convention, not explicit list

---

## Component Architecture

### Directory Structure

Components use a co-located pattern with separate files for logic, types, and styles:

```
components/
└── component-name/
    ├── component-name.tsx   # Component logic
    ├── index.ts             # Barrel exports
    ├── types.ts             # TypeScript interfaces
    └── styles.ts            # Tailwind class objects
```

### Compound Component Pattern

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
// Object.assign makes the component both callable AND has namespace properties
export const Dialog = Object.assign(DialogSimple, {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Content: DialogContent,
  // ...
})

// Individual exports for backward compatibility
export { DialogRoot, DialogTrigger, DialogContent }
```

### Zero-Inline-Classnames Rule (CRITICAL)

**Components MUST NOT contain Tailwind className strings inline.**

```tsx
// ❌ NEVER — Inline classnames in components
<button className="flex items-center justify-center px-4 py-2 bg-primary">

// ✅ ALWAYS — Import from styles.ts
import { ButtonStyles } from './styles'
<button className={ButtonStyles.base}>
```

### Style Architecture

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

### Co-located Styles

Styles live in `styles.ts` next to the component, importing from `../../styles`:

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
// ...
<div className={cn(S.overlay, className)} />
```

### Namespace Pattern

Use dot notation for clean, discoverable style access:

| Namespace | Examples |
|-----------|----------|
| `Form` | `Form.Input.base`, `Form.Label.base`, `Form.Helper.error` |
| `Layout` | `Layout.Flex.center`, `Layout.Flex.between`, `Layout.Position.absolute` |
| `Interactive` | `Interactive.Focus.ring`, `Interactive.Cursor.pointer`, `Interactive.Disabled.base` |
| `Overlay` | `Overlay.Dialog.backdrop`, `Overlay.Card.container`, `Overlay.Drawer.header` |
| `Control` | `Control.Toggle.base`, `Control.Toggle.checked`, `Control.Slider.track` |
| `Feedback` | `Feedback.Badge.primary`, `Feedback.Alert.success` |

### Ref Handling (React 19 Ready)

Use ref as a prop (React 19 style) instead of forwardRef:

```tsx
// ✅ React 19 style - ref as prop
function Button({ ref, className, ...props }: ButtonProps) {
  return <button ref={ref} className={className} {...props} />
}

// Types include ref
interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
  variant?: 'primary' | 'secondary'
}
```

**Note:** Project currently uses React 18.2.0. When React 19 is adopted, forwardRef can be removed.

### Framer Motion Type Conflicts

Destructure conflicting HTML props before spreading to motion elements:

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
      // Framer Motion uses its own onDrag/animation props
      {...props}
    />
  )
}
```

### Shared Hooks

Use these hooks from `@/hooks`:

| Hook | Purpose |
|------|---------|
| `useControlledState` | Controlled/uncontrolled component state |
| `useBodyScrollLock` | Lock body scroll for modals/drawers |
| `useEscapeKey` | Dismiss on Escape key |
| `useClickOutside` | Close on outside click |
| `usePositioning` | Floating element positioning |

### Centralized Config

Import constants from `@/config`:

```tsx
import { SPRING, DURATION, OPACITY, ARIA, LABEL, SR_ONLY } from '@/config'

// Motion
<motion.div transition={SPRING.snappy} />
<motion.div animate={{ opacity: OPACITY.visible }} />

// Text/ARIA
<button aria-label={ARIA.close}>
<span className="sr-only">{SR_ONLY.loading}</span>
```

---

## Theme Architecture

### Two-Tier Theming

The project uses a two-tier theming system:

| Tier | Contains | Loaded |
|------|----------|--------|
| **Base Theme** | Spacing, shadows, motion, radii, z-index | Bundled with app |
| **Brand Theme** | Colors, typography | Fetched per MFE |

### CSS Variable Naming Convention

**All theme tokens use category prefixes:**

| Category | Prefix | Examples |
|----------|--------|----------|
| Colors | `--color-*` | `--color-primary`, `--color-neu-base` |
| Shadows | `--shadow-*` | `--shadow-raised`, `--shadow-pressed` |
| Radius | `--radius-*` | `--radius-sm`, `--radius-md` |
| Spacing | `--spacing-*` | `--spacing-1`, `--spacing-4` |
| Typography | `--font-*` | `--font-heading`, `--font-body` |
| Motion | `--motion-*` | `--motion-duration-fast` |
| Z-Index | `--z-*` | `--z-modal`, `--z-tooltip` |

```css
/* ❌ NEVER — unprefixed or inconsistent */
--neu-base: #f0f0f0;
--duration-fast: 150ms;

/* ✅ ALWAYS — category-prefixed */
--color-neu-base: #f0f0f0;
--motion-duration-fast: 150ms;
```

### Theme Files

```
packages/ui-library/core/src/themes/
├── base.json           # Structural tokens (bundled)
├── schema.ts           # Token definitions + fallbacks
├── apply-theme.ts      # JSON → CSS vars
├── validate-theme.ts   # Warns on missing tokens
└── index.ts            # Barrel export

apps/shell/public/themes/
└── stackone-green.json # Brand theme (fetched)
```

### Tailwind Preset

Apps extend the shared preset instead of duplicating config:

```ts
// tailwind.config.ts
import stackonePreset from '@stackone-ui/core/tailwind.preset'

export default {
  presets: [stackonePreset],
  content: ['./src/**/*.{ts,tsx}'],
}
```

### Adding New Tokens

1. Add to `schema.ts` with fallback value
2. Add to `base.json` or brand theme JSON
3. Add to `tailwind.preset.ts` if Tailwind utility needed
4. Use in components via Tailwind classes or CSS vars

---

### Multi-Zone Navigation (CRITICAL)

This project uses **Next.js Multi-Zones** (not Module Federation). Cross-zone links require full page navigation.

```tsx
// ❌ NEVER — next/link for cross-zone routes
import Link from 'next/link'
<Link href="/connectors">MFE</Link>  // Causes webpack "call" error

// ✅ ALWAYS — <a> tag for cross-zone navigation
<a href="/connectors">MFE</a>  // Full page navigation via rewrite
```

**Why:** `next/link` performs client-side routing within the same zone. Routes served by different zones (via `rewrites()`) don't exist in the client router, causing webpack module errors.

| Route Type | Use |
|------------|-----|
| Same zone (e.g., `/about` in Shell) | `<Link href="/about">` |
| Cross zone (e.g., `/connectors` → MFE) | `<a href="/connectors">` |
| Within MFE (e.g., `/logs` in MFE) | `<Link href="/logs">` |

---

### Constructive Pushback

When the user makes a claim or assumption, verify accuracy before agreeing.

| Push Back When | Don't Push Back When |
|----------------|---------------------|
| Incorrect technical claim | User is correct |
| Suboptimal approach | Preference/style choice |
| Missing edge case | Already discussed |
| Flawed assumption | Minor/trivial detail |
| Misremembered API/syntax | User explicitly chose despite tradeoffs |

**Do:** "That approach could cause X — consider Y instead"
**Don't:** "You're absolutely right!" (when they're not)

---

## Configuration

- **Agents**: `.claude/agents/` — Task specialists (auto-selected by prompt-analyzer)
- **Skills**: `.claude/skills/` — On-demand reference docs and tools
- **Commands**: `.claude/commands/` — Slash commands (/review, /test, /commit)
- **Hooks**: `.claude/hooks/` — Per-prompt context reminder
