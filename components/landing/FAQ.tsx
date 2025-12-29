'use client'

import { Section, Container, SectionHeader, FadeIn } from '@/components/ui'
import { FAQ as FAQComponent } from '@/components/mdx/FAQ'
import { faqs } from '@/lib/faqs'

export function FAQSection() {
  return (
    <Section>
      <Container className="max-w-3xl">
        <SectionHeader title="Frequently Asked Questions" description="Everything you need to know about Cluttered" />

        <FadeIn>
          <FAQComponent items={faqs} />
        </FadeIn>
      </Container>
    </Section>
  )
}
