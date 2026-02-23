import { redirect } from 'next/navigation'
import { Routes } from '@/routes'

export default function ComponentLibraryPage() {
  redirect(Routes.designTokens)
}
