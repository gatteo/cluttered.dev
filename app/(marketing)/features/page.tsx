import { Metadata } from 'next'
import {
  Scan,
  Trash2,
  Eye,
  Bell,
  BarChart3,
  GitBranch,
  HardDrive,
  Timer,
  Lock,
} from 'lucide-react'
import { Section, Container, SectionHeader, FadeIn, Button } from '@/components/ui'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Features',
  description: 'Discover all the features that make Cluttered the best disk cleaner for developers. Smart scanning, safety features, and more.',
}

const features = [
  {
    category: 'Scanning',
    items: [
      {
        icon: Scan,
        title: 'Parallel Filesystem Traversal',
        description: 'Multi-threaded scanning that finds all your projects in seconds. Scan your entire home directory without waiting.',
      },
      {
        icon: HardDrive,
        title: '12+ Ecosystem Support',
        description: 'Node.js, Rust, Xcode, Docker, Python, Go, Android, Ruby, PHP, Java, Elixir, .NET - we understand them all.',
      },
      {
        icon: Eye,
        title: 'Project Intelligence',
        description: 'We analyze git history, file modification times, and IDE markers to identify which projects are active vs dormant.',
      },
    ],
  },
  {
    category: 'Safety',
    items: [
      {
        icon: GitBranch,
        title: 'Git-Aware Protection',
        description: 'Never touches projects with uncommitted changes. We check for staged files, modified files, and untracked important files.',
      },
      {
        icon: Trash2,
        title: 'Trash-First Deletion',
        description: 'All deletions go to your system Trash by default. Recover anything within 30 days.',
      },
      {
        icon: Lock,
        title: 'Protected Paths',
        description: 'Configure directories that should never be touched. Perfect for client projects or sensitive codebases.',
      },
    ],
  },
  {
    category: 'Automation (Pro)',
    items: [
      {
        icon: Timer,
        title: 'Scheduled Scans',
        description: 'Set up automatic scans on a schedule. Daily, weekly, or custom intervals.',
      },
      {
        icon: Bell,
        title: 'Smart Notifications',
        description: 'Get notified when significant cleanup opportunities are found. Never run out of space again.',
      },
      {
        icon: BarChart3,
        title: 'Space Analytics',
        description: 'Track your cleanup history over time. See trends and understand where your space goes.',
      },
    ],
  },
]

export default function FeaturesPage() {
  return (
    <>
      {/* Hero */}
      <Section size="lg" first>
        <Container className="text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              Built for Developer Workflows
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Every feature designed with your development needs in mind.
              Safe, fast, and satisfying.
            </p>
          </FadeIn>
        </Container>
      </Section>

      {/* Feature Categories */}
      {features.map((category, categoryIndex) => (
        <Section
          key={category.category}
          className={categoryIndex % 2 === 1 ? 'bg-surface-primary' : ''}
        >
          <Container>
            <SectionHeader title={category.category} />

            <div className="grid md:grid-cols-3 gap-8">
              {category.items.map((feature, index) => (
                <FadeIn key={feature.title} delay={index * 0.1}>
                  <div className="space-y-4">
                    <div className="inline-flex p-3 rounded-xl bg-accent-purple/10">
                      <feature.icon className="w-6 h-6 text-accent-purple" />
                    </div>
                    <h3 className="text-xl font-semibold text-text-primary">
                      {feature.title}
                    </h3>
                    <p className="text-text-secondary">
                      {feature.description}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Container>
        </Section>
      ))}

      {/* CTA */}
      <Section>
        <Container className="text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold text-text-primary mb-6">
              Ready to try it?
            </h2>
            <Link href="/download">
              <Button size="lg">Download Cluttered - It&apos;s Free</Button>
            </Link>
          </FadeIn>
        </Container>
      </Section>
    </>
  )
}
