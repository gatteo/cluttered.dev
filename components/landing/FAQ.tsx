'use client'

import { Section, Container, SectionHeader, FadeIn } from '@/components/ui'
import { FAQ as FAQComponent } from '@/components/mdx/FAQ'

const faqs = [
  {
    question: 'Is Cluttered safe to use?',
    answer:
      'Yes! Cluttered never deletes active projects with uncommitted git changes. All deletions go to your system Trash first, so you can always recover files for up to 30 days.',
  },
  {
    question: 'Will cleaning node_modules break my projects?',
    answer: 'No. node_modules is fully regenerable by running `npm install`. Your package.json and lock files are never touched.',
  },
  {
    question: 'How is this different from CleanMyMac?',
    answer:
      'Cluttered is built specifically for developers. It understands project structures, respects git history, and knows which build artifacts are safe to delete across 12+ development ecosystems.',
  },
  {
    question: 'Does it work on Windows?',
    answer: 'Currently Cluttered is macOS only. Windows support is planned for a future release.',
  },
  {
    question: 'How much space can I expect to recover?',
    answer:
      'Most developers recover 20-100GB on their first scan. The average is about 47GB. It depends on how many projects you have and how long since your last cleanup.',
  },
  {
    question: 'Is there a trial for Pro?',
    answer: 'Yes! Pro features come with a 14-day free trial. No credit card required.',
  },
]

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
