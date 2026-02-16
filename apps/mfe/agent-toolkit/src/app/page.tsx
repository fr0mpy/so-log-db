import { redirect } from 'next/navigation'
import { Routes } from '@/routes'

export default function RootPage() {
  redirect(Routes.logs.index)
}
