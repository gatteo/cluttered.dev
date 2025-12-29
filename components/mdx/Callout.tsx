import { cn } from '@/lib/utils'
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react'

interface CalloutProps {
  type?: 'info' | 'warning' | 'tip' | 'danger'
  title?: string
  children: React.ReactNode
}

const icons = {
  info: Info,
  warning: AlertTriangle,
  tip: CheckCircle,
  danger: AlertCircle,
}

const styles = {
  info: 'bg-accent-blue/10 border-accent-blue/30 text-accent-blue',
  warning: 'bg-accent-amber/10 border-accent-amber/30 text-accent-amber',
  tip: 'bg-accent-green/10 border-accent-green/30 text-accent-green',
  danger: 'bg-accent-red/10 border-accent-red/30 text-accent-red',
}

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const Icon = icons[type]

  return (
    <div className={cn('my-6 flex gap-3 rounded-lg border p-4', styles[type])}>
      <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
      <div>
        {title && <p className="font-semibold mb-1">{title}</p>}
        <div className="text-text-secondary">{children}</div>
      </div>
    </div>
  )
}
