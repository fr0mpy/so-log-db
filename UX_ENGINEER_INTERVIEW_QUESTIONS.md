# 160 Senior UX Engineer Interview Questions for StackOne Log Dashboard

Comprehensive interview questions based on codebase analysis, organized by 10 domains. All answers reference actual file paths and implementations from the codebase.

---

## Design System Architecture (1-15)

### 1. Zero-Inline-Classnames Pattern
**Q: Explain the "zero-inline-classnames" rule in this codebase. Why was this architectural decision made, and how does it impact maintainability?**

*Expected answer should cover:*
- All Tailwind classes live in co-located `styles.ts` files
- Components import style constants: `import { ButtonStyles as S } from './styles'`
- Benefits: auditability, consistency, single source of truth, easier theming
- Style namespaces: `Form.Input.base`, `Layout.Flex.center`, `Interactive.Focus.ring`

**📍 Codebase References:**
| What | Where |
|------|-------|
| Dialog importing styles | [dialog.tsx:19](packages/ui-library/core/src/components/dialog/dialog.tsx#L19) |
| Dialog styles.ts | [styles.ts](packages/ui-library/core/src/components/dialog/styles.ts) |
| Card importing styles | [card.tsx:2](packages/ui-library/core/src/components/card/card.tsx#L2) |
| Style usage pattern | [dialog.tsx:131](packages/ui-library/core/src/components/dialog/dialog.tsx#L131) `className={cn(S.backdrop, ...)}` |
| Rule documentation | [components.md](/.claude/rules/components.md) |

### 2. Two-Tier Theming System
**Q: This codebase uses a two-tier theming approach. What are the two tiers, when is each loaded, and what problem does this solve?**

*Expected answer:*
- **Base Theme**: Structural tokens (spacing, shadows, motion, radii, z-index) - bundled at build time
- **Brand Theme**: Visual tokens (colors, typography) - fetched at runtime per MFE
- Solves: Brand customization without rebuilding, multi-tenant support, runtime theme switching

**📍 Codebase References:**
| What | Where |
|------|-------|
| Base theme schema | [schema.ts:40-101](packages/ui-library/core/src/themes/schema.ts#L40) |
| Brand theme schema | [schema.ts:107-205](packages/ui-library/core/src/themes/schema.ts#L107) |
| applyBaseTheme() | [apply-theme.ts:39-71](packages/ui-library/core/src/themes/apply-theme.ts#L39) |
| applyBrandTheme() | [apply-theme.ts:81-98](packages/ui-library/core/src/themes/apply-theme.ts#L81) |
| Base JSON (bundled) | [base.json](packages/ui-library/core/src/themes/base.json) |
| Validate with fallbacks | [validate-theme.ts:31-49](packages/ui-library/core/src/themes/validate-theme.ts#L31) |

### 3. Compound Component Pattern
**Q: Walk me through how compound components work in this design system. Using Dialog as an example, explain the `Object.assign()` pattern and why both namespace and individual exports exist.**

*Expected answer:*
```tsx
const Dialog = Object.assign(DialogRoot, {
  Root, Trigger, Portal, Backdrop, Content, Header, Title, Footer, Close
})
```
- Namespace usage: `<Dialog.Root>`, `<Dialog.Content>`
- Progressive disclosure: composite components for simple cases, granular control when needed
- Tree-shakeable: unused parts excluded from bundle

**📍 Codebase References:**
| What | Where |
|------|-------|
| Dialog Object.assign | [dialog.tsx:277-289](packages/ui-library/core/src/components/dialog/dialog.tsx#L277) |
| Individual exports | [dialog.tsx:292-304](packages/ui-library/core/src/components/dialog/dialog.tsx#L292) |
| Card Object.assign | [card.tsx:83-91](packages/ui-library/core/src/components/card/card.tsx#L83) |
| Select namespace | [select.tsx:408-422](packages/ui-library/core/src/components/select/select.tsx#L408) |

### 4. CSS Variable Naming Convention
**Q: What naming convention does this design system use for CSS variables? Why is consistency important here?**

*Expected answer:*
- Category-prefixed: `--color-*`, `--shadow-*`, `--radius-*`, `--spacing-*`, `--motion-*`, `--z-*`, `--font-*`
- Examples: `--color-primary`, `--shadow-raised`, `--motion-duration-fast`
- Consistency enables: programmatic theme generation, IDE autocomplete, clear ownership

**📍 Codebase References:**
| What | Where |
|------|-------|
| Spacing vars (`--spacing-*`) | [apply-theme.ts:48](packages/ui-library/core/src/themes/apply-theme.ts#L48) |
| Radius vars (`--radius-*`) | [apply-theme.ts:53](packages/ui-library/core/src/themes/apply-theme.ts#L53) |
| Shadow vars (`--shadow-*`) | [apply-theme.ts:59](packages/ui-library/core/src/themes/apply-theme.ts#L59) |
| Motion vars (`--motion-*`) | [apply-theme.ts:64](packages/ui-library/core/src/themes/apply-theme.ts#L64) |
| Z-index vars (`--z-*`) | [apply-theme.ts:69](packages/ui-library/core/src/themes/apply-theme.ts#L69) |
| Color vars (`--color-*`) | [apply-theme.ts:91](packages/ui-library/core/src/themes/apply-theme.ts#L91) |
| Tailwind preset mappings | [tailwind.preset.ts:25-140](packages/ui-library/core/tailwind.preset.ts#L25) |

### 5. Style Pattern Namespaces
**Q: Describe the style pattern namespace architecture. What are the main categories and give examples of how they're used?**

*Expected answer:*
| Namespace | Examples |
|-----------|----------|
| `Form` | `Form.Input.base`, `Form.Label.base`, `Form.Helper.error` |
| `Layout` | `Layout.Flex.center`, `Layout.Position.absolute` |
| `Interactive` | `Interactive.Focus.ring`, `Interactive.Cursor.pointer` |
| `Overlay` | `Overlay.Dialog.backdrop`, `Overlay.Card.container` |
| `Control` | `Control.Toggle.checked`, `Control.Slider.track` |
| `Feedback` | `Feedback.Badge.primary`, `Feedback.Alert.success` |

**📍 Codebase References:**
| What | Where |
|------|-------|
| Patterns index (all exports) | [patterns/index.ts:1-35](packages/ui-library/core/src/styles/patterns/index.ts#L1) |
| Form namespace | [form/index.ts:15](packages/ui-library/core/src/styles/patterns/form/index.ts#L15) |
| Layout.Flex | [layout/flex.ts](packages/ui-library/core/src/styles/patterns/layout/flex.ts) |
| Interactive namespace | [interactive/index.ts:19](packages/ui-library/core/src/styles/patterns/interactive/index.ts#L19) |
| Overlay namespace | [overlay/index.ts:11-16](packages/ui-library/core/src/styles/patterns/overlay/index.ts#L11) |
| Combined Patterns export | [patterns/index.ts:27-34](packages/ui-library/core/src/styles/patterns/index.ts#L27) |

### 6. Tailwind Preset Architecture
**Q: How does the Tailwind preset work in this monorepo? What does it provide to consuming apps?**

*Expected answer:*
- `@stackone-ui/core/tailwind.preset.ts` exports shared config
- Apps extend via `presets: [stackonePreset]`
- Provides: colors (CSS var refs), shadows (neumorphic), radius tokens, font mappings, animations
- Custom utilities: `rounded-theme-*`, `shadow-neu-*`, accordion/drawer animations

**📍 Codebase References:**
| What | Where |
|------|-------|
| Full Tailwind preset | [tailwind.preset.ts:1-248](packages/ui-library/core/tailwind.preset.ts#L1) |
| Color mappings to CSS vars | [tailwind.preset.ts:25-76](packages/ui-library/core/tailwind.preset.ts#L25) |
| Border radius mappings | [tailwind.preset.ts:92-98](packages/ui-library/core/tailwind.preset.ts#L92) |
| Shadow mappings | [tailwind.preset.ts:103-140](packages/ui-library/core/tailwind.preset.ts#L103) |
| Dark mode config | [tailwind.preset.ts:19](packages/ui-library/core/tailwind.preset.ts#L19) |
| Default export | [tailwind.preset.ts:248](packages/ui-library/core/tailwind.preset.ts#L248) |

### 7. Neumorphic Design Language
**Q: What is the neumorphic design approach used here? How are shadows implemented for light vs dark mode?**

*Expected answer:*
- Soft, raised/pressed shadow aesthetic
- Shadow tokens: `neu-raised`, `neu-pressed-sm`, `neu-flat`, `neu-focus`
- Light mode: dual shadows (light above, dark below)
- Dark mode: different shadow colors pre-calculated in schema
- Interactive states change shadow depth (raised → pressed on click)

**📍 Codebase References:**
| What | Where |
|------|-------|
| Schema shadow definitions | [schema.ts:62-81](packages/ui-library/core/src/themes/schema.ts#L62) |
| Light mode shadows | [schema.ts:64-69](packages/ui-library/core/src/themes/schema.ts#L64) |
| Dark mode shadows | [schema.ts:73-79](packages/ui-library/core/src/themes/schema.ts#L73) |
| Base.json shadows (light) | [base.json:23-37](packages/ui-library/core/src/themes/base.json#L23) |
| Base.json shadows (dark) | [base.json:39-54](packages/ui-library/core/src/themes/base.json#L39) |
| Tailwind shadow utilities | [tailwind.preset.ts:105-140](packages/ui-library/core/tailwind.preset.ts#L105) |

### 8. Token Fallback Strategy
**Q: What happens if a brand theme JSON is missing tokens? How does the system handle incomplete themes?**

*Expected answer:*
- Schema defines `fallback` for every token
- `validate-theme.ts` logs warnings for missing tokens
- App continues with fallback values, never breaks
- Example: missing `--color-primary` falls back to schema default

**📍 Codebase References:**
| What | Where |
|------|-------|
| TokenDefinition interface | [schema.ts:10-13](packages/ui-library/core/src/themes/schema.ts#L10) |
| Fallback field requirement | [schema.ts:12](packages/ui-library/core/src/themes/schema.ts#L12) |
| validateSection() with fallback | [validate-theme.ts:31-49](packages/ui-library/core/src/themes/validate-theme.ts#L31) |
| Fallback applied | [validate-theme.ts:43](packages/ui-library/core/src/themes/validate-theme.ts#L43) |
| Warning logged | [validate-theme.ts:44](packages/ui-library/core/src/themes/validate-theme.ts#L44) |
| validateBaseTheme() | [validate-theme.ts:77-107](packages/ui-library/core/src/themes/validate-theme.ts#L77) |
| validateBrandTheme() | [validate-theme.ts:113-131](packages/ui-library/core/src/themes/validate-theme.ts#L113) |

### 9. Component Co-location Pattern
**Q: Explain the component directory structure. What files exist and what are their responsibilities?**

*Expected answer:*
```
component-name/
├── component-name.tsx   # Component logic
├── styles.ts            # Style constants (zero inline classes)
├── types.ts             # TypeScript interfaces
└── index.ts             # Barrel export
```
- Everything co-located for easy reasoning
- No hunting across separate `styles/`, `types/` directories

**📍 Codebase References:**
| What | Where |
|------|-------|
| Dialog component dir | [components/dialog/](packages/ui-library/core/src/components/dialog/) |
| Dialog logic | [dialog/dialog.tsx](packages/ui-library/core/src/components/dialog/dialog.tsx) |
| Dialog styles | [dialog/styles.ts](packages/ui-library/core/src/components/dialog/styles.ts) |
| Dialog types | [dialog/types.ts](packages/ui-library/core/src/components/dialog/types.ts) |
| Dialog barrel | [dialog/index.ts](packages/ui-library/core/src/components/dialog/index.ts) |
| Card component dir | [components/card/](packages/ui-library/core/src/components/card/) |

### 10. Spacing Token System
**Q: How are spacing tokens organized? What's the relationship between design tokens and Tailwind classes?**

*Expected answer:*
- 11 spacing values: 0.25rem to 4rem via `--spacing-*`
- `SpacingTokens`: `p0`, `p1`, `px3`, `py4`, `gap1`, `gap2`
- Responsive variants: `ResponsiveSpacing.galleryPadding = 'p-4 md:p-6 lg:p-8'`
- CSS vars → Tailwind preset → Component styles

**📍 Codebase References:**
| What | Where |
|------|-------|
| Spacing schema | [schema.ts:41-52](packages/ui-library/core/src/themes/schema.ts#L41) |
| SpacingTokens | [tokens/spacing.ts](packages/ui-library/core/src/styles/tokens/spacing.ts) |
| SizingTokens | [tokens/sizing.ts](packages/ui-library/core/src/styles/tokens/sizing.ts) |
| Responsive patterns | [responsive.ts](packages/ui-library/core/src/styles/responsive.ts) |

### 11. Typography Token Architecture
**Q: Describe the typography system. How are fonts, sizes, and weights organized?**

*Expected answer:*
- Font families: `--font-heading`, `--font-body`, `--font-code`
- Loaded fonts: Figtree (sans), IBM Plex Mono (mono)
- `TypographyTokens`: `textSm`, `textLg`, `fontMedium`, `fontBold`, `trackingWide`
- Responsive: `ResponsiveTypography.heading = 'text-2xl md:text-3xl lg:text-4xl'`

**📍 Codebase References:**
| What | Where |
|------|-------|
| Font schema | [schema.ts:191-204](packages/ui-library/core/src/themes/schema.ts#L191) |
| Font metrics (fallbacks) | [fonts/schema.ts:11-20](packages/ui-library/core/src/fonts/schema.ts#L11) |
| Font configurations | [fonts/schema.ts:41-96](packages/ui-library/core/src/fonts/schema.ts#L41) |
| TypographyTokens | [tokens/typography.ts](packages/ui-library/core/src/styles/tokens/typography.ts) |
| Font exports | [fonts/index.ts:49-86](packages/ui-library/core/src/fonts/index.ts#L49) |

### 12. Shadow System Depth
**Q: Explain the shadow depth system. What shadows exist and when is each used?**

*Expected answer:*
- `raised`: Default elevated state (cards, buttons)
- `pressed-sm/md`: Active/pressed state
- `flat`: No elevation (inline elements)
- `focus`: Focus ring shadow
- `variant-*`: Colored shadows for primary, destructive, success buttons
- Z-axis metaphor: higher = more shadow

**📍 Codebase References:**
| What | Where |
|------|-------|
| All shadows in base.json | [base.json:23-54](packages/ui-library/core/src/themes/base.json#L23) |
| Raised shadow | [base.json:24](packages/ui-library/core/src/themes/base.json#L24) |
| Pressed shadows | [base.json:27-28](packages/ui-library/core/src/themes/base.json#L27) |
| Variant shadows | [base.json:32-35](packages/ui-library/core/src/themes/base.json#L32) |
| Badge shadows | [tailwind.preset.ts:130-136](packages/ui-library/core/tailwind.preset.ts#L130) |

### 13. Motion Token Configuration
**Q: What motion tokens exist and how are they used with Framer Motion?**

*Expected answer:*
- `SPRING`: `default`, `bouncy`, `gentle`, `snappy`, `smooth`, `tooltip`
- `DURATION`: `instant` (100ms), `fast` (150ms), `normal` (200ms), `slow` (300ms)
- Usage: `<motion.div transition={SPRING.snappy} />`
- Variants: `SLIDE`, `POPUP`, `BACKDROP` for common animations

**📍 Codebase References:**
| What | Where |
|------|-------|
| SPRING configs | [config/motion.ts:10-23](packages/ui-library/core/src/config/motion.ts#L10) |
| DURATION constants | [config/motion.ts:29-44](packages/ui-library/core/src/config/motion.ts#L29) |
| Usage in Select | [select/select.tsx:37](packages/ui-library/core/src/components/select/select.tsx#L37) |
| Motion schema | [themes/schema.ts:83-91](packages/ui-library/core/src/themes/schema.ts#L83) |
| Tailwind motion mapping | [tailwind.preset.ts:145-152](packages/ui-library/core/tailwind.preset.ts#L145) |

### 14. Z-Index Layer System
**Q: How is z-index managed? What layers exist?**

*Expected answer:*
- 6 layers via `--z-*` CSS variables
- `dropdown` < `sticky` < `modal` < `popover` < `tooltip` < `toast`
- Prevents z-index wars
- Components use tokens: `z-modal`, `z-tooltip`

**📍 Codebase References:**
| What | Where |
|------|-------|
| Z-index schema | [schema.ts:93-100](packages/ui-library/core/src/themes/schema.ts#L93) |
| Z-index values | [base.json:57-64](packages/ui-library/core/src/themes/base.json#L57) |
| Apply z-index vars | [apply-theme.ts:69](packages/ui-library/core/src/themes/apply-theme.ts#L69) |

### 15. Design Token to Code Pipeline
**Q: Trace the path from a design token in JSON to its use in a component.**

*Expected answer:*
1. Token defined in `base.json` or brand JSON
2. `apply-theme.ts` sets CSS variable: `setVar(el, 'color-primary', '#007AFF')`
3. `tailwind.preset.ts` maps: `primary: 'var(--color-primary)'`
4. Style pattern uses: `'bg-primary text-primary-foreground'`
5. Component imports: `<button className={S.variants.primary}>`

**📍 Codebase References:**
| What | Where |
|------|-------|
| 1. Token in JSON | [base.json](packages/ui-library/core/src/themes/base.json) |
| 2. setVar() applies CSS | [apply-theme.ts:20-22](packages/ui-library/core/src/themes/apply-theme.ts#L20) |
| 3. Tailwind preset maps | [tailwind.preset.ts:25-76](packages/ui-library/core/tailwind.preset.ts#L25) |
| 4. Style pattern | [patterns/interactive/](packages/ui-library/core/src/styles/patterns/interactive/) |
| 5. Component imports | [button/button.tsx](packages/ui-library/core/src/components/button/button.tsx) |

---

## Accessibility (16-35)

### 16. Form Control Accessibility
**Q: How does this codebase ensure all form controls are accessible? Walk through the pattern for ARIA labels.**

*Expected answer:*
- All form controls use translated ARIA labels from i18n: `aria-label={t(aria.filterInput)}`
- Never hardcoded strings: `aria.search`, `aria.filterByType`, `aria.close`
- Labels come from `@stackone/i18n` package with typed keys

**📍 Codebase References:**
| What | Where |
|------|-------|
| ARIA keys definition | [keys.ts:23-59](packages/i18n/src/keys.ts#L23) |
| srOnly keys | [keys.ts:72-76](packages/i18n/src/keys.ts#L72) |
| Usage example | [LogDetailDialog.tsx:91](apps/mfe/agent-toolkit/src/components/LogDetailDialog/LogDetailDialog.tsx#L91) |
| ARIA config constants | [config/text.ts:10-49](packages/ui-library/core/src/config/text.ts#L10) |
| Rule documentation | [accessibility.md](/.claude/rules/accessibility.md) |

### 17. Skip Links Implementation
**Q: Describe the skip links feature in this codebase. Why is it important and how does it work?**

*Expected answer:*
- Location: `SkipLinks.tsx` component
- Appears on Tab focus as a slide-down panel
- Jump-to sections: `#filters`, `#table`, `#pagination`
- Target elements have `tabIndex={-1}` for keyboard focus
- Supports Enter/Space key activation
- Important for screen reader and keyboard-only users to bypass navigation

**📍 Codebase References:**
| What | Where |
|------|-------|
| SkipLinks component | [SkipLinks.tsx:1-91](apps/mfe/agent-toolkit/src/components/SkipLinks/SkipLinks.tsx#L1) |
| Skip link targets | [SkipLinks.tsx:13-17](apps/mfe/agent-toolkit/src/components/SkipLinks/SkipLinks.tsx#L13) |
| Keyboard handlers | [SkipLinks.tsx:43-64](apps/mfe/agent-toolkit/src/components/SkipLinks/SkipLinks.tsx#L43) |
| Focus management | [SkipLinks.tsx:45-51](apps/mfe/agent-toolkit/src/components/SkipLinks/SkipLinks.tsx#L45) |
| Navigation aria-label | [SkipLinks.tsx:73](apps/mfe/agent-toolkit/src/components/SkipLinks/SkipLinks.tsx#L73) |

### 18. Keyboard Navigation in Tables
**Q: Explain the keyboard navigation pattern implemented in the log table. What keys are supported and how is focus managed?**

*Expected answer:*
- Roving tabindex pattern with `data-row-index` attributes
- Supported keys:
  - `ArrowUp/ArrowDown`: Navigate between rows
  - `Enter`: Open detail dialog
  - `Home`: Jump to first row
  - `End`: Jump to last row
  - `Escape`: Return focus from action buttons
- Focused row gets `DataTable.rowFocused` class
- Works with virtualized list

**📍 Codebase References:**
| What | Where |
|------|-------|
| SortableHeader keyboard | [SortableHeader.tsx:60-65](apps/mfe/agent-toolkit/src/components/SortableHeader/SortableHeader.tsx#L60) |
| Column header role | [SortableHeader.tsx:69](apps/mfe/agent-toolkit/src/components/SortableHeader/SortableHeader.tsx#L69) |
| aria-sort attribute | [SortableHeader.tsx:70](apps/mfe/agent-toolkit/src/components/SortableHeader/SortableHeader.tsx#L70) |
| tabIndex for focus | [SortableHeader.tsx:72](apps/mfe/agent-toolkit/src/components/SortableHeader/SortableHeader.tsx#L72) |
| Dialog arrow navigation | [LogDetailDialog.tsx:50-71](apps/mfe/agent-toolkit/src/components/LogDetailDialog/LogDetailDialog.tsx#L50) |

### 19. Dialog Accessibility
**Q: What ARIA attributes and roles are used in the Dialog component? How does it differ between blocking and non-blocking modes?**

*Expected answer:*
- `role="dialog"` (standard) or `role="alertdialog"` (blocking)
- `aria-modal="true"` for modal dialogs
- `aria-hidden="true"` on backdrop
- Blocking mode prevents: Escape key close, outside click
- Focus trap and body scroll lock via hooks

**📍 Codebase References:**
| What | Where |
|------|-------|
| Dialog role (dialog/alertdialog) | [dialog.tsx:149](packages/ui-library/core/src/components/dialog/dialog.tsx#L149) |
| aria-modal="true" | [dialog.tsx:150](packages/ui-library/core/src/components/dialog/dialog.tsx#L150) |
| useEscapeKey hook | [dialog.tsx:104-106](packages/ui-library/core/src/components/dialog/dialog.tsx#L104) |
| useBodyScrollLock hook | [dialog.tsx:105](packages/ui-library/core/src/components/dialog/dialog.tsx#L105) |
| Portal rendering | [dialog.tsx:109-112](packages/ui-library/core/src/components/dialog/dialog.tsx#L109) |
| Drawer role/aria-modal | [drawer.tsx:118-119](packages/ui-library/core/src/components/drawer/drawer.tsx#L118) |

### 20. Touch Target Compliance
**Q: This codebase follows WCAG 2.5.8 AAA for touch targets. What is the minimum size and how is it implemented?**

*Expected answer:*
- Minimum 44px touch target
- `ComponentHeight.input = 'h-11'` (44px)
- `TouchTarget.controlAreaLg = 'before:-inset-3.5'` expands smaller controls
- Checkbox uses pseudo-element to expand touch area

**📍 Codebase References:**
| What | Where |
|------|-------|
| ComponentHeight.input (44px) | [sizing.ts:68](packages/ui-library/core/src/styles/tokens/sizing.ts#L68) |
| ComponentHeight.select | [sizing.ts:69](packages/ui-library/core/src/styles/tokens/sizing.ts#L69) |
| Button heights | [sizing.ts:72-79](packages/ui-library/core/src/styles/tokens/sizing.ts#L72) |
| TouchTarget tokens | [sizing.ts:112-123](packages/ui-library/core/src/styles/tokens/sizing.ts#L112) |
| TouchTarget.min (min-h-11) | [sizing.ts:114](packages/ui-library/core/src/styles/tokens/sizing.ts#L114) |
| controlArea pseudo-element | [sizing.ts:119,122](packages/ui-library/core/src/styles/tokens/sizing.ts#L119) |

### 21. Sortable Table Headers
**Q: How are sortable table headers made accessible? What's the keyboard interaction model?**

*Expected answer:*
- Headers have `tabIndex={0}` for keyboard focus
- `aria-sort` attribute: 'ascending', 'descending', or 'none'
- Enter/Space key toggles sort
- Visual sort indicator synced with ARIA state
- Tri-state cycle: unsorted → asc → desc → unsorted

**📍 Codebase References:**
| What | Where |
|------|-------|
| SortableHeader component | [SortableHeader.tsx:38-83](apps/mfe/agent-toolkit/src/components/SortableHeader/SortableHeader.tsx#L38) |
| ARIA sort mapping | [SortableHeader.tsx:49-54](apps/mfe/agent-toolkit/src/components/SortableHeader/SortableHeader.tsx#L49) |
| aria-sort attribute | [SortableHeader.tsx:70](apps/mfe/agent-toolkit/src/components/SortableHeader/SortableHeader.tsx#L70) |
| tabIndex={0} | [SortableHeader.tsx:72](apps/mfe/agent-toolkit/src/components/SortableHeader/SortableHeader.tsx#L72) |
| Keyboard handler | [SortableHeader.tsx:60-65](apps/mfe/agent-toolkit/src/components/SortableHeader/SortableHeader.tsx#L60) |

### 22. Screen Reader Considerations
**Q: What patterns does this codebase use for screen reader support beyond basic ARIA?**

*Expected answer:*
- `SR_ONLY` constants for visually hidden text
- `role="alert"` on toast notifications
- `role="grid"` with `aria-rowindex`, `aria-rowcount` on tables
- Sequential heading hierarchy (h1 → h2 → h3, never skip)
- Translated ARIA labels (never hardcoded English strings)

**📍 Codebase References:**
| What | Where |
|------|-------|
| SR_ONLY constants | [text.ts:79-86](packages/ui-library/core/src/config/text.ts#L79) |
| Table semantic elements | [table/table.tsx:22](packages/ui-library/core/src/components/table/table.tsx#L22) |
| ARIA config | [text.ts:10-49](packages/ui-library/core/src/config/text.ts#L10) |
| i18n aria keys | [keys.ts:23-59](packages/i18n/src/keys.ts#L23) |

### 23. Focus Management in Dialogs
**Q: How is focus managed when a dialog opens and closes?**

*Expected answer:*
- Focus trapped inside dialog while open
- `useBodyScrollLock()` prevents background scroll
- On close: focus returns to trigger element
- `useEscapeKey()` hook for dismiss
- First focusable element receives focus on open

**📍 Codebase References:**
| What | Where |
|------|-------|
| useEscapeKey hook | [useEscapeKey.ts:1-37](packages/ui-library/core/src/hooks/useEscapeKey.ts#L1) |
| useBodyScrollLock hook | [useBodyScrollLock.ts:1-48](packages/ui-library/core/src/hooks/useBodyScrollLock.ts#L1) |
| Dialog using hooks | [dialog.tsx:104-106](packages/ui-library/core/src/components/dialog/dialog.tsx#L104) |
| Drawer using hooks | [drawer.tsx:73,111](packages/ui-library/core/src/components/drawer/drawer.tsx#L73) |

### 24. Color Contrast Requirements
**Q: How does the theming system ensure sufficient color contrast?**

*Expected answer:*
- Foreground colors paired with backgrounds: `primary` + `primary-foreground`
- Schema defines contrast-safe pairs
- Dark mode has separate color definitions (not just inverted)
- Badge/status colors tested for WCAG AA contrast

**📍 Codebase References:**
| What | Where |
|------|-------|
| Color schema (light/dark) | [schema.ts:107-189](packages/ui-library/core/src/themes/schema.ts#L107) |
| Foreground pairings | [tailwind.preset.ts:30-75](packages/ui-library/core/tailwind.preset.ts#L30) |
| Dark mode colors | [schema.ts:159-185](packages/ui-library/core/src/themes/schema.ts#L159) |

### 25. Heading Hierarchy Rule
**Q: What rule governs heading usage? Why is sequential hierarchy important?**

*Expected answer:*
- Never skip levels: h1 → h2 → h3 (not h1 → h3)
- `<Text variant="h1/h2/h3">` enforces semantic headings
- Screen readers use headings for navigation
- Rule in `.claude/rules/accessibility.md`

**📍 Codebase References:**
| What | Where |
|------|-------|
| Heading rule | [accessibility.md](/.claude/rules/accessibility.md) |
| Text component | [text/text.tsx](packages/ui-library/core/src/components/text/text.tsx) |

### 26. ARIA Label Internationalization
**Q: How are ARIA labels internationalized? Why can't they be hardcoded?**

*Expected answer:*
```tsx
// ❌ NEVER
<input aria-label="Search" />

// ✅ ALWAYS
<input aria-label={t(aria.search)} />
```
- Users with screen readers in different locales need translated labels
- Typed keys from `@stackone/i18n` prevent typos

**📍 Codebase References:**
| What | Where |
|------|-------|
| aria keys object | [keys.ts:23-59](packages/i18n/src/keys.ts#L23) |
| i18n rule | [i18n.md](/.claude/rules/i18n.md) |
| Usage example | [LogDetailDialog.tsx:91](apps/mfe/agent-toolkit/src/components/LogDetailDialog/LogDetailDialog.tsx#L91) |

### 27. Table Grid Semantics
**Q: What ARIA roles and attributes are used for the data table?**

*Expected answer:*
- Container: `role="grid"`
- Rows: `role="row"` with `aria-rowindex`
- Headers: `role="columnheader"` with `aria-sort`
- Cells: `role="gridcell"`
- Total: `aria-rowcount` on grid

**📍 Codebase References:**
| What | Where |
|------|-------|
| Table component | [table/table.tsx](packages/ui-library/core/src/components/table/table.tsx) |
| columnheader role | [SortableHeader.tsx:69](apps/mfe/agent-toolkit/src/components/SortableHeader/SortableHeader.tsx#L69) |
| aria-sort | [SortableHeader.tsx:70](apps/mfe/agent-toolkit/src/components/SortableHeader/SortableHeader.tsx#L70) |

### 28. useEscapeKey Hook
**Q: Describe the `useEscapeKey` hook. When should it be used?**

*Expected answer:*
- Listens for Escape keypress
- Calls provided callback to dismiss/close
- Used in: dialogs, dropdowns, popovers, drawers
- Conditional: only fires if `blocking={false}`

**📍 Codebase References:**
| What | Where |
|------|-------|
| Hook implementation | [useEscapeKey.ts:1-37](packages/ui-library/core/src/hooks/useEscapeKey.ts#L1) |
| Hook signature | [useEscapeKey.ts:11-14](packages/ui-library/core/src/hooks/useEscapeKey.ts#L11) |
| Escape detection | [useEscapeKey.ts:25-27](packages/ui-library/core/src/hooks/useEscapeKey.ts#L25) |
| Cleanup | [useEscapeKey.ts:31-35](packages/ui-library/core/src/hooks/useEscapeKey.ts#L31) |

### 29. useBodyScrollLock Hook
**Q: What does `useBodyScrollLock` do and why is it accessibility-relevant?**

*Expected answer:*
- Prevents body scroll when modal is open
- Keeps focus context within modal
- Restores scroll on unmount
- Alternative to `overflow: hidden` which can cause layout shift

**📍 Codebase References:**
| What | Where |
|------|-------|
| Hook implementation | [useBodyScrollLock.ts:1-48](packages/ui-library/core/src/hooks/useBodyScrollLock.ts#L1) |
| Nested modal counter | [useBodyScrollLock.ts:16-48](packages/ui-library/core/src/hooks/useBodyScrollLock.ts#L16) |
| Lock on first modal | [useBodyScrollLock.ts:22-26](packages/ui-library/core/src/hooks/useBodyScrollLock.ts#L22) |
| Unlock on last close | [useBodyScrollLock.ts:30-32](packages/ui-library/core/src/hooks/useBodyScrollLock.ts#L30) |

### 30. useClickOutside Hook
**Q: Explain `useClickOutside` and its multi-ref variant.**

*Expected answer:*
- Detects clicks outside a referenced element
- Calls callback to close dropdown/menu
- `useClickOutsideMultiple()` for multiple refs (e.g., trigger + popup)
- Used with portal-rendered elements

**📍 Codebase References:**
| What | Where |
|------|-------|
| Hook implementation | [useClickOutside.ts:1-74](packages/ui-library/core/src/hooks/useClickOutside.ts#L1) |
| Single ref variant | [useClickOutside.ts:12-40](packages/ui-library/core/src/hooks/useClickOutside.ts#L12) |
| Multiple refs variant | [useClickOutside.ts:45-74](packages/ui-library/core/src/hooks/useClickOutside.ts#L45) |

### 31. Animation Accessibility
**Q: What CSS properties are safe for animation? Why?**

*Expected answer:*
- Safe: `transform`, `opacity` (GPU accelerated)
- Avoid: `width`, `height`, `top`, `left`, `margin`, `padding` (trigger layout)
- Rule in `.claude/rules/accessibility.md`
- Reduces motion sickness risk, better performance

**📍 Codebase References:**
| What | Where |
|------|-------|
| Animation rule | [accessibility.md](/.claude/rules/accessibility.md) |
| Performance rule | [performance.md](/.claude/rules/performance.md) |
| Transition patterns | [transition.ts](packages/ui-library/core/src/styles/patterns/interactive/transition.ts) |

### 32. Select Dropdown Accessibility
**Q: What ARIA attributes does the Select component use?**

*Expected answer:*
- Trigger: `aria-haspopup="listbox"`, `aria-expanded={isOpen}`
- Popup: `role="listbox"`
- Options: `role="option"`, `aria-selected`, `aria-disabled`
- Keyboard: Arrow keys navigate, Enter selects, Escape closes

**📍 Codebase References:**
| What | Where |
|------|-------|
| aria-haspopup="listbox" | [select.tsx:226](packages/ui-library/core/src/components/select/select.tsx#L226) |
| aria-expanded | [select.tsx:227](packages/ui-library/core/src/components/select/select.tsx#L227) |
| SelectTrigger | [select.tsx:174-231](packages/ui-library/core/src/components/select/select.tsx#L174) |
| Keyboard handlers | [select.tsx:177-199](packages/ui-library/core/src/components/select/select.tsx#L177) |

### 33. Toast Notification Accessibility
**Q: How are toast notifications made accessible?**

*Expected answer:*
- `role="alert"` announces to screen readers
- Close button has `aria-label={t(aria.close)}`
- Portal rendered to body (outside main content)
- Auto-dismiss timing allows reading (3-5 seconds)

**📍 Codebase References:**
| What | Where |
|------|-------|
| Toast component | [toast.tsx:1-196](packages/ui-library/core/src/components/toast/toast.tsx#L1) |
| Toast variants | [toast.tsx:30-36](packages/ui-library/core/src/components/toast/toast.tsx#L30) |
| Position mapping | [toast.tsx:39-50](packages/ui-library/core/src/components/toast/toast.tsx#L39) |
| useToast hook | [toast.tsx:54-60](packages/ui-library/core/src/components/toast/toast.tsx#L54) |

### 34. Mobile Warning Dialog
**Q: What accessibility considerations exist for the mobile warning dialog?**

*Expected answer:*
- `role="dialog"` with `aria-modal="true"`
- Clear dismiss button
- Session-based (doesn't persist, respects user choice)
- Doesn't block content access, just warns

**📍 Codebase References:**
| What | Where |
|------|-------|
| MobileWarning component | [MobileWarning/](apps/mfe/agent-toolkit/src/components/MobileWarning/) |
| Dialog accessibility | [dialog.tsx:149-150](packages/ui-library/core/src/components/dialog/dialog.tsx#L149) |

### 35. Reduced Motion Support
**Q: How could this codebase support users who prefer reduced motion?**

*Expected answer:*
- Check `prefers-reduced-motion` media query
- `useMediaQuery(MEDIA_QUERIES.reducedMotion)`
- Disable or shorten animations
- Use opacity transitions instead of transforms
- Currently not fully implemented but architecture supports it

**📍 Codebase References:**
| What | Where |
|------|-------|
| useMediaQuery hook | [useMediaQuery.ts](packages/ui-library/core/src/hooks/useMediaQuery.ts) |
| MEDIA_QUERIES | [responsive.ts](packages/ui-library/core/src/styles/responsive.ts) |
| Motion config | [config/motion.ts](packages/ui-library/core/src/config/motion.ts) |

---

## Performance (36-55)

### 36. Lazy Loading Strategy
**Q: Describe the lazy loading strategy for heavy components. Give specific examples from the codebase.**

*Expected answer:*
- Button component lazy-loads Framer Motion only when `loading` prop is used
- `LogsPageContentLazy`, `LogFiltersLazy`, `LogTableLazy` use `dynamic()`
- Charts and tables are code-split into separate chunks
- Skeleton fallbacks during load

**📍 Codebase References:**
| What | Where |
|------|-------|
| LogsPageContentLazy | [LogsPageContentLazy.tsx:21-27](apps/mfe/agent-toolkit/src/app/logs/LogsPageContentLazy.tsx#L21) |
| LogTableLazy | [LogTableLazy.tsx:94-96](apps/mfe/agent-toolkit/src/app/logs/LogTableLazy.tsx#L94) |
| LogFiltersLazy | [LogFiltersLazy.tsx](apps/mfe/agent-toolkit/src/app/logs/LogFiltersLazy.tsx) |
| Chunk splitting config | [next.config.ts:36-68](apps/mfe/agent-toolkit/next.config.ts#L36) |

### 37. Virtualization
**Q: Where is virtualization used and why? Explain the implementation.**

*Expected answer:*
- Log table uses `@tanstack/react-virtual`'s `useVirtualizer`
- Config: `estimateSize: () => TABLE.rowHeight`, `overscan: 5`
- Only renders visible rows + 5 overscan rows
- Critical for 100+ log entries without performance degradation
- Scroll container ref attached to virtualizer

**📍 Codebase References:**
| What | Where |
|------|-------|
| useVirtualizer setup | [LogTable.tsx:229-234](apps/mfe/agent-toolkit/src/app/logs/LogTable.tsx#L229) |
| Import statement | [LogTable.tsx:4](apps/mfe/agent-toolkit/src/app/logs/LogTable.tsx#L4) |
| Webpack split config | [next.config.ts:55-60](apps/mfe/agent-toolkit/next.config.ts#L55) |

### 38. Non-Blocking Theme Provider
**Q: Why does the ThemeProvider use refs instead of state for `fontsLoaded` and `themeReady`? What problem does this solve?**

*Expected answer:*
- Refs don't trigger re-renders
- Prevents full app re-render when theme loads
- Renders immediately with fallback tokens
- Loads brand theme in background
- Eliminates hydration mismatches

**📍 Codebase References:**
| What | Where |
|------|-------|
| ThemeProvider | [ThemeProvider.tsx:1-174](packages/ui-library/core/src/providers/ThemeProvider.tsx#L1) |
| Refs for loading flags | [ThemeProvider.tsx:75-81](packages/ui-library/core/src/providers/ThemeProvider.tsx#L75) |
| THEME_INIT_SCRIPT | [ThemeProvider.tsx:46-51](packages/ui-library/core/src/providers/ThemeProvider.tsx#L46) |
| Non-blocking brand load | [ThemeProvider.tsx:84-119](packages/ui-library/core/src/providers/ThemeProvider.tsx#L84) |

### 39. Bundle Optimization
**Q: What's the granular import pattern and why is it important? Show correct vs incorrect examples.**

*Expected answer:*
```tsx
// ❌ NEVER - pulls all 24+ components
import { Card, Badge, Spinner } from '@stackone-ui/core'

// ✅ ALWAYS - tree-shakeable
import { Card } from '@stackone-ui/core/card'
import { Badge } from '@stackone-ui/core/badge'
```
- Each component has individual export path
- Barrel imports defeat tree-shaking

**📍 Codebase References:**
| What | Where |
|------|-------|
| Bundle optimization rule | [bundle.md](/.claude/rules/bundle.md) |
| Component exports | [packages/ui-library/core/src/components/](packages/ui-library/core/src/components/) |
| package.json exports | [packages/ui-library/core/package.json](packages/ui-library/core/package.json) |

### 40. Skeleton Dimensions
**Q: Why do skeleton components need pixel-perfect dimensions? What metric does this affect?**

*Expected answer:*
- Prevents CLS (Cumulative Layout Shift)
- `SkeletonHeight` tokens match `ComponentHeight` tokens exactly
- Example: Input skeleton is exactly 44px like real input
- Playwright tests verify dimension synchronization
- CLS target: < 0.1

**📍 Codebase References:**
| What | Where |
|------|-------|
| LogsSkeleton | [LogsSkeleton.tsx](apps/mfe/agent-toolkit/src/app/logs/LogsSkeleton.tsx) |
| ComponentHeight tokens | [sizing.ts:68-79](packages/ui-library/core/src/styles/tokens/sizing.ts#L68) |
| SkeletonHeight tokens | [sizing.ts](packages/ui-library/core/src/styles/tokens/sizing.ts) |

### 41. SSR vs Client Rendering
**Q: When should `ssr: false` be used with `dynamic()`? What happens if you disable SSR for page content?**

*Expected answer:*
- `ssr: false` ONLY for truly client-only components: charts (Recharts), maps, components using `window`/`document`
- Never for page content - blocks LCP, server sends empty shell
- Content should use Suspense streaming instead
- Example of correct usage: `const Chart = dynamic(() => import('./Chart'), { ssr: false })`

**📍 Codebase References:**
| What | Where |
|------|-------|
| Performance SSR rule | [performance.md](/.claude/rules/performance.md) |
| LogsPageContentLazy ssr:false | [LogsPageContentLazy.tsx:21-27](apps/mfe/agent-toolkit/src/app/logs/LogsPageContentLazy.tsx#L21) |

### 42. Button Component Lazy Loading
**Q: How does the Button component optimize for bundle size while supporting loading states?**

*Expected answer:*
- `ButtonStatic`: No motion library, default export
- `ButtonAnimated`: Includes Framer Motion, lazy-loaded
- Smart wrapper checks `loading` prop
- Only loads ~30KB motion library when needed
- Suspense fallback to static button

**📍 Codebase References:**
| What | Where |
|------|-------|
| Button component | [button/button.tsx](packages/ui-library/core/src/components/button/button.tsx) |
| Chunk splitting for motion | [next.config.ts:38-44](apps/mfe/agent-toolkit/next.config.ts#L38) |

### 43. Code Splitting Strategy
**Q: What code splitting boundaries exist? How are chunks organized?**

*Expected answer:*
- Route-based: Each page is a chunk
- Component-based: Heavy components (`*Lazy.tsx`)
- Library-based: `motion`, `recharts`, `@tanstack/react-virtual`
- Webpack config splits vendor chunks

**📍 Codebase References:**
| What | Where |
|------|-------|
| Webpack chunk config | [next.config.ts:36-68](apps/mfe/agent-toolkit/next.config.ts#L36) |
| motion chunk (priority 30) | [next.config.ts:38-44](apps/mfe/agent-toolkit/next.config.ts#L38) |
| recharts chunk (priority 25) | [next.config.ts:45-51](apps/mfe/agent-toolkit/next.config.ts#L45) |
| virtualizer chunk | [next.config.ts:55-60](apps/mfe/agent-toolkit/next.config.ts#L55) |

### 44. Image Optimization
**Q: What are the image optimization rules? When should SVG vs Image be used?**

*Expected answer:*
- Icons/logos: Inline SVG (zero network request)
- Photos: `next/image` with proper sizing
- Never `unoptimized` flag
- `priority` for above-fold images
- Lazy load below-fold

**📍 Codebase References:**
| What | Where |
|------|-------|
| Performance image rules | [performance.md](/.claude/rules/performance.md) |
| ProviderIcon lazy loading | [ProviderIcon.tsx](apps/mfe/agent-toolkit/src/components/ProviderIcon/ProviderIcon.tsx) |

### 45. Debouncing User Input
**Q: Where is debouncing used and why?**

*Expected answer:*
- Search input debounced at parent level
- Prevents API call on every keystroke
- Typical delay: 300ms
- Pattern: `useDebouncedValue(query, 300)`

**📍 Codebase References:**
| What | Where |
|------|-------|
| Performance debounce rule | [performance.md](/.claude/rules/performance.md) |
| LogsPageContent filters | [LogsPageContent.tsx](apps/mfe/agent-toolkit/src/app/logs/LogsPageContent.tsx) |

### 46. Memoization Patterns
**Q: When should `useMemo` and `useCallback` be used? Give examples from this codebase.**

*Expected answer:*
- `useMemo`: Expensive computations (sorted logs, filtered data)
- `useCallback`: Event handlers passed to child components
- Table row handlers use `useCallback` with stable deps
- Avoid premature optimization for simple operations

**📍 Codebase References:**
| What | Where |
|------|-------|
| Performance memoization rules | [performance.md](/.claude/rules/performance.md) |
| LogsPageContent handlers | [LogsPageContent.tsx](apps/mfe/agent-toolkit/src/app/logs/LogsPageContent.tsx) |
| LogDetailDialog handlers | [LogDetailDialog.tsx](apps/mfe/agent-toolkit/src/components/LogDetailDialog/LogDetailDialog.tsx) |

### 47. React.memo Usage
**Q: When should a component be wrapped in `memo()`?**

*Expected answer:*
- Components receiving object/array props
- List item components (LogRow)
- Components with expensive render
- NOT for: components that always re-render, primitive props only

**📍 Codebase References:**
| What | Where |
|------|-------|
| Performance memo rules | [performance.md](/.claude/rules/performance.md) |
| React Compiler | [next.config.ts](apps/mfe/agent-toolkit/next.config.ts) (auto-memoizes) |

### 48. Lighthouse Performance Targets
**Q: What are the Lighthouse performance targets? List the key metrics.**

*Expected answer:*
| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.8s |
| Largest Contentful Paint | < 2.5s |
| Time to Interactive | < 3.8s |
| Total Blocking Time | < 200ms |
| Cumulative Layout Shift | < 0.1 |

**📍 Codebase References:**
| What | Where |
|------|-------|
| Performance targets | [performance.md](/.claude/rules/performance.md) |

### 49. FOUC Prevention
**Q: How does this codebase prevent Flash of Unstyled Content (FOUC)?**

*Expected answer:*
- Inline script in `<head>` sets theme class before React hydrates
- `suppressHydrationWarning` on `<html>`
- Theme applied synchronously, not via useEffect
- Font fallbacks with matched metrics

**📍 Codebase References:**
| What | Where |
|------|-------|
| THEME_INIT_SCRIPT | [ThemeProvider.tsx:46-51](packages/ui-library/core/src/providers/ThemeProvider.tsx#L46) |
| Usage in layout | [layout.tsx:50](apps/mfe/agent-toolkit/src/app/layout.tsx#L50) |
| Font fallback metrics | [fonts/schema.ts:11-20](packages/ui-library/core/src/fonts/schema.ts#L11) |

### 50. Server Component Performance
**Q: How do React Server Components improve performance?**

*Expected answer:*
- Zero client JS for static components
- Data fetched on server, no waterfall
- HTML streamed to client
- Only interactive parts ship to client
- Better SEO, faster initial load

**📍 Codebase References:**
| What | Where |
|------|-------|
| Server-safe exports | [bundle.md](/.claude/rules/bundle.md) |
| Data fetching rules | [data-fetching.md](/.claude/rules/data-fetching.md) |
| Logs page.tsx (server) | [page.tsx](apps/mfe/agent-toolkit/src/app/logs/page.tsx) |

### 51. Suspense Streaming
**Q: Explain the Suspense streaming pattern for parallel data loading.**

*Expected answer:*
```tsx
<Suspense fallback={<ChartSkeleton />}>
  <AsyncChart />
</Suspense>
<Suspense fallback={<TableSkeleton />}>
  <AsyncTable />
</Suspense>
```
- Non-blocking: content streams as ready
- Critical data fetched first
- Progressive enhancement

**📍 Codebase References:**
| What | Where |
|------|-------|
| Performance Suspense rules | [performance.md](/.claude/rules/performance.md) |
| Data fetching streaming | [data-fetching.md](/.claude/rules/data-fetching.md) |

### 52. CSS Performance
**Q: What CSS patterns should be avoided for performance?**

*Expected answer:*
- Avoid: `*` selectors, deep nesting, `[class*=""]` attribute selectors
- Avoid animating: `width`, `height`, `top`, `left`
- Use: direct class selectors, `transform`, `opacity`
- `will-change: transform` for animated elements

**📍 Codebase References:**
| What | Where |
|------|-------|
| CSS performance rules | [performance.md](/.claude/rules/performance.md) |
| Transition patterns | [transition.ts](packages/ui-library/core/src/styles/patterns/interactive/transition.ts) |

### 53. Network Request Optimization
**Q: How are network requests optimized in this architecture?**

*Expected answer:*
- Server-side fetching (no client waterfall)
- Theme fetched once, cached
- Parallel data fetches with `Promise.all()`
- Revalidation strategies via Next.js

**📍 Codebase References:**
| What | Where |
|------|-------|
| Data fetching rules | [data-fetching.md](/.claude/rules/data-fetching.md) |
| Theme caching | [theme-manager.ts](apps/shell/src/lib/theme-manager.ts) |

### 54. Memory Leak Prevention
**Q: What patterns prevent memory leaks in React components?**

*Expected answer:*
- Cleanup in `useEffect` return
- AbortController for fetch cancellation
- Unmount checks before state updates
- Event listener removal

**📍 Codebase References:**
| What | Where |
|------|-------|
| Hook cleanup examples | [useEscapeKey.ts:31-35](packages/ui-library/core/src/hooks/useEscapeKey.ts#L31) |
| LogFilters cleanup | [LogFilters.tsx](apps/mfe/agent-toolkit/src/app/logs/LogFilters.tsx) |

### 55. Bundle Analysis
**Q: How would you analyze and reduce bundle size?**

*Expected answer:*
- `ANALYZE=true pnpm build` for webpack bundle analyzer
- Check for: duplicate dependencies, large libraries, barrel imports
- Solutions: granular imports, code splitting, tree-shaking
- Target: First Load JS under thresholds

**📍 Codebase References:**
| What | Where |
|------|-------|
| Bundle optimization rules | [bundle.md](/.claude/rules/bundle.md) |
| next.config.ts bundle analyzer | [next.config.ts](apps/mfe/agent-toolkit/next.config.ts) |

---

## UX Patterns (56-75)

### 56. Loading State Hierarchy
**Q: What is the loading state priority order used in this codebase?**

*Expected answer:*
1. Error (highest) - Error message + retry
2. Loading - Skeleton/spinner
3. Empty - Empty state message
4. Success - Data display

```tsx
if (error) return <ErrorState />
if (isLoading) return <Skeleton />
if (!data?.length) return <EmptyState />
return <DataDisplay data={data} />
```

**📍 Codebase References:**
| What | Where |
|------|-------|
| Error handling rule | [error-handling.md](/.claude/rules/error-handling.md) |
| LogsPageContent states | [LogsPageContent.tsx](apps/mfe/agent-toolkit/src/app/logs/LogsPageContent.tsx) |

### 57. Toast Notification Patterns
**Q: Walk through the toast pattern for async operations like "Replay Request." What variants are used and why?**

*Expected answer:*
1. Show `loading` variant with `duration: 0` (persistent)
2. On success: `success` variant with 3000ms duration
3. On failure: `destructive` variant with 5000ms (longer for error reading)
- Positions available: top, bottom, left, right, and corners
- Portal rendered to body for z-index independence

**📍 Codebase References:**
| What | Where |
|------|-------|
| Toast component | [toast.tsx:1-196](packages/ui-library/core/src/components/toast/toast.tsx#L1) |
| Toast variants | [toast.tsx:30-36](packages/ui-library/core/src/components/toast/toast.tsx#L30) |
| Position mapping | [toast.tsx:39-50](packages/ui-library/core/src/components/toast/toast.tsx#L39) |
| ToastProvider | [toast.tsx:62-81](packages/ui-library/core/src/components/toast/toast.tsx#L62) |

### 58. Dialog Navigation
**Q: The log detail dialog supports keyboard navigation between logs. How is this implemented without interfering with text inputs?**

*Expected answer:*
- ArrowUp/Left: Previous log, ArrowDown/Right: Next log
- Event handler checks `canNavigatePrevious`/`canNavigateNext`
- **Key**: Skips navigation if `document.activeElement` is input/textarea
- Prevents arrow keys from conflicting with text editing

**📍 Codebase References:**
| What | Where |
|------|-------|
| Arrow key handler | [LogDetailDialog.tsx:50-71](apps/mfe/agent-toolkit/src/components/LogDetailDialog/LogDetailDialog.tsx#L50) |
| Input field check | [LogDetailDialog.tsx:56](apps/mfe/agent-toolkit/src/components/LogDetailDialog/LogDetailDialog.tsx#L56) |

### 59. Filter Persistence
**Q: How are filter states managed across the logs page? What happens when filters change?**

*Expected answer:*
- Filters controlled by parent component state
- Search input debounced at parent level
- Sort changes reset pagination to page 1
- Scroll-to-top on page change
- Filter changes trigger data refresh

**📍 Codebase References:**
| What | Where |
|------|-------|
| LogsPageContent state | [LogsPageContent.tsx](apps/mfe/agent-toolkit/src/app/logs/LogsPageContent.tsx) |
| LogFilters component | [LogFilters.tsx](apps/mfe/agent-toolkit/src/app/logs/LogFilters.tsx) |

### 60. Chart-Table Coordination
**Q: The stacked bar chart and table are visually coordinated. How does hovering a table row highlight the corresponding chart bar?**

*Expected answer:*
- `LogHoverContext` provides `setHoveredTime` function
- Table row `onMouseEnter` calls `setHoveredTime(getTimeSlot(timestamp))`
- Chart reads `hoveredTime` from context
- Matching time slot gets highlight style
- Context-based to avoid prop drilling

**📍 Codebase References:**
| What | Where |
|------|-------|
| LogHoverContext | [LogHoverContext.tsx:1-91](apps/mfe/agent-toolkit/src/app/logs/LogHoverContext.tsx#L1) |
| RAF batching | [LogHoverContext.tsx:37-44](apps/mfe/agent-toolkit/src/app/logs/LogHoverContext.tsx#L37) |
| setHoveredTime | [LogHoverContext.tsx:47-52](apps/mfe/agent-toolkit/src/app/logs/LogHoverContext.tsx#L47) |

### 61. Date Range Picker UX
**Q: Describe the date range picker UX. What constraints exist and how is the custom range dialog structured?**

*Expected answer:*
- Quick options: Last 24 hours, 7 days, 30 days
- Custom range opens dialog with two date inputs
- Max date constraint: `maxDate={new Date()}` (no future dates)
- Apply button disabled until both dates selected
- Dialog has Cancel/Apply footer pattern

**📍 Codebase References:**
| What | Where |
|------|-------|
| DatePicker component | [date-picker.tsx:1-544](packages/ui-library/core/src/components/date-picker/date-picker.tsx#L1) |
| DatePicker.Root | [date-picker.tsx:57-204](packages/ui-library/core/src/components/date-picker/date-picker.tsx#L57) |
| DatePicker.Footer | [date-picker.tsx:433-510](packages/ui-library/core/src/components/date-picker/date-picker.tsx#L433) |

### 62. Pagination UX
**Q: Describe the pagination component UX. What features does it support?**

*Expected answer:*
- Page size selector: 10, 20, 50, 100 rows
- Previous/Next buttons with disabled states
- Smart page numbers: 1, 2, ..., 5, 6, 7, ..., 10
- Scroll to top on page change
- Keyboard accessible

**📍 Codebase References:**
| What | Where |
|------|-------|
| Pagination component | [pagination.tsx:1-118](packages/ui-library/core/src/components/pagination/pagination.tsx#L1) |
| PaginationLink | [pagination.tsx:43-56](packages/ui-library/core/src/components/pagination/pagination.tsx#L43) |
| PaginationPrevious | [pagination.tsx:58-70](packages/ui-library/core/src/components/pagination/pagination.tsx#L58) |
| PaginationNext | [pagination.tsx:72-84](packages/ui-library/core/src/components/pagination/pagination.tsx#L72) |
| PaginationEllipsis | [pagination.tsx:86-98](packages/ui-library/core/src/components/pagination/pagination.tsx#L86) |

### 63. Sticky Header Behavior
**Q: How does the filter section behave on scroll? What visual changes occur?**

*Expected answer:*
- Filters become sticky at top on scroll
- Conditional styling applied when stuck
- Shadow added for depth perception
- Border radius changes (no bottom radius when stuck to table)

**📍 Codebase References:**
| What | Where |
|------|-------|
| LogFilters sticky | [LogFilters.tsx](apps/mfe/agent-toolkit/src/app/logs/LogFilters.tsx) |
| Passive scroll listener | [LogFilters.tsx:76](apps/mfe/agent-toolkit/src/app/logs/LogFilters.tsx#L76) |

### 64. Empty State Design
**Q: What makes a good empty state? How should it be implemented?**

*Expected answer:*
- Clear message explaining why empty
- Illustration or icon
- Call-to-action if applicable
- Same layout dimensions as content (prevents CLS)
- Translated text via i18n

**📍 Codebase References:**
| What | Where |
|------|-------|
| Error handling patterns | [error-handling.md](/.claude/rules/error-handling.md) |
| i18n rules | [i18n.md](/.claude/rules/i18n.md) |

### 65. Error Recovery UX
**Q: How does the error boundary support recovery? What actions are available?**

*Expected answer:*
- "Try again" button calls `reset()` function
- Error logged for monitoring
- Clear error message (translated)
- Maintains page layout
- `role="alert"` for screen readers

**📍 Codebase References:**
| What | Where |
|------|-------|
| Error boundary | [error.tsx:1-38](apps/mfe/agent-toolkit/src/app/error.tsx#L1) |
| Reset button | [error.tsx:33](apps/mfe/agent-toolkit/src/app/error.tsx#L33) |
| Error logging | [error.tsx:20](apps/mfe/agent-toolkit/src/app/error.tsx#L20) |

### 66. Mobile Warning Pattern
**Q: How does the mobile warning work? Why is it session-based?**

*Expected answer:*
- Detects viewport < 768px
- Shows dialog warning about desktop optimization
- Dismiss stores in session (not localStorage)
- Session-based: shows once per visit, fresh on return
- Doesn't block access, just informs

**📍 Codebase References:**
| What | Where |
|------|-------|
| MobileWarning component | [MobileWarning/](apps/mfe/agent-toolkit/src/components/MobileWarning/) |
| useMediaQuery hook | [useMediaQuery.ts](packages/ui-library/core/src/hooks/useMediaQuery.ts) |

### 67. Tooltip UX
**Q: What are the tooltip timing and positioning rules?**

*Expected answer:*
- Delay before show: 300-500ms (prevents flicker)
- Position: auto-placed to avoid viewport edges
- Arrow points to trigger
- Keyboard accessible: shows on focus
- `SPRING.tooltip` animation

**📍 Codebase References:**
| What | Where |
|------|-------|
| Tooltip component | [tooltip/tooltip.tsx](packages/ui-library/core/src/components/tooltip/tooltip.tsx) |
| SPRING.tooltip | [config/motion.ts:22](packages/ui-library/core/src/config/motion.ts#L22) |
| usePositioning hook | [usePositioning.ts](packages/ui-library/core/src/hooks/usePositioning.ts) |

### 68. Select Dropdown UX
**Q: What interaction modes does the Select component support?**

*Expected answer:*
- Hover mode: Opens on hover, closes on leave
- Click mode: Toggle on click
- Search filtering for long lists
- Keyboard navigation: arrows, enter, escape
- Portal rendering avoids z-index issues

**📍 Codebase References:**
| What | Where |
|------|-------|
| Select component | [select.tsx:1-422](packages/ui-library/core/src/components/select/select.tsx#L1) |
| SelectTrigger | [select.tsx:174-231](packages/ui-library/core/src/components/select/select.tsx#L174) |
| Portal rendering | [select.tsx:263-266](packages/ui-library/core/src/components/select/select.tsx#L263) |
| Position locking | [select.tsx:81-97](packages/ui-library/core/src/components/select/select.tsx#L81) |

### 69. Action Button Feedback
**Q: How do action buttons (Replay, Test) provide feedback during operations?**

*Expected answer:*
- Immediate: Button shows loading state
- Toast: Loading toast appears
- Completion: Success/error toast replaces loading
- Button re-enabled after operation
- Disabled during loading prevents double-submit

**📍 Codebase References:**
| What | Where |
|------|-------|
| Button loading state | [button/button.tsx](packages/ui-library/core/src/components/button/button.tsx) |
| Toast notifications | [toast.tsx](packages/ui-library/core/src/components/toast/toast.tsx) |

### 70. Table Row Interaction
**Q: What interactions are available on table rows?**

*Expected answer:*
- Hover: Highlight row, show actions
- Click: Open detail dialog
- Keyboard: Arrow keys navigate, Enter opens
- Action buttons: Replay, Test, Batch, etc.
- Context preserved for chart coordination

**📍 Codebase References:**
| What | Where |
|------|-------|
| LogTable component | [LogTable.tsx](apps/mfe/agent-toolkit/src/app/logs/LogTable.tsx) |
| LogHoverContext | [LogHoverContext.tsx](apps/mfe/agent-toolkit/src/app/logs/LogHoverContext.tsx) |
| LogDetailDialog | [LogDetailDialog/](apps/mfe/agent-toolkit/src/components/LogDetailDialog/) |

### 71. Form Validation Patterns
**Q: How should form validation be displayed?**

*Expected answer:*
- Inline field errors (under input)
- Helper text with error variant
- State-based styling: `error`, `success`
- Submit blocked until valid
- Screen reader announcements

**📍 Codebase References:**
| What | Where |
|------|-------|
| Form patterns | [patterns/form/](packages/ui-library/core/src/styles/patterns/form/) |
| Form.Helper.error | [patterns/form/index.ts](packages/ui-library/core/src/styles/patterns/form/index.ts) |

### 72. Loading Skeleton Patterns
**Q: What makes a good skeleton component?**

*Expected answer:*
- Exact dimensions of final content
- Pulsing animation (subtle)
- Represents content structure
- Fast to render (no complex logic)
- Used in Suspense fallbacks

**📍 Codebase References:**
| What | Where |
|------|-------|
| LogsSkeleton | [LogsSkeleton.tsx](apps/mfe/agent-toolkit/src/app/logs/LogsSkeleton.tsx) |
| Skeleton sizing | [sizing.ts](packages/ui-library/core/src/styles/tokens/sizing.ts) |

### 73. Stat Card Design
**Q: What information do stat cards display? How are trends shown?**

*Expected answer:*
- Metric: Success rate, Latency, Total requests, Error rate
- Value: Large, prominent number
- Trend: Up/down arrow with delta percentage
- Color coding: Green positive, red negative
- Grid layout for responsive arrangement

**📍 Codebase References:**
| What | Where |
|------|-------|
| StatCard component | [StatCard.tsx:1-58](apps/mfe/agent-toolkit/src/app/logs/StatCard.tsx#L1) |
| Component interface | [StatCard.tsx:5-18](apps/mfe/agent-toolkit/src/app/logs/StatCard.tsx#L5) |
| Trend arrow SVG | [StatCard.tsx:20-30](apps/mfe/agent-toolkit/src/app/logs/StatCard.tsx#L20) |
| Variant styling | [StatCard.tsx:33-38](apps/mfe/agent-toolkit/src/app/logs/StatCard.tsx#L33) |

### 74. Breadcrumb Navigation
**Q: How do breadcrumbs work in this application?**

*Expected answer:*
- Shows current location: Home > Logs > Log Detail
- Links to parent sections
- Current page not linked
- Truncation for long paths
- ARIA: `nav` landmark with `aria-label="Breadcrumb"`

**📍 Codebase References:**
| What | Where |
|------|-------|
| Routing rules | [routing.md](/.claude/rules/routing.md) |
| Navigation patterns | [routes.ts](apps/mfe/agent-toolkit/src/routes.ts) |

### 75. Time Display Formatting
**Q: How are timestamps displayed in the log table?**

*Expected answer:*
- Today: "TODAY" + time (HH:MM:SS)
- Yesterday: "YESTERDAY" + time
- Older: Full date + time
- UTC-based for consistency
- Formatted with user locale

**📍 Codebase References:**
| What | Where |
|------|-------|
| LogTable timestamps | [LogTable.tsx](apps/mfe/agent-toolkit/src/app/logs/LogTable.tsx) |
| i18n formatting | [packages/i18n/](packages/i18n/) |

---

## Architecture & Integration (76-100)

### 76. Multi-Zone MFE Navigation
**Q: Explain when to use `<Link>` vs `<a>` tags in this multi-zone architecture.**

*Expected answer:*
- `<Link>`: Within same MFE zone (same Next.js app)
- `<a>`: Cross-zone navigation (Shell ↔ MFE)
- Shell → MFE: `<a href={Routes.agentToolkit}>`
- MFE → Shell: `<a href={Routes.shell.home}>` (uses `NEXT_PUBLIC_SHELL_URL`)
- Reason: Next.js router doesn't work across zones

**📍 Codebase References:**
| What | Where |
|------|-------|
| Shell routes | [routes.ts:1-31](apps/shell/src/lib/routes.ts#L1) |
| Cross-zone documentation | [routes.ts:5-9](apps/shell/src/lib/routes.ts#L5) |
| Agent Toolkit routes | [routes.ts:1-29](apps/mfe/agent-toolkit/src/routes.ts#L1) |
| Routing rules | [routing.md](/.claude/rules/routing.md) |

### 77. Route Configuration
**Q: Why does this codebase use centralized route configuration? Show the pattern.**

*Expected answer:*
- All routes in `routes.ts` files per app
- Never hardcoded route strings in components
- Shell: `apps/shell/src/lib/routes.ts`
- MFE: `apps/mfe/agent-toolkit/src/routes.ts`
- Dynamic routes: `detail: (id: string) => \`/logs/${id}\``
- Enables refactoring, prevents typos, single source of truth

**📍 Codebase References:**
| What | Where |
|------|-------|
| Shell routes | [routes.ts](apps/shell/src/lib/routes.ts) |
| Agent Toolkit routes | [routes.ts](apps/mfe/agent-toolkit/src/routes.ts) |
| Component Library routes | [routes.ts](apps/mfe/component-library/src/routes.ts) |
| Routing rules | [routing.md](/.claude/rules/routing.md) |

### 78. i18n Integration
**Q: How are translations integrated with accessibility? Give examples of ARIA label patterns.**

*Expected answer:*
```tsx
import { getTranslations, aria } from '@stackone/i18n'
const t = await getTranslations()

// ARIA labels are translated
<input aria-label={t(aria.search)} />
<select aria-label={t(aria.filterByLevel)} />
<button aria-label={t(aria.close)} />
```
- Typed keys prevent typos: `aria.search` not `'Search'`
- Works with cookie-based locale detection

**📍 Codebase References:**
| What | Where |
|------|-------|
| i18n keys | [keys.ts](packages/i18n/src/keys.ts) |
| aria keys | [keys.ts:23-59](packages/i18n/src/keys.ts#L23) |
| i18n rules | [i18n.md](/.claude/rules/i18n.md) |
| Package index | [packages/i18n/src/index.ts](packages/i18n/src/index.ts) |

### 79. Error Boundary Architecture
**Q: Describe the error boundary architecture. At what levels do error boundaries exist?**

*Expected answer:*
- Root level: `/app/error.tsx`
- Page level: `/app/logs/error.tsx`
- Pattern: `'use client'` directive required
- Props: `error` (with optional `digest`) and `reset` function
- Role: `role="alert"` for screen readers
- Translated error messages via i18n

**📍 Codebase References:**
| What | Where |
|------|-------|
| Shell error.tsx | [error.tsx](apps/shell/src/app/error.tsx) |
| Agent Toolkit error.tsx | [error.tsx:1-38](apps/mfe/agent-toolkit/src/app/error.tsx#L1) |
| Logs error.tsx | [error.tsx](apps/mfe/agent-toolkit/src/app/logs/error.tsx) |
| Component Library error.tsx | [error.tsx](apps/mfe/component-library/src/app/error.tsx) |

### 80. Hydration Safety
**Q: What patterns does this codebase use to prevent hydration mismatches?**

*Expected answer:*
- `useMediaQuery` returns `false` on server
- `MobileWarning` checks `typeof window !== 'undefined'`
- Portal components verify container exists before rendering
- `isMounted` state pattern for client-only rendering
- ThemeProvider uses refs (not state) for non-critical flags

**📍 Codebase References:**
| What | Where |
|------|-------|
| useMediaQuery SSR safety | [useMediaQuery.ts](packages/ui-library/core/src/hooks/useMediaQuery.ts) |
| ThemeProvider refs | [ThemeProvider.tsx:75-81](packages/ui-library/core/src/providers/ThemeProvider.tsx#L75) |
| Storage SSR safety | [storage.ts:12](packages/utils/src/storage/storage.ts#L12) |

### 81. Rewrite Rules for MFEs
**Q: How do Next.js rewrites enable the multi-zone architecture?**

*Expected answer:*
```ts
// apps/shell/next.config.ts
async rewrites() {
  return [{
    source: '/agent-toolkit/:path*',
    destination: `${MFE_URL}/agent-toolkit/:path*`,
  }]
}
```
- Shell proxies requests to MFE deployments
- Browser sees shell URL, content from MFE
- Transparent to user

**📍 Codebase References:**
| What | Where |
|------|-------|
| Shell rewrites | [next.config.ts:43-72](apps/shell/next.config.ts#L43) |
| MFE URLs config | [next.config.ts:13-21](apps/shell/next.config.ts#L13) |

### 82. basePath Configuration
**Q: How does basePath work for MFEs?**

*Expected answer:*
- Each MFE sets `basePath` in `next.config.ts`
- Agent Toolkit: `basePath: '/agent-toolkit'`
- All routes prefixed automatically
- Assets served from `/agent-toolkit/_next/`
- Required for multi-zone to work

**📍 Codebase References:**
| What | Where |
|------|-------|
| Agent Toolkit basePath | [next.config.ts:74](apps/mfe/agent-toolkit/next.config.ts#L74) |
| Component Library basePath | [next.config.ts:56](apps/mfe/component-library/next.config.ts#L56) |

### 83. Environment Variable Pattern
**Q: How do MFEs know the shell URL? What's the pattern?**

*Expected answer:*
- `NEXT_PUBLIC_SHELL_URL` environment variable
- Set in `next.config.ts`: `env: { NEXT_PUBLIC_SHELL_URL: SHELL_URL }`
- Used in `routes.ts`: `shell: { home: process.env.NEXT_PUBLIC_SHELL_URL }`
- Dev: `http://localhost:3000`
- Prod: `https://stackone-shell.vercel.app`

**📍 Codebase References:**
| What | Where |
|------|-------|
| Agent Toolkit env config | [next.config.ts:12-18](apps/mfe/agent-toolkit/next.config.ts#L12) |
| Routes using shell URL | [routes.ts:23](apps/mfe/agent-toolkit/src/routes.ts#L23) |

### 84. Cookie-Based Locale
**Q: How does i18n persist locale across the multi-zone architecture?**

*Expected answer:*
- Locale stored in `NEXT_LOCALE` cookie
- Cookie shared across shell and MFEs (same domain)
- `next-intl` reads cookie on each request
- Falls back to `defaultLocale: 'en'`
- Per-request rendering for correct locale

**📍 Codebase References:**
| What | Where |
|------|-------|
| i18n package | [packages/i18n/](packages/i18n/) |
| i18n rules | [i18n.md](/.claude/rules/i18n.md) |

### 85. Translation Key Structure
**Q: How are translation keys organized? Give the namespace structure.**

*Expected answer:*
- Page keys: `dashboard`, `logs`, `logDetail`, `search`
- Layout keys: `metadata`, `sidebar`
- Common keys: `aria`, `logLevels`, `timeRanges`, `status`
- Shared keys: `navigation`, `labels`, `brand`
- All typed for autocomplete

**📍 Codebase References:**
| What | Where |
|------|-------|
| All keys | [keys.ts](packages/i18n/src/keys.ts) |
| Package exports | [packages/i18n/src/index.ts](packages/i18n/src/index.ts) |
| Messages (en) | [packages/i18n/messages/en/](packages/i18n/messages/en/) |

### 86. Theme JSON Loading
**Q: How is the brand theme JSON loaded? What's the fallback?**

*Expected answer:*
- Fetched from `public/themes/*.json`
- Non-blocking: doesn't delay render
- Cached after first load
- Fallback: schema defaults applied
- Validation warnings for missing tokens

**📍 Codebase References:**
| What | Where |
|------|-------|
| Theme manager | [theme-manager.ts](apps/shell/src/lib/theme-manager.ts) |
| Validate theme | [validate-theme.ts](packages/ui-library/core/src/themes/validate-theme.ts) |
| Apply theme | [apply-theme.ts](packages/ui-library/core/src/themes/apply-theme.ts) |

### 87. Server Action Error Handling
**Q: How should Server Actions handle errors? Show the pattern.**

*Expected answer:*
```tsx
type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string }

export async function createUser(): Promise<ActionResult<User>> {
  try {
    const user = await db.user.create(...)
    return { success: true, data: user }
  } catch (e) {
    return { success: false, error: 'User already exists' }
  }
}
```
- Typed result discriminated union
- Explicit success/failure states

**📍 Codebase References:**
| What | Where |
|------|-------|
| Error handling rules | [error-handling.md](/.claude/rules/error-handling.md) |
| Data fetching rules | [data-fetching.md](/.claude/rules/data-fetching.md) |

### 88. Data Fetching Patterns
**Q: When should data be fetched on server vs client?**

*Expected answer:*
| Use Case | Location |
|----------|----------|
| Initial page data | Server Component |
| Static/cached | Server with `cache: 'force-cache'` |
| Real-time | Client with SWR |
| Mutations | Server Actions |

**📍 Codebase References:**
| What | Where |
|------|-------|
| Data fetching rules | [data-fetching.md](/.claude/rules/data-fetching.md) |
| Logs page.tsx | [page.tsx](apps/mfe/agent-toolkit/src/app/logs/page.tsx) |

### 89. Caching Strategies
**Q: What caching strategies are available for data fetching?**

*Expected answer:*
- No cache: `fetch('/api/data')` (default)
- Force cache: `{ cache: 'force-cache' }`
- Revalidate: `{ next: { revalidate: 60 } }`
- Tag-based: `{ next: { tags: ['logs'] } }` + `revalidateTag('logs')`

**📍 Codebase References:**
| What | Where |
|------|-------|
| Data fetching rules | [data-fetching.md](/.claude/rules/data-fetching.md) |

### 90. Parallel vs Sequential Fetching
**Q: When should fetches be parallel vs sequential?**

*Expected answer:*
```tsx
// ❌ Sequential (slow)
const user = await fetchUser(id)
const posts = await fetchPosts(id)

// ✅ Parallel (fast)
const [user, posts] = await Promise.all([
  fetchUser(id),
  fetchPosts(id),
])
```
- Parallel when independent
- Sequential when dependent

**📍 Codebase References:**
| What | Where |
|------|-------|
| Data fetching rules | [data-fetching.md](/.claude/rules/data-fetching.md) |

### 91. Monorepo Package Structure
**Q: Describe the monorepo package structure. What packages exist?**

*Expected answer:*
```
packages/
├── ui-library/
│   ├── core/     # @stackone-ui/core (components)
│   └── harness/  # Vite preview tool
├── i18n/         # @stackone/i18n (translations)
└── utils/        # @stackone/utils (logger, storage)
```
- Turborepo for build orchestration
- pnpm workspaces for dependencies

**📍 Codebase References:**
| What | Where |
|------|-------|
| UI Library core | [packages/ui-library/core/](packages/ui-library/core/) |
| i18n package | [packages/i18n/](packages/i18n/) |
| Utils package | [packages/utils/](packages/utils/) |
| pnpm workspace | [pnpm-workspace.yaml](pnpm-workspace.yaml) |

### 92. Turborepo Configuration
**Q: How does Turborepo optimize builds?**

*Expected answer:*
- Task dependency graph in `turbo.json`
- Caches build outputs
- Parallel task execution
- Incremental builds
- `pnpm turbo run build --filter=@stackone/shell`

**📍 Codebase References:**
| What | Where |
|------|-------|
| turbo.json | [turbo.json:1-24](turbo.json#L1) |
| Build dependencies | [turbo.json](turbo.json) |

### 93. TypeScript Configuration
**Q: How is TypeScript configured across the monorepo?**

*Expected answer:*
- Base config in root `tsconfig.json`
- Apps extend: `"extends": "../../tsconfig.base.json"`
- Path aliases: `@/*` maps to `./src/*`
- Strict mode enabled
- Project references for incremental builds

**📍 Codebase References:**
| What | Where |
|------|-------|
| Root tsconfig | [tsconfig.json](tsconfig.json) |
| Agent Toolkit tsconfig | [tsconfig.json](apps/mfe/agent-toolkit/tsconfig.json) |

### 94. Testing Strategy
**Q: What testing tools are used and when?**

*Expected answer:*
- Unit: Vitest + Testing Library
- E2E: Playwright
- Pattern: Tests co-located with source (`.test.tsx`)
- Query priority: `getByRole` > `getByLabelText` > `getByTestId`

**📍 Codebase References:**
| What | Where |
|------|-------|
| Testing rules | [testing.md](/.claude/rules/testing.md) |

### 95. Commit Message Format
**Q: What is the commit message format? Give examples.**

*Expected answer:*
- Format: `<type>(<scope>): <description>`
- Types: `feat`, `fix`, `refactor`, `chore`, `docs`, `test`
- Examples:
  - `feat(logs): add time range filter`
  - `fix(dialog): correct focus trap`
  - `chore(deps): update next to 15.0.0`

**📍 Codebase References:**
| What | Where |
|------|-------|
| Git rules | [git.md](/.claude/rules/git.md) |

### 96. Git Branch Naming
**Q: What is the branch naming convention?**

*Expected answer:*
- Format: `<type>/<ticket-id>-<short-description>`
- Examples:
  - `feature/STACK-123-add-log-filters`
  - `fix/STACK-456-pagination-offset`
  - `chore/update-dependencies`

**📍 Codebase References:**
| What | Where |
|------|-------|
| Git rules | [git.md](/.claude/rules/git.md) |

### 97. Server-Safe Exports
**Q: Which UI library exports are safe for Server Components?**

*Expected answer:*
| Safe | Unsafe |
|------|--------|
| Card, Text, Badge, Spinner | Button, Dialog, Select |
| ARIA, LABEL constants | Hooks (useClickOutside) |
| Style patterns | ThemeProvider |

- Check for `'use client'` directive
- Granular imports: `@stackone-ui/core/card`

**📍 Codebase References:**
| What | Where |
|------|-------|
| Bundle rules | [bundle.md](/.claude/rules/bundle.md) |
| Component exports | [packages/ui-library/core/src/components/](packages/ui-library/core/src/components/) |

### 98. useControlledState Hook
**Q: What is `useControlledState` and when is it used?**

*Expected answer:*
- Handles controlled vs uncontrolled component state
- If `value` prop provided: controlled (external state)
- If `defaultValue`: uncontrolled (internal state)
- Used in: Select, Dialog, Accordion, Tabs

**📍 Codebase References:**
| What | Where |
|------|-------|
| Hook implementation | [useControlledState.ts:1-71](packages/ui-library/core/src/hooks/useControlledState.ts#L1) |
| Hook signature | [useControlledState.ts:16-20](packages/ui-library/core/src/hooks/useControlledState.ts#L16) |

### 99. Portal Rendering
**Q: Why do overlays use portal rendering? How is it implemented?**

*Expected answer:*
- `createPortal(children, document.body)`
- Avoids z-index stacking context issues
- Element renders outside parent DOM hierarchy
- Still receives React context
- Existence check: `if (typeof document !== 'undefined')`

**📍 Codebase References:**
| What | Where |
|------|-------|
| Dialog portal | [dialog.tsx:109-112](packages/ui-library/core/src/components/dialog/dialog.tsx#L109) |
| Drawer portal | [drawer.tsx:77-82](packages/ui-library/core/src/components/drawer/drawer.tsx#L77) |
| Select portal | [select.tsx:263-266](packages/ui-library/core/src/components/select/select.tsx#L263) |

### 100. Mock Data Generation
**Q: How is mock data generated for the logs page?**

*Expected answer:*
- Server-side in `page.tsx`
- Seeded random: same data all day, refreshes daily
- 100 mock logs with realistic HTTP data
- Status distribution: 70% 2xx, 20% 4xx, 10% 5xx
- Includes: timestamp, provider, method, duration, status

**📍 Codebase References:**
| What | Where |
|------|-------|
| Logs page.tsx | [page.tsx](apps/mfe/agent-toolkit/src/app/logs/page.tsx) |

---

## AI Features (101-110)

### 101. AI Error Explainer Architecture
**Q: Describe the Error Explainer feature. When does it appear and what is its state machine?**

*Expected answer:*
- Appears for HTTP status >= 400 (4xx/5xx errors)
- States: `idle` → `generating` → `complete` or `error`
- Location: `ErrorExplainer.tsx` in LogDetailDialog
- Hook: `useErrorExplainer` manages state

**📍 Codebase References:**
| What | Where |
|------|-------|
| ErrorExplainer component | [ErrorExplainer.tsx:1-176](apps/mfe/agent-toolkit/src/components/LogDetailDialog/ErrorExplainer.tsx#L1) |
| Component definition | [ErrorExplainer.tsx:17-175](apps/mfe/agent-toolkit/src/components/LogDetailDialog/ErrorExplainer.tsx#L17) |
| State management | [ErrorExplainer.tsx:18-20](apps/mfe/agent-toolkit/src/components/LogDetailDialog/ErrorExplainer.tsx#L18) |

### 102. AI Design Tokens
**Q: What design tokens exist for AI features? How is AI visually distinguished?**

*Expected answer:*
- Colors: `--color-ai` (purple #8B5CF6), `--color-ai-foreground`, `--color-ai-hover`
- Gradient: `--color-ai-from` to `--color-ai-to` (purple to indigo)
- Shadow: `--shadow-badge-ai` with purple tint
- Dark mode variants (lighter purples)

**📍 Codebase References:**
| What | Where |
|------|-------|
| ErrorExplainerStyles | [styles.ts:235-295](apps/mfe/agent-toolkit/src/components/LogDetailDialog/styles.ts#L235) |
| AI gradient container | [styles.ts:237-241](apps/mfe/agent-toolkit/src/components/LogDetailDialog/styles.ts#L237) |
| AI purple text colors | [styles.ts:253-260](apps/mfe/agent-toolkit/src/components/LogDetailDialog/styles.ts#L253) |
| AI badge gradient | [styles.ts:262-265](apps/mfe/agent-toolkit/src/components/LogDetailDialog/styles.ts#L262) |

### 103. AI Feature Internationalization
**Q: How are AI feature strings internationalized?**

*Expected answer:*
- Keys in `agent-toolkit.json` under `logDetail.errorExplainer.*`
- `title`, `openToGenerate`, `generating`, `viaAdvancedLogs`
- `feedbackHelpful`, `feedbackNotHelpful`

**📍 Codebase References:**
| What | Where |
|------|-------|
| AI i18n keys | [agent-toolkit.json:146-153](packages/i18n/messages/en/agent-toolkit.json#L146) |
| i18n import in component | [ErrorExplainer.tsx:6](apps/mfe/agent-toolkit/src/components/LogDetailDialog/ErrorExplainer.tsx#L6) |
| useTranslations usage | [ErrorExplainer.tsx:18](apps/mfe/agent-toolkit/src/components/LogDetailDialog/ErrorExplainer.tsx#L18) |

### 104. useErrorExplainer Hook
**Q: What does the `useErrorExplainer` hook provide? What's the API?**

*Expected answer:*
- `state`: Current state (idle/generating/complete/error)
- `generate()`: Async function to trigger explanation
- `submitFeedback('positive'|'negative')`: Record user feedback
- `reset()`: Reset to idle state
- Currently mock implementation with 2s delay

**📍 Codebase References:**
| What | Where |
|------|-------|
| Hook implementation | [useErrorExplainer.ts:29-74](apps/mfe/agent-toolkit/src/components/LogDetailDialog/hooks/useErrorExplainer.ts#L29) |
| State initialization | [useErrorExplainer.ts:30](apps/mfe/agent-toolkit/src/components/LogDetailDialog/hooks/useErrorExplainer.ts#L30) |
| generate function | [useErrorExplainer.ts:32-59](apps/mfe/agent-toolkit/src/components/LogDetailDialog/hooks/useErrorExplainer.ts#L32) |
| submitFeedback function | [useErrorExplainer.ts:61-67](apps/mfe/agent-toolkit/src/components/LogDetailDialog/hooks/useErrorExplainer.ts#L61) |
| Mock delay constant | [useErrorExplainer.ts:10](apps/mfe/agent-toolkit/src/components/LogDetailDialog/hooks/useErrorExplainer.ts#L10) |

### 105. AI Feedback Mechanism
**Q: How does the AI feature collect user feedback? What happens with it?**

*Expected answer:*
- Thumbs up/down buttons on explanation
- `aria-pressed` for toggle state
- Feedback stored in state
- TODO: Production would send to analytics endpoint

**📍 Codebase References:**
| What | Where |
|------|-------|
| Feedback UI section | [ErrorExplainer.tsx:126-161](apps/mfe/agent-toolkit/src/components/LogDetailDialog/ErrorExplainer.tsx#L126) |
| Thumbs up button | [ErrorExplainer.tsx:130-144](apps/mfe/agent-toolkit/src/components/LogDetailDialog/ErrorExplainer.tsx#L130) |
| Thumbs down button | [ErrorExplainer.tsx:145-159](apps/mfe/agent-toolkit/src/components/LogDetailDialog/ErrorExplainer.tsx#L145) |
| aria-pressed attributes | [ErrorExplainer.tsx:138,153](apps/mfe/agent-toolkit/src/components/LogDetailDialog/ErrorExplainer.tsx#L138) |
| submitFeedback in hook | [useErrorExplainer.ts:61-67](apps/mfe/agent-toolkit/src/components/LogDetailDialog/hooks/useErrorExplainer.ts#L61) |

### 106. AI Feature Accessibility
**Q: What accessibility features does the Error Explainer have?**

*Expected answer:*
- `aria-expanded` on collapsible header
- `aria-pressed` on feedback buttons
- `aria-label` from i18n: `aria.markAsHelpful`
- Keyboard: Enter/Space to generate
- Sparkles icon decorative (`aria-hidden`)

**📍 Codebase References:**
| What | Where |
|------|-------|
| aria-expanded on header | [ErrorExplainer.tsx:33-34](apps/mfe/agent-toolkit/src/components/LogDetailDialog/ErrorExplainer.tsx#L33) |
| aria-pressed on feedback | [ErrorExplainer.tsx:138,153](apps/mfe/agent-toolkit/src/components/LogDetailDialog/ErrorExplainer.tsx#L138) |
| aria-label from i18n | [ErrorExplainer.tsx:137,152](apps/mfe/agent-toolkit/src/components/LogDetailDialog/ErrorExplainer.tsx#L137) |
| Keyboard handlers | [ErrorExplainer.tsx:52-59](apps/mfe/agent-toolkit/src/components/LogDetailDialog/ErrorExplainer.tsx#L52) |
| aria import | [ErrorExplainer.tsx:6](apps/mfe/agent-toolkit/src/components/LogDetailDialog/ErrorExplainer.tsx#L6) |

### 107. AI Styling Architecture
**Q: How are AI component styles organized? Follow the zero-inline-classnames rule?**

*Expected answer:*
- Styles in `LogDetailDialog/styles.ts`
- Purple gradient: `from-ai-from/10 to-ai-to/10`
- AI color token usage throughout
- "via Advanced Logs" badge with gradient

**📍 Codebase References:**
| What | Where |
|------|-------|
| ErrorExplainerStyles object | [styles.ts:235-295](apps/mfe/agent-toolkit/src/components/LogDetailDialog/styles.ts#L235) |
| Gradient container | [styles.ts:240](apps/mfe/agent-toolkit/src/components/LogDetailDialog/styles.ts#L240) |
| viaBadge with gradient | [styles.ts:262-265](apps/mfe/agent-toolkit/src/components/LogDetailDialog/styles.ts#L262) |
| Styles import in component | [ErrorExplainer.tsx:7](apps/mfe/agent-toolkit/src/components/LogDetailDialog/ErrorExplainer.tsx#L7) |

### 108. AI Production Readiness
**Q: What would be needed to connect the Error Explainer to a real LLM?**

*Expected answer:*
- Replace mock in `useErrorExplainer` with API call
- `.env.example` shows `ANTHROPIC_API_KEY` placeholder
- Server action or API route for secure key handling
- Error handling for API failures
- Rate limiting

**📍 Codebase References:**
| What | Where |
|------|-------|
| Mock implementation to replace | [useErrorExplainer.ts:35-58](apps/mfe/agent-toolkit/src/components/LogDetailDialog/hooks/useErrorExplainer.ts#L35) |
| GENERATION_DELAY constant | [useErrorExplainer.ts:10](apps/mfe/agent-toolkit/src/components/LogDetailDialog/hooks/useErrorExplainer.ts#L10) |
| ANTHROPIC_API_KEY placeholder | [.env.example:1](.claude/.env.example#L1) |
| Comment about production | [useErrorExplainer.ts:38,66](apps/mfe/agent-toolkit/src/components/LogDetailDialog/hooks/useErrorExplainer.ts#L38) |

### 109. AI Component Composition
**Q: Where does ErrorExplainer fit in the component tree?**

*Expected answer:*
```
LogDetailDialog
└── Tabs
    └── DetailsTab
        ├── UrlBar
        ├── RequestSection
        ├── ResponseSection
        └── ErrorExplainer (conditional: status >= 400)
```

**📍 Codebase References:**
| What | Where |
|------|-------|
| DetailsTab composition | [DetailsTab.tsx:12-31](apps/mfe/agent-toolkit/src/components/LogDetailDialog/DetailsTab.tsx#L12) |
| Conditional rendering | [DetailsTab.tsx:14,28](apps/mfe/agent-toolkit/src/components/LogDetailDialog/DetailsTab.tsx#L14) |
| ErrorExplainer import | [DetailsTab.tsx:6](apps/mfe/agent-toolkit/src/components/LogDetailDialog/DetailsTab.tsx#L6) |
| Component tree order | [DetailsTab.tsx:19-28](apps/mfe/agent-toolkit/src/components/LogDetailDialog/DetailsTab.tsx#L19) |

### 110. AI Source Attribution
**Q: How does the Error Explainer show sources for explanations?**

*Expected answer:*
- `ExplainerSource` type: `{ title: string, url: string }`
- Sources array returned with explanation
- Rendered as links with AI color styling
- Example: MDN HTTP docs, provider documentation

**📍 Codebase References:**
| What | Where |
|------|-------|
| Sources in mock response | [useErrorExplainer.ts:54-57](apps/mfe/agent-toolkit/src/components/LogDetailDialog/hooks/useErrorExplainer.ts#L54) |
| Sources rendering | [ErrorExplainer.tsx:107-123](apps/mfe/agent-toolkit/src/components/LogDetailDialog/ErrorExplainer.tsx#L107) |
| Source link styling | [styles.ts:277](apps/mfe/agent-toolkit/src/components/LogDetailDialog/styles.ts#L277) |
| ExternalLink icon | [ErrorExplainer.tsx:120](apps/mfe/agent-toolkit/src/components/LogDetailDialog/ErrorExplainer.tsx#L120) |

---

## Builds & Deployment (111-122)

### 111. Turborepo Task Pipeline
**Q: Explain the Turborepo task configuration. What tasks exist and how do they depend on each other?**

*Expected answer:*
- `turbo.json` defines: build, dev, test, typecheck, clean
- `build`: `dependsOn: ["^build"]` (topological order)
- `test`: `dependsOn: ["build"]`
- Outputs cached: `dist/**`, `.next/**` (except cache)
- `dev`: `cache: false, persistent: true`

**📍 Codebase References:**
| What | Where |
|------|-------|
| Turbo config | [turbo.json:1-24](turbo.json#L1) |
| Build task with deps | [turbo.json:4-7](turbo.json#L4) |
| Dev task (no cache) | [turbo.json:8-11](turbo.json#L8) |
| Test task deps | [turbo.json:12-15](turbo.json#L12) |
| Typecheck task | [turbo.json:16-19](turbo.json#L16) |

### 112. Multi-Zone Deployment Architecture
**Q: How are the 4 apps deployed? What URLs do they use?**

*Expected answer:*
| App | URL | basePath |
|-----|-----|----------|
| Shell | stackone-shell.vercel.app | none |
| Agent Toolkit | stackone-agent-toolkit.vercel.app | /agent-toolkit |
| Component Library | stackone-component-library.vercel.app | /component-library |
| Design Review | stackone-design-review.vercel.app | /design-review |

**📍 Codebase References:**
| What | Where |
|------|-------|
| Shell rewrites to MFEs | [next.config.ts:43-72](apps/shell/next.config.ts#L43) |
| MFE URL defaults | [next.config.ts:13-21](apps/shell/next.config.ts#L13) |
| Agent Toolkit basePath | [next.config.ts:74](apps/mfe/agent-toolkit/next.config.ts#L74) |
| Shell vercel.json | [vercel.json](apps/shell/vercel.json) |

### 113. Vercel Build Configuration
**Q: How does each app's `vercel.json` differ?**

*Expected answer:*
- Root: `buildCommand: "pnpm turbo run build --filter=@stackone/shell"`
- MFEs: `installCommand: "cd ../../.. && pnpm install"` (navigate to root)
- MFEs: `buildCommand` uses `--filter=@stackone/mfe-{name}`
- All use `framework: "nextjs"`

**📍 Codebase References:**
| What | Where |
|------|-------|
| Shell vercel.json | [vercel.json:1-5](apps/shell/vercel.json#L1) |
| Agent Toolkit vercel.json | [vercel.json:1-6](apps/mfe/agent-toolkit/vercel.json#L1) |
| MFE install command | [vercel.json:3](apps/mfe/agent-toolkit/vercel.json#L3) |
| MFE build command | [vercel.json:4](apps/mfe/agent-toolkit/vercel.json#L4) |

### 114. Code Splitting Strategy
**Q: What dependencies are split into separate chunks? Why?**

*Expected answer:*
- `motion/framer-motion` (priority 30) - animations
- `recharts/d3` (priority 25) - charts
- `@tanstack/react-virtual` (priority 25) - virtualization
- `lucide-react` (priority 20) - icons
- Prevents main bundle bloat

**📍 Codebase References:**
| What | Where |
|------|-------|
| splitChunks config | [next.config.ts:37-68](apps/mfe/agent-toolkit/next.config.ts#L37) |
| Motion chunk | [next.config.ts:43-48](apps/mfe/agent-toolkit/next.config.ts#L43) |
| Recharts chunk | [next.config.ts:49-54](apps/mfe/agent-toolkit/next.config.ts#L49) |
| Virtualizer chunk | [next.config.ts:55-60](apps/mfe/agent-toolkit/next.config.ts#L55) |
| Lucide chunk | [next.config.ts:61-66](apps/mfe/agent-toolkit/next.config.ts#L61) |

### 115. Bundle Analysis
**Q: How do you analyze bundle size in this project?**

*Expected answer:*
- `ANALYZE=true pnpm build` at root
- Or `pnpm build:analyze` in MFE
- Uses `@next/bundle-analyzer`
- Outputs visual treemap of chunks

**📍 Codebase References:**
| What | Where |
|------|-------|
| Bundle analyzer import | [next.config.ts:3](apps/mfe/agent-toolkit/next.config.ts#L3) |
| ANALYZE env check | [next.config.ts:8-10](apps/mfe/agent-toolkit/next.config.ts#L8) |
| Analyzer wrapper export | [next.config.ts:77](apps/mfe/agent-toolkit/next.config.ts#L77) |

### 116. pnpm Workspace Configuration
**Q: How is the monorepo workspace structured?**

*Expected answer:*
```yaml
# pnpm-workspace.yaml
packages:
  - "apps/*"
  - "apps/mfe/*"
  - "packages/**"
```
- Internal deps: `"workspace:*"` version
- pnpm 9.0.0 specified in root package.json

**📍 Codebase References:**
| What | Where |
|------|-------|
| Workspace config | [pnpm-workspace.yaml:1-4](pnpm-workspace.yaml#L1) |
| pnpm version | [package.json:5](package.json#L5) |
| Root scripts | [package.json:11-25](package.json#L11) |

### 117. Environment Variable Management
**Q: How are environment variables managed across shell and MFEs?**

*Expected answer:*
- Shell: `MFE_*_URL` for rewrite destinations
- MFEs: `NEXT_PUBLIC_SHELL_URL` for back-navigation
- `BRAND_THEME` for theme selection
- Dev defaults in code, prod in Vercel dashboard
- `.env.example` files document required vars

**📍 Codebase References:**
| What | Where |
|------|-------|
| Shell MFE URL vars | [next.config.ts:13-21](apps/shell/next.config.ts#L13) |
| MFE SHELL_URL config | [next.config.ts:12-18](apps/mfe/agent-toolkit/next.config.ts#L12) |
| Agent Toolkit .env.example | [.env.example](apps/mfe/agent-toolkit/.env.example) |
| Shell .env.example | [.env.example](apps/shell/.env.example) |

### 118. Development Port Assignments
**Q: What ports are used for local development?**

*Expected answer:*
- 3000: Shell
- 3001: Agent Toolkit
- 3002: Component Library
- 3003: Design Review
- 5173: Harness (Vite)
- `pnpm clean:ports` kills processes on these ports

**📍 Codebase References:**
| What | Where |
|------|-------|
| clean:ports script | [package.json:12](package.json#L12) |
| dev:all output | [package.json:16](package.json#L16) |
| Port list in script | [package.json:12](package.json#L12) |

### 119. Turborepo Caching
**Q: How does Turborepo caching work? What's excluded?**

*Expected answer:*
- Cache in `.turbo/` directory
- `.tar.zst` compressed cache entries per task
- Excludes: `!.next/cache/**` (Next.js internal cache)
- Remote caching possible with Vercel

**📍 Codebase References:**
| What | Where |
|------|-------|
| Build outputs config | [turbo.json:6](turbo.json#L6) |
| Cache exclusion | [turbo.json:6](turbo.json#L6) |
| Dev cache disabled | [turbo.json:9](turbo.json#L9) |
| Clean task (no cache) | [turbo.json:20-22](turbo.json#L20) |

### 120. React Compiler Integration
**Q: What is the React Compiler and how is it configured?**

*Expected answer:*
- Experimental feature in Next.js 15
- `reactCompiler: true` in next.config.ts
- Automatic memoization optimization
- Reduces need for manual useMemo/useCallback

**📍 Codebase References:**
| What | Where |
|------|-------|
| Shell React Compiler | [next.config.ts:24-26](apps/shell/next.config.ts#L24) |
| Agent Toolkit React Compiler | [next.config.ts:19-25](apps/mfe/agent-toolkit/next.config.ts#L19) |
| Babel plugin dependency | [package.json:27](package.json#L27) |

### 121. Monorepo Scripts
**Q: What scripts are available at the monorepo root?**

*Expected answer:*
- `dev` / `dev:all` - Start all services
- `dev:shell`, `dev:agent-toolkit`, etc. - Individual apps
- `build` - Turbo build all
- `clean:ports` - Kill dev processes
- `clean:next` - Remove .next directories

**📍 Codebase References:**
| What | Where |
|------|-------|
| All scripts | [package.json:11-24](package.json#L11) |
| dev:all with banner | [package.json:16](package.json#L16) |
| clean:ports | [package.json:12](package.json#L12) |
| clean:next | [package.json:13](package.json#L13) |
| Individual dev scripts | [package.json:17-21](package.json#L17) |

### 122. Vercel CI/CD Flow
**Q: How does deployment work without explicit CI/CD config?**

*Expected answer:*
- Push to repo triggers Vercel
- Vercel reads `vercel.json` per project
- Runs filtered Turbo build
- Each app has separate Vercel project
- Auto-deploys on merge to main

**📍 Codebase References:**
| What | Where |
|------|-------|
| Shell vercel.json | [vercel.json:1-5](apps/shell/vercel.json#L1) |
| MFE vercel.json | [vercel.json:1-6](apps/mfe/agent-toolkit/vercel.json#L1) |
| Turbo filter build | [vercel.json:4](apps/mfe/agent-toolkit/vercel.json#L4) |
| Framework config | [vercel.json:2](apps/mfe/agent-toolkit/vercel.json#L2) |

---

## State Management & Utilities (123-132)

### 123. LogHoverContext Performance Pattern
**Q: How does `LogHoverContext` achieve 60fps performance for hover state?**

*Expected answer:*
- Ref-based state (no React re-renders)
- `requestAnimationFrame` batching limits updates
- Two-level API:
  - `useLogHover()` - ref access, no re-renders
  - `useHoveredTime()` - React state, subscribes to changes
- Subscription model for opt-in reactivity

**📍 Codebase References:**
| What | Where |
|------|-------|
| LogHoverContext full impl | [LogHoverContext.tsx:1-91](apps/mfe/agent-toolkit/src/app/logs/LogHoverContext.tsx#L1) |
| RAF batching | [LogHoverContext.tsx:37-44](apps/mfe/agent-toolkit/src/app/logs/LogHoverContext.tsx#L37) |
| Ref-based state | [LogHoverContext.tsx:26-28](apps/mfe/agent-toolkit/src/app/logs/LogHoverContext.tsx#L26) |
| Subscribe pattern | [LogHoverContext.tsx:47-52](apps/mfe/agent-toolkit/src/app/logs/LogHoverContext.tsx#L47) |
| useLogHover hook | [LogHoverContext.tsx:68-75](apps/mfe/agent-toolkit/src/app/logs/LogHoverContext.tsx#L68) |
| useHoveredTime hook | [LogHoverContext.tsx:77-90](apps/mfe/agent-toolkit/src/app/logs/LogHoverContext.tsx#L77) |

### 124. SidebarProvider Pattern
**Q: How does `SidebarProvider` handle animations without jank?**

*Expected answer:*
- `useTransition()` for low-priority updates
- `isAnimating` state tracks CSS transition
- 200ms timeout synced with CSS duration
- Prevents state changes during animation

**📍 Codebase References:**
| What | Where |
|------|-------|
| SidebarProvider | [SidebarContext.tsx:48-105](apps/mfe/agent-toolkit/src/components/SidebarContext.tsx#L48) |
| useTransition hook | [SidebarContext.tsx:51](apps/mfe/agent-toolkit/src/components/SidebarContext.tsx#L51) |
| Animation duration constant | [SidebarContext.tsx:46](apps/mfe/agent-toolkit/src/components/SidebarContext.tsx#L46) |
| expand with startTransition | [SidebarContext.tsx:54-67](apps/mfe/agent-toolkit/src/components/SidebarContext.tsx#L54) |
| collapse with startTransition | [SidebarContext.tsx:69-79](apps/mfe/agent-toolkit/src/components/SidebarContext.tsx#L69) |

### 125. Logging System Architecture
**Q: Describe the logging system. How can developers toggle it?**

*Expected answer:*
- `createLogger(namespace)` creates namespaced logger
- Browser console: `__stackone.logs.enable()/disable()/status()`
- Persisted in localStorage
- Color-coded output with styled formatting
- Levels: debug, info, warn, error

**📍 Codebase References:**
| What | Where |
|------|-------|
| Logger implementation | [logger.ts:1-133](packages/utils/src/logger/logger.ts#L1) |
| createLogger function | [logger.ts:63-85](packages/utils/src/logger/logger.ts#L63) |
| Browser global exposure | [logger.ts:88-121](packages/utils/src/logger/logger.ts#L88) |
| Color definitions | [logger.ts:36-43](packages/utils/src/logger/logger.ts#L36) |
| Storage key constant | [logger.ts:26](packages/utils/src/logger/logger.ts#L26) |

### 126. i18n Missing Translation Reporting
**Q: How are missing translations tracked in production?**

*Expected answer:*
- `/packages/i18n/src/logger.ts`
- Debounced batching of missing keys
- Optional endpoint reporting
- Development: console warnings
- Production: can POST to analytics

**📍 Codebase References:**
| What | Where |
|------|-------|
| i18n logger | [logger.ts:1-91](packages/i18n/src/logger.ts#L1) |
| logMissingTranslation | [logger.ts:20-42](packages/i18n/src/logger.ts#L20) |
| Debounced reporter | [logger.ts:47-66](packages/i18n/src/logger.ts#L47) |
| Missing translations batch | [logger.ts:12](packages/i18n/src/logger.ts#L12) |
| createOnError | [logger.ts:72-78](packages/i18n/src/logger.ts#L72) |

### 127. localStorage Utilities
**Q: What patterns are used for localStorage access?**

*Expected answer:*
- `setStorageString()` in `/packages/utils/src/storage/`
- Client-only, SSR-safe checks
- Fail-silent error handling
- Storage availability detection
- Used for: theme preference, logging state

**📍 Codebase References:**
| What | Where |
|------|-------|
| Storage utilities | [storage.ts:1-41](packages/utils/src/storage/storage.ts#L1) |
| isStorageAvailable | [storage.ts:11-21](packages/utils/src/storage/storage.ts#L11) |
| setStorageString | [storage.ts:32-40](packages/utils/src/storage/storage.ts#L32) |
| SSR-safe check | [storage.ts:12](packages/utils/src/storage/storage.ts#L12) |

### 128. Service Worker Registration
**Q: How are service workers managed?**

*Expected answer:*
- `/apps/shell/src/lib/service-worker.ts`
- Registration with scope logging
- Update detection and activation
- `postMessage` for debug communication
- Backwards-compatible helpers

**📍 Codebase References:**
| What | Where |
|------|-------|
| Service worker registration | [service-worker.ts:1-52](apps/shell/src/lib/service-worker.ts#L1) |
| registerServiceWorker function | [service-worker.ts:5-51](apps/shell/src/lib/service-worker.ts#L5) |
| Legacy debug helpers | [service-worker.ts:10-17](apps/shell/src/lib/service-worker.ts#L10) |
| postMessage for debug | [service-worker.ts:31,42](apps/shell/src/lib/service-worker.ts#L31) |
| Update handling | [service-worker.ts:35-45](apps/shell/src/lib/service-worker.ts#L35) |

### 129. useCopyToClipboard Hook
**Q: How does the clipboard hook work?**

*Expected answer:*
- Uses Clipboard API with fallback
- Returns: `[copiedText, copy, reset]`
- Timeout state (auto-clears copied state)
- Error handling for permission denied

**📍 Codebase References:**
| What | Where |
|------|-------|
| useCopyToClipboard hook | [useCopyToClipboard.ts:1-107](packages/ui-library/core/src/hooks/useCopyToClipboard.ts#L1) |
| Hook implementation | [useCopyToClipboard.ts:37-106](packages/ui-library/core/src/hooks/useCopyToClipboard.ts#L37) |
| Clipboard API call | [useCopyToClipboard.ts:69](packages/ui-library/core/src/hooks/useCopyToClipboard.ts#L69) |
| Fallback for older browsers | [useCopyToClipboard.ts:78-99](packages/ui-library/core/src/hooks/useCopyToClipboard.ts#L78) |
| Timeout auto-clear | [useCopyToClipboard.ts:73-76](packages/ui-library/core/src/hooks/useCopyToClipboard.ts#L73) |

### 130. usePositioning Hook
**Q: What does `usePositioning` do for floating elements?**

*Expected answer:*
- Calculates position relative to anchor
- Returns Tailwind classes for placement
- Arrow rotation based on position
- Used by: Tooltip, Popover, Select dropdown

**📍 Codebase References:**
| What | Where |
|------|-------|
| usePositioning hook | [usePositioning.ts:1-77](packages/ui-library/core/src/hooks/usePositioning.ts#L1) |
| Hook implementation | [usePositioning.ts:62-73](packages/ui-library/core/src/hooks/usePositioning.ts#L62) |
| Position classes map | [usePositioning.ts:21-26](packages/ui-library/core/src/hooks/usePositioning.ts#L21) |
| Arrow rotation map | [usePositioning.ts:42-47](packages/ui-library/core/src/hooks/usePositioning.ts#L42) |
| Arrow position classes | [usePositioning.ts:49-54](packages/ui-library/core/src/hooks/usePositioning.ts#L49) |

### 131. Theme Manager System
**Q: How does the shell's theme manager work?**

*Expected answer:*
- `/apps/shell/src/lib/theme-manager.ts`
- Base theme applied immediately (bundled)
- Brand theme fetched, cached in Map
- Mode switching updates document classes
- CSS variable application system

**📍 Codebase References:**
| What | Where |
|------|-------|
| Theme manager | [theme-manager.ts:1-133](apps/shell/src/lib/theme-manager.ts#L1) |
| State object | [theme-manager.ts:24-34](apps/shell/src/lib/theme-manager.ts#L24) |
| Brand theme cache (Map) | [theme-manager.ts:36](apps/shell/src/lib/theme-manager.ts#L36) |
| initBaseTheme | [theme-manager.ts:46-54](apps/shell/src/lib/theme-manager.ts#L46) |
| loadBrandTheme | [theme-manager.ts:81-101](apps/shell/src/lib/theme-manager.ts#L81) |
| setThemeMode | [theme-manager.ts:111-132](apps/shell/src/lib/theme-manager.ts#L111) |

### 132. Sort Utilities Pattern
**Q: How is table sorting implemented?**

*Expected answer:*
- `/apps/mfe/agent-toolkit/src/app/logs/sortUtils.ts`
- Comparator factory by column type
- Default directions: desc for time/numbers, asc for text
- Tri-state cycle: default → opposite → unsorted
- `useTableSort` hook with memoization

**📍 Codebase References:**
| What | Where |
|------|-------|
| sortUtils file | [sortUtils.ts:1-89](apps/mfe/agent-toolkit/src/app/logs/sortUtils.ts#L1) |
| Column comparators | [sortUtils.ts:17-41](apps/mfe/agent-toolkit/src/app/logs/sortUtils.ts#L17) |
| Default directions | [sortUtils.ts:53-61](apps/mfe/agent-toolkit/src/app/logs/sortUtils.ts#L53) |
| createComparator factory | [sortUtils.ts:75-88](apps/mfe/agent-toolkit/src/app/logs/sortUtils.ts#L75) |
| getDefaultDirection | [sortUtils.ts:63-65](apps/mfe/agent-toolkit/src/app/logs/sortUtils.ts#L63) |

---

## Advanced Browser & React Patterns (133-145)

### 133. React Compiler Configuration
**Q: What is the React Compiler and how is it configured in this codebase? What does it optimize?**

*Expected answer:*
- `experimental: { reactCompiler: true }` in all next.config.ts files
- Enabled globally: shell, agent-toolkit, component-library, design-review
- Automatic memoization - reduces need for manual useMemo/useCallback
- Transforms components at build time for optimal re-renders

**📍 Codebase References:**
| What | Where |
|------|-------|
| Shell config | [next.config.ts:24-26](apps/shell/next.config.ts#L24) |
| Agent Toolkit config | [next.config.ts:19-25](apps/mfe/agent-toolkit/next.config.ts#L19) |
| Babel plugin dep | [package.json:27](package.json#L27) |

### 134. requestAnimationFrame Batching
**Q: How does `LogHoverContext` use RAF to achieve 60fps hover updates? Explain the pattern.**

*Expected answer:*
- `/apps/mfe/agent-toolkit/src/app/logs/LogHoverContext.tsx:39`
- Batches multiple hover updates to single animation frame
- `rafIdRef` tracks pending frame, prevents duplicate scheduling
- Notifies all subscribers once per frame maximum
- Prevents layout thrashing from rapid mouse movements

**📍 Codebase References:**
| What | Where |
|------|-------|
| RAF batching | [LogHoverContext.tsx:37-44](apps/mfe/agent-toolkit/src/app/logs/LogHoverContext.tsx#L37) |
| rafIdRef declaration | [LogHoverContext.tsx:28](apps/mfe/agent-toolkit/src/app/logs/LogHoverContext.tsx#L28) |
| RAF cleanup on unmount | [LogHoverContext.tsx:55-61](apps/mfe/agent-toolkit/src/app/logs/LogHoverContext.tsx#L55) |

### 135. requestIdleCallback Pattern
**Q: Where is `requestIdleCallback` used and why? What's the fallback?**

*Expected answer:*
- `/apps/mfe/agent-toolkit/src/utils/preload-provider-icons.ts`
- Preloads provider icons during browser idle time
- `{ timeout: 2000 }` ensures execution within 2 seconds
- Fallback: `setTimeout(preload, 100)` for unsupported browsers
- Non-blocking, doesn't affect initial page load

**📍 Codebase References:**
| What | Where |
|------|-------|
| preload-provider-icons | [preload-provider-icons.ts:1-31](apps/mfe/agent-toolkit/src/utils/preload-provider-icons.ts#L1) |
| requestIdleCallback call | [preload-provider-icons.ts:22-26](apps/mfe/agent-toolkit/src/utils/preload-provider-icons.ts#L22) |
| setTimeout fallback | [preload-provider-icons.ts:27-28](apps/mfe/agent-toolkit/src/utils/preload-provider-icons.ts#L27) |
| Timeout option | [preload-provider-icons.ts:25](apps/mfe/agent-toolkit/src/utils/preload-provider-icons.ts#L25) |

### 136. useTransition for Non-Blocking Updates
**Q: Where is `useTransition` used? How does it improve UX?**

*Expected answer:*
- `LogsPageContent.tsx:126` - data refresh
- `SidebarContext.tsx:51` - sidebar collapse/expand
- Marks state updates as low priority
- UI remains responsive during transition
- `isPending` state for loading indicators
- Part of React 18 concurrent features

**📍 Codebase References:**
| What | Where |
|------|-------|
| SidebarContext useTransition | [SidebarContext.tsx:51](apps/mfe/agent-toolkit/src/components/SidebarContext.tsx#L51) |
| startTransition in expand | [SidebarContext.tsx:66](apps/mfe/agent-toolkit/src/components/SidebarContext.tsx#L66) |
| startTransition in collapse | [SidebarContext.tsx:78](apps/mfe/agent-toolkit/src/components/SidebarContext.tsx#L78) |
| isPending in context | [SidebarContext.tsx:92](apps/mfe/agent-toolkit/src/components/SidebarContext.tsx#L92) |

### 137. useLayoutEffect vs useEffect
**Q: Where is `useLayoutEffect` used in this codebase? Why not `useEffect`?**

*Expected answer:*
- `/packages/ui-library/core/src/components/select/select.tsx:81-97`
- Reads `getBoundingClientRect()` for dropdown positioning
- Runs synchronously after DOM mutations, before paint
- Prevents visual flicker of incorrectly positioned dropdown
- `useEffect` would cause flash of wrong position

**📍 Codebase References:**
| What | Where |
|------|-------|
| useLayoutEffect in Select | [select.tsx:81-97](packages/ui-library/core/src/components/select/select.tsx#L81) |
| getBoundingClientRect | [select.tsx:83](packages/ui-library/core/src/components/select/select.tsx#L83) |
| Position locking in ref | [select.tsx:94](packages/ui-library/core/src/components/select/select.tsx#L94) |

### 138. Passive Event Listeners
**Q: How are passive event listeners used? What performance benefit do they provide?**

*Expected answer:*
- `/apps/mfe/agent-toolkit/src/app/logs/LogFilters.tsx:76`
- `window.addEventListener('scroll', handleScroll, { passive: true })`
- Tells browser handler won't call `preventDefault()`
- Browser can scroll immediately without waiting for JS
- Critical for smooth scroll performance

**📍 Codebase References:**
| What | Where |
|------|-------|
| Passive event listener | [LogFilters.tsx:76](apps/mfe/agent-toolkit/src/app/logs/LogFilters.tsx#L76) |
| Scroll handler | [LogFilters.tsx:73-75](apps/mfe/agent-toolkit/src/app/logs/LogFilters.tsx#L73) |
| Cleanup on unmount | [LogFilters.tsx:77](apps/mfe/agent-toolkit/src/app/logs/LogFilters.tsx#L77) |

### 139. Capture Phase Event Listeners
**Q: Where is capture phase event listening used? Why?**

*Expected answer:*
- `/packages/ui-library/core/src/components/select/select.tsx:121`
- `addEventListener('scroll', handleScroll, true)` - third param enables capture
- Catches scroll events before they reach target elements
- Used to close dropdown on ANY scroll (including nested scrollables)
- Bubbling phase might miss events stopped by inner handlers

**📍 Codebase References:**
| What | Where |
|------|-------|
| Capture phase listener | [select.tsx:121](packages/ui-library/core/src/components/select/select.tsx#L121) |
| Scroll close handler | [select.tsx:115-118](packages/ui-library/core/src/components/select/select.tsx#L115) |
| Cleanup removal | [select.tsx:122](packages/ui-library/core/src/components/select/select.tsx#L122) |

### 140. Ref-Based State for Performance
**Q: Explain the ref + subscribers pattern in `LogHoverContext`. Why not just useState?**

*Expected answer:*
- `hoveredTimeRef`: Always current value, zero re-renders
- `listenersRef`: Set of subscriber callbacks
- `subscribe()`: Returns unsubscribe function
- Two hooks:
  - `useLogHover()` - ref access, no re-renders (for chart)
  - `useHoveredTime()` - React state, subscribes (for UI that needs re-render)
- useState would re-render entire context tree on every hover

**📍 Codebase References:**
| What | Where |
|------|-------|
| hoveredTimeRef | [LogHoverContext.tsx:26](apps/mfe/agent-toolkit/src/app/logs/LogHoverContext.tsx#L26) |
| listenersRef | [LogHoverContext.tsx:27](apps/mfe/agent-toolkit/src/app/logs/LogHoverContext.tsx#L27) |
| subscribe function | [LogHoverContext.tsx:47-52](apps/mfe/agent-toolkit/src/app/logs/LogHoverContext.tsx#L47) |
| useLogHover hook | [LogHoverContext.tsx:68-75](apps/mfe/agent-toolkit/src/app/logs/LogHoverContext.tsx#L68) |
| useHoveredTime hook | [LogHoverContext.tsx:77-90](apps/mfe/agent-toolkit/src/app/logs/LogHoverContext.tsx#L77) |

### 141. Position Locking to Prevent Layout Thrashing
**Q: How does the Select component prevent layout thrashing during animation?**

*Expected answer:*
- `lockedPositionRef.current = position` in useLayoutEffect
- Reads `getBoundingClientRect()` once when opening
- Stores position in ref, doesn't re-read during animation
- Prevents read-write-read-write layout thrashing cycle
- Critical for 60fps dropdown animations

**📍 Codebase References:**
| What | Where |
|------|-------|
| lockedPositionRef | [select.tsx:94](packages/ui-library/core/src/components/select/select.tsx#L94) |
| getBoundingClientRect | [select.tsx:83](packages/ui-library/core/src/components/select/select.tsx#L83) |
| useLayoutEffect usage | [select.tsx:81-97](packages/ui-library/core/src/components/select/select.tsx#L81) |

### 142. Lenis Smooth Scroll Implementation
**Q: How is smooth scrolling implemented? What's the RAF pattern?**

*Expected answer:*
- `/packages/ui-library/core/src/components/display/scroll-area.tsx`
- Uses Lenis library for smooth scrolling
- Continuous RAF loop: `function raf(time) { lenis.raf(time); requestAnimationFrame(raf) }`
- Cleanup cancels RAF on unmount
- Provides buttery-smooth scroll physics

**📍 Codebase References:**
| What | Where |
|------|-------|
| ScrollArea component | [scroll-area.tsx:1-81](packages/ui-library/core/src/components/display/scroll-area.tsx#L1) |
| Lenis instantiation | [scroll-area.tsx:47-56](packages/ui-library/core/src/components/display/scroll-area.tsx#L47) |
| RAF loop pattern | [scroll-area.tsx:58-61](packages/ui-library/core/src/components/display/scroll-area.tsx#L58) |
| Lenis cleanup | [scroll-area.tsx:65-67](packages/ui-library/core/src/components/display/scroll-area.tsx#L65) |

### 143. Virtualization Configuration
**Q: How is the log table virtualized? What's the overscan setting?**

*Expected answer:*
- `@tanstack/react-virtual` with `useVirtualizer`
- `estimateSize: () => TABLE.rowHeight` (48px from config)
- `overscan: 5` - renders 5 extra rows above/below viewport
- Only visible + overscan rows in DOM
- Handles 100+ rows without performance degradation

**📍 Codebase References:**
| What | Where |
|------|-------|
| useVirtualizer import | [LogTable.tsx:4](apps/mfe/agent-toolkit/src/app/logs/LogTable.tsx#L4) |
| Virtualizer config | [LogTable.tsx:229-234](apps/mfe/agent-toolkit/src/app/logs/LogTable.tsx#L229) |
| overscan: 5 | [LogTable.tsx:233](apps/mfe/agent-toolkit/src/app/logs/LogTable.tsx#L233) |
| estimateSize | [LogTable.tsx:232](apps/mfe/agent-toolkit/src/app/logs/LogTable.tsx#L232) |

### 144. GPU-Accelerated Animations
**Q: What CSS properties are used for animations to ensure GPU acceleration?**

*Expected answer:*
- `transform` and `opacity` exclusively
- Never animate: width, height, top, left, margin, padding
- Framer Motion uses transforms under the hood
- Spring configs in `/packages/ui-library/core/src/config/motion.ts`
- `will-change: transform` for hints (used sparingly)

**📍 Codebase References:**
| What | Where |
|------|-------|
| Transition patterns | [transition.ts:1-7](packages/ui-library/core/src/styles/patterns/interactive/transition.ts#L1) |
| transform transition | [transition.ts:6](packages/ui-library/core/src/styles/patterns/interactive/transition.ts#L6) |
| Motion config | [motion.ts:1-147](packages/ui-library/core/src/config/motion.ts#L1) |
| Spring configs | [motion.ts:10-23](packages/ui-library/core/src/config/motion.ts#L10) |
| Duration values | [motion.ts:29-44](packages/ui-library/core/src/config/motion.ts#L29) |

### 145. Server Components vs Client Components
**Q: How do you decide what should be a Server vs Client Component?**

*Expected answer:*
- Server Components: Data fetching, static display, no interactivity
- Client Components: Event handlers, hooks, browser APIs
- `'use client'` directive at file top
- Granular imports from `@stackone-ui/core/card` etc.
- Server-safe: Card, Text, Badge, Spinner
- Client-only: Button (loading), Dialog, Select, hooks

**📍 Codebase References:**
| What | Where |
|------|-------|
| Bundle rules | [.claude/rules/bundle.md](.claude/rules/bundle.md) |
| 'use client' example | [LogHoverContext.tsx:1](apps/mfe/agent-toolkit/src/app/logs/LogHoverContext.tsx#L1) |
| Server-safe Card | [card.tsx](packages/ui-library/core/src/components/card/card.tsx) |
| Client Select | [select.tsx:1](packages/ui-library/core/src/components/select/select.tsx#L1) |

---

## Core Web Vitals & Performance Metrics (146-160)

### 146. LCP Font Loading Strategy
**Q: How are fonts optimized for LCP? What's the loading strategy?**

*Expected answer:*
- `next/font` with `display: 'swap'` (shows fallback immediately)
- `preload: true` prioritizes font loading
- `adjustFontFallback: true` applies size metrics
- `subsets: ['latin']` reduces file size
- Fonts: Inter (sans), IBM Plex Mono (mono)
- File: `/packages/ui-library/core/src/fonts/next-loader.ts`

**📍 Codebase References:**
| What | Where |
|------|-------|
| Font loader | [next-loader.ts:1-60](packages/ui-library/core/src/fonts/next-loader.ts#L1) |
| fontSans (Inter) | [next-loader.ts:21-28](packages/ui-library/core/src/fonts/next-loader.ts#L21) |
| fontMono (IBM Plex) | [next-loader.ts:34-41](packages/ui-library/core/src/fonts/next-loader.ts#L34) |
| Combined variables | [next-loader.ts:51](packages/ui-library/core/src/fonts/next-loader.ts#L51) |

### 147. CLS Prevention with Font Fallback Metrics
**Q: How does this codebase prevent CLS from font loading? What metrics are configured?**

*Expected answer:*
- `FontMetrics` interface: `sizeAdjust`, `ascentOverride`, `descentOverride`, `lineGapOverride`
- Per-font adjustments: Figtree (105%), Inter (107.64%), IBM Plex Mono (100%)
- Fallback fonts: Arial/Helvetica for sans, Courier for mono
- Prevents text reflow when web font loads
- File: `/packages/ui-library/core/src/fonts/schema.ts`

**📍 Codebase References:**
| What | Where |
|------|-------|
| FontMetrics interface | [schema.ts:11-20](packages/ui-library/core/src/fonts/schema.ts#L11) |
| FONT_METRICS config | [schema.ts:41-96](packages/ui-library/core/src/fonts/schema.ts#L41) |
| Inter metrics | [schema.ts:54-62](packages/ui-library/core/src/fonts/schema.ts#L54) |
| IBM Plex Mono metrics | [schema.ts:65-73](packages/ui-library/core/src/fonts/schema.ts#L65) |
| buildFontStack | [schema.ts:105-109](packages/ui-library/core/src/fonts/schema.ts#L105) |

### 148. CLS Prevention with Pixel-Perfect Skeletons
**Q: How do skeleton components prevent CLS? What dimensions must match?**

*Expected answer:*
- `SkeletonHeight` tokens tightly coupled to `ComponentHeight` tokens
- Examples: Title (57×32px), Input (44px), Select (88×44px)
- 10 skeleton rows pre-rendered for table
- CSS Grid template matches actual table columns
- File: `/apps/mfe/agent-toolkit/src/app/logs/LogsSkeleton.tsx`

**📍 Codebase References:**
| What | Where |
|------|-------|
| LogsSkeleton component | [LogsSkeleton.tsx:1-39](apps/mfe/agent-toolkit/src/app/logs/LogsSkeleton.tsx#L1) |
| Pixel-perfect comment | [LogsSkeleton.tsx:7-11](apps/mfe/agent-toolkit/src/app/logs/LogsSkeleton.tsx#L7) |
| Filter row skeleton | [LogsSkeleton.tsx:17-32](apps/mfe/agent-toolkit/src/app/logs/LogsSkeleton.tsx#L17) |
| SkeletonHeight imports | [LogsSkeleton.tsx:2](apps/mfe/agent-toolkit/src/app/logs/LogsSkeleton.tsx#L2) |

### 149. CSS Grid Column Stability
**Q: How does the log table maintain stable column widths?**

*Expected answer:*
- CSS variables define column widths: `--log-col-requested` through `--log-col-actions`
- Applied consistently to header, body rows, AND skeleton
- Grid template: `grid-cols-[var(--log-col-requested)_...]`
- Prevents layout shift when rows virtualize in/out
- File: `/apps/mfe/agent-toolkit/src/styles/index.ts`

**📍 Codebase References:**
| What | Where |
|------|-------|
| Grid column variables | [index.ts:271-272](apps/mfe/agent-toolkit/src/styles/index.ts#L271) |
| Header grid | [index.ts:280-281](apps/mfe/agent-toolkit/src/styles/index.ts#L280) |
| Body row grid | [index.ts:297-298](apps/mfe/agent-toolkit/src/styles/index.ts#L297) |
| Skeleton grid | [index.ts:691-692](apps/mfe/agent-toolkit/src/styles/index.ts#L691) |

### 150. FOUC Prevention with Inline Script
**Q: How is Flash of Unstyled Content prevented for theme?**

*Expected answer:*
- `THEME_INIT_SCRIPT` runs before React hydration
- Inline in `<head>`: `(function(){...document.documentElement.classList.add('dark')...})()`
- Reads localStorage for preference
- Falls back to `prefers-color-scheme` media query
- File: `/packages/ui-library/core/src/providers/ThemeProvider.tsx`

**📍 Codebase References:**
| What | Where |
|------|-------|
| THEME_INIT_SCRIPT | [ThemeProvider.tsx:51](packages/ui-library/core/src/providers/ThemeProvider.tsx#L51) |
| Storage key export | [ThemeProvider.tsx:44](packages/ui-library/core/src/providers/ThemeProvider.tsx#L44) |
| getInitialTheme | [ThemeProvider.tsx:61-65](packages/ui-library/core/src/providers/ThemeProvider.tsx#L61) |

### 151. Non-Blocking Theme Provider Pattern
**Q: Why does ThemeProvider use refs instead of state for loading flags?**

*Expected answer:*
- `fontsLoadedRef` and `themeReadyRef` are refs (not state)
- Refs don't trigger re-renders
- Base theme applied immediately (bundled)
- Brand theme loaded async in background (no await)
- Prevents full app re-render when assets load

**📍 Codebase References:**
| What | Where |
|------|-------|
| fontsLoadedRef | [ThemeProvider.tsx:77](packages/ui-library/core/src/providers/ThemeProvider.tsx#L77) |
| themeReadyRef | [ThemeProvider.tsx:78](packages/ui-library/core/src/providers/ThemeProvider.tsx#L78) |
| Comment explaining pattern | [ThemeProvider.tsx:75-76](packages/ui-library/core/src/providers/ThemeProvider.tsx#L75) |
| Async brand theme loading | [ThemeProvider.tsx:89-116](packages/ui-library/core/src/providers/ThemeProvider.tsx#L89) |

### 152. INP Optimization with useCallback
**Q: Where are event handlers memoized? Why does this help INP?**

*Expected answer:*
- `LogsPageContent.tsx`: `handleRowClick`, `handleNavigate`
- `LogDetailDialog.tsx`: `navigateToPrevious`, `navigateToNext`
- Prevents child re-renders from new function references
- Reduces main thread work during interactions
- Part of INP (Interaction to Next Paint) optimization

**📍 Codebase References:**
| What | Where |
|------|-------|
| Performance rules | [.claude/rules/performance.md](.claude/rules/performance.md) |
| useCallback pattern | [performance.md:23-26](.claude/rules/performance.md#L23) |
| React Compiler (auto memo) | [next.config.ts:19-20](apps/mfe/agent-toolkit/next.config.ts#L19) |

### 153. GPU-Accelerated CSS Transitions
**Q: What CSS properties are used for transitions? What's avoided?**

*Expected answer:*
- Used: `transform`, `opacity`, `shadow`, `background-color`, `border-color`
- Avoided: `width`, `height`, `top`, `left`, `margin`, `padding`
- Duration: 200ms (`duration-200` in Tailwind)
- File: `/packages/ui-library/core/src/styles/patterns/interactive/transition.ts`

**📍 Codebase References:**
| What | Where |
|------|-------|
| Transition patterns | [transition.ts:1-7](packages/ui-library/core/src/styles/patterns/interactive/transition.ts#L1) |
| Shadow transition | [transition.ts:2](packages/ui-library/core/src/styles/patterns/interactive/transition.ts#L2) |
| Background-color transition | [transition.ts:3](packages/ui-library/core/src/styles/patterns/interactive/transition.ts#L3) |
| Transform transition | [transition.ts:6](packages/ui-library/core/src/styles/patterns/interactive/transition.ts#L6) |
| Accessibility rule (composited properties) | [.claude/rules/accessibility.md](.claude/rules/accessibility.md) |

### 154. Stale-While-Revalidate Configuration
**Q: What are the staleTimes configured? What do they affect?**

*Expected answer:*
- `dynamic: 30` seconds - revalidate dynamic pages
- `static: 180` seconds - revalidate static pages
- Experimental Next.js feature
- Improves TTFB on repeat visits
- File: `/apps/mfe/agent-toolkit/next.config.ts`

**📍 Codebase References:**
| What | Where |
|------|-------|
| staleTimes config | [next.config.ts:21-24](apps/mfe/agent-toolkit/next.config.ts#L21) |
| dynamic: 30 | [next.config.ts:22](apps/mfe/agent-toolkit/next.config.ts#L22) |
| static: 180 | [next.config.ts:23](apps/mfe/agent-toolkit/next.config.ts#L23) |
| Experimental block | [next.config.ts:19-25](apps/mfe/agent-toolkit/next.config.ts#L19) |

### 155. Provider Icon Preloading Strategy
**Q: How are provider icons preloaded? Why use requestIdleCallback?**

*Expected answer:*
- `preloadProviderIcons()` called in layout via `ProviderIconPreloader`
- Uses `requestIdleCallback({ timeout: 2000 })` for non-blocking
- Fallback: `setTimeout(preload, 100)` for unsupported browsers
- Preloads images during browser idle time
- File: `/apps/mfe/agent-toolkit/src/utils/preload-provider-icons.ts`

**📍 Codebase References:**
| What | Where |
|------|-------|
| preloadProviderIcons function | [preload-provider-icons.ts:7-30](apps/mfe/agent-toolkit/src/utils/preload-provider-icons.ts#L7) |
| requestIdleCallback usage | [preload-provider-icons.ts:22-26](apps/mfe/agent-toolkit/src/utils/preload-provider-icons.ts#L22) |
| timeout: 2000 | [preload-provider-icons.ts:25](apps/mfe/agent-toolkit/src/utils/preload-provider-icons.ts#L25) |
| setTimeout fallback | [preload-provider-icons.ts:27-28](apps/mfe/agent-toolkit/src/utils/preload-provider-icons.ts#L27) |
| Image preload technique | [preload-provider-icons.ts:16-17](apps/mfe/agent-toolkit/src/utils/preload-provider-icons.ts#L16) |

### 156. Link Prefetch Optimization
**Q: Why is prefetch disabled on NavLinks?**

*Expected answer:*
- `prefetch={false}` on Next.js Link components
- Prevents unnecessary data loading
- Reduces TBT (Total Blocking Time)
- Defers non-critical fetches
- File: `/apps/mfe/agent-toolkit/src/components/NavLink.tsx`

**📍 Codebase References:**
| What | Where |
|------|-------|
| prefetch={false} | [NavLink.tsx:23](apps/mfe/agent-toolkit/src/components/NavLink.tsx#L23) |
| NavLink component | [NavLink.tsx:1-30](apps/mfe/agent-toolkit/src/components/NavLink.tsx#L1) |
| Performance rules on TBT | [.claude/rules/performance.md](.claude/rules/performance.md) |

### 157. Image Lazy Loading
**Q: How are images lazy loaded? When is eager loading used?**

*Expected answer:*
- `loading="lazy"` on provider icon images (below fold)
- Eager loading for critical above-fold images
- next/image with `priority` for LCP images
- File: `/apps/mfe/agent-toolkit/src/components/ProviderIcon/ProviderIcon.tsx`

**📍 Codebase References:**
| What | Where |
|------|-------|
| loading="lazy" | [ProviderIcon.tsx:98](apps/mfe/agent-toolkit/src/components/ProviderIcon/ProviderIcon.tsx#L98) |
| ProviderIcon component | [ProviderIcon.tsx:1-115](apps/mfe/agent-toolkit/src/components/ProviderIcon/ProviderIcon.tsx#L1) |
| Performance rules (images) | [.claude/rules/performance.md:72-87](.claude/rules/performance.md#L72) |

### 158. Theme Caching Strategy
**Q: How are brand themes cached? What prevents refetching?**

*Expected answer:*
- `new Map<string, BrandTheme>()` caches themes in memory
- Check cache before fetch: `if (cache.has(themeName)) return`
- Prevents duplicate network requests
- File: `/apps/shell/src/lib/theme-manager.ts`

**📍 Codebase References:**
| What | Where |
|------|-------|
| brandThemeCache Map | [theme-manager.ts:36](apps/shell/src/lib/theme-manager.ts#L36) |
| Cache check before fetch | [theme-manager.ts:83-85](apps/shell/src/lib/theme-manager.ts#L83) |
| Cache set after fetch | [theme-manager.ts:90](apps/shell/src/lib/theme-manager.ts#L90) |
| loadBrandTheme function | [theme-manager.ts:81-101](apps/shell/src/lib/theme-manager.ts#L81) |

### 159. Motion Duration Optimization
**Q: What are the motion duration values? Why these specific timings?**

*Expected answer:*
- `instant: 0.1s` (100ms) - immediate feedback
- `fast: 0.15s` (150ms) - quick transitions
- `normal: 0.2s` (200ms) - standard transitions
- `slow: 0.3s` (300ms) - deliberate animations
- Under 100ms feels instant, 200ms is responsive, >300ms feels slow
- File: `/packages/ui-library/core/src/config/motion.ts`

**📍 Codebase References:**
| What | Where |
|------|-------|
| DURATION object | [motion.ts:29-44](packages/ui-library/core/src/config/motion.ts#L29) |
| instant: 0.1 | [motion.ts:31](packages/ui-library/core/src/config/motion.ts#L31) |
| fast: 0.15 | [motion.ts:33](packages/ui-library/core/src/config/motion.ts#L33) |
| normal: 0.2 | [motion.ts:35](packages/ui-library/core/src/config/motion.ts#L35) |
| slow: 0.3 | [motion.ts:37](packages/ui-library/core/src/config/motion.ts#L37) |
| SPRING configs | [motion.ts:10-23](packages/ui-library/core/src/config/motion.ts#L10) |

### 160. Core Web Vitals Targets
**Q: What are the Lighthouse performance targets for this project?**

*Expected answer:*
- LCP: < 2.5s
- CLS: < 0.1
- INP/FID: < 200ms
- TBT: < 200ms
- Performance score: 90+
- Documented in `.claude/rules/performance.md`

**📍 Codebase References:**
| What | Where |
|------|-------|
| Performance Targets table | [performance.md:196-205](.claude/rules/performance.md#L196) |
| LCP < 2.5s | [performance.md:201](.claude/rules/performance.md#L201) |
| TBT < 200ms | [performance.md:203](.claude/rules/performance.md#L203) |
| CLS < 0.1 | [performance.md:204](.claude/rules/performance.md#L204) |
| Lighthouse fix checklist | [performance.md:401-408](.claude/rules/performance.md#L401) |
| Bundle optimization rules | [.claude/rules/bundle.md](.claude/rules/bundle.md) |

---

## Summary by Domain

| Domain | Questions | Key Topics |
|--------|-----------|------------|
| Design System | 1-15 | Tokens, theming, patterns, namespaces |
| Accessibility | 16-35 | ARIA, keyboard, focus, screen readers |
| Performance | 36-55 | Lazy loading, SSR, virtualization, metrics |
| UX Patterns | 56-75 | Loading states, feedback, navigation |
| Architecture | 76-100 | MFE, routing, i18n, data fetching |
| **AI Features** | 101-110 | Error Explainer, AI tokens, feedback mechanism |
| **Builds & Deployment** | 111-122 | Turborepo, Vercel multi-zone, code splitting |
| **State Management** | 123-132 | LogHoverContext RAF, logging system, hooks |
| **Advanced Browser/React** | 133-145 | React Compiler, RAF, useTransition, passive listeners |
| **Core Web Vitals** | 146-160 | LCP fonts, CLS skeletons, INP handlers, FOUC |

Each question includes expected answer guidance drawn from actual codebase implementations.
