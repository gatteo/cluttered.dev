'use client'

import { cn } from '@/lib/utils'

interface BackgroundGridProps {
  className?: string
  size?: number
  opacity?: 'subtle' | 'light' | 'medium'
  maskPosition?: 'center' | 'top' | 'bottom'
}

export function BackgroundGrid({
  className,
  size = 70,
  opacity = 'subtle',
  maskPosition = 'center',
}: BackgroundGridProps) {
  const opacityValues = {
    subtle: '11',
    light: '18',
    medium: '25',
  }

  const maskPositions = {
    center: 'at_50%_50%',
    top: 'at_50%_20%',
    bottom: 'at_50%_80%',
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 -z-10',
        className
      )}
      style={{
        backgroundImage: `linear-gradient(to right, #ffffff${opacityValues[opacity]} 1px, transparent 1px), linear-gradient(to bottom, #ffffff${opacityValues[opacity]} 1px, transparent 1px)`,
        backgroundSize: `${size}px ${size}px`,
        maskImage: `radial-gradient(ellipse_50%_50%_${maskPositions[maskPosition]},#000_60%,transparent_100%)`,
        WebkitMaskImage: `radial-gradient(ellipse 50% 50% ${maskPositions[maskPosition].replace(/_/g, ' ')}, #000 60%, transparent 100%)`,
      }}
    />
  )
}

interface BackgroundGradientBlurProps {
  className?: string
  variant?: 'purple' | 'pink' | 'mixed'
  position?: 'top' | 'center' | 'bottom'
}

export function BackgroundGradientBlur({
  className,
  variant = 'purple',
  position = 'top',
}: BackgroundGradientBlurProps) {
  const positions = {
    top: 'top-0',
    center: 'top-1/2 -translate-y-1/2',
    bottom: 'bottom-0',
  }

  if (variant === 'mixed') {
    return (
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-x-0 -z-10 mx-auto grid max-w-4xl grid-cols-2 gap-8 opacity-20',
          positions[position],
          className
        )}
      >
        <div className="h-48 rounded-full bg-gradient-to-br from-accent-purple to-accent-pink blur-3xl" />
        <div className="h-56 rounded-full bg-gradient-to-r from-accent-pink to-accent-purple blur-3xl" />
      </div>
    )
  }

  const colors = {
    purple: 'from-accent-purple to-accent-purple/50',
    pink: 'from-accent-pink to-accent-purple',
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-x-0 -z-10 mx-auto max-w-4xl opacity-15',
        positions[position],
        className
      )}
    >
      <div className={cn('h-60 rounded-full bg-gradient-to-br blur-3xl', colors[variant])} />
    </div>
  )
}

interface BackgroundDotsProps {
  className?: string
  size?: number
  spacing?: number
}

export function BackgroundDots({
  className,
  size = 1,
  spacing = 24,
}: BackgroundDotsProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 -z-10',
        className
      )}
      style={{
        backgroundImage: `radial-gradient(#ffffff15 ${size}px, transparent ${size}px)`,
        backgroundSize: `${spacing}px ${spacing}px`,
        maskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, #000 40%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, #000 40%, transparent 100%)',
      }}
    />
  )
}
