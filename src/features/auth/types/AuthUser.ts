/**
 * Types pour les utilisateurs authentifiés
 */
export type UserRole = 'admin' | 'client'

/**
 * Réponse utilisateur depuis l'API (format camelCase)
 * Note: Pour admin, le champ "role" est présent dans la réponse
 * Pour client, le champ "role" n'est pas présent
 */
export interface AuthUserApiResponse {
  id: string
  email: string
  firstName?: string
  lastName?: string
  phone?: string
  role?: UserRole // Présent pour admin, absent pour client
}

/**
 * Utilisateur authentifié (format interne snake_case pour compatibilité)
 */
export interface AuthUser {
  id: string
  email: string
  role: UserRole
  first_name?: string
  last_name?: string
  phone?: string
}

