import { Card, CardHeader, CardTitle, CardContent } from '@common/components/ui/Card'
import { TrendingUp, DollarSign } from 'lucide-react'

interface RevenueChartProps {
  totalRevenue: number
  revenueThisMonth: number
  averageBookingValue: number
}

/**
 * Composant pour afficher les statistiques de revenus avec graphique
 */
export const RevenueChart = ({
  totalRevenue,
  revenueThisMonth,
  averageBookingValue,
}: RevenueChartProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const monthlyPercentage = (revenueThisMonth / totalRevenue) * 100

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              Revenue Overview
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">Total revenue and monthly performance</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Total Revenue */}
          <div>
            <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalRevenue)}</p>
          </div>

          {/* This Month */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">This Month</p>
              <span className="text-sm font-semibold text-green-600 flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                {formatCurrency(revenueThisMonth)}
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-1000 shadow-sm"
                style={{ width: `${Math.min(monthlyPercentage, 100)}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {monthlyPercentage.toFixed(1)}% of total revenue
            </p>
          </div>

          {/* Average Booking Value */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Average Booking Value</p>
            <p className="text-xl font-bold text-gray-900">{formatCurrency(averageBookingValue)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

