import { AdminLayout } from '@common/components/layout/AdminLayout'
import { MetricCard } from '@features/admin/components/MetricCard'
import { CategoryStats } from '@features/admin/components/CategoryStats'
import { RecentInquiries } from '@features/admin/components/RecentInquiries'
import { RevenueChart } from '@features/admin/components/RevenueChart'
import { ReservationsChart } from '@features/admin/components/ReservationsChart'
import { useDashboardStats } from '@features/admin/hooks/useDashboardStats'
import { Loading } from '@common/components/feedback/Loading'
import { Error } from '@common/components/feedback/Error'
import {
  MessageCircle,
  Tag,
  Users,
  Star,
  DollarSign,
  Calendar,
  Bell,
  TrendingUp,
} from 'lucide-react'

/**
 * Page Dashboard Admin avec données dynamiques
 */
export const AdminDashboardPage = () => {
  const { data: stats, isLoading, error } = useDashboardStats()

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <Loading message="Chargement des statistiques..." />
        </div>
      </AdminLayout>
    )
  }

  if (error) {
    return (
      <AdminLayout>
        <Error
          message="Erreur lors du chargement des statistiques"
          onRetry={() => window.location.reload()}
        />
      </AdminLayout>
    )
  }

  if (!stats) {
    return null
  }

  // Calculer les variations (mockées pour l'instant, à remplacer par des données historiques)
  const calculateChange = (current: number, previous: number = current * 0.95) => {
    const change = ((current - previous) / previous) * 100
    return {
      value: `${Math.abs(change).toFixed(1)}%`,
      isPositive: change >= 0,
    }
  }

  // Données mockées pour les catégories (à remplacer par une vraie API)
  const categoryData = [
    { name: stats.topCategory || 'Séjours', value: stats.totalReservations * 0.4 },
    { name: 'Aventure', value: stats.totalReservations * 0.25 },
    { name: 'Plage', value: stats.totalReservations * 0.2 },
    { name: 'Ville', value: stats.totalReservations * 0.1 },
    { name: 'Croisière', value: stats.totalReservations * 0.05 },
  ]

  // Données mockées pour les inquiries récentes (à remplacer par une vraie API)
  const recentInquiries = [
    {
      id: '1',
      name: 'Client Récent',
      offer: 'Offre Premium',
      timeAgo: '2m ago',
    },
    {
      id: '2',
      name: 'Nouveau Client',
      offer: 'Offre Standard',
      timeAgo: '1h ago',
    },
  ]

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Overview of key metrics and recent activity.</p>
      </div>

      {/* Key Metrics - Première ligne */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <MetricCard
          title="Total Reservations"
          value={stats.totalReservations.toLocaleString()}
          change={calculateChange(stats.totalReservations, stats.totalReservations - stats.reservationsThisMonth)}
          icon={<Calendar className="h-6 w-6" />}
          iconBgColor="bg-blue-100"
        />
        <MetricCard
          title="Active Offers"
          value={stats.activeOffers}
          change={calculateChange(stats.activeOffers)}
          icon={<Tag className="h-6 w-6" />}
          iconBgColor="bg-purple-100"
        />
        <MetricCard
          title="Total Clients"
          value={stats.totalClients.toLocaleString()}
          change={calculateChange(stats.totalClients, stats.totalClients - stats.newClientsThisMonth)}
          icon={<Users className="h-6 w-6" />}
          iconBgColor="bg-green-100"
        />
        <MetricCard
          title="Average Rating"
          value={stats.averageRating.toFixed(1)}
          icon={<Star className="h-6 w-6" />}
          iconBgColor="bg-yellow-100"
        />
      </div>

      {/* Key Metrics - Deuxième ligne */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total Revenue"
          value={new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'XOF',
            minimumFractionDigits: 0,
          }).format(stats.totalRevenue)}
          change={calculateChange(stats.revenueThisMonth)}
          icon={<DollarSign className="h-6 w-6" />}
          iconBgColor="bg-emerald-100"
        />
        <MetricCard
          title="Pending Reservations"
          value={stats.pendingReservations}
          icon={<MessageCircle className="h-6 w-6" />}
          iconBgColor="bg-orange-100"
        />
        <MetricCard
          title="Promotions"
          value={stats.promotions}
          icon={<Tag className="h-6 w-6" />}
          iconBgColor="bg-pink-100"
        />
        <MetricCard
          title="Unread Notifications"
          value={stats.unreadNotifications}
          icon={<Bell className="h-6 w-6" />}
          iconBgColor="bg-red-100"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Revenue Chart */}
        <RevenueChart
          totalRevenue={stats.totalRevenue}
          revenueThisMonth={stats.revenueThisMonth}
          averageBookingValue={stats.averageBookingValue}
        />

        {/* Reservations Chart */}
        <ReservationsChart
          totalReservations={stats.totalReservations}
          pendingReservations={stats.pendingReservations}
          confirmedReservations={stats.confirmedReservations}
          cancelledReservations={stats.cancelledReservations}
          completedReservations={stats.completedReservations}
          reservationsThisMonth={stats.reservationsThisMonth}
        />
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Statistics per Category */}
        <CategoryStats
          title="Statistics per Category"
          subtitle="Reservations by Category"
          total={stats.totalReservations}
          change={`Top: ${stats.topCategory}`}
          data={categoryData}
        />

        {/* Recent Inquiries */}
        <RecentInquiries inquiries={recentInquiries} />
      </div>
    </AdminLayout>
  )
}

