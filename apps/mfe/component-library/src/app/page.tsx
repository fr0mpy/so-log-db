import { redirect } from 'next/navigation'
import { Routes } from '@/routes'

/**
 * Component Library root page - redirects to design tokens.
 */
export default function ComponentLibraryPage() {
  redirect(Routes.designTokens)
}
