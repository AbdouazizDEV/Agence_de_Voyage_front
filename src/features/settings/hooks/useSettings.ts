import { useQuery } from '@tanstack/react-query'
import { publicSettingsApi } from '../api/settingsApi'

/**
 * Hook pour récupérer les paramètres publics de l'application
 * Utilisé dans le Footer et autres composants publics
 */
export const useSettings = () => {
  return useQuery({
    queryKey: ['settings', 'public'],
    queryFn: () => publicSettingsApi.getPublicSettings(),
    staleTime: 5 * 60 * 1000, // Cache pendant 5 minutes
    retry: 1, // Ne réessayer qu'une fois en cas d'erreur
    refetchOnWindowFocus: false, // Ne pas refetch au focus de la fenêtre
  })
}

