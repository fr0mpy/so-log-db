# Dead Code Audit Report

**Generated:** 2026-02-22
**Scope:** Full monorepo audit (443 TS/TSX files)
**Status:** CLEANUP COMPLETED

---

## Executive Summary

| Category | Unused Items | Impact |
|----------|--------------|--------|
| **Orphaned Files** | 10 files | Can be deleted |
| **Unused Package Exports** | 12 exports | Can be removed |
| **Unused Hooks** | 3 hooks | Can be removed from public API |
| **Unused Config Constants** | 1 constant + 25 sub-properties | Can be cleaned up |
| **Unused Style Patterns** | ~100 properties | Can be pruned |
| **Unused UI Components** | 18 components | Consider deprecating |
| **Unused i18n Keys** | 18 namespaces + 50+ keys | Can be cleaned up |

---

## 1. Orphaned Files (Safe to Delete)

### apps/shell/src/config/ (Entire Directory)

The shell's config directory is never imported:

```
apps/shell/src/config/
├── index.ts        # Barrel export - ORPHANED
├── providers.ts    # Provider registry - ORPHANED
└── pagination.ts   # Pagination constants - ORPHANED
```

**Action:** Delete entire directory

---

### apps/mfe/agent-toolkit/src/providers/ (PowerSync)

PowerSync integration was started but never completed:

```
apps/mfe/agent-toolkit/src/
├── providers/
│   ├── index.ts              # ORPHANED
│   └── PowerSyncProvider.tsx # ORPHANED
└── lib/
    └── powersync.ts          # ORPHANED (related)
```

**Action:** Delete if PowerSync integration is abandoned

---

### packages/ui-library/core/src/components/form/search-input.tsx

Component exists but is not exported from barrel:

**Action:** Either export from `form/index.ts` or delete

---

## 2. Unused Package Exports

### @stackone/utils

| Export | File | Action |
|--------|------|--------|
| `getStorageItem` | storage/storage.ts:11 | Remove |
| `getStorageString` | storage/storage.ts:27 | Remove |
| `setStorageItem` | storage/storage.ts:43 | Remove |
| `removeStorageItem` | storage/storage.ts:59 | Remove |
| `type Logger` | logger/logger.ts | Remove from public API |
| `type LogLevel` | logger/logger.ts | Remove from public API |

**Note:** Only `setStorageString` is used (in ThemeProvider)

---

### @stackone/i18n

| Export | File | Action |
|--------|------|--------|
| `getMissingTranslations` | logger.ts:72 | Remove |
| `clearMissingTranslations` | logger.ts:80 | Remove |
| `namespaces` | config.ts | Remove from public API |

---

### @stackone-ui/core

| Export | File | Action |
|--------|------|--------|
| `createSafeContextHook` | utils/createContextHook.ts | Remove |
| `getInputStyles` | styles/patterns/form/index.ts | Remove |
| `responsiveClasses` | styles/tokens/responsive.ts | Remove |

---

## 3. Unused Hooks

| Hook | Status | Recommendation |
|------|--------|----------------|
| `useMediaQuery` | Used internally only | Keep (foundation for other hooks) |
| `useIsTablet` | Unused | Remove from public exports |
| `useBreakpoint` | Unused | Remove from public exports |

---

## 4. Unused Config Constants

### Completely Unused

| Constant | File | Action |
|----------|------|--------|
| `PRESS` | config/motion.ts | Remove entire constant |

### Unused Sub-Properties

**SPRING:**
- `SPRING.selectOpen` - Remove
- `SPRING.selectClose` - Remove
- `SPRING.gentle` - Keep (style definition only)

**DURATION:**
- `DURATION.loading` - Remove

**OPACITY:**
- `OPACITY.backdrop` - Remove
- `OPACITY.drawerBackdrop` - Remove

**ARIA:**
- `ARIA.loading`, `ARIA.search`, `ARIA.filterByType`, `ARIA.filterByLevel`
- `ARIA.filterByTimeRange`, `ARIA.filterInput`, `ARIA.morePages`, `ARIA.pagination`
- `ARIA.previousSlide`, `ARIA.nextSlide`, `ARIA.goToSlide`
- `ARIA.previousPage`, `ARIA.nextPage`
- `ARIA.decreaseValue`, `ARIA.increaseValue`
- `ARIA.breadcrumb`, `ARIA.switchToLight`, `ARIA.switchToDark`

