import type { MetadataRoute } from 'next'

const BASE = 'https://sterlingroute.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/fleet', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/gallery', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/rates', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/book', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/golf', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/gameday', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/corporate', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/family', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/sterling-reserve', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/faq', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/insurance', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/rental-terms', priority: 0.4, changeFrequency: 'yearly' as const },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
  ]

  return pages.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }))
}
