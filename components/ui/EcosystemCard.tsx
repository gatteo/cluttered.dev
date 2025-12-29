'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Card } from './Card'
import { cn } from '@/lib/utils'

interface EcosystemCardProps {
  id: string
  name: string
  icon: string
  color: string
  description?: string
  artifacts?: string[]
  className?: string
}

export function EcosystemCard({ id, name, icon, color, description, artifacts, className }: EcosystemCardProps) {
  return (
    <Link href={`/ecosystems/${id}`}>
      <motion.div whileHover={{ y: -4, scale: 1.02 }} transition={{ duration: 0.2 }}>
        <Card variant="interactive" className={cn('relative overflow-hidden', className)}>
          {/* Glow effect on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            style={{
              background: `radial-gradient(circle at right, ${color}20 0%, transparent 70%)`,
            }}
          />

          {/* Large icon - absolute top right, overflowing */}
          <div className="absolute -top-4 -right-6 opacity-20 group-hover:opacity-30 transition-opacity pointer-events-none">
            <Image src={icon} alt="" width={96} height={96} className="w-24 h-24 object-contain" />
          </div>

          {/* Content */}
          <div className="relative z-10">
            <h3 className="text-lg font-semibold text-text-primary mb-1">{name}</h3>
            {description && <p className="text-sm text-text-secondary mb-3">{description}</p>}

            {artifacts && artifacts.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {artifacts.slice(0, 3).map((artifact) => (
                  <span key={artifact} className="text-xs px-2 py-0.5 rounded bg-white/5 text-text-muted font-mono">
                    {artifact}
                  </span>
                ))}
                {artifacts.length > 3 && <span className="text-xs px-2 py-0.5 text-text-muted">+{artifacts.length - 3} more</span>}
              </div>
            )}
          </div>
        </Card>
      </motion.div>
    </Link>
  )
}
