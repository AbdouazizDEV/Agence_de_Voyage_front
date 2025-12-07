/**
 * Types pour les utilisateurs authentifiés
 */
export type UserRole = 'admin' | 'client'

export interface AuthUser {
  id: string
  email: string
  role: UserRole
  first_name?: string
  last_name?: string
  phone?: string
}

