import { Metadata } from 'next'
import Link from 'next/link'
import { allDocs } from 'contentlayer/generated'
import { Section, Container, Card, FadeIn } from '@/components/ui'
import { Book, Rocket, Settings, Shield, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Documentation',
  description: 'Learn how to use Cluttered to clean your development artifacts and reclaim disk space.',
}

// Group docs by section
function groupDocsBySection(docs: typeof allDocs) {
  const sections: Record<string, typeof allDocs> = {}

  docs.forEach((doc) => {
    if (!sections[doc.section]) {
      sections[doc.section] = []
    }
    sections[doc.section].push(doc)
  })

  // Sort docs within each section by order
  Object.keys(sections).forEach((section) => {
    sections[section].sort((a, b) => a.order - b.order)
  })

  return sections
}

const sectionIcons: Record<string, React.ReactNode> = {
  'Getting Started': <Rocket className="w-5 h-5" />,
  Features: <Book className="w-5 h-5" />,
  Configuration: <Settings className="w-5 h-5" />,
  Safety: <Shield className="w-5 h-5" />,
}

const sectionOrder = ['Getting Started', 'Features', 'Configuration', 'Safety']

export default function DocsPage() {
  const docs = allDocs
  const sections = groupDocsBySection(docs)

  // Sort sections by predefined order
  const orderedSections = sectionOrder.filter((s) => sections[s])
  // Add any sections not in the predefined order
  Object.keys(sections).forEach((s) => {
    if (!orderedSections.includes(s)) {
      orderedSections.push(s)
    }
  })

  return (
    <Section size="lg" first>
      <Container>
        <FadeIn>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">Documentation</h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">Everything you need to know about using Cluttered effectively.</p>
          </div>
        </FadeIn>

        {docs.length === 0 ? (
          <FadeIn>
            <Card className="text-center py-12">
              <p className="text-text-secondary">Documentation coming soon!</p>
            </Card>
          </FadeIn>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {orderedSections.map((sectionName, sectionIndex) => (
              <FadeIn key={sectionName} delay={sectionIndex * 0.1}>
                <Card className="p-6 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-accent-purple/20 flex items-center justify-center text-accent-purple">
                      {sectionIcons[sectionName] || <Book className="w-5 h-5" />}
                    </div>
                    <h2 className="text-xl font-semibold text-text-primary">{sectionName}</h2>
                  </div>

                  <ul className="space-y-2">
                    {sections[sectionName].map((doc) => (
                      <li key={doc.slug}>
                        <Link
                          href={doc.url}
                          className="group flex items-center justify-between py-2 px-3 -mx-3 rounded-lg hover:bg-white/5 transition-colors"
                        >
                          <div>
                            <span className="text-text-primary group-hover:text-accent-purple transition-colors">{doc.title}</span>
                            <p className="text-sm text-text-muted">{doc.description}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-accent-purple transition-colors flex-shrink-0" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Card>
              </FadeIn>
            ))}
          </div>
        )}

        {/* Quick Links */}
        <FadeIn delay={0.4}>
          <Card className="mt-12 p-8">
            <h2 className="text-xl font-semibold text-text-primary mb-4 text-center">Quick Links</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/download"
                className="px-4 py-2 rounded-lg bg-accent-purple/20 text-accent-purple hover:bg-accent-purple/30 transition-colors"
              >
                Download Cluttered
              </Link>
              <Link href="/ecosystems" className="px-4 py-2 rounded-lg bg-white/10 text-text-secondary hover:text-text-primary transition-colors">
                Supported Ecosystems
              </Link>
              <Link href="/changelog" className="px-4 py-2 rounded-lg bg-white/10 text-text-secondary hover:text-text-primary transition-colors">
                Changelog
              </Link>
            </div>
          </Card>
        </FadeIn>
      </Container>
    </Section>
  )
}
