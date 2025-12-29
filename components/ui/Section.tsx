import { cn } from '@/lib/utils'

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  size?: 'sm' | 'md' | 'lg'
  /** Add extra top padding to account for fixed header (use on first section of inner pages) */
  first?: boolean
}

export function Section({ className, size = 'md', first = false, ...props }: SectionProps) {
  const sizes = {
    sm: 'py-12 md:py-16',
    md: 'py-16 md:py-24',
    lg: 'py-24 md:py-32',
  }

  // When `first` is true, add extra top padding to push content below the fixed header
  const firstPadding = first ? 'pt-32 md:pt-36' : ''

  return <section className={cn(sizes[size], firstPadding, className)} {...props} />
}

export function Container({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('max-w-5xl mx-auto px-4 sm:px-6', className)} {...props} />
}

export function SectionHeader({ title, description, className }: { title: string; description?: string; className?: string }) {
  return (
    <div className={cn('text-center max-w-3xl mx-auto mb-12', className)}>
      <h2 className="text-4xl md:text-5xl font-extrabold text-text-primary mb-4 tracking-tight">{title}</h2>
      {description && <p className="text-lg text-text-secondary">{description}</p>}
    </div>
  )
}
