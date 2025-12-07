import { AuthUser } from './AuthUser'

/**
 * Réponse d'authentification
 */
export interface AuthResponse {
  user: AuthUser
  accessToken: string
  refreshToken: string
}

