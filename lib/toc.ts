import GithubSlugger from 'github-slugger'

export type TOCItem = {
  title: string
  url: string
  depth: number
}

/**
 * Extracts table of contents from raw markdown content.
 * Parses headings (## and ###) and generates slugs.
 */
export function extractTOC(rawContent: string): TOCItem[] {
  const slugger = new GithubSlugger()
  const toc: TOCItem[] = []

  // Match markdown headings (## and ### only for cleaner TOC)
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  let match

  while ((match = headingRegex.exec(rawContent)) !== null) {
    const depth = match[1].length
    const title = match[2].trim()
    const url = slugger.slug(title)

    toc.push({
      title,
      url,
      depth,
    })
  }

  return toc
}
