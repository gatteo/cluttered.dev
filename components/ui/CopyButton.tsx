'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button onClick={handleCopy} className="p-2 rounded-lg bg-surface-interactive hover:bg-white/10 transition-colors" title="Copy to clipboard">
      {copied ? <Check className="w-5 h-5 text-accent-green" /> : <Copy className="w-5 h-5 text-text-muted" />}
    </button>
  )
}
