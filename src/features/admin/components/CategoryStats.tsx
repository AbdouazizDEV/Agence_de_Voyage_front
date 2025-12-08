import { Card, CardHeader, CardTitle, CardContent } from '@common/components/ui/Card'
import { cn } from '@common/utils/cn'

interface CategoryData {
  name: string
  value: number
}

interface CategoryStatsProps {
  title: string
  subtitle: string
  total: number
  change?: string
  data: CategoryData[]
}

const colors = [
  'bg-gradient-to-r from-blue-500 to-blue-600',
  'bg-gradient-to-r from-purple-500 to-purple-600',
  'bg-gradient-to-r from-pink-500 to-pink-600',
  'bg-gradient-to-r from-indigo-500 to-indigo-600',
  'bg-gradient-to-r from-cyan-500 to-cyan-600',
]

/**
 * Composant de statistiques par catégorie avec graphique en barres stylé
 */
export const CategoryStats = ({
  title,
  subtitle,
  total,
  change,
  data,
}: CategoryStatsProps) => {
  const maxValue = Math.max(...data.map((d) => d.value), 1)

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-900">{title}</CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              {subtitle} • <span className="font-semibold text-gray-900">{total.toLocaleString()}</span>
            </p>
          </div>
          {change && (
            <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
              {change}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {data.map((category, index) => {
            const percentage = (category.value / maxValue) * 100
            const colorClass = colors[index % colors.length]
            return (
              <div key={index} className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{category.name}</span>
                  <span className="text-sm font-bold text-gray-900">
                    {category.value.toLocaleString()}
                  </span>
                </div>
                <div className="relative w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div
                    className={cn(
                      'h-full rounded-full transition-all duration-1000 ease-out shadow-sm',
                      colorClass
                    )}
                    style={{ 
                      width: `${percentage}%`,
                      animationDelay: `${index * 100}ms`
                    }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

