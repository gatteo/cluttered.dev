'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Download, Github } from 'lucide-react'
import { Button, AnimatedNumber, BackgroundGrid, BackgroundGradientBlur } from '@/components/ui'

// Grid of icons - 3 columns, staggered vertically
const iconGrid = [
  // Column 0 (leftmost in grid, closest to text)
  { id: 'nodejs', col: 0, row: 0, delay: 0 },
  { id: 'rust', col: 0, row: 1, delay: 0.05 },
  { id: 'docker', col: 0, row: 2, delay: 0.1 },
  { id: 'python', col: 0, row: 3, delay: 0.15 },
  // Column 1 (offset down)
  { id: 'xcode', col: 1, row: 0, delay: 0.08 },
  { id: 'go', col: 1, row: 1, delay: 0.12 },
  { id: 'java', col: 1, row: 2, delay: 0.18 },
  { id: 'ruby', col: 1, row: 3, delay: 0.22 },
  // Column 2 (offset up)
  { id: 'php', col: 2, row: 0, delay: 0.15 },
  { id: 'elixir', col: 2, row: 1, delay: 0.2 },
  { id: 'android', col: 2, row: 2, delay: 0.25 },
  { id: 'dotnet', col: 2, row: 3, delay: 0.28 },
]

const ICON_SIZE = 100
const GAP = 4
const COL_OFFSETS = [52, 0, 72] // Vertical offset for each column to create stagger

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background effects */}
      <BackgroundGrid size={70} opacity="subtle" maskPosition="center" />
      <BackgroundGradientBlur variant="purple" position="top" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-32 md:pt-36 pb-20 w-full">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">
          {/* Left side - Text content */}
          <div className="flex-1 lg:max-w-2xl">
            {/* Logo Icon */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="mb-8">
              <Image src="/icons/logo.png" alt="Cluttered" width={80} height={80} className="w-20 h-20" priority />
            </motion.div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.03 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-elevated border border-accent-purple/30 text-accent-purple text-sm mb-8 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-green"></span>
              </span>
              Now available for macOS
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.06 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-text-primary mb-6 tracking-tight"
            >
              The <span className="text-gradient-purple">Satisfying</span>
              <br />
              Disk Cleaner for Developers
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.09 }}
              className="text-lg sm:text-xl text-text-secondary max-w-xl mb-8"
            >
              Clean node modules, build artifacts, Docker images, and more. Reclaim gigabytes of disk space with one click.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.12 }}
              className="flex flex-col sm:flex-row items-start gap-4 mb-10"
            >
              <Link href="/download">
                <Button size="lg">
                  <Download className="w-5 h-5 mr-2" />
                  Download for Mac
                </Button>
              </Link>
              <Link href="https://github.com/gatteo/cluttered" target="_blank">
                <Button variant="secondary" size="lg">
                  <Github className="w-5 h-5 mr-2" />
                  View on GitHub
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.15 }}
              className="flex flex-wrap items-center gap-8 text-text-secondary"
            >
              <div>
                <p className="text-3xl font-bold text-text-primary">
                  <AnimatedNumber value={47} suffix=" GB" />
                </p>
                <p className="text-sm">Avg. space recovered</p>
              </div>
              <div className="hidden sm:block w-px h-12 bg-white/10" />
              <div>
                <p className="text-3xl font-bold text-text-primary">12+</p>
                <p className="text-sm">Ecosystems supported</p>
              </div>
              <div className="hidden sm:block w-px h-12 bg-white/10" />
              <div>
                <p className="text-3xl font-bold text-text-primary">100%</p>
                <p className="text-sm">Safe & reversible</p>
              </div>
            </motion.div>
          </div>

          {/* Right side - Icon grid */}
          <div className="hidden lg:block flex-shrink-0">
            <div
              className="relative"
              style={{
                width: 3 * (ICON_SIZE + GAP) - GAP,
                height: 4 * (ICON_SIZE + GAP) + Math.max(...COL_OFFSETS),
              }}
            >
              {iconGrid.map((icon, index) => {
                const x = icon.col * (ICON_SIZE + GAP)
                const y = icon.row * (ICON_SIZE + GAP) + COL_OFFSETS[icon.col]
                // Opacity increases toward the right (left column faded, right column more visible)
                const baseOpacity = [0.15, 0.35, 0.55][icon.col]

                return (
                  <motion.div
                    key={`${icon.id}-${index}`}
                    className="absolute"
                    style={{
                      left: x,
                      top: y,
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: baseOpacity,
                      scale: 1,
                    }}
                    transition={{
                      opacity: { duration: 0.3, delay: icon.delay + 0.15 },
                      scale: { duration: 0.3, delay: icon.delay + 0.15 },
                    }}
                  >
                    <Image
                      src={`/icons/ecosystems/${icon.id}.png`}
                      alt=""
                      width={ICON_SIZE}
                      height={ICON_SIZE}
                      className="select-none rounded-2xl"
                      style={{
                        width: ICON_SIZE,
                        height: ICON_SIZE,
                      }}
                    />
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* App Screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.18 }}
          className="mt-20 max-w-5xl mx-auto"
        >
          <div className="glass-card-elevated p-2 rounded-2xl">
            <Image
              src="/screenshot-dash.png"
              alt="Cluttered app dashboard showing disk space analysis"
              width={1920}
              height={1080}
              className="rounded-xl w-full h-auto"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
