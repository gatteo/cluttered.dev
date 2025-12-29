'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Download, Github } from 'lucide-react'
import { Button, AnimatedNumber, BackgroundGrid, BackgroundGradientBlur } from '@/components/ui'

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background effects */}
      <BackgroundGrid size={70} opacity="subtle" maskPosition="center" />
      <BackgroundGradientBlur variant="purple" position="top" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-32 md:pt-36 pb-20">
        <div className="text-center">
          {/* Logo Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <Image
              src="/icons/logo.png"
              alt="Cluttered"
              width={96}
              height={96}
              className="w-24 h-24 mx-auto"
              priority
            />
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary mb-6"
          >
            The{' '}
            <span className="text-gradient-purple">Satisfying</span>
            <br />
            Disk Cleaner for Developers
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-8"
          >
            Clean node modules, build artifacts, Docker images, and more.
            Reclaim gigabytes of disk space with one click.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.25 }}
            className="flex flex-wrap items-center justify-center gap-8 text-text-secondary"
          >
            <div className="text-center">
              <p className="text-3xl font-bold text-text-primary">
                <AnimatedNumber value={47} suffix=" GB" />
              </p>
              <p className="text-sm">Avg. space recovered</p>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/10" />
            <div className="text-center">
              <p className="text-3xl font-bold text-text-primary">12+</p>
              <p className="text-sm">Ecosystems supported</p>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/10" />
            <div className="text-center">
              <p className="text-3xl font-bold text-text-primary">100%</p>
              <p className="text-sm">Safe & reversible</p>
            </div>
          </motion.div>
        </div>

        {/* App Screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-16 max-w-5xl mx-auto"
        >
          <div className="glass-card-elevated p-2 rounded-2xl">
            <div className="aspect-video bg-surface-primary rounded-xl flex items-center justify-center">
              <p className="text-text-muted text-lg">App Screenshot Coming Soon</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
