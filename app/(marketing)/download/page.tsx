import { Metadata } from 'next'
import Link from 'next/link'
import { Download, Apple, CheckCircle, Shield } from 'lucide-react'
import { Section, Container, Card, Button, FadeIn, Badge } from '@/components/ui'
import { siteConfig } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Download',
  description: 'Download Cluttered for macOS. The satisfying disk cleaner for developers.',
}

const systemRequirements = ['macOS 12 (Monterey) or later', 'Apple Silicon or Intel processor', 'No admin privileges required']

export default function DownloadPage() {
  return (
    <>
      <Section size="lg" first>
        <Container className="max-w-4xl">
          <div className="text-center mb-12">
            <FadeIn>
              <Badge variant="success" className="mb-4">
                Latest: v1.1.0
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">Download Cluttered</h1>
              <p className="text-xl text-text-secondary">Reclaim your disk space in minutes. Free to download.</p>
            </FadeIn>
          </div>

          {/* Download Options */}
          <FadeIn delay={0.1}>
            <Card className="p-8 mb-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                    <Apple className="w-6 h-6" />
                    <span className="text-lg font-semibold text-text-primary">macOS</span>
                  </div>
                  <p className="text-text-secondary mb-4">Download the latest version for macOS</p>

                  <Link href={siteConfig.downloadMac} target="_blank" rel="noopener noreferrer">
                    <Button size="lg">
                      <Download className="w-5 h-5 mr-2" />
                      Download for Mac
                    </Button>
                  </Link>
                </div>

                <div className="w-px h-24 bg-white/10 hidden md:block" />

                <div className="text-center md:text-left">
                  <p className="text-sm text-text-muted mb-3">System Requirements</p>
                  <ul className="space-y-2">
                    {systemRequirements.map((req) => (
                      <li key={req} className="flex items-center gap-2 text-sm text-text-secondary">
                        <CheckCircle className="w-4 h-4 text-accent-green flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </FadeIn>

          {/* Installation Instructions */}
          <FadeIn delay={0.2}>
            <Card className="p-8 mb-8">
              <h2 className="text-xl font-semibold text-text-primary mb-4">Installation</h2>
              <ol className="space-y-4 text-text-secondary">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-purple/20 text-accent-purple text-sm flex items-center justify-center">
                    1
                  </span>
                  <span>Download the DMG file</span>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-purple/20 text-accent-purple text-sm flex items-center justify-center">
                    2
                  </span>
                  <span>Open the DMG and drag Cluttered to your Applications folder</span>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-purple/20 text-accent-purple text-sm flex items-center justify-center">
                    3
                  </span>
                  <span>Launch Cluttered and click &quot;Scan&quot; to start</span>
                </li>
              </ol>
            </Card>
          </FadeIn>

          {/* Security Notice */}
          <FadeIn delay={0.3}>
            <div className="flex items-start gap-4 p-4 rounded-lg bg-accent-blue/10 border border-accent-blue/20">
              <Shield className="w-5 h-5 text-accent-blue flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-text-primary font-medium mb-1">Verified & Notarized</p>
                <p className="text-sm text-text-secondary">
                  Cluttered is signed and notarized by Apple. If you see a warning, right-click the app and select &quot;Open&quot; to bypass
                  Gatekeeper.
                </p>
              </div>
            </div>
          </FadeIn>
        </Container>
      </Section>
    </>
  )
}
