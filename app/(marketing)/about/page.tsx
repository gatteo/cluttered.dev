import { Metadata } from 'next'
import { Github, Twitter, Mail } from 'lucide-react'
import { Section, Container, FadeIn } from '@/components/ui'
import { siteConfig } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Cluttered, the team behind it, and our mission to help developers reclaim disk space.',
}

export default function AboutPage() {
  return (
    <>
      <Section size="lg" first>
        <Container className="max-w-3xl">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-8">
              About Cluttered
            </h1>

            <div className="space-y-8">
              <p className="text-xl text-text-secondary">
                Cluttered was born from a simple frustration: developers constantly
                running out of disk space, with no good tool to help.
              </p>

              <div>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  The Problem
                </h2>
                <p className="text-text-secondary mb-4">
                  As developers, we accumulate massive amounts of build artifacts,
                  dependencies, and caches. A single Rust project can have a 10GB target
                  directory. A handful of React projects easily adds up to 20GB in
                  node_modules. Add Xcode&apos;s DerivedData, Docker images, and you&apos;re
                  looking at 50-100GB of space that&apos;s just... sitting there.
                </p>
                <p className="text-text-secondary">
                  Generic cleaning tools don&apos;t understand developer workflows. They either
                  miss these artifacts entirely or suggest deleting things that could
                  break your projects.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  Our Solution
                </h2>
                <p className="text-text-secondary mb-4">
                  Cluttered is built by developers, for developers. We understand that
                  you need to:
                </p>
                <ul className="list-disc list-inside text-text-secondary space-y-2 mb-4">
                  <li>Know which projects are safe to clean</li>
                  <li>Never accidentally delete uncommitted work</li>
                  <li>Easily recover if something goes wrong</li>
                  <li>Actually enjoy the cleanup process</li>
                </ul>
                <p className="text-text-secondary">
                  That&apos;s why we built Cluttered with safety as the top priority, wrapped
                  in a satisfying user experience that makes disk cleaning feel good.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  Open Source Core
                </h2>
                <p className="text-text-secondary">
                  Cluttered&apos;s core is open source under the MIT license. We believe in
                  transparency, especially when it comes to software that manages your
                  files. You can inspect exactly what we&apos;re doing at any time.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-text-primary mb-4">
                  Get in Touch
                </h2>
                <div className="flex flex-wrap gap-6 mt-4">
                  <a
                    href={siteConfig.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
                  >
                    <Github className="w-5 h-5" />
                    GitHub
                  </a>
                  <a
                    href={`https://twitter.com/${siteConfig.twitter.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                    Twitter
                  </a>
                  <a
                    href="mailto:support@cluttered.dev"
                    className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    Email
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>
    </>
  )
}
