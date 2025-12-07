import { useQuery } from '@tanstack/react-query'
import { offersApi } from '../api/offersApi'

/**
 * Hook pour récupérer les offres populaires
 */
export const usePopularOffers = () => {
  return useQuery({
    queryKey: ['offers', 'popular'],
    queryFn: () => offersApi.getPopularOffers(),
  })
}

