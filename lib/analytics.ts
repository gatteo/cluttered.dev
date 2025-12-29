import posthog from 'posthog-js'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

// Track download button clicks
export function trackDownload(version: string, source: string) {
  if (process.env.NODE_ENV !== 'production') return

  posthog.capture('download_started', { version, source })

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'download', {
      event_category: 'engagement',
      event_label: version,
    })
  }
}

// Track pricing plan views
export function trackPricingView(plan: string) {
  if (process.env.NODE_ENV !== 'production') return
  posthog.capture('pricing_viewed', { plan })
}

// Track CTA clicks
export function trackCTA(location: string, cta: string) {
  if (process.env.NODE_ENV !== 'production') return
  posthog.capture('cta_clicked', { location, cta })
}

// Track blog post reads
export function trackBlogRead(slug: string, readTime: number) {
  if (process.env.NODE_ENV !== 'production') return
  posthog.capture('blog_read', { slug, readTime })
}

// Track ecosystem page views
export function trackEcosystemView(ecosystem: string) {
  if (process.env.NODE_ENV !== 'production') return
  posthog.capture('ecosystem_viewed', { ecosystem })
}

// Track comparison page views
export function trackComparisonView(competitor: string) {
  if (process.env.NODE_ENV !== 'production') return
  posthog.capture('comparison_viewed', { competitor })
}

// Track external link clicks
export function trackExternalLink(url: string) {
  if (process.env.NODE_ENV !== 'production') return
  posthog.capture('external_link_clicked', { url })
}

// Track FAQ expansion
export function trackFAQExpand(question: string) {
  if (process.env.NODE_ENV !== 'production') return
  posthog.capture('faq_expanded', { question })
}
