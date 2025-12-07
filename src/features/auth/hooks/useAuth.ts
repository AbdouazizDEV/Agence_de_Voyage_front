import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '../store/authStore'
import { authApi } from '../api/authApi'
import { AuthUser } from '../types/AuthUser'
import { getAccessToken } from '../utils/tokenStorage'

/**
 * Hook principal pour l'authentification
 */
export const useAuth = () => {
  const { user, setUser, setAuthenticated, isAuthenticated } = useAuthStore()
  const token = getAccessToken()

  // Essayer de récupérer le profil si on a un token mais pas d'utilisateur
  const { data: profile, isLoading } = useQuery<AuthUser>({
    queryKey: ['auth', 'profile'],
    queryFn: async () => {
      // Essayer d'abord avec admin, puis client
      try {
        return await authApi.getAdminProfile()
      } catch {
        return await authApi.getClientProfile()
      }
    },
    enabled: !!token && isAuthenticated && !user,
    retry: false,
  })

  useEffect(() => {
    if (profile) {
      setUser(profile)
      setAuthenticated(true)
    }
  }, [profile, setUser, setAuthenticated])

  return {
    user,
    isAuthenticated,
    isLoading,
  }
}

