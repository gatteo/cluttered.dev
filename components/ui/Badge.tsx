import { cn } from '@/lib/utils'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants = {
    default: 'bg-white/10 text-text-secondary',
    secondary: 'bg-accent-purple/20 text-accent-purple',
    success: 'bg-accent-green/20 text-accent-green',
    warning: 'bg-accent-amber/20 text-accent-amber',
    danger: 'bg-accent-red/20 text-accent-red',
    info: 'bg-accent-blue/20 text-accent-blue',
  }

  return <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', variants[variant], className)} {...props} />
}
