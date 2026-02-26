import { notFound } from 'next/navigation'
import { ComponentPageClient } from './ComponentPageClient'
import { componentRoutes, getRouteByPath, getAdjacentRoutes } from '../../routes'

interface PageProps {
  params: Promise<{ component: string }>
}

export default async function ComponentPage({ params }: PageProps) {
  const { component: componentPath } = await params

  // Validate component exists on server
  const route = getRouteByPath(componentPath)
  const adjacentRoutes = getAdjacentRoutes(componentPath)

  if (!route) {
    notFound()
  }

  return (
    <ComponentPageClient
      componentPath={componentPath}
      route={route}
      adjacentRoutes={adjacentRoutes}
    />
  )
}

/** Generate static params for all component routes */
export function generateStaticParams() {
  return componentRoutes.map((route) => ({
    component: route.path,
  }))
}
