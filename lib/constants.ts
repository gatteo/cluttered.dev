export const siteConfig = {
  name: 'Cluttered',
  description: 'The satisfying disk cleaner for developers. Clean node_modules, build artifacts, Docker images, and more.',
  url: 'https://cluttered.dev',
  ogImage: '/og/og.png',
  twitter: '@mattegiardino',
  github: 'https://github.com/gatteo/cluttered',
  downloadMac: 'https://github.com/gatteo/cluttered/releases',
  creator: 'Matteo Giardino',
}

export const navigation = {
  main: [
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Ecosystems', href: '/ecosystems' },
    { name: 'Blog', href: '/blog' },
    { name: 'Docs', href: '/docs' },
  ],
  footer: {
    product: [
      { name: 'Features', href: '/features' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'Download', href: '/download' },
      { name: 'Changelog', href: '/changelog' },
    ],
    resources: [
      { name: 'Documentation', href: '/docs' },
      { name: 'Blog', href: '/blog' },
      { name: 'Ecosystems', href: '/ecosystems' },
      { name: 'Comparisons', href: '/compare' },
    ],
    company: [
      { name: 'About', href: '/about' },
      { name: 'GitHub', href: 'https://github.com/gatteo/cluttered' },
      { name: 'Privacy', href: '/privacy' },
      { name: 'Terms', href: '/terms' },
      { name: 'Refund Policy', href: '/refund' },
    ],
  },
}

export const ecosystems = [
  { id: 'nodejs', name: 'Node.js', color: '#22C55E', icon: '/icons/ecosystems/nodejs.png' },
  { id: 'rust', name: 'Rust', color: '#F97316', icon: '/icons/ecosystems/rust.png' },
  { id: 'xcode', name: 'Xcode', color: '#3B82F6', icon: '/icons/ecosystems/xcode.png' },
  { id: 'docker', name: 'Docker', color: '#06B6D4', icon: '/icons/ecosystems/docker.png' },
  { id: 'python', name: 'Python', color: '#EAB308', icon: '/icons/ecosystems/python.png' },
  { id: 'go', name: 'Go', color: '#14B8A6', icon: '/icons/ecosystems/go.png' },
  { id: 'android', name: 'Android', color: '#22C55E', icon: '/icons/ecosystems/android.png' },
  { id: 'ruby', name: 'Ruby', color: '#EF4444', icon: '/icons/ecosystems/ruby.png' },
  { id: 'php', name: 'PHP', color: '#8B5CF6', icon: '/icons/ecosystems/php.png' },
  { id: 'java', name: 'Java', color: '#F97316', icon: '/icons/ecosystems/java.png' },
  { id: 'elixir', name: 'Elixir', color: '#A855F7', icon: '/icons/ecosystems/elixir.png' },
  { id: 'dotnet', name: '.NET', color: '#8B5CF6', icon: '/icons/ecosystems/dotnet.png' },
]

export const pricingPlans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for occasional cleanup',
    features: [
      'Scan all directories',
      'All 12+ ecosystems',
      'Project activity detection',
      'Safe Trash deletion',
      'Deletion history & restore',
      '20 GB weekly cleanup limit',
    ],
    cta: 'Download Free',
    href: '/download',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: 'once',
    description: 'Unlimited cleaning, fully automated',
    features: [
      'Everything in Free',
      'Unlimited cleanup (no quota)',
      'Scheduled auto-scans',
      'Auto-clean dormant projects',
      'Smart notifications',
      'Priority support',
    ],
    cta: 'Get Pro',
    href: '/download?plan=pro',
    popular: true,
  },
]
