import Link from 'next/link'
import Image from 'next/image'
import { Github, Twitter } from 'lucide-react'
import { navigation, siteConfig } from '@/lib/constants'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/5 bg-surface-primary">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <Image
                src="/icons/logo.png"
                alt="Cluttered"
                width={28}
                height={28}
                className="w-7 h-7"
              />
              <span className="text-xl font-bold text-text-primary">
                {siteConfig.name}
              </span>
            </Link>
            <p className="text-sm text-text-secondary mb-4">
              The satisfying disk cleaner for developers. Reclaim gigabytes of wasted space.
            </p>
            <div className="flex gap-4">
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={`https://twitter.com/${siteConfig.twitter.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4">Product</h3>
            <ul className="space-y-3">
              {navigation.footer.product.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4">Resources</h3>
            <ul className="space-y-3">
              {navigation.footer.resources.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4">Company</h3>
            <ul className="space-y-3">
              {navigation.footer.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-text-muted">
            &copy; {currentYear} {siteConfig.creator}. All rights reserved.
          </p>
          <p className="text-sm text-text-muted">
            Made with love for developers
          </p>
        </div>
      </div>
    </footer>
  )
}
