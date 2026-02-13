import type { MetadataRoute } from 'next'

/**
 * Dynamic robots.txt generation
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com'}/connectors/sitemap.xml`,
  }
}
