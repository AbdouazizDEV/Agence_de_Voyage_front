import { useQuery } from '@tanstack/react-query'
import { offersApi } from '../api/offersApi'

/**
 * Hook pour récupérer les suggestions d'offres
 */
export const useSuggestedOffers = () => {
  return useQuery({
    queryKey: ['offers', 'suggestions'],
    queryFn: () => offersApi.getSuggestedOffers(),
  })
}

