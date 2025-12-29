'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface TOCItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  className?: string
}

export function TableOfContents({ className }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const elements = document.querySelectorAll('article h2, article h3')
    const items: TOCItem[] = Array.from(elements).map((element) => ({
      id: element.id,
      text: element.textContent || '',
      level: parseInt(element.tagName[1]),
    }))
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHeadings(items)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-100px 0px -66%' }
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  if (headings.length === 0) return null

  return (
    <nav className={cn('space-y-2', className)}>
      <p className="text-sm font-semibold text-text-primary mb-4">On this page</p>
      {headings.map((heading) => (
        <a
          key={heading.id}
          href={`#${heading.id}`}
          className={cn(
            'block text-sm py-1 transition-colors',
            heading.level === 3 && 'pl-4',
            activeId === heading.id
              ? 'text-accent-purple font-medium'
              : 'text-text-secondary hover:text-text-primary'
          )}
        >
          {heading.text}
        </a>
      ))}
    </nav>
  )
}
