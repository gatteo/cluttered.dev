'use client'

import Link from 'next/link'
import { Download, Sparkles, HardDrive } from 'lucide-react'

interface DownloadBannerProps {
  variant?: 'default' | 'compact' | 'minimal'
  title?: string
  subtitle?: string
}

export function DownloadBanner({ variant = 'default', title, subtitle }: DownloadBannerProps) {
  if (variant === 'minimal') {
    return (
      <Link
        href="/download"
        className="group my-8 flex items-center justify-between gap-4 rounded-xl border border-accent-purple/30 bg-accent-purple/5 p-4 transition-all hover:border-accent-purple/50 hover:bg-accent-purple/10"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-purple/20">
            <Download className="h-5 w-5 text-accent-purple" />
          </div>
          <div>
            <p className="font-semibold text-text-primary">{title || 'Try Cluttered Free'}</p>
            <p className="text-sm text-text-muted">{subtitle || 'Reclaim your disk space in minutes'}</p>
          </div>
        </div>
        <span className="text-sm font-medium text-accent-purple transition-transform group-hover:translate-x-1">Download →</span>
      </Link>
    )
  }

  if (variant === 'compact') {
    return (
      <div className="my-8 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-accent-purple/20 via-accent-pink/10 to-accent-purple/20 p-[1px]">
        <div className="rounded-2xl bg-surface-primary/90 backdrop-blur-xl">
          <div className="flex flex-col items-center gap-4 p-6 sm:flex-row sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 animate-pulse rounded-xl bg-accent-purple/30 blur-xl" />
                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent-purple to-accent-pink">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <p className="font-semibold text-text-primary">{title || 'Ready to reclaim your disk space?'}</p>
                <p className="text-sm text-text-secondary">{subtitle || 'Download Cluttered free and see how much you can recover.'}</p>
              </div>
            </div>
            <Link href="/download" className="btn-primary flex items-center gap-2 whitespace-nowrap">
              <Download className="h-4 w-4" />
              Download Free
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Default variant - full featured banner
  return (
    <div className="my-10 overflow-hidden rounded-3xl">
      {/* Animated gradient border */}
      <div className="relative bg-gradient-to-r from-accent-purple via-accent-pink to-accent-purple bg-[length:200%_100%] animate-gradient-x p-[1px]">
        <div className="rounded-3xl bg-surface-primary">
          {/* Inner glow effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent-purple/10 via-transparent to-accent-pink/10" />

          <div className="relative px-6 py-8 sm:px-8 sm:py-10">
            {/* Decorative elements */}
            <div className="absolute right-4 top-4 opacity-20 sm:right-8 sm:top-8">
              <HardDrive className="h-24 w-24 sm:h-32 sm:w-32 text-accent-purple" />
            </div>

            <div className="relative z-10 flex flex-col gap-6 sm:gap-8">
              {/* Badge */}
              <div className="flex">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-purple/20 px-3 py-1 text-xs font-medium text-accent-purple">
                  <Sparkles className="h-3 w-3" />
                  Free Download
                </span>
              </div>

              {/* Content */}
              <div className="max-w-xl">
                <h3 className="text-2xl font-bold text-text-primary sm:text-3xl">{title || 'Stop Running Out of Disk Space'}</h3>
                <p className="mt-3 text-text-secondary">
                  {subtitle ||
                    'Cluttered finds and cleans node_modules, Rust targets, Xcode DerivedData, Docker cache, and more. Reclaim 50-100GB in minutes.'}
                </p>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 text-sm">
                <div>
                  <span className="font-semibold text-accent-green">50-100GB</span>
                  <span className="ml-1 text-text-muted">typical recovery</span>
                </div>
                <div>
                  <span className="font-semibold text-accent-purple">12+</span>
                  <span className="ml-1 text-text-muted">ecosystems</span>
                </div>
                <div>
                  <span className="font-semibold text-accent-pink">Safe</span>
                  <span className="ml-1 text-text-muted">git-aware cleanup</span>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link href="/download" className="btn-primary inline-flex items-center justify-center gap-2 text-base">
                  <Download className="h-5 w-5" />
                  Download for Mac
                </Link>
                <span className="text-sm text-text-muted">macOS 12.0+ · Apple Silicon & Intel</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
