import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { allComparisons } from 'contentlayer/generated'
import { Section, Container, Card, Badge, Button, FadeIn } from '@/components/ui'
import { MDXContent } from '@/components/mdx/MDXContent'
import { ArrowLeft, CheckCircle, XCircle, ExternalLink } from 'lucide-react'

interface ComparisonPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return allComparisons.map((comparison) => ({
    slug: comparison.slug,
  }))
}

export async function generateMetadata({ params }: ComparisonPageProps): Promise<Metadata> {
  const { slug } = await params
  const comparison = allComparisons.find((c) => c.slug === slug)

  if (!comparison) {
    return {
      title: 'Comparison Not Found',
    }
  }

  const ogImage = `/og?title=${encodeURIComponent(comparison.title)}&description=${encodeURIComponent(comparison.description)}`

  return {
    title: comparison.title,
    description: comparison.description,
    openGraph: {
      title: comparison.title,
      description: comparison.description,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      images: [ogImage],
    },
  }
}

export default async function ComparisonPage({ params }: ComparisonPageProps) {
  const { slug } = await params
  const comparison = allComparisons.find((c) => c.slug === slug)

  if (!comparison) {
    notFound()
  }

  return (
    <Section size="lg" first>
      <Container className="max-w-4xl">
        <FadeIn>
          {/* Back link */}
          <Link href="/compare" className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            All Comparisons
          </Link>

          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="secondary">Comparison</Badge>
              {comparison.featured && <Badge variant="success">Featured</Badge>}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">{comparison.title}</h1>

            <p className="text-xl text-text-secondary mb-6">{comparison.description}</p>

            {comparison.competitorUrl && (
              <a
                href={comparison.competitorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-secondary transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Visit {comparison.competitor} website
              </a>
            )}
          </header>

          {/* Verdict */}
          <Card className="p-6 mb-8 bg-gradient-to-r from-accent-green/10 to-transparent border-accent-green/20">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-accent-green flex-shrink-0" />
              <div>
                <p className="text-sm text-text-muted">Our Verdict</p>
                <p className="text-lg font-semibold text-text-primary">{comparison.verdict}</p>
              </div>
            </div>
          </Card>

          {/* Quick Comparison Table */}
          <Card className="p-6 mb-8 overflow-x-auto">
            <h2 className="text-xl font-semibold text-text-primary mb-4">Quick Comparison</h2>
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-text-muted font-medium">Feature</th>
                  <th className="text-center py-3 px-4 text-accent-purple font-medium">Cluttered</th>
                  <th className="text-center py-3 px-4 text-text-secondary font-medium">{comparison.competitor}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-4 text-text-secondary">Developer-focused scanning</td>
                  <td className="py-3 px-4 text-center">
                    <CheckCircle className="w-5 h-5 text-accent-green mx-auto" />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <XCircle className="w-5 h-5 text-accent-red mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-4 text-text-secondary">Git-aware protection</td>
                  <td className="py-3 px-4 text-center">
                    <CheckCircle className="w-5 h-5 text-accent-green mx-auto" />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <XCircle className="w-5 h-5 text-accent-red mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-4 text-text-secondary">Multi-ecosystem support</td>
                  <td className="py-3 px-4 text-center">
                    <CheckCircle className="w-5 h-5 text-accent-green mx-auto" />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <XCircle className="w-5 h-5 text-accent-red mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-4 text-text-secondary">Project activity detection</td>
                  <td className="py-3 px-4 text-center">
                    <CheckCircle className="w-5 h-5 text-accent-green mx-auto" />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <XCircle className="w-5 h-5 text-accent-red mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-text-secondary">Safe deletion to Trash</td>
                  <td className="py-3 px-4 text-center">
                    <CheckCircle className="w-5 h-5 text-accent-green mx-auto" />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <CheckCircle className="w-5 h-5 text-accent-green mx-auto" />
                  </td>
                </tr>
              </tbody>
            </table>
          </Card>

          {/* Content */}
          <article className="mb-12">
            <MDXContent code={comparison.body.code} className="prose prose-lg prose-invert max-w-none" />
          </article>

          {/* CTA */}
          <Card className="p-8 text-center bg-gradient-to-r from-accent-purple/10 to-accent-pink/10 border-accent-purple/20">
            <h2 className="text-2xl font-bold text-text-primary mb-3">Ready to try Cluttered?</h2>
            <p className="text-text-secondary mb-6">See for yourself why developers choose Cluttered over {comparison.competitor}.</p>
            <Link href="/download">
              <Button size="lg">Download Free</Button>
            </Link>
          </Card>
        </FadeIn>
      </Container>
    </Section>
  )
}
