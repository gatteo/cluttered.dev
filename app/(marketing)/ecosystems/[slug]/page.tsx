import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { allEcosystems } from 'contentlayer/generated'
import { Section, Container, Card, Badge, Button, FadeIn } from '@/components/ui'
import { MDXContent } from '@/components/mdx/MDXContent'
import { ArrowLeft, HardDrive, FileSearch, Download } from 'lucide-react'

interface EcosystemPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return allEcosystems.map((ecosystem) => ({
    slug: ecosystem.slug,
  }))
}

export async function generateMetadata({ params }: EcosystemPageProps): Promise<Metadata> {
  const { slug } = await params
  const ecosystem = allEcosystems.find((e) => e.slug === slug)

  if (!ecosystem) {
    return {
      title: 'Ecosystem Not Found',
    }
  }

  const ogImage = `/og?title=${encodeURIComponent(`${ecosystem.title} Cleanup`)}&description=${encodeURIComponent(ecosystem.description)}`

  return {
    title: `${ecosystem.title} Cleanup`,
    description: ecosystem.description,
    openGraph: {
      title: `${ecosystem.title} Cleanup`,
      description: ecosystem.description,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      images: [ogImage],
    },
  }
}

export default async function EcosystemPage({ params }: EcosystemPageProps) {
  const { slug } = await params
  const ecosystem = allEcosystems.find((e) => e.slug === slug)

  if (!ecosystem) {
    notFound()
  }

  return (
    <Section size="lg" first>
      <Container className="max-w-4xl">
        <FadeIn>
          {/* Back link */}
          <Link
            href="/ecosystems"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            All Ecosystems
          </Link>

          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                style={{ backgroundColor: `${ecosystem.color}20` }}
              >
                {ecosystem.icon}
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-text-primary">
                  {ecosystem.title}
                </h1>
                <p className="text-text-secondary">
                  {ecosystem.description}
                </p>
              </div>
            </div>
          </header>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <HardDrive className="w-5 h-5 text-accent-green" />
                <div>
                  <p className="text-sm text-text-muted">Avg. Space Saved</p>
                  <p className="text-lg font-semibold text-text-primary">
                    {ecosystem.averageSize}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3">
                <FileSearch className="w-5 h-5 text-accent-purple" />
                <div>
                  <p className="text-sm text-text-muted">Detection Files</p>
                  <p className="text-lg font-semibold text-text-primary">
                    {ecosystem.detectionFiles.length} files
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3">
                <Download className="w-5 h-5 text-accent-blue" />
                <div>
                  <p className="text-sm text-text-muted">Artifact Types</p>
                  <p className="text-lg font-semibold text-text-primary">
                    {ecosystem.artifacts.length} types
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Artifacts */}
          <Card className="p-6 mb-8">
            <h2 className="text-xl font-semibold text-text-primary mb-4">
              Cleanable Artifacts
            </h2>
            <p className="text-text-secondary mb-4">
              Cluttered can safely clean these {ecosystem.title} build artifacts:
            </p>
            <div className="flex flex-wrap gap-2">
              {ecosystem.artifacts.map((artifact) => (
                <Badge key={artifact} variant="secondary">
                  {artifact}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Detection */}
          <Card className="p-6 mb-8">
            <h2 className="text-xl font-semibold text-text-primary mb-4">
              Project Detection
            </h2>
            <p className="text-text-secondary mb-4">
              Cluttered identifies {ecosystem.title} projects by looking for these files:
            </p>
            <div className="flex flex-wrap gap-2">
              {ecosystem.detectionFiles.map((file) => (
                <code
                  key={file}
                  className="px-2 py-1 rounded bg-white/10 text-accent-pink text-sm font-mono"
                >
                  {file}
                </code>
              ))}
            </div>
          </Card>

          {/* Content */}
          <article className="mb-12">
            <MDXContent
              code={ecosystem.body.code}
              className="prose prose-lg prose-invert max-w-none"
            />
          </article>

          {/* CTA */}
          <Card className="p-8 text-center bg-gradient-to-r from-accent-purple/10 to-accent-pink/10 border-accent-purple/20">
            <h2 className="text-2xl font-bold text-text-primary mb-3">
              Ready to clean your {ecosystem.title} projects?
            </h2>
            <p className="text-text-secondary mb-6">
              Download Cluttered and reclaim your disk space in minutes.
            </p>
            <Link href="/download">
              <Button size="lg">
                Download Free
              </Button>
            </Link>
          </Card>
        </FadeIn>
      </Container>
    </Section>
  )
}
