import { Folder, HardDrive } from 'lucide-react'

interface ArtifactItem {
  name: string
  description: string
  size: string
}

interface ArtifactListProps {
  items: ArtifactItem[]
}

export function ArtifactList({ items }: ArtifactListProps) {
  return (
    <div className="my-8 grid gap-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="glass-card p-4 flex items-start gap-4"
        >
          <div className="p-2 rounded-lg bg-accent-purple/10">
            <Folder className="h-5 w-5 text-accent-purple" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <code className="text-sm font-mono text-text-primary">{item.name}</code>
              <div className="flex items-center gap-1 text-xs text-text-muted">
                <HardDrive className="h-3 w-3" />
                {item.size}
              </div>
            </div>
            <p className="text-sm text-text-secondary">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
