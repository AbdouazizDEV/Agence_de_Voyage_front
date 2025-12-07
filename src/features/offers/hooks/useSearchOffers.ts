import { useMutation } from '@tanstack/react-query'
import { offersApi } from '../api/offersApi'
import { SearchRequest } from '../types/search.types'

/**
 * Hook pour la recherche avancée d'offres
 */
export const useSearchOffers = () => {
  return useMutation({
    mutationFn: (request: SearchRequest) => offersApi.search(request),
  })
}

