import { Metadata } from 'next'
import { allChangelogs } from 'contentlayer/generated'
import { Section, Container, Card, Badge, FadeIn } from '@/components/ui'
import { MDXContent } from '@/components/mdx/MDXContent'
import { format } from 'date-fns'

export const metadata: Metadata = {
  title: 'Changelog',
  description: "See what's new in Cluttered. Release notes and version history.",
}

export default function ChangelogPage() {
  const changelogs = allChangelogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <Section size="lg" first>
      <Container className="max-w-3xl">
        <FadeIn>
          <h1 className="text-4xl font-bold text-text-primary mb-4">Changelog</h1>
          <p className="text-text-secondary mb-12">All notable changes to Cluttered are documented here.</p>
        </FadeIn>

        <div className="space-y-8">
          {changelogs.length === 0 ? (
            <FadeIn>
              <Card>
                <p className="text-text-secondary text-center py-8">No changelog entries yet. Check back soon!</p>
              </Card>
            </FadeIn>
          ) : (
            changelogs.map((release, index) => (
              <FadeIn key={release.version} delay={index * 0.05}>
                <Card>
                  <div className="flex items-center gap-4 mb-4">
                    <Badge variant="info">{release.version}</Badge>
                    <span className="text-sm text-text-muted">{format(new Date(release.date), 'MMMM d, yyyy')}</span>
                  </div>
                  <h2 className="text-xl font-semibold text-text-primary mb-4">{release.title}</h2>
                  <MDXContent code={release.body.code} className="prose prose-sm prose-invert max-w-none" />
                </Card>
              </FadeIn>
            ))
          )}
        </div>
      </Container>
    </Section>
  )
}
