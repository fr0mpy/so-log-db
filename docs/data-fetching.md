# Data Fetching

SSR-first data fetching patterns.

## Server vs Client

| Use Case | Method | Location |
|----------|--------|----------|
| Initial page data | `fetch()` | Server Component |
| Static/cached data | `fetch()` with cache | Server Component |
| Real-time updates | SWR | Client Component |
| Mutations | Server Actions | Client Component |

## Server Component Pattern (Default)

Pages are Server Components by default. Fetch data directly with `async/await`:

```tsx
// app/logs/page.tsx - No 'use client'
async function LogsPage() {
  const logs = await fetchLogs()  // Runs on server
  return <LogsTable data={logs} />
}
```

Benefits:
- Zero JS sent for static content
- Data fetched at request time
- SEO-friendly

## Caching Strategies

```tsx
// No cache - always fresh (default in App Router)
const data = await fetch('/api/data')

// Cache indefinitely - static data
const data = await fetch('/api/data', { cache: 'force-cache' })

// Revalidate periodically
const data = await fetch('/api/data', { next: { revalidate: 60 } })

// Revalidate on demand via tags
const data = await fetch('/api/data', { next: { tags: ['logs'] } })

// In Server Action:
import { revalidateTag } from 'next/cache'
revalidateTag('logs')
```

## Parallel Fetching

Always use `Promise.all()` for independent fetches:

```tsx
// Slow - sequential waterfall
const user = await fetchUser(id)
const posts = await fetchPosts(id)

// Fast - parallel
const [user, posts] = await Promise.all([
  fetchUser(id),
  fetchPosts(id),
])
```

## Suspense Streaming

Stream non-critical data while showing critical content immediately:

```tsx
async function Dashboard() {
  // Critical: blocks render
  const user = await fetchUser()

  return (
    <div>
      <UserHeader user={user} />

      {/* Non-critical: streams in */}
      <Suspense fallback={<StatsSkeleton />}>
        <Stats />
      </Suspense>

      <Suspense fallback={<ActivitySkeleton />}>
        <RecentActivity />
      </Suspense>
    </div>
  )
}
```

## SWR for Real-Time Data

Use SWR in Client Components for polling or real-time updates:

```tsx
'use client'

function LiveLogs() {
  const { data, error, isLoading } = useSWR(
    '/api/logs/live',
    fetcher,
    { refreshInterval: 5000 }  // Poll every 5s
  )

  if (error) return <ErrorState />
  if (isLoading) return <Skeleton />
  return <LogsTable data={data} />
}
```

## Server Actions for Mutations

```tsx
// actions.ts
'use server'

export async function updateLog(id: string, data: LogData) {
  await db.log.update({ where: { id }, data })
  revalidatePath('/logs')
}

// Component
'use client'

function LogEditor({ log }) {
  const [isPending, startTransition] = useTransition()

  const handleSave = () => {
    startTransition(async () => {
      await updateLog(log.id, formData)
    })
  }

  return <button onClick={handleSave} disabled={isPending}>Save</button>
}
```

## Error Handling

```tsx
async function fetchLogs() {
  const res = await fetch('/api/logs')

  if (!res.ok) {
    throw new Error(`Failed to fetch logs: ${res.status}`)
  }

  return res.json()
}
```

## Loading States

| State | Priority | Display |
|-------|----------|---------|
| Error | 1 (highest) | Error message + retry |
| Loading | 2 | Skeleton/spinner |
| Empty | 3 | Empty state |
| Success | 4 | Data |

```tsx
if (error) return <ErrorState />
if (isLoading) return <Skeleton />
if (!data?.length) return <EmptyState />
return <DataDisplay data={data} />
```

## When to Use Client vs Server

| Use Server Component | Use Client Component |
|---------------------|---------------------|
| Initial page load data | Real-time/polling data |
| SEO-critical content | User interactions |
| Static content | Forms with state |
| Cacheable data | Browser API access |
