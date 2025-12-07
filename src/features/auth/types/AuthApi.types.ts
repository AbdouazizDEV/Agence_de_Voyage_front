import { AuthResponse } from './AuthResponse'
import { AuthUser } from './AuthUser'

/**
 * DTO pour la connexion
 */
export interface LoginDto {
  email: string
  password: string
}

/**
 * DTO pour l'inscription Admin
 */
export interface AdminRegisterDto {
  email: string
  password: string
  first_name: string
  last_name: string
}

/**
 * DTO pour l'inscription Client
 */
export interface ClientRegisterDto {
  email: string
  password: string
  first_name: string
  last_name: string
  phone?: string
}

/**
 * DTO pour le refresh token
 */
export interface RefreshTokenDto {
  refreshToken: string
}

/**
 * Interface pour l'API d'authentification
 */
export interface IAuthApi {
  loginAdmin(credentials: LoginDto): Promise<AuthResponse>
  registerAdmin(data: AdminRegisterDto): Promise<AuthResponse>
  loginClient(credentials: LoginDto): Promise<AuthResponse>
  registerClient(data: ClientRegisterDto): Promise<AuthResponse>
  refreshToken(token: string): Promise<AuthResponse>
  logout(): Promise<void>
  getAdminProfile(): Promise<AuthUser>
  getClientProfile(): Promise<AuthUser>
}

