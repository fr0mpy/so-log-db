import { redirect } from 'next/navigation'
import { componentRoutes } from '../routes'

/**
 * Component Library root page - redirects to first component.
 */
export default function ComponentLibraryPage() {
  redirect(`/${componentRoutes[0].path}`)
}
