import { Check, X } from 'lucide-react'

interface Feature {
  name: string
  cluttered: boolean | string
  competitor: boolean | string
}

interface ComparisonTableProps {
  features: Feature[]
  competitorName?: string
}

export function ComparisonTable({ features, competitorName = 'Competitor' }: ComparisonTableProps) {
  const renderValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="h-5 w-5 text-accent-green mx-auto" />
      ) : (
        <X className="h-5 w-5 text-accent-red mx-auto" />
      )
    }
    return <span className="text-text-secondary">{value}</span>
  }

  return (
    <div className="my-8 overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-3 px-4 text-text-primary font-semibold">Feature</th>
            <th className="text-center py-3 px-4 text-accent-purple font-semibold">Cluttered</th>
            <th className="text-center py-3 px-4 text-text-secondary font-semibold">{competitorName}</th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature, index) => (
            <tr key={index} className="border-b border-white/5">
              <td className="py-3 px-4 text-text-secondary">{feature.name}</td>
              <td className="py-3 px-4 text-center">{renderValue(feature.cluttered)}</td>
              <td className="py-3 px-4 text-center">{renderValue(feature.competitor)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
