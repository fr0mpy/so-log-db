import { useState, useEffect, useCallback, Suspense, memo } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ThemeSwitcher } from './components/ThemeSwitcher'
import { ComponentErrorBoundary } from './ComponentErrorBoundary'
import { Button, ScrollArea } from './components'
import { componentRoutes, getAdjacentRoutes } from './routes/config'

// Loading fallback for lazy components
const ComponentSkeleton = memo(() => (
  <div className="animate-pulse space-y-4">
    <div className="h-8 bg-muted rounded-theme-md w-1/3" />
    <div className="h-32 bg-muted rounded-theme-lg" />
  </div>
))
ComponentSkeleton.displayName = 'ComponentSkeleton'

export default function Gallery() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isDark, setIsDark] = useState(false)

  // Extract component path from URL (remove leading slash)
  const componentPath = location.pathname.slice(1) || componentRoutes[0].path

  // Get current route info
  const currentRoute = componentRoutes.find((r) => r.path === componentPath)
  const { previous, next, currentIndex, total } = getAdjacentRoutes(componentPath)

  // Apply dark mode class to document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  // Navigation handlers
  const goToNext = useCallback(() => {
    if (next) navigate(`/${next.path}`)
  }, [next, navigate])

  const goToPrevious = useCallback(() => {
    if (previous) navigate(`/${previous.path}`)
  }, [previous, navigate])

  const toggleDarkMode = useCallback(() => {
    setIsDark((prev) => !prev)
  }, [])

  return (
    <div className="h-screen flex bg-background overflow-hidden">
      {/* Sidebar - neumorphic with smooth scroll */}
      <aside className="w-64 border-r border-border bg-neu-base flex-shrink-0 overflow-hidden">
        <ScrollArea className="h-full overflow-y-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-lg font-semibold text-foreground">Components</h2>
            {/* Dark mode toggle */}
            <ThemeSwitcher isDark={isDark} onToggle={toggleDarkMode} />
          </div>
          <nav className="space-y-1">
            {componentRoutes.map((route) => (
              <Link
                key={route.path}
                to={`/${route.path}`}
                className={`block w-full text-left px-3 py-2 rounded-theme-md text-sm font-medium transition-colors ${
                  route.path === componentPath
                    ? 'bg-primary text-primary-foreground shadow-neu-raised-sm'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                {route.name}
              </Link>
            ))}
          </nav>
        </ScrollArea>
      </aside>

      {/* Main content with smooth scroll */}
      <main className="flex-1 bg-background overflow-hidden">
        <ScrollArea className="h-full overflow-y-auto p-8">
          <header className="mb-8">
            <h1 className="font-heading text-4xl font-bold mb-2 text-foreground">Component Gallery</h1>
            <p className="text-muted-foreground">
              Neumorphic Theme - {total} Components
            </p>
          </header>

          {/* Navigation controls */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button
                variant="text"
                onClick={goToPrevious}
                disabled={!previous}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <span className="font-heading text-2xl font-semibold text-foreground">
                {currentRoute?.name ?? 'Select a component'}
              </span>
              <Button
                variant="text"
                onClick={goToNext}
                disabled={!next}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Component preview - main neumorphic panel */}
          <div
            data-testid={`component-preview-${currentRoute?.name.toLowerCase() ?? 'empty'}`}
            className="rounded-theme-2xl bg-neu-base shadow-neu-raised p-8"
          >
            <ComponentErrorBoundary name={currentRoute?.name ?? 'Component'}>
              <Suspense fallback={<ComponentSkeleton />}>
                <Outlet />
              </Suspense>
            </ComponentErrorBoundary>
          </div>

          {/* Component info */}
          <div className="mt-6 p-4 rounded-theme-lg bg-neu-base shadow-neu-raised-sm">
            <p className="text-sm text-muted-foreground">
              Component {currentIndex >= 0 ? currentIndex + 1 : '-'} of {total}
            </p>
          </div>
        </ScrollArea>
      </main>
    </div>
  )
}
