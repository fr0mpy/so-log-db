'use client'

import { Suspense, lazy } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@stackone-ui/core/button'
import { LayoutStyles as S } from '../../components/styles'
import type { ComponentRoute, AdjacentRoutes } from '../../routes'

/** Lazy-loaded component pages from harness */
const componentPages: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  'accordion': lazy(() => import('@harness/pages/AccordionPage')),
  'alert': lazy(() => import('@harness/pages/AlertPage')),
  'avatar': lazy(() => import('@harness/pages/AvatarPage')),
  'badge': lazy(() => import('@harness/pages/BadgePage')),
  'breadcrumb': lazy(() => import('@harness/pages/BreadcrumbPage')),
  'button': lazy(() => import('@harness/pages/ButtonPage')),
  'card': lazy(() => import('@harness/pages/CardPage')),
  'carousel': lazy(() => import('@harness/pages/CarouselPage')),
  'checkbox': lazy(() => import('@harness/pages/CheckboxPage')),
  'collapsible': lazy(() => import('@harness/pages/CollapsiblePage')),
  'context-menu': lazy(() => import('@harness/pages/ContextMenuPage')),
  'dialog': lazy(() => import('@harness/pages/DialogPage')),
  'drawer': lazy(() => import('@harness/pages/DrawerPage')),
  'dropdown-menu': lazy(() => import('@harness/pages/DropdownMenuPage')),
  'font-showcase': lazy(() => import('@harness/pages/FontShowcasePage')),
  'hover-card': lazy(() => import('@harness/pages/HoverCardPage')),
  'input': lazy(() => import('@harness/pages/InputPage')),
  'json-view': lazy(() => import('@harness/pages/JsonViewPage')),
  'key-value-list': lazy(() => import('@harness/pages/KeyValueListPage')),
  'navigation-menu': lazy(() => import('@harness/pages/NavigationMenuPage')),
  'number-input': lazy(() => import('@harness/pages/NumberInputPage')),
  'pagination': lazy(() => import('@harness/pages/PaginationPage')),
  'paper': lazy(() => import('@harness/pages/PaperPage')),
  'popover': lazy(() => import('@harness/pages/PopoverPage')),
  'progress': lazy(() => import('@harness/pages/ProgressPage')),
  'radio': lazy(() => import('@harness/pages/RadioPage')),
  'scroll-area': lazy(() => import('@harness/pages/ScrollAreaPage')),
  'select': lazy(() => import('@harness/pages/SelectPage')),
  'separator': lazy(() => import('@harness/pages/SeparatorPage')),
  'skeleton': lazy(() => import('@harness/pages/SkeletonPage')),
  'slider': lazy(() => import('@harness/pages/SliderPage')),
  'spinner': lazy(() => import('@harness/pages/SpinnerPage')),
  'switch': lazy(() => import('@harness/pages/SwitchPage')),
  'table': lazy(() => import('@harness/pages/TablePage')),
  'tabs': lazy(() => import('@harness/pages/TabsPage')),
  'tag': lazy(() => import('@harness/pages/TagPage')),
  'text': lazy(() => import('@harness/pages/TextPage')),
  'textarea': lazy(() => import('@harness/pages/TextareaPage')),
  'toast': lazy(() => import('@harness/pages/ToastPage')),
  'toolbar': lazy(() => import('@harness/pages/ToolbarPage')),
  'tooltip': lazy(() => import('@harness/pages/TooltipPage')),
  'url-bar': lazy(() => import('@harness/pages/UrlBarPage')),
}

/** Skeleton loading state */
function ComponentSkeleton() {
  return (
    <div className={S.skeleton.container}>
      <div className={S.skeleton.title} />
      <div className={S.skeleton.content} />
    </div>
  )
}

interface ComponentPageClientProps {
  componentPath: string
  route: ComponentRoute
  adjacentRoutes: AdjacentRoutes
}

export function ComponentPageClient({
  componentPath,
  route,
  adjacentRoutes,
}: ComponentPageClientProps) {
  const { previous, next, currentIndex, total } = adjacentRoutes
  const ComponentToRender = componentPages[componentPath]

  if (!ComponentToRender) {
    return null
  }

  return (
    <>
      {/* Header */}
      <header className={S.header.wrapper}>
        <div className={S.header.row}>
          <h1 className={S.header.title}>Component Gallery</h1>
        </div>
        <p className={S.header.subtitle}>
          Neumorphic Theme - {total} Components
        </p>
      </header>

      {/* Navigation controls */}
      <div className={S.navControls.wrapper}>
        {previous ? (
          <Button variant="text" asChild>
            <Link href={`/${previous.path}`}>
              <ChevronLeft className="h-4 w-4" />
              <span className={S.navControls.buttonText}>Previous</span>
            </Link>
          </Button>
        ) : (
          <Button variant="text" disabled>
            <ChevronLeft className="h-4 w-4" />
            <span className={S.navControls.buttonText}>Previous</span>
          </Button>
        )}

        <span className={S.navControls.title}>{route.name}</span>

        {next ? (
          <Button variant="text" asChild>
            <Link href={`/${next.path}`}>
              <span className={S.navControls.buttonText}>Next</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        ) : (
          <Button variant="text" disabled>
            <span className={S.navControls.buttonText}>Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Component preview */}
      <div
        data-testid={`component-preview-${route.name.toLowerCase()}`}
        className={S.preview}
      >
        <Suspense fallback={<ComponentSkeleton />}>
          <ComponentToRender />
        </Suspense>
      </div>

      {/* Component info */}
      <div className={S.info.wrapper}>
        <p className={S.info.text}>
          Component {currentIndex >= 0 ? currentIndex + 1 : '-'} of {total}
        </p>
      </div>
    </>
  )
}
