/**
 * Component Library MFE Route Configuration
 *
 * Single source of truth for all routes within this MFE.
 */

/** Base path for this MFE (matches next.config.ts basePath) */
export const BASE_PATH = '/component-library'

/** Component route configuration */
export interface ComponentRoute {
  name: string
  path: string
}

/** Adjacent routes for navigation */
export interface AdjacentRoutes {
  previous: ComponentRoute | null
  next: ComponentRoute | null
  currentIndex: number
  total: number
}

/** All available component routes (alphabetically sorted) */
export const componentRoutes: ComponentRoute[] = [
  { name: 'Accordion', path: 'accordion' },
  { name: 'Alert', path: 'alert' },
  { name: 'Avatar', path: 'avatar' },
  { name: 'Badge', path: 'badge' },
  { name: 'Breadcrumb', path: 'breadcrumb' },
  { name: 'Button', path: 'button' },
  { name: 'Card', path: 'card' },
  { name: 'Carousel', path: 'carousel' },
  { name: 'Checkbox', path: 'checkbox' },
  { name: 'Collapsible', path: 'collapsible' },
  { name: 'ContextMenu', path: 'context-menu' },
  { name: 'Dialog', path: 'dialog' },
  { name: 'Drawer', path: 'drawer' },
  { name: 'DropdownMenu', path: 'dropdown-menu' },
  { name: 'Font Showcase', path: 'font-showcase' },
  { name: 'HoverCard', path: 'hover-card' },
  { name: 'Input', path: 'input' },
  { name: 'JsonView', path: 'json-view' },
  { name: 'KeyValueList', path: 'key-value-list' },
  { name: 'NavigationMenu', path: 'navigation-menu' },
  { name: 'NumberInput', path: 'number-input' },
  { name: 'Pagination', path: 'pagination' },
  { name: 'Paper', path: 'paper' },
  { name: 'Popover', path: 'popover' },
  { name: 'Progress', path: 'progress' },
  { name: 'Radio', path: 'radio' },
  { name: 'ScrollArea', path: 'scroll-area' },
  { name: 'Select', path: 'select' },
  { name: 'Separator', path: 'separator' },
  { name: 'Skeleton', path: 'skeleton' },
  { name: 'Slider', path: 'slider' },
  { name: 'Spinner', path: 'spinner' },
  { name: 'Switch', path: 'switch' },
  { name: 'Table', path: 'table' },
  { name: 'Tabs', path: 'tabs' },
  { name: 'Tag', path: 'tag' },
  { name: 'Text', path: 'text' },
  { name: 'Textarea', path: 'textarea' },
  { name: 'Toast', path: 'toast' },
  { name: 'Toolbar', path: 'toolbar' },
  { name: 'Tooltip', path: 'tooltip' },
  { name: 'UrlBar', path: 'url-bar' },
]

export const Routes = {
  /** Gallery index (redirects to first component) */
  index: '/',

  /** Design tokens documentation page */
  designTokens: '/design-tokens',

  /** Component detail page */
  component: (path: string) => `/${path}` as const,

  /** Shell home (cross-zone - use <a> not <Link>) */
  shell: {
    home: process.env.NEXT_PUBLIC_SHELL_URL || '/',
  },
} as const

/** Get route by path */
export function getRouteByPath(path: string): ComponentRoute | undefined {
  return componentRoutes.find((route) => route.path === path)
}

/** Get adjacent routes for navigation */
export function getAdjacentRoutes(currentPath: string): AdjacentRoutes {
  const currentIndex = componentRoutes.findIndex((r) => r.path === currentPath)
  return {
    previous: currentIndex > 0 ? componentRoutes[currentIndex - 1] : null,
    next: currentIndex < componentRoutes.length - 1 ? componentRoutes[currentIndex + 1] : null,
    currentIndex,
    total: componentRoutes.length,
  }
}
