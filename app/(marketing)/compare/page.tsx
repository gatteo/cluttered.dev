import { Metadata } from 'next'
import Link from 'next/link'
import { allComparisons } from 'contentlayer/generated'
import { Section, Container, Card, Badge, FadeIn } from '@/components/ui'
import { ArrowRight, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Compare Cluttered',
  description: 'See how Cluttered compares to other disk cleaning tools. Developer-focused features that generic cleaners miss.',
}

export default function ComparisonsPage() {
  const comparisons = allComparisons
  const featuredComparisons = comparisons.filter((c) => c.featured)
  const otherComparisons = comparisons.filter((c) => !c.featured)

  return (
    <Section size="lg" first>
      <Container>
        <FadeIn>
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Comparisons
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
              Cluttered vs. The Competition
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Generic disk cleaners don&apos;t understand developer workflows. See why Cluttered is built different.
            </p>
          </div>
        </FadeIn>

        {comparisons.length === 0 ? (
          <FadeIn>
            <Card className="text-center py-12">
              <p className="text-text-secondary">
                Comparisons coming soon!
              </p>
            </Card>
          </FadeIn>
        ) : (
          <div className="space-y-8">
            {/* Featured Comparisons */}
            {featuredComparisons.length > 0 && (
              <div className="grid md:grid-cols-2 gap-6">
                {featuredComparisons.map((comparison, index) => (
                  <FadeIn key={comparison.slug} delay={index * 0.05}>
                    <Link href={comparison.url} className="block group h-full">
                      <Card className="p-6 h-full flex flex-col hover:border-accent-purple/40 transition-colors">
                        <Badge variant="success" className="self-start mb-4">
                          Featured
                        </Badge>
                        <h2 className="text-xl font-semibold text-text-primary mb-2 group-hover:text-accent-purple transition-colors">
                          {comparison.title}
                        </h2>
                        <p className="text-text-secondary text-sm mb-4 flex-1">
                          {comparison.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-accent-green">
                            <CheckCircle className="w-4 h-4" />
                            {comparison.verdict}
                          </div>
                          <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-accent-purple transition-colors" />
                        </div>
                      </Card>
                    </Link>
                  </FadeIn>
                ))}
              </div>
            )}

            {/* Other Comparisons */}
            {otherComparisons.length > 0 && (
              <div className="grid md:grid-cols-3 gap-6">
                {otherComparisons.map((comparison, index) => (
                  <FadeIn key={comparison.slug} delay={(featuredComparisons.length + index) * 0.05}>
                    <Link href={comparison.url} className="block group h-full">
                      <Card className="p-5 h-full flex flex-col hover:border-accent-purple/40 transition-colors">
                        <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-accent-purple transition-colors">
                          {comparison.title}
                        </h3>
                        <p className="text-text-secondary text-sm mb-4 flex-1">
                          {comparison.description}
                        </p>
                        <div className="flex items-center gap-1 text-accent-purple text-sm font-medium group-hover:gap-2 transition-all">
                          Compare
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </Card>
                    </Link>
                  </FadeIn>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Why Cluttered is Different */}
        <FadeIn delay={0.3}>
          <Card className="mt-12 p-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-6 text-center">
              Why Developers Choose Cluttered
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-accent-purple/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="font-semibold text-text-primary mb-2">Developer-Focused</h3>
                <p className="text-sm text-text-secondary">
                  Built specifically for development artifacts. Knows node_modules from normal folders.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-accent-green/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="font-semibold text-text-primary mb-2">Git-Aware</h3>
                <p className="text-sm text-text-secondary">
                  Never suggests cleaning projects with uncommitted changes. Your work is protected.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-accent-pink/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="font-semibold text-text-primary mb-2">Satisfying UX</h3>
                <p className="text-sm text-text-secondary">
                  Cleaning disk space should feel good. Our UI makes it enjoyable, not scary.
                </p>
              </div>
            </div>
          </Card>
        </FadeIn>
      </Container>
    </Section>
  )
}
