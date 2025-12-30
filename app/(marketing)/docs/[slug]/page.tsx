import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { allDocs } from 'contentlayer/generated'
import { Section, Container, Card, FadeIn } from '@/components/ui'
import { MDXContent } from '@/components/mdx/MDXContent'
import { ArrowLeft, ArrowRight, Book } from 'lucide-react'

interface DocPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return allDocs.map((doc) => ({
    slug: doc.slug,
  }))
}

export async function generateMetadata({ params }: DocPageProps): Promise<Metadata> {
  const { slug } = await params
  const doc = allDocs.find((d) => d.slug === slug)

  if (!doc) {
    return {
      title: 'Doc Not Found',
    }
  }

  const ogImage = `/og?title=${encodeURIComponent(doc.title)}&description=${encodeURIComponent(doc.description)}&type=docs`

  return {
    title: `${doc.title} | Docs`,
    description: doc.description,
    openGraph: {
      title: `${doc.title} | Docs`,
      description: doc.description,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      images: [ogImage],
    },
  }
}

function getAdjacentDocs(currentSlug: string) {
  const sortedDocs = [...allDocs].sort((a, b) => {
    // Sort by section first, then by order
    if (a.section !== b.section) {
      return a.section.localeCompare(b.section)
    }
    return a.order - b.order
  })

  const currentIndex = sortedDocs.findIndex((d) => d.slug === currentSlug)

  return {
    prev: currentIndex > 0 ? sortedDocs[currentIndex - 1] : null,
    next: currentIndex < sortedDocs.length - 1 ? sortedDocs[currentIndex + 1] : null,
  }
}

export default async function DocPage({ params }: DocPageProps) {
  const { slug } = await params
  const doc = allDocs.find((d) => d.slug === slug)

  if (!doc) {
    notFound()
  }

  const { prev, next } = getAdjacentDocs(slug)

  return (
    <Section size="lg" first>
      <Container className="max-w-4xl">
        <FadeIn>
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-text-muted mb-8">
            <Link href="/docs" className="hover:text-text-secondary transition-colors">
              Docs
            </Link>
            <span>/</span>
            <span className="text-text-secondary">{doc.section}</span>
            <span>/</span>
            <span className="text-text-primary">{doc.title}</span>
          </div>

          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent-purple/20 flex items-center justify-center text-accent-purple">
                <Book className="w-5 h-5" />
              </div>
              <span className="text-sm text-text-muted">{doc.section}</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">{doc.title}</h1>

            <p className="text-xl text-text-secondary">{doc.description}</p>
          </header>

          {/* Content */}
          <article className="mb-12">
            <MDXContent code={doc.body.code} className="prose prose-lg prose-invert max-w-none" />
          </article>

          {/* Navigation */}
          <nav className="grid md:grid-cols-2 gap-4 pt-8 border-t border-white/10">
            {prev ? (
              <Link href={prev.url} className="group">
                <Card className="p-4 hover:border-accent-purple/40 transition-colors">
                  <div className="flex items-center gap-2 text-sm text-text-muted mb-1">
                    <ArrowLeft className="w-4 h-4" />
                    Previous
                  </div>
                  <p className="font-medium text-text-primary group-hover:text-accent-purple transition-colors">{prev.title}</p>
                </Card>
              </Link>
            ) : (
              <div />
            )}

            {next ? (
              <Link href={next.url} className="group md:text-right">
                <Card className="p-4 hover:border-accent-purple/40 transition-colors">
                  <div className="flex items-center justify-end gap-2 text-sm text-text-muted mb-1">
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  <p className="font-medium text-text-primary group-hover:text-accent-purple transition-colors">{next.title}</p>
                </Card>
              </Link>
            ) : (
              <div />
            )}
          </nav>
        </FadeIn>
      </Container>
    </Section>
  )
}
