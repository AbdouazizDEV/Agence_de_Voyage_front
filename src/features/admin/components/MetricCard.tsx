import { ReactNode } from 'react'
import { Card } from '@common/components/ui/Card'
import { cn } from '@common/utils/cn'

interface MetricCardProps {
  title: string
  value: string | number
  change?: {
    value: string
    isPositive: boolean
  }
  icon?: ReactNode
  iconBgColor?: string
}

/**
 * Carte de métrique pour le dashboard avec style amélioré
 */
export const MetricCard = ({ title, value, change, icon, iconBgColor = 'bg-blue-100' }: MetricCardProps) => {
  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-l-transparent hover:border-l-primary-600">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-2 font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-3">{value}</p>
          {change && (
            <div className="flex items-center gap-1">
              <span
                className={cn(
                  'text-sm font-medium flex items-center gap-1',
                  change.isPositive ? 'text-green-600' : 'text-red-600'
                )}
              >
                <span>{change.isPositive ? '↑' : '↓'}</span>
                {change.isPositive ? '+' : ''}
                {change.value}
              </span>
              <span className="text-xs text-gray-500">vs last month</span>
            </div>
          )}
        </div>
        {icon && (
          <div className={cn('p-3 rounded-xl', iconBgColor)}>
            <div className="text-gray-700">{icon}</div>
          </div>
        )}
      </div>
    </Card>
  )
}

