'use client'

import Link from 'next/link'
import { Section, Container, SectionHeader, EcosystemCard, FadeIn, BackgroundGrid } from '@/components/ui'
import { ecosystems } from '@/lib/constants'

export function EcosystemShowcase() {
  // Show first 6 ecosystems
  const featuredEcosystems = ecosystems.slice(0, 6)

  return (
    <Section className="relative overflow-hidden">
      <BackgroundGrid size={80} opacity="subtle" maskPosition="bottom" />
      <Container>
        <SectionHeader
          title="One Tool, All Your Ecosystems"
          description="Cluttered understands 12+ development ecosystems and cleans them all"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredEcosystems.map((ecosystem, index) => (
            <FadeIn key={ecosystem.id} delay={index * 0.1}>
              <EcosystemCard
                id={ecosystem.id}
                name={ecosystem.name}
                icon={ecosystem.icon}
                color={ecosystem.color}
              />
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4}>
          <p className="text-center text-text-secondary mt-8">
            Plus Python, Ruby, PHP, Java, Elixir, .NET, and more...{' '}
            <Link href="/ecosystems" className="text-accent-purple hover:underline">
              See all ecosystems
            </Link>
          </p>
        </FadeIn>
      </Container>
    </Section>
  )
}
