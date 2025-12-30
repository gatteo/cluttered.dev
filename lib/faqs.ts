export const faqs = [
  {
    question: 'Is Cluttered safe to use?',
    answer:
      'Yes! Cluttered never deletes active projects with uncommitted git changes. All deletions go to your system Trash first, so you can always recover files for up to 30 days.',
  },
  {
    question: 'Will cleaning node_modules break my projects?',
    answer: 'No. node_modules is fully regenerable by running `npm install`. Your package.json and lock files are never touched.',
  },
  {
    question: 'How is this different from CleanMyMac?',
    answer:
      'Cluttered is built specifically for developers. It understands project structures, respects git history, and knows which build artifacts are safe to delete across 12+ development ecosystems.',
  },
  {
    question: 'Does it work on Windows?',
    answer: 'Currently Cluttered is macOS only. Windows support is planned for a future release.',
  },
  {
    question: 'How much space can I expect to recover?',
    answer:
      'Most developers recover 20-100GB on their first scan. The average is about 47GB. It depends on how many projects you have and how long since your last cleanup.',
  },
  {
    question: 'What is the 20 GB weekly limit?',
    answer:
      'The free version lets you clean up to 20 GB per week. This resets every 7 days. Pro removes this limit entirely, letting you clean unlimited space.',
  },
  {
    question: 'Is Pro a subscription?',
    answer: 'No, Pro is a one-time purchase of $29. Pay once, use forever. No recurring fees.',
  },
]
