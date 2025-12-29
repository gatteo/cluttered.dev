'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Download } from 'lucide-react'
import { cn } from '@/lib/utils'
import { navigation } from '@/lib/constants'
import { Button } from '@/components/ui'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-void/80 backdrop-blur-sm md:hidden"
            onClick={onClose}
          />

          {/* Menu */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-surface-primary border-b border-white/10 md:hidden"
          >
            <nav className="container mx-auto px-4 py-6 space-y-4">
              {navigation.main.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    'block py-2 text-lg font-medium transition-colors',
                    pathname === item.href || pathname.startsWith(item.href + '/') ? 'text-text-primary' : 'text-text-secondary'
                  )}
                >
                  {item.name}
                </Link>
              ))}

              <div className="pt-4 border-t border-white/10">
                <Link href="/download" onClick={onClose}>
                  <Button className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download for Mac
                  </Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
