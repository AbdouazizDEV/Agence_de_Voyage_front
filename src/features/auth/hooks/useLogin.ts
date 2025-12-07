import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { authApi } from '../api/authApi'
import { LoginDto } from '../types/AuthApi.types'
import { useAuthStore } from '../store/authStore'
import { setTokens } from '../utils/tokenStorage'
import { routes } from '@config/routes.config'

type LoginType = 'admin' | 'client'

/**
 * Hook pour la connexion
 */
export const useLogin = (type: LoginType = 'client') => {
  const navigate = useNavigate()
  const { setUser, setAuthenticated } = useAuthStore()

  return useMutation({
    mutationFn: (credentials: LoginDto) => {
      return type === 'admin'
        ? authApi.loginAdmin(credentials)
        : authApi.loginClient(credentials)
    },
    onSuccess: (data) => {
      setTokens(data.accessToken, data.refreshToken)
      setUser(data.user)
      setAuthenticated(true)
      toast.success('Connexion réussie')
      
      // Redirection selon le type d'utilisateur
      if (data.user.role === 'admin') {
        navigate(routes.admin.dashboard)
      } else {
        navigate(routes.client.dashboard)
      }
    },
    onError: (error: any) => {
      const message = error.response?.data?.error?.message || 'Erreur de connexion'
      toast.error(message)
    },
  })
}

