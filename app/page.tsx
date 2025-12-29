import { Hero } from '@/components/landing/Hero'
import { Problem } from '@/components/landing/Problem'
import { EcosystemShowcase } from '@/components/landing/EcosystemShowcase'
import { Features } from '@/components/landing/Features'
import { Pricing } from '@/components/landing/Pricing'
import { FAQSection } from '@/components/landing/FAQ'
import { CTA } from '@/components/landing/CTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Problem />
      <EcosystemShowcase />
      <Features />
      <Pricing />
      <FAQSection />
      <CTA />
    </>
  )
}
