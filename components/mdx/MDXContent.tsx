'use client'

import { useMDXComponent } from 'next-contentlayer2/hooks'
import { Callout } from './Callout'
import { ComparisonTable } from './ComparisonTable'
import { FAQ } from './FAQ'
import { ArtifactList } from './ArtifactList'

const mdxComponents = {
  Callout,
  ComparisonTable,
  FAQ,
  ArtifactList,
}

interface MDXContentProps {
  code: string
  className?: string
}

export function MDXContent({ code, className }: MDXContentProps) {
  const MDXComponent = useMDXComponent(code)

  return (
    <div className={className}>
      {/* eslint-disable-next-line react-hooks/static-components */}
      <MDXComponent components={mdxComponents} />
    </div>
  )
}
