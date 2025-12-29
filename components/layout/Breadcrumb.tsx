import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
  name: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav className={cn('flex items-center gap-2 text-sm', className)} aria-label="Breadcrumb">
      <Link
        href="/"
        className="text-text-muted hover:text-text-secondary transition-colors"
      >
        <Home className="w-4 h-4" />
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4 text-text-muted" />
          {item.href ? (
            <Link
              href={item.href}
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              {item.name}
            </Link>
          ) : (
            <span className="text-text-primary">{item.name}</span>
          )}
        </div>
      ))}
    </nav>
  )
}
