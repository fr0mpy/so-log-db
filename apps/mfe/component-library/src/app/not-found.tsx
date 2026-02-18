import Link from 'next/link'
import { Button } from '@stackone-ui/core/button'
import { componentRoutes } from '../routes'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      <h2 className="text-2xl font-heading font-bold text-foreground">
        Component Not Found
      </h2>
      <p className="text-muted-foreground">
        The component you&apos;re looking for doesn&apos;t exist.
      </p>
      <Button asChild>
        <Link href={`/${componentRoutes[0].path}`}>
          Go to {componentRoutes[0].name}
        </Link>
      </Button>
    </div>
  )
}
