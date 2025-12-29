'use client'

import Link from 'next/link'
import { Download, ArrowRight } from 'lucide-react'
import { Section, Container, Button, BackgroundGrid, BackgroundGradientBlur, FadeIn } from '@/components/ui'

export function CTA() {
  return (
    <Section size="lg" className="relative overflow-hidden">
      <BackgroundGrid size={70} opacity="light" maskPosition="center" />
      <BackgroundGradientBlur variant="mixed" position="center" />

      <Container className="relative text-center">
        <FadeIn>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-text-primary mb-6 tracking-tight">
            Ready to Reclaim Your Disk Space?
          </h2>

          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
            Join thousands of developers who have recovered gigabytes of wasted space.
            Download Cluttered for free and see what you can clean.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/download">
              <Button size="lg">
                <Download className="w-5 h-5 mr-2" />
                Download for Mac - It&apos;s Free
              </Button>
            </Link>
            <Link href="/features">
              <Button variant="ghost" size="lg">
                Learn More
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>

          <p className="mt-6 text-sm text-text-muted">
            macOS 12+ required - No credit card needed
          </p>
        </FadeIn>
      </Container>
    </Section>
  )
}
