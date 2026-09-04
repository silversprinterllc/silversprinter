import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/dispatcher/', '/portal/', '/book/confirmation'],
    },
    sitemap: 'https://sterlingroute.com/sitemap.xml',
  }
}
