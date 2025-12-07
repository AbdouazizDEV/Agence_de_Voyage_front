import { useQuery } from '@tanstack/react-query'
import { offersApi } from '../api/offersApi'

/**
 * Hook pour récupérer les offres en promotion
 */
export const usePromotionalOffers = () => {
  return useQuery({
    queryKey: ['offers', 'promotional'],
    queryFn: () => offersApi.getPromotionalOffers(),
  })
}

