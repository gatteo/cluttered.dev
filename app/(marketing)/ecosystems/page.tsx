import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { allEcosystems } from 'contentlayer/generated'
import { Section, Container, Card, Badge, FadeIn } from '@/components/ui'
import { ecosystems as ecosystemData } from '@/lib/constants'
import { HardDrive, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Supported Ecosystems',
  description: 'Cluttered supports 12+ development ecosystems. See which build artifacts and caches we can clean for each.',
}

// Map ecosystem slugs to icon paths
function getEcosystemIcon(slug: string): string {
  const iconMap: Record<string, string> = {
    'nodejs': '/icons/ecosystems/nodejs.png',
    'rust': '/icons/ecosystems/rust.png',
    'xcode': '/icons/ecosystems/xcode.png',
    'docker': '/icons/ecosystems/docker.png',
    'python': '/icons/ecosystems/python.png',
    'go': '/icons/ecosystems/go.png',
    'android': '/icons/ecosystems/android.png',
    'ruby': '/icons/ecosystems/ruby.png',
    'php': '/icons/ecosystems/php.png',
    'java': '/icons/ecosystems/java.png',
    'elixir': '/icons/ecosystems/elixir.png',
    'dotnet': '/icons/ecosystems/dotnet.png',
  }
  return iconMap[slug] || '/icons/ecosystems/nodejs.png'
}

export default function EcosystemsPage() {
  const ecosystems = allEcosystems.sort((a, b) => a.order - b.order)

  return (
    <Section size="lg" first>
      <Container>
        <FadeIn>
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              12+ Ecosystems
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
              Supported Ecosystems
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Cluttered understands your development tools and knows exactly which artifacts are safe to clean.
            </p>
          </div>
        </FadeIn>

        {ecosystems.length === 0 ? (
          <FadeIn>
            <Card className="text-center py-12">
              <p className="text-text-secondary">
                Ecosystem documentation coming soon!
              </p>
            </Card>
          </FadeIn>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ecosystems.map((ecosystem, index) => (
              <FadeIn key={ecosystem.slug} delay={index * 0.05}>
                <Link href={ecosystem.url} className="block group h-full">
                  <Card className="p-6 h-full flex flex-col hover:border-accent-purple/40 transition-colors">
                    <div className="flex items-center gap-3 mb-4">
                      <Image
                        src={getEcosystemIcon(ecosystem.slug)}
                        alt={ecosystem.title}
                        width={40}
                        height={40}
                        className="w-10 h-10"
                      />
                      <h2 className="text-xl font-semibold text-text-primary group-hover:text-accent-purple transition-colors">
                        {ecosystem.title}
                      </h2>
                    </div>

                    <p className="text-text-secondary text-sm mb-4 flex-1">
                      {ecosystem.description}
                    </p>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <HardDrive className="w-4 h-4 text-text-muted" />
                        <span className="text-text-muted">Avg. savings:</span>
                        <span className="text-accent-green font-medium">
                          {ecosystem.averageSize}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {ecosystem.artifacts.slice(0, 3).map((artifact) => (
                          <Badge key={artifact} variant="default" className="text-xs">
                            {artifact}
                          </Badge>
                        ))}
                        {ecosystem.artifacts.length > 3 && (
                          <Badge variant="default" className="text-xs">
                            +{ecosystem.artifacts.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-accent-purple text-sm font-medium group-hover:gap-2 transition-all">
                      Learn more
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </Card>
                </Link>
              </FadeIn>
            ))}
          </div>
        )}

        {/* All Ecosystems Overview */}
        <FadeIn delay={0.3}>
          <Card className="mt-12 p-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-6 text-center">
              All Supported Ecosystems
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {ecosystemData.map((eco) => (
                <div
                  key={eco.name}
                  className="flex items-center gap-2 p-3 rounded-lg bg-white/5"
                >
                  <Image
                    src={eco.icon}
                    alt={eco.name}
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                  <span className="text-sm text-text-secondary">{eco.name}</span>
                </div>
              ))}
            </div>
          </Card>
        </FadeIn>
      </Container>
    </Section>
  )
}
