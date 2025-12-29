import { siteConfig } from '@/lib/constants'

export function OrganizationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Cluttered',
    url: siteConfig.url,
    logo: `${siteConfig.url}/icons/logo.png`,
    sameAs: [siteConfig.github],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'support@cluttered.dev',
      contactType: 'customer support',
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
