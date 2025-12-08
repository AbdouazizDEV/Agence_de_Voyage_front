import { ApiResponse } from '@common/types/api.types'
import api from '@core/interceptors/auth.interceptor'

export interface DashboardStats {
  totalOffers: number
  activeOffers: number
  inactiveOffers: number
  promotions: number
  averageRating: number
  totalClients: number
  activeClients: number
  newClientsThisMonth: number
  totalReservations: number
  pendingReservations: number
  confirmedReservations: number
  cancelledReservations: number
  completedReservations: number
  reservationsThisMonth: number
  totalRevenue: number
  revenueThisMonth: number
  averageBookingValue: number
  pendingPayments: number
  completedPayments: number
  refundedAmount: number
  unreadNotifications: number
  totalNotifications: number
  topCategory: string
  conversionRate: number
}

/**
 * API pour le dashboard admin
 */
class DashboardApi {
  /**
   * Récupère les statistiques du dashboard
   */
  async getStats(): Promise<DashboardStats> {
    const response = await api.get<ApiResponse<DashboardStats>>('/dashboard/stats')
    return response.data.data!
  }
}

export const dashboardApi = new DashboardApi()

