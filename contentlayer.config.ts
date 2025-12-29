import { defineDocumentType, makeSource } from 'contentlayer2/source-files'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrismPlus from 'rehype-prism-plus'
import remarkGfm from 'remark-gfm'
import readingTime from 'reading-time'

// ========== Blog Posts ==========
export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: 'blog/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    date: { type: 'date', required: true },
    updated: { type: 'date', required: false },
    author: { type: 'string', default: 'Cluttered Team' },
    image: { type: 'string', required: false },
    tags: { type: 'list', of: { type: 'string' }, default: [] },
    category: { type: 'string', required: true },
    featured: { type: 'boolean', default: false },
    draft: { type: 'boolean', default: false },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace('blog/', ''),
    },
    url: {
      type: 'string',
      resolve: (doc) => `/blog/${doc._raw.flattenedPath.replace('blog/', '')}`,
    },
    readingTime: {
      type: 'json',
      resolve: (doc) => readingTime(doc.body.raw),
    },
  },
}))

// ========== Ecosystem Pages ==========
export const Ecosystem = defineDocumentType(() => ({
  name: 'Ecosystem',
  filePathPattern: 'ecosystems/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    icon: { type: 'string', required: true },
    color: { type: 'string', required: true },
    artifacts: { type: 'list', of: { type: 'string' }, required: true },
    detectionFiles: { type: 'list', of: { type: 'string' }, required: true },
    averageSize: { type: 'string', required: true },
    order: { type: 'number', default: 99 },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace('ecosystems/', ''),
    },
    url: {
      type: 'string',
      resolve: (doc) => `/ecosystems/${doc._raw.flattenedPath.replace('ecosystems/', '')}`,
    },
  },
}))

// ========== Comparison Pages ==========
export const Comparison = defineDocumentType(() => ({
  name: 'Comparison',
  filePathPattern: 'comparisons/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    competitor: { type: 'string', required: true },
    competitorUrl: { type: 'string', required: false },
    verdict: { type: 'string', required: true },
    featured: { type: 'boolean', default: false },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace('comparisons/', ''),
    },
    url: {
      type: 'string',
      resolve: (doc) => `/comparisons/${doc._raw.flattenedPath.replace('comparisons/', '')}`,
    },
  },
}))

// ========== Documentation ==========
export const Doc = defineDocumentType(() => ({
  name: 'Doc',
  filePathPattern: 'docs/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    order: { type: 'number', default: 99 },
    section: { type: 'string', required: true },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace('docs/', ''),
    },
    url: {
      type: 'string',
      resolve: (doc) => `/docs/${doc._raw.flattenedPath.replace('docs/', '')}`,
    },
  },
}))

// ========== Changelog ==========
export const Changelog = defineDocumentType(() => ({
  name: 'Changelog',
  filePathPattern: 'changelog/**/*.mdx',
  contentType: 'mdx',
  fields: {
    version: { type: 'string', required: true },
    date: { type: 'date', required: true },
    title: { type: 'string', required: true },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace('changelog/', ''),
    },
  },
}))

// ========== Export Source ==========
export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post, Ecosystem, Comparison, Doc, Changelog],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      [rehypePrismPlus, { ignoreMissing: true }],
    ],
  },
})
