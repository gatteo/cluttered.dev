import { Metadata } from 'next'
import Link from 'next/link'
import { allPosts } from 'contentlayer/generated'
import { Section, Container, Card, Badge, FadeIn } from '@/components/ui'
import { format } from 'date-fns'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Tips, tutorials, and insights on managing disk space, developer workflows, and keeping your machine clean.',
}

export default function BlogPage() {
  const posts = allPosts
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const featuredPost = posts.find((post) => post.featured)
  const regularPosts = posts.filter((post) => !post.featured)
  const categories = [...new Set(posts.map((post) => post.category))]

  return (
    <Section size="lg" first>
      <Container>
        <FadeIn>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Blog
          </h1>
          <p className="text-xl text-text-secondary mb-8">
            Tips, tutorials, and insights for developers
          </p>

          {/* Categories */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-12">
              {categories.map((category) => (
                <Badge key={category} variant="secondary">
                  {category}
                </Badge>
              ))}
            </div>
          )}
        </FadeIn>

        {posts.length === 0 ? (
          <FadeIn>
            <Card className="text-center py-12">
              <p className="text-text-secondary">
                No posts yet. Check back soon!
              </p>
            </Card>
          </FadeIn>
        ) : (
          <div className="space-y-12">
            {/* Featured Post */}
            {featuredPost && (
              <FadeIn>
                <Link href={featuredPost.url} className="block group">
                  <Card className="p-8 hover:border-accent-purple/40 transition-colors">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge variant="success">Featured</Badge>
                      <Badge variant="secondary">{featuredPost.category}</Badge>
                      <span className="text-sm text-text-muted">
                        {format(new Date(featuredPost.date), 'MMMM d, yyyy')}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-text-primary mb-3 group-hover:text-accent-purple transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-text-secondary mb-4">
                      {featuredPost.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-text-muted">
                      <span>{featuredPost.author}</span>
                      <span>·</span>
                      <span>{featuredPost.readingTime.text}</span>
                    </div>
                  </Card>
                </Link>
              </FadeIn>
            )}

            {/* Regular Posts Grid */}
            {regularPosts.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularPosts.map((post, index) => (
                  <FadeIn key={post.slug} delay={index * 0.05}>
                    <Link href={post.url} className="block group h-full">
                      <Card className="p-6 h-full flex flex-col hover:border-accent-purple/40 transition-colors">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="secondary" className="text-xs">
                            {post.category}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-accent-purple transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-sm text-text-secondary mb-4 flex-1">
                          {post.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-text-muted">
                          <span>{format(new Date(post.date), 'MMM d, yyyy')}</span>
                          <span>{post.readingTime.text}</span>
                        </div>
                      </Card>
                    </Link>
                  </FadeIn>
                ))}
              </div>
            )}
          </div>
        )}
      </Container>
    </Section>
  )
}
