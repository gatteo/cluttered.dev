import { siteConfig } from '@/lib/constants'

export function SoftwareJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Cluttered',
    description: siteConfig.description,
    url: siteConfig.url,
    downloadUrl: `${siteConfig.url}/download`,
    softwareVersion: '1.0.1',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'macOS',
    offers: [
      {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        name: 'Free',
      },
      {
        '@type': 'Offer',
        price: '29',
        priceCurrency: 'USD',
        name: 'Pro',
        priceValidUntil: '2026-12-31',
      },
      {
        '@type': 'Offer',
        price: '49',
        priceCurrency: 'USD',
        name: 'Pro Lifetime',
        priceValidUntil: '2026-12-31',
      },
    ],
    featureList: [
      'Multi-ecosystem support (12+ languages/frameworks)',
      'Smart project activity detection',
      'Safe deletion with Trash support',
      'Docker image cleanup',
      'Xcode DerivedData cleanup',
      'Rust target directory cleanup',
      'Node.js node_modules cleanup',
    ],
    screenshot: `${siteConfig.url}/screenshot-dash.png`,
    author: {
      '@type': 'Person',
      name: siteConfig.creator,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Cluttered',
      url: siteConfig.url,
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
