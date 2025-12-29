'use client'

import { HardDrive, AlertTriangle, Clock } from 'lucide-react'
import { Section, Container, SectionHeader, Card, FadeIn } from '@/components/ui'

const problems = [
  {
    icon: HardDrive,
    title: 'Disk Always Full',
    description: 'node_modules, target/, DerivedData, Docker images... your disk fills up faster than you realize.',
    stat: '50-100 GB',
    statLabel: 'wasted on avg',
  },
  {
    icon: AlertTriangle,
    title: 'Manual Cleanup is Risky',
    description: "Running 'rm -rf' on the wrong folder is a real fear. One wrong move and you've lost hours of work.",
    stat: '1 in 10',
    statLabel: 'devs have deleted something important',
  },
  {
    icon: Clock,
    title: 'Finding Old Projects Takes Forever',
    description: "Which projects are safe to clean? You end up checking each one manually, wasting precious time.",
    stat: '2+ hours',
    statLabel: 'spent per cleanup session',
  },
]

export function Problem() {
  return (
    <Section className="relative">
      <Container>
        <SectionHeader
          title="Sound Familiar?"
          description="Every developer knows the pain of running out of disk space"
        />

        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((problem, index) => (
            <FadeIn key={problem.title} delay={index * 0.1}>
              <Card className="h-full">
                <problem.icon className="w-10 h-10 text-accent-red mb-4" />
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  {problem.title}
                </h3>
                <p className="text-text-secondary mb-4">
                  {problem.description}
                </p>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-2xl font-bold text-accent-amber">{problem.stat}</p>
                  <p className="text-sm text-text-muted">{problem.statLabel}</p>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  )
}
