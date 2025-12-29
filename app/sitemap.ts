import { MetadataRoute } from 'next'
import { allPosts, allEcosystems, allComparisons, allDocs } from 'contentlayer/generated'
import { siteConfig } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    '',
    '/features',
    '/pricing',
    '/download',
    '/about',
    '/blog',
    '/ecosystems',
    '/compare',
    '/docs',
    '/changelog',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? ('daily' as const) : ('weekly' as const),
    priority: route === '' ? 1 : 0.8,
  }))

  const blogPosts = allPosts
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteConfig.url}${post.url}`,
      lastModified: new Date(post.updated || post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

  const ecosystems = allEcosystems.map((eco) => ({
    url: `${siteConfig.url}${eco.url}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const comparisons = allComparisons.map((comp) => ({
    url: `${siteConfig.url}${comp.url}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const docs = allDocs.map((doc) => ({
    url: `${siteConfig.url}${doc.url}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...blogPosts, ...ecosystems, ...comparisons, ...docs]
}
