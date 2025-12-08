import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { adminOffersApi, CreateOfferDto, UpdateOfferDto } from '../api/adminOffersApi'
import { SearchParams } from '@features/offers/types/offers.types'
import { toast } from 'sonner'

/**
 * Hook pour récupérer les offres admin avec pagination et filtres
 */
export const useAdminOffers = (params: SearchParams & { isActive?: boolean } = {}) => {
  return useQuery({
    queryKey: ['admin', 'offers', params],
    queryFn: () => adminOffersApi.getAll(params),
  })
}

/**
 * Hook pour créer une nouvelle offre
 */
export const useCreateOffer = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateOfferDto) => adminOffersApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'offers'] })
      toast.success('Offre créée avec succès')
    },
    onError: (error: unknown) => {
      const message =
        (error as { response?: { data?: { error?: { message?: string } } } })?.response?.data
          ?.error?.message || 'Erreur lors de la création de l\'offre'
      toast.error(message)
    },
  })
}

/**
 * Hook pour mettre à jour une offre
 */
export const useUpdateOffer = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ offerId, data }: { offerId: string; data: UpdateOfferDto }) =>
      adminOffersApi.update(offerId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'offers'] })
      toast.success('Offre mise à jour avec succès')
    },
    onError: (error: unknown) => {
      const message =
        (error as { response?: { data?: { error?: { message?: string } } } })?.response?.data
          ?.error?.message || 'Erreur lors de la mise à jour de l\'offre'
      toast.error(message)
    },
  })
}

/**
 * Hook pour basculer le statut d'une offre
 */
export const useToggleOfferStatus = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (offerId: string) => adminOffersApi.toggleStatus(offerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'offers'] })
      toast.success('Statut de l\'offre modifié')
    },
    onError: (error: unknown) => {
      const message =
        (error as { response?: { data?: { error?: { message?: string } } } })?.response?.data
          ?.error?.message || 'Erreur lors de la modification du statut'
      toast.error(message)
    },
  })
}

/**
 * Hook pour dupliquer une offre
 */
export const useDuplicateOffer = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (offerId: string) => adminOffersApi.duplicate(offerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'offers'] })
      toast.success('Offre dupliquée avec succès')
    },
    onError: (error: unknown) => {
      const message =
        (error as { response?: { data?: { error?: { message?: string } } } })?.response?.data
          ?.error?.message || 'Erreur lors de la duplication de l\'offre'
      toast.error(message)
    },
  })
}

/**
 * Hook pour supprimer une offre
 */
export const useDeleteOffer = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (offerId: string) => adminOffersApi.delete(offerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'offers'] })
      toast.success('Offre supprimée avec succès')
    },
    onError: (error: unknown) => {
      const message =
        (error as { response?: { data?: { error?: { message?: string } } } })?.response?.data
          ?.error?.message || 'Erreur lors de la suppression de l\'offre'
      toast.error(message)
    },
  })
}

