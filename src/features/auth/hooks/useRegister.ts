import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { authApi } from '../api/authApi'
import { AdminRegisterDto, ClientRegisterDto } from '../types/AuthApi.types'
import { useAuthStore } from '../store/authStore'
import { setTokens } from '../utils/tokenStorage'
import { routes } from '@config/routes.config'

type RegisterType = 'admin' | 'client'

/**
 * Hook pour l'inscription
 */
export const useRegister = (type: RegisterType = 'client') => {
  const navigate = useNavigate()
  const { setUser, setAuthenticated } = useAuthStore()

  return useMutation({
    mutationFn: (data: AdminRegisterDto | ClientRegisterDto) => {
      return type === 'admin'
        ? authApi.registerAdmin(data as AdminRegisterDto)
        : authApi.registerClient(data as ClientRegisterDto)
    },
    onSuccess: (response) => {
      setTokens(response.accessToken, response.refreshToken)
      setUser(response.user)
      setAuthenticated(true)
      toast.success('Inscription réussie')
      
      // Redirection selon le type d'utilisateur
      if (response.user.role === 'admin') {
        navigate(routes.admin.dashboard)
      } else {
        navigate(routes.client.dashboard)
      }
    },
    onError: (error: any) => {
      const message = error.response?.data?.error?.message || 'Erreur d\'inscription'
      toast.error(message)
    },
  })
}

