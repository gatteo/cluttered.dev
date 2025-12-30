'use client'

import { Scan, Shield, Zap, Trash2, Eye, Clock, Bell, Infinity } from 'lucide-react'
import { Section, Container, SectionHeader, Card, FadeIn, BackgroundDots } from '@/components/ui'

const features = [
  {
    icon: Scan,
    title: 'Smart Scanning',
    description: 'Parallel filesystem traversal that finds all your projects in seconds, not minutes.',
    badge: 'Core',
  },
  {
    icon: Shield,
    title: 'Safety First',
    description: 'Never touches uncommitted git changes. All deletions go to Trash first.',
    badge: 'Core',
  },
  {
    icon: Eye,
    title: 'Project Intelligence',
    description: 'Identifies active vs dormant projects using git history and file modification times.',
    badge: 'Core',
  },
  {
    icon: Trash2,
    title: 'Reversible Cleanup',
    description: 'Deleted something by mistake? Everything is in your Trash for 30 days.',
    badge: 'Core',
  },
  {
    icon: Infinity,
    title: 'Unlimited Cleanup',
    description: 'No weekly limits. Clean as much as you want, whenever you want.',
    badge: 'Pro',
  },
  {
    icon: Clock,
    title: 'Scheduled Scans',
    description: 'Set up automatic scans to run daily, weekly, or monthly.',
    badge: 'Pro',
  },
  {
    icon: Zap,
    title: 'Auto-Clean Dormant',
    description: 'Automatically clean projects untouched for 90+ days. Set it and forget it.',
    badge: 'Pro',
  },
  {
    icon: Bell,
    title: 'Smart Notifications',
    description: 'Get notified when cleanable space exceeds your threshold.',
    badge: 'Pro',
  },
]

export function Features() {
  return (
    <Section className="relative bg-surface-primary overflow-hidden">
      <BackgroundDots size={1} spacing={32} />
      <Container>
        <SectionHeader title="Built for Developer Workflows" description="Every feature designed with developer needs in mind" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FadeIn key={feature.title} delay={index * 0.05}>
              <Card className="h-full relative">
                {feature.badge === 'Pro' && (
                  <span className="absolute top-4 right-4 text-xs px-2 py-0.5 rounded-full bg-accent-purple/20 text-accent-purple">Pro</span>
                )}
                <feature.icon className="w-8 h-8 text-accent-purple mb-4" />
                <h3 className="text-lg font-semibold text-text-primary mb-2">{feature.title}</h3>
                <p className="text-sm text-text-secondary">{feature.description}</p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  )
}
