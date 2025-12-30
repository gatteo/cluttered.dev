import { withContentlayer } from 'next-contentlayer2'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },

  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'date-fns'],
  },

  trailingSlash: true,
  skipTrailingSlashRedirect: true,
}

export default withContentlayer(nextConfig)
