'use client'

import { useEffect } from 'react'
import { Button } from '@stackone-ui/core/button'
import { Text } from '@stackone-ui/core/text'

export default function ComponentError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center min-h-[50vh] gap-4 p-8"
    >
      <Text variant="h2">Something went wrong</Text>
      <Text variant="body1" className="text-muted-foreground text-center max-w-md">
        An unexpected error occurred. Please try again.
      </Text>
      <Button onClick={reset} variant="primary">
        Try again
      </Button>
    </div>
  )
}
