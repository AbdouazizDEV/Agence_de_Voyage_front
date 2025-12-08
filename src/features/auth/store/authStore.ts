import { create } from 'zustand'
import { AuthUser } from '../types/AuthUser'
import { getAccessToken, clearTokens } from '../utils/tokenStorage'

interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  setUser: (user: AuthUser | null) => void
  setAuthenticated: (isAuthenticated: boolean) => void
  setLoading: (isLoading: boolean) => void
  logout: () => void
}

/**
 * Store Zustand pour l'authentification
 */
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: !!getAccessToken(),
  isLoading: false,
  setUser: (user) => set({ user }),
  setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setLoading: (isLoading) => set({ isLoading }),
  logout: () => {
    clearTokens()
    set({ user: null, isAuthenticated: false })
  },
}))

