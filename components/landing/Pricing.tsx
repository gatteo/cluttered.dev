'use client'

import Link from 'next/link'
import { Check } from 'lucide-react'
import { Section, Container, SectionHeader, Card, Button, FadeIn, BackgroundGrid } from '@/components/ui'
import { pricingPlans } from '@/lib/constants'

interface PricingProps {
  showHeader?: boolean
}

export function Pricing({ showHeader = true }: PricingProps) {
  return (
    <Section id="pricing" className="relative overflow-hidden">
      <BackgroundGrid size={70} opacity="subtle" maskPosition="top" />
      <Container>
        {showHeader && <SectionHeader title="Simple, Transparent Pricing" description="Start free, upgrade when you need automation" />}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <FadeIn key={plan.name} delay={index * 0.1}>
              <Card className={`h-full flex flex-col ${plan.popular ? 'border-accent-purple ring-1 ring-accent-purple/50' : ''}`}>
                {plan.popular && (
                  <span className="inline-flex self-start px-3 py-1 mb-4 text-xs font-medium rounded-full bg-accent-purple text-white">
                    Most Popular
                  </span>
                )}

                <h3 className="text-xl font-semibold text-text-primary">{plan.name}</h3>

                <div className="mt-4 mb-2">
                  <span className="text-4xl font-bold text-text-primary">{plan.price}</span>
                  {plan.period && <span className="text-text-secondary">{plan.period}</span>}
                </div>

                <p className="text-text-secondary mb-6">{plan.description}</p>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent-green flex-shrink-0" />
                      <span className="text-sm text-text-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href={plan.href}>
                  <Button variant={plan.popular ? 'default' : 'secondary'} className="w-full">
                    {plan.cta}
                  </Button>
                </Link>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  )
}
