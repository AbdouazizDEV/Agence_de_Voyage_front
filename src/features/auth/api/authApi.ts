import { ApiResponse } from '@common/types/api.types'
import api from '@core/interceptors/auth.interceptor'
import {
  IAuthApi,
  LoginDto,
  AdminRegisterDto,
  ClientRegisterDto,
  RefreshTokenDto,
} from '../types/AuthApi.types'
import { AuthResponse } from '../types/AuthResponse'
import { AuthUser, AuthUserApiResponse } from '../types/AuthUser'

/**
 * Mappe la réponse API (camelCase) vers le format interne (snake_case)
 */
const mapApiUserToAuthUser = (apiUser: AuthUserApiResponse, defaultRole?: 'admin' | 'client'): AuthUser => {
  return {
    id: apiUser.id,
    email: apiUser.email,
    role: apiUser.role || defaultRole || 'client',
    first_name: apiUser.firstName,
    last_name: apiUser.lastName,
    phone: apiUser.phone,
  }
}

/**
 * Interface pour la réponse API brute
 */
interface AuthResponseApi {
  accessToken: string
  refreshToken: string
  user: AuthUserApiResponse
}

/**
 * Implémentation de l'API d'authentification
 */
class AuthApi implements IAuthApi {
  async loginAdmin(credentials: LoginDto): Promise<AuthResponse> {
    const response = await api.post<ApiResponse<AuthResponseApi>>(
      '/auth/admin/login',
      credentials
    )
    const apiData = response.data.data!
    return {
      accessToken: apiData.accessToken,
      refreshToken: apiData.refreshToken,
      user: mapApiUserToAuthUser({ ...apiData.user, role: 'admin' }),
    }
  }

  async registerAdmin(data: AdminRegisterDto): Promise<AuthResponse> {
    const response = await api.post<ApiResponse<AuthResponseApi>>(
      '/auth/admin/register',
      data
    )
    const apiData = response.data.data!
    return {
      accessToken: apiData.accessToken,
      refreshToken: apiData.refreshToken,
      user: mapApiUserToAuthUser({ ...apiData.user, role: 'admin' }),
    }
  }

  async loginClient(credentials: LoginDto): Promise<AuthResponse> {
    const response = await api.post<ApiResponse<AuthResponseApi>>(
      '/auth/client/login',
      credentials
    )
    const apiData = response.data.data!
    return {
      accessToken: apiData.accessToken,
      refreshToken: apiData.refreshToken,
      user: mapApiUserToAuthUser({ ...apiData.user, role: 'client' }),
    }
  }

  async registerClient(data: ClientRegisterDto): Promise<AuthResponse> {
    const response = await api.post<ApiResponse<AuthResponseApi>>(
      '/auth/client/register',
      data
    )
    const apiData = response.data.data!
    return {
      accessToken: apiData.accessToken,
      refreshToken: apiData.refreshToken,
      user: mapApiUserToAuthUser({ ...apiData.user, role: 'client' }),
    }
  }

  async refreshToken(token: string): Promise<AuthResponse> {
    const response = await api.post<ApiResponse<AuthResponseApi>>(
      '/auth/refresh',
      { refreshToken: token } as RefreshTokenDto
    )
    const apiData = response.data.data!
    // Le role devrait être dans la réponse du refresh token
    const userRole = apiData.user.role || 'client'
    return {
      accessToken: apiData.accessToken,
      refreshToken: apiData.refreshToken,
      user: mapApiUserToAuthUser(apiData.user, userRole),
    }
  }

  async logout(): Promise<void> {
    await api.post('/auth/logout')
  }

  async getAdminProfile(): Promise<AuthUser> {
    const response = await api.get<ApiResponse<AuthUserApiResponse>>('/auth/admin/profile')
    return mapApiUserToAuthUser({ ...response.data.data!, role: 'admin' })
  }

  async getClientProfile(): Promise<AuthUser> {
    const response = await api.get<ApiResponse<AuthUserApiResponse>>('/auth/client/profile')
    return mapApiUserToAuthUser({ ...response.data.data!, role: 'client' })
  }
}

export const authApi = new AuthApi()

