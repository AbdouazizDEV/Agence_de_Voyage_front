import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { authApi } from '../api/authApi'
import { useAuthStore } from '../store/authStore'
import { clearTokens } from '../utils/tokenStorage'
import { routes } from '@config/routes.config'

/**
 * Hook pour la déconnexion
 */
export const useLogout = () => {
  const navigate = useNavigate()
  const { logout } = useAuthStore()

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      clearTokens()
      logout()
      toast.success('Déconnexion réussie')
      navigate(routes.home)
    },
    onError: () => {
      // Même en cas d'erreur, on déconnecte localement
      clearTokens()
      logout()
      navigate(routes.home)
    },
  })
}

