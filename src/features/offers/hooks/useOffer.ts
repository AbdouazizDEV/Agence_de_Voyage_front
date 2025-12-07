import { useQuery } from '@tanstack/react-query'
import { offersApi } from '../api/offersApi'
import { OfferDetails } from '../types/offerDetails.types'

/**
 * Hook pour récupérer les détails d'une offre
 */
export const useOffer = (id: string | undefined) => {
  return useQuery<OfferDetails>({
    queryKey: ['offer', id],
    queryFn: () => {
      if (!id) throw new Error('Offer ID is required')
      return offersApi.getById(id)
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