**THEME_TIMING:**
- `THEME_TIMING.knobDelay` - Remove
- `THEME_TIMING.knobDuration` - Remove

---

## 5. Unused UI Components (Not Used in Apps)

These components exist in `@stackone-ui/core` but are never imported in production apps:

| Component | Recommendation |
|-----------|----------------|
| Accordion | Consider removing |
| Alert | Consider removing |
| Avatar | Consider removing |
| Carousel | Consider removing |
| Checkbox | Keep for future forms |
| ContextMenu | Consider removing |
| DropdownMenu | Consider removing |
| JsonView | Consider removing |
| KeyValueList | Consider removing |
| NavigationMenu | Consider removing |
| NumberInput | Keep for future forms |
| Popover | Consider removing |
| Progress | Consider removing |
| Separator | Consider removing |
| Slider | Keep for future forms |
| Table | Consider removing |
| Textarea | Keep for future forms |
| Toolbar | Consider removing |
| UrlBar | Consider removing |

**Note:** These are "library" components - they may be intentionally exported for external consumers even if not used internally.

---

## 6. Unused i18n Keys

### Completely Unused Namespaces

These key namespaces are exported from `keys.ts` but never imported:

- `brand`
- `skipLinks`
- `labels`
- `placeholder`
- `srOnly`
- `logLevels`
- `timeRanges`
- `dataTypes`
- `status`
- `metadata`
- `sidebar`
- `dashboard`
- `logDetail`
- `search`
- `explore`
- `datePicker`
- `home`
- `designReview`

**Issue:** Apps use direct string paths like `t('home.title')` instead of typed key constants like `t(home.title)`.

---

## 7. Unused Style Patterns (Summary)

~100 style properties are never used. Top categories:

| Namespace | Unused Properties |
|-----------|-------------------|
| `Layout.Position` | 4 unused (absolute, fixed, centerY, centerX) |
| `Layout.Size` | 5 unused (iconLg, touchTarget, square10, inputHeight, full) |
| `Interactive.Button` | 3 unused (icon, inset, paginationLink) |
| `Feedback.TagSolid` | 5 unused (info, primary, secondary, accent, muted) |
| `TypographyTokens` | 27 unused properties |
| `SpacingTokens` | 11 unused properties |
| `SizingTokens` | 18 unused properties |

---

## Recommended Actions

### Phase 1: Quick Wins (Safe Deletions)

1. **Delete orphaned files:**
   - `apps/shell/src/config/` (entire directory)
   - `apps/mfe/agent-toolkit/src/providers/` (entire directory)
   - `apps/mfe/agent-toolkit/src/lib/powersync.ts`
   - `packages/ui-library/core/src/components/form/search-input.tsx`

2. **Remove from @stackone/i18n:**
   - `getMissingTranslations` function
   - `clearMissingTranslations` function

3. **Remove from @stackone/utils:**
   - `getStorageItem`, `getStorageString`, `setStorageItem`, `removeStorageItem`
   - Keep `setStorageString` (used by ThemeProvider)

### Phase 2: Config Cleanup

1. Remove `PRESS` constant entirely
2. Remove unused ARIA, DURATION, OPACITY sub-properties
3. Audit and remove unused style pattern properties

### Phase 3: Library Review

1. Decide on component library strategy:
   - **Option A:** Keep all components (library approach)
   - **Option B:** Remove unused components (app-focused approach)

2. Standardize i18n usage:
   - Either use typed key constants consistently
   - Or remove unused key namespaces

---

## Verification Commands

After cleanup, run:

```bash
# TypeScript check
pnpm typecheck

# Build all apps
pnpm build

# Run tests
pnpm test
```

---

## Files Modified in Cleanup

| File | Changes |
|------|---------|
| packages/i18n/src/logger.ts | Remove 2 functions |
| packages/i18n/src/index.ts | Remove 2 exports |
| packages/utils/src/storage/storage.ts | Remove 4 functions |
| packages/utils/src/storage/index.ts | Remove 4 exports |
| packages/ui-library/core/src/config/motion.ts | Remove PRESS constant |
| packages/ui-library/core/src/config/text.ts | Remove unused ARIA keys |
