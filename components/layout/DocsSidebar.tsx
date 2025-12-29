'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface SidebarSection {
  title: string
  items: {
    title: string
    href: string
  }[]
}

interface DocsSidebarProps {
  sections: SidebarSection[]
}

export function DocsSidebar({ sections }: DocsSidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="w-64 shrink-0 hidden lg:block">
      <nav className="sticky top-24 space-y-8">
        {sections.map((section) => (
          <div key={section.title}>
            <h4 className="text-sm font-semibold text-text-primary mb-3">{section.title}</h4>
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'block text-sm py-1 transition-colors',
                      pathname === item.href ? 'text-accent-purple font-medium' : 'text-text-secondary hover:text-text-primary'
                    )}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}
