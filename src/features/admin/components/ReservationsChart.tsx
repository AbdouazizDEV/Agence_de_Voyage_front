import { Card, CardHeader, CardTitle, CardContent } from '@common/components/ui/Card'
import { Calendar, CheckCircle, XCircle, Clock } from 'lucide-react'

interface ReservationsChartProps {
  totalReservations: number
  pendingReservations: number
  confirmedReservations: number
  cancelledReservations: number
  completedReservations: number
  reservationsThisMonth: number
}

/**
 * Composant pour afficher les statistiques de réservations avec graphique circulaire
 */
export const ReservationsChart = ({
  totalReservations,
  pendingReservations,
  confirmedReservations,
  cancelledReservations,
  completedReservations,
  reservationsThisMonth,
}: ReservationsChartProps) => {
  const data = [
    { label: 'Confirmed', value: confirmedReservations, color: 'bg-blue-500', icon: CheckCircle },
    { label: 'Completed', value: completedReservations, color: 'bg-green-500', icon: CheckCircle },
    { label: 'Pending', value: pendingReservations, color: 'bg-yellow-500', icon: Clock },
    { label: 'Cancelled', value: cancelledReservations, color: 'bg-red-500', icon: XCircle },
  ]

  const total = data.reduce((sum, item) => sum + item.value, 0)

  const getPercentage = (value: number) => {
    return total > 0 ? (value / total) * 100 : 0
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              Reservations Status
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Total: <span className="font-semibold text-gray-900">{totalReservations.toLocaleString()}</span>
              {' • '}
              This Month: <span className="font-semibold text-gray-900">{reservationsThisMonth}</span>
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item, index) => {
            const percentage = getPercentage(item.value)
            const Icon = item.icon
            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded ${item.color} bg-opacity-10`}>
                      <Icon className={`h-4 w-4 ${item.color.replace('bg-', 'text-')}`} />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-gray-900">
                      {item.value.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-500 w-12 text-right">
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div
                    className={`${item.color} h-2.5 rounded-full transition-all duration-1000 ease-out shadow-sm`}
                    style={{ width: `${percentage}%` }}
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

