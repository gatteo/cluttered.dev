'use client'

import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { useScrollspy } from '@/hooks/use-scrollspy'
import { cn } from '@/lib/utils'

export type TOCItem = {
  title: string
  url: string
  depth: number
}

interface TableOfContentsProps {
  toc: TOCItem[]
}

type TOCSection = {
  heading: TOCItem
  children: TOCItem[]
}

function groupTOCByH2(toc: TOCItem[]): TOCSection[] {
  const sections: TOCSection[] = []
  let currentSection: TOCSection | null = null

  for (const item of toc) {
    if (item.depth === 2) {
      if (currentSection) {
        sections.push(currentSection)
      }
      currentSection = { heading: item, children: [] }
    } else if (item.depth === 3 && currentSection) {
      currentSection.children.push(item)
    }
  }

  if (currentSection) {
    sections.push(currentSection)
  }

  return sections
}

export function TableOfContents({ toc }: TableOfContentsProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())

  const activeId = useScrollspy(
    toc.map((item) => item.url),
    { rootMargin: '0% 0% -80% 0%' }
  )

  if (toc.length === 0) return null

  const sections = groupTOCByH2(toc)

  const toggleSection = (url: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev)
      if (next.has(url)) {
        next.delete(url)
      } else {
        next.add(url)
      }
      return next
    })
  }

  return (
    <nav className="max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
      <p className="mb-4 text-sm font-semibold text-text-primary">On this page</p>
      <ul className="space-y-1">
        {sections.map((section) => {
          const { heading, children } = section
          const isExpanded = expandedSections.has(heading.url)
          const isHeadingActive = heading.url === activeId
          const hasActiveChild = children.some((child) => child.url === activeId)
          const hasChildren = children.length > 0

          return (
            <li key={heading.url}>
              <div className="flex items-center">
                {hasChildren && (
                  <button
                    onClick={() => toggleSection(heading.url)}
                    className="flex h-6 w-6 shrink-0 items-center justify-center text-text-muted hover:text-text-secondary transition-colors"
                    aria-label={isExpanded ? 'Collapse section' : 'Expand section'}
                  >
                    <ChevronRight className={cn('h-3.5 w-3.5 transition-transform duration-200', isExpanded && 'rotate-90')} />
                  </button>
                )}
                <a
                  href={`#${heading.url}`}
                  className={cn(
                    'block flex-1 border-l-2 py-1.5 pl-3 text-sm leading-normal transition-all duration-200',
                    isHeadingActive || hasActiveChild
                      ? 'border-accent-purple text-text-primary'
                      : 'border-white/10 text-text-muted hover:border-white/30 hover:text-text-secondary',
                    !hasChildren && 'ml-6'
                  )}
                >
                  {heading.title}
                </a>
              </div>

              {hasChildren && isExpanded && (
                <ul className="ml-6 space-y-1">
                  {children.map((child) => {
                    const isChildActive = child.url === activeId

                    return (
                      <li key={child.url}>
                        <a
                          href={`#${child.url}`}
                          className={cn(
                            'block border-l-2 py-1 pl-4 text-sm leading-normal transition-all duration-200',
                            isChildActive
                              ? 'border-accent-purple text-text-primary'
                              : 'border-white/10 text-text-muted hover:border-white/30 hover:text-text-secondary'
                          )}
                        >
                          {child.title}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
