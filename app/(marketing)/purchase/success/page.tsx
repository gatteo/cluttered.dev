import { Metadata } from 'next'
import { Section, Container, FadeIn, Button, CopyButton } from '@/components/ui'
import { CheckCircle, Download } from 'lucide-react'
import { getSessionDetails } from '@/app/actions/stripe'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Purchase Successful',
  description: 'Thank you for purchasing Cluttered Pro!',
}

interface Props {
  searchParams: Promise<{ session_id?: string }>
}

export default async function PurchaseSuccessPage({ searchParams }: Props) {
  const { session_id } = await searchParams

  if (!session_id) {
    return (
      <Section size="lg" first>
        <Container className="max-w-2xl text-center">
          <FadeIn>
            <h1 className="text-3xl font-bold text-text-primary mb-4">Invalid Session</h1>
            <p className="text-text-secondary mb-8">No session ID provided. Please contact support if you believe this is an error.</p>
            <Link href="/pricing">
              <Button>Back to Pricing</Button>
            </Link>
          </FadeIn>
        </Container>
      </Section>
    )
  }

  const { licenseKey, email, error } = await getSessionDetails(session_id)

  if (error || !licenseKey) {
    return (
      <Section size="lg" first>
        <Container className="max-w-2xl text-center">
          <FadeIn>
            <h1 className="text-3xl font-bold text-text-primary mb-4">Processing Your Order</h1>
            <p className="text-text-secondary mb-4">
              Your payment is being processed. Your license key will be sent to <strong>{email}</strong> shortly.
            </p>
            <p className="text-text-muted text-sm mb-8">
              If you don&apos;t receive it within a few minutes, please contact support@cluttered.dev
            </p>
            <Link href="/download">
              <Button>Download Cluttered</Button>
            </Link>
          </FadeIn>
        </Container>
      </Section>
    )
  }

  return (
    <Section size="lg" first>
      <Container className="max-w-2xl text-center">
        <FadeIn>
          <div className="inline-flex p-4 rounded-full bg-accent-green/20 mb-6">
            <CheckCircle className="w-12 h-12 text-accent-green" />
          </div>

          <h1 className="text-3xl font-bold text-text-primary mb-4">Thank You for Your Purchase!</h1>
          <p className="text-text-secondary mb-8">
            Welcome to Cluttered Pro. Your license key is below — save it somewhere safe.
          </p>

          <div className="bg-surface-elevated rounded-xl p-6 mb-8">
            <p className="text-text-muted text-sm mb-2">Your License Key</p>
            <div className="flex items-center justify-center gap-3">
              <code className="text-2xl font-mono text-accent-purple tracking-wider">{licenseKey}</code>
              <CopyButton text={licenseKey} />
            </div>
            {email && <p className="text-text-muted text-sm mt-4">A copy has been sent to {email}</p>}
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-text-primary">Next Steps</h2>
            <ol className="text-left text-text-secondary space-y-2 max-w-md mx-auto">
              <li className="flex gap-3">
                <span className="text-accent-purple font-bold">1.</span>
                Download and install Cluttered if you haven&apos;t already
              </li>
              <li className="flex gap-3">
                <span className="text-accent-purple font-bold">2.</span>
                Open the app and go to Settings → License
              </li>
              <li className="flex gap-3">
                <span className="text-accent-purple font-bold">3.</span>
                Enter your license key to unlock Pro features
              </li>
            </ol>
          </div>

          <div className="mt-8">
            <Link href="/download">
              <Button size="lg">
                <Download className="w-4 h-4 mr-2" />
                Download Cluttered
              </Button>
            </Link>
          </div>
        </FadeIn>
      </Container>
    </Section>
  )
}
