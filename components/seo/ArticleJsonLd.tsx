import { siteConfig } from '@/lib/constants'

interface ArticleJsonLdProps {
  title: string
  description: string
  url: string
  datePublished: string
  dateModified?: string
  author?: string
  image?: string
}

export function ArticleJsonLd({ title, description, url, datePublished, dateModified, author, image }: ArticleJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    url: `${siteConfig.url}${url}`,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: author || siteConfig.creator,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Cluttered',
      url: siteConfig.url,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/icons/logo.png`,
      },
    },
    image: image ? `${siteConfig.url}${image}` : `${siteConfig.url}/og/og.png`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}${url}`,
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
