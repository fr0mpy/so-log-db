/**
 * Font System for StackOne UI
 *
 * Fonts are defined in theme files and generated via:
 * pnpm --filter @stackone-ui/core build:fonts
 *
 * @example
 * // In layout.tsx
 * import { FontSetup } from '@stackone-ui/core/fonts'
 *
 * <html className={FontSetup.htmlClassName}>
 *   <body className={FontSetup.bodyClassName}>
 *
 * @example
 * // Direct access to font instances
 * import { fontSans, fontMono, fontVariables } from '@stackone-ui/core/fonts'
 */

export {
  fontSans,
  fontMono,
  fontVariables,
  FontSetup,
} from './next-loader.generated'
