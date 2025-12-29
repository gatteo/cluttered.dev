import { cn } from '@/lib/utils'

interface BackgroundGlowProps {
  className?: string
  variant?: 'purple' | 'green' | 'pink'
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center'
}

export function BackgroundGlow({ className, variant = 'purple', position = 'top-right' }: BackgroundGlowProps) {
  const colors = {
    purple: 'bg-accent-purple/20',
    green: 'bg-accent-green/20',
    pink: 'bg-accent-pink/20',
  }

  const positions = {
    'top-left': '-top-40 -left-40',
    'top-right': '-top-40 -right-40',
    'bottom-left': '-bottom-40 -left-40',
    'bottom-right': '-bottom-40 -right-40',
    center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  }

  return (
    <div
      className={cn('absolute w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none', colors[variant], positions[position], className)}
    />
  )
}
