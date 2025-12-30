import { Metadata } from 'next'
import { Section, Container, FadeIn } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Refund Policy',
  description: 'Our 30-day money-back guarantee for Cluttered Pro.',
}

export default function RefundPage() {
  return (
    <Section size="lg" first>
      <Container className="max-w-3xl">
        <FadeIn>
          <h1 className="text-4xl font-bold text-text-primary mb-4">Refund Policy</h1>
          <p className="text-text-muted mb-8">Last updated: December 2025</p>

          <div className="prose prose-lg prose-invert max-w-none">
            <h2>30-Day Money-Back Guarantee</h2>
            <p>
              We want you to be completely satisfied with Cluttered Pro. If for any reason you&apos;re not happy with your purchase,
              we offer a full refund within 30 days of purchase — no questions asked.
            </p>

            <h2>How to Request a Refund</h2>
            <p>To request a refund, simply email us at:</p>
            <p>
              <a href="mailto:support@cluttered.dev" className="text-accent-purple">
                support@cluttered.dev
              </a>
            </p>
            <p>Please include:</p>
            <ul>
              <li>Your order number or the email address used for purchase</li>
              <li>The reason for your refund request (optional, but helps us improve)</li>
            </ul>

            <h2>Refund Processing</h2>
            <p>
              Refunds are typically processed within 5-7 business days. The refund will be credited to the original payment method
              used for the purchase.
            </p>

            <h2>What Happens After a Refund</h2>
            <p>Once your refund is processed:</p>
            <ul>
              <li>Your Pro license will be deactivated</li>
              <li>You can continue using the free version of Cluttered</li>
              <li>Your local data and settings remain on your device</li>
            </ul>

            <h2>Exceptions</h2>
            <p>
              Refund requests made more than 30 days after purchase are handled on a case-by-case basis.
              We&apos;re reasonable people — if you have a genuine issue, reach out and we&apos;ll work something out.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about refunds? Contact us at{' '}
              <a href="mailto:support@cluttered.dev" className="text-accent-purple">
                support@cluttered.dev
              </a>
            </p>
          </div>
        </FadeIn>
      </Container>
    </Section>
  )
}
