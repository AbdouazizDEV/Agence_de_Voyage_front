import { useQuery } from '@tanstack/react-query'
import { offersApi } from '../api/offersApi'
import { SearchParams } from '../types/offers.types'

/**
 * Hook pour récupérer les offres avec filtres et pagination
 */
export const useOffers = (params: SearchParams = {}) => {
  return useQuery({
    queryKey: ['offers', params],
    queryFn: () => offersApi.getAll(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

