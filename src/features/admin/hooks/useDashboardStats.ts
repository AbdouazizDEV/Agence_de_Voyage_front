import { useQuery } from '@tanstack/react-query'
import { dashboardApi } from '../api/dashboardApi'

/**
 * Hook pour récupérer les statistiques du dashboard
 */
export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: () => dashboardApi.getStats(),
    refetchInterval: 30000, // Rafraîchir toutes les 30 secondes
  })
}

