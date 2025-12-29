import { Metadata } from 'next'
import { Section, Container, FadeIn } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Cluttered handles your data and protects your privacy.',
}

export default function PrivacyPage() {
  return (
    <Section size="lg" first>
      <Container className="max-w-3xl">
        <FadeIn>
          <h1 className="text-4xl font-bold text-text-primary mb-4">Privacy Policy</h1>
          <p className="text-text-muted mb-8">Last updated: December 2025</p>

          <div className="prose prose-lg prose-invert max-w-none">
            <h2>Overview</h2>
            <p>
              Cluttered is designed with privacy as a core principle. We believe your development environment is personal, and we&apos;ve built our
              app to respect that.
            </p>

            <h2>Data We Collect</h2>
            <h3>What Stays on Your Device</h3>
            <ul>
              <li>All file scanning happens locally on your Mac</li>
              <li>Project paths and names are never transmitted</li>
              <li>Your code and files are never accessed</li>
              <li>Deletion history is stored locally only</li>
            </ul>

            <h3>What We May Collect (with permission)</h3>
            <ul>
              <li>
                <strong>Anonymous usage analytics:</strong> Aggregate data like &quot;how many times the scan button was clicked&quot; helps us
                improve the app. This is opt-in and can be disabled.
              </li>
              <li>
                <strong>Crash reports:</strong> When the app crashes, you may choose to send a report. This contains technical information but no
                personal data or file paths.
              </li>
              <li>
                <strong>License validation:</strong> For Pro users, we verify your license. This sends only your license key, not any file or project
                information.
              </li>
            </ul>

            <h2>Data We Never Collect</h2>
            <ul>
              <li>Contents of your files</li>
              <li>Names of your projects</li>
              <li>Your code or source files</li>
              <li>Git history or commit messages</li>
              <li>Any personally identifiable information</li>
            </ul>

            <h2>Third-Party Services</h2>
            <p>Cluttered may use the following services:</p>
            <ul>
              <li>
                <strong>Analytics (optional):</strong> We use privacy-focused analytics that don&apos;t track individual users.
              </li>
              <li>
                <strong>Payment processing:</strong> For Pro purchases, we use Stripe or Paddle. We never see or store your payment details.
              </li>
            </ul>

            <h2>Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Opt out of all analytics</li>
              <li>Request deletion of any data we hold</li>
              <li>Export your settings and preferences</li>
              <li>Use Cluttered completely offline</li>
            </ul>

            <h2>Changes to This Policy</h2>
            <p>
              We&apos;ll notify you of significant changes to this policy through the app or our website. Continued use after changes constitutes
              acceptance.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about privacy? Contact us at{' '}
              <a href="mailto:privacy@cluttered.dev" className="text-accent-purple">
                privacy@cluttered.dev
              </a>
            </p>
          </div>
        </FadeIn>
      </Container>
    </Section>
  )
}
