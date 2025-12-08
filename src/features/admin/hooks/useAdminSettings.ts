import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { adminSettingsApi, UpdateSettingsDto } from '../api/adminSettingsApi'
import { toast } from 'sonner'

/**
 * Hook pour récupérer les paramètres admin
 */
export const useAdminSettings = () => {
  return useQuery({
    queryKey: ['admin', 'settings'],
    queryFn: () => adminSettingsApi.getSettings(),
  })
}

/**
 * Hook pour mettre à jour les paramètres admin
 */
export const useUpdateSettings = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateSettingsDto) => adminSettingsApi.updateSettings(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'settings'] })
      toast.success('Configuration mise à jour avec succès')
    },
    onError: (error: unknown) => {
      const message =
        (error as { response?: { data?: { error?: { message?: string } } } })?.response?.data
          ?.error?.message || 'Erreur lors de la mise à jour de la configuration'
      toast.error(message)
    },
  })
}

