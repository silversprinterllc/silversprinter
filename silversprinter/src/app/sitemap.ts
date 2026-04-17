import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://sterlingroute.com'
  const now = new Date()

  return [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/book`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/insurance`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/sterling-reserve`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/fleet`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/gallery`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/golf`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/gameday`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/corporate`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/family`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/youth-sports`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/rates`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/rental-terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${base}/sterling-reserve/tos`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]
}
