import { Metadata } from 'next'
import { Pricing } from '@/components/landing/Pricing'
import { FAQSection } from '@/components/landing/FAQ'
import { Section, Container, FadeIn } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Simple, developer-friendly pricing. Start free, upgrade when you need automation features.',
}

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <Section size="lg" first>
        <Container className="text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">Simple, Transparent Pricing</h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              The free version is fully featured. Pro adds automation for developers who want to set it and forget it.
            </p>
          </FadeIn>
        </Container>
      </Section>

      <Pricing showHeader={false} />
      <FAQSection />
    </>
  )
}
