import { Metadata } from 'next'
import { Section, Container, FadeIn } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions for using Cluttered.',
}

export default function TermsPage() {
  return (
    <Section size="lg" first>
      <Container className="max-w-3xl">
        <FadeIn>
          <h1 className="text-4xl font-bold text-text-primary mb-4">
            Terms of Service
          </h1>
          <p className="text-text-muted mb-8">
            Last updated: December 2024
          </p>

          <div className="prose prose-lg prose-invert max-w-none">
            <h2>Agreement to Terms</h2>
            <p>
              By downloading or using Cluttered, you agree to these Terms of Service.
              If you don&apos;t agree, please don&apos;t use the app.
            </p>

            <h2>Use License</h2>
            <h3>Free Version</h3>
            <p>
              Cluttered Free is provided for personal and commercial use. You may:
            </p>
            <ul>
              <li>Use the app on any number of personal devices</li>
              <li>Use it for personal projects and work</li>
              <li>Share it with others (by directing them to our website)</li>
            </ul>

            <h3>Pro Version</h3>
            <p>
              Cluttered Pro requires a valid license. Each license allows use on up
              to 3 devices owned by the license holder.
            </p>

            <h2>Prohibited Uses</h2>
            <p>You may not:</p>
            <ul>
              <li>Reverse engineer, decompile, or disassemble the app</li>
              <li>Redistribute the app or share license keys</li>
              <li>Use the app for any illegal purpose</li>
              <li>Remove or alter any proprietary notices</li>
            </ul>

            <h2>Disclaimer of Warranties</h2>
            <p>
              Cluttered is provided &quot;as is&quot; without warranty of any kind. While we
              design the app to be safe and move files to Trash before deletion, we
              cannot guarantee against data loss in all circumstances.
            </p>
            <p>
              <strong>Important:</strong> Always maintain backups of important data.
              Cluttered is designed to delete files, and while we implement safety
              measures, you use the app at your own risk.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, we are not liable for any
              indirect, incidental, special, consequential, or punitive damages,
              including loss of data or profits.
            </p>
            <p>
              Our total liability for any claims under these terms shall not exceed
              the amount you paid for the app in the past 12 months.
            </p>

            <h2>Refund Policy</h2>
            <p>
              Cluttered Pro comes with a 30-day money-back guarantee. If you&apos;re not
              satisfied, contact us for a full refund within 30 days of purchase.
            </p>

            <h2>Updates and Changes</h2>
            <p>
              We may update the app and these terms from time to time. Continued use
              after changes constitutes acceptance of the new terms.
            </p>
            <p>
              Pro licenses include updates for the major version purchased (e.g., 1.x).
              Major version upgrades (e.g., 2.0) may require a new license or upgrade
              fee.
            </p>

            <h2>Termination</h2>
            <p>
              We may terminate or suspend your access to Cluttered if you violate
              these terms. Upon termination, you must delete all copies of the app.
            </p>

            <h2>Governing Law</h2>
            <p>
              These terms are governed by the laws of [Jurisdiction]. Any disputes
              shall be resolved in the courts of [Jurisdiction].
            </p>

            <h2>Contact</h2>
            <p>
              Questions about these terms? Contact us at{' '}
              <a href="mailto:legal@cluttered.dev" className="text-accent-purple">
                legal@cluttered.dev
              </a>
            </p>
          </div>
        </FadeIn>
      </Container>
    </Section>
  )
}
