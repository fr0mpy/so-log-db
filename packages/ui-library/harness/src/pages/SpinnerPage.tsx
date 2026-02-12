import { Spinner } from '@stackone-ui/core'

export default function SpinnerPage() {
  return (
    <div className="flex gap-4 items-center">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  )
}
