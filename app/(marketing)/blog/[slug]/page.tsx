import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { allPosts } from 'contentlayer/generated'
import { Section, Badge, FadeIn } from '@/components/ui'
import { MDXContent } from '@/components/mdx/MDXContent'
import { TableOfContents } from '@/components/blog/TableOfContents'
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react'
import { format } from 'date-fns'
import { siteConfig } from '@/lib/constants'
import { extractTOC } from '@/lib/toc'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return allPosts
    .filter((post) => !post.draft)
    .map((post) => ({
      slug: post.slug,
    }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = allPosts.find((p) => p.slug === slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const ogImage = `/og?title=${encodeURIComponent(post.title)}&description=${encodeURIComponent(post.description)}&type=blog`

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: post.url,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.updated || post.date,
      authors: [post.author],
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = allPosts.find((p) => p.slug === slug)

  if (!post || post.draft) {
    notFound()
  }

  const canonicalUrl = new URL(post.url, siteConfig.url).toString()
  const ogImage = `/og?title=${encodeURIComponent(post.title)}&description=${encodeURIComponent(post.description)}&type=blog`
  const ogImageUrl = new URL(ogImage, siteConfig.url).toString()
  const publisherLogoUrl = new URL(siteConfig.ogImage, siteConfig.url).toString()

  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    author: {
      '@type': 'Organization',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        '@type': 'ImageObject',
        url: publisherLogoUrl,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    image: [ogImageUrl],
    keywords: (post.keywords || []).join(', '),
    articleSection: post.category,
    inLanguage: 'en',
  }

  const howToSteps = (post.howToSteps || []).filter(Boolean)
  const howToJsonLd =
    howToSteps.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: post.title,
          description: post.description,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': canonicalUrl,
          },
          step: howToSteps.map((text, idx) => ({
            '@type': 'HowToStep',
            name: `Step ${idx + 1}`,
            text,
          })),
        }
      : null

  const jsonLdGraph = {
    '@context': 'https://schema.org',
    '@graph': [blogPostingJsonLd, ...(howToJsonLd ? [howToJsonLd] : [])],
  }

  const toc = extractTOC(post.body.raw)

  return (
    <Section size="lg" first>
      {/* JSON-LD structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center gap-12">
          {/* Main content */}
          <div className="w-full max-w-3xl">
            <FadeIn>
              {/* Back link */}
              <Link href="/blog" className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors mb-8">
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>

              {/* Header */}
              <header className="mb-8">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge variant="secondary">{post.category}</Badge>
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="info" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">{post.title}</h1>

                <p className="text-xl text-text-secondary mb-6">{post.description}</p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted border-t border-white/10 pt-6">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {format(new Date(post.date), 'MMMM d, yyyy')}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {post.readingTime.text}
                  </div>
                </div>
              </header>

              {/* Content */}
              <article>
                <MDXContent code={post.body.code} className="prose prose-lg prose-invert max-w-none" />
              </article>

              {/* Footer */}
              <footer className="mt-12 pt-8 border-t border-white/10">
                <Link href="/blog" className="inline-flex items-center gap-2 text-accent-purple hover:text-accent-pink transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                  More articles
                </Link>
              </footer>
            </FadeIn>
          </div>

          {/* Table of Contents sidebar - sticky within article bounds */}
          <aside className="hidden xl:block w-64 shrink-0">
            <div className="sticky top-24">
              <TableOfContents toc={toc} />
            </div>
          </aside>
        </div>
      </div>
    </Section>
  )
}
