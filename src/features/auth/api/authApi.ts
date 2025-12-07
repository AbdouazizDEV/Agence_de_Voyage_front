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
import { AuthUser } from '../types/AuthUser'

/**
 * Implémentation de l'API d'authentification
 */
class AuthApi implements IAuthApi {
  async loginAdmin(credentials: LoginDto): Promise<AuthResponse> {
    const response = await api.post<ApiResponse<AuthResponse>>(
      '/auth/admin/login',
      credentials
    )
    return response.data.data!
  }

  async registerAdmin(data: AdminRegisterDto): Promise<AuthResponse> {
    const response = await api.post<ApiResponse<AuthResponse>>(
      '/auth/admin/register',
      data
    )
    return response.data.data!
  }

  async loginClient(credentials: LoginDto): Promise<AuthResponse> {
    const response = await api.post<ApiResponse<AuthResponse>>(
      '/auth/client/login',
      credentials
    )
    return response.data.data!
  }

  async registerClient(data: ClientRegisterDto): Promise<AuthResponse> {
    const response = await api.post<ApiResponse<AuthResponse>>(
      '/auth/client/register',
      data
    )
    return response.data.data!
  }

  async refreshToken(token: string): Promise<AuthResponse> {
    const response = await api.post<ApiResponse<AuthResponse>>(
      '/auth/refresh',
      { refreshToken: token } as RefreshTokenDto
    )
    return response.data.data!
  }

  async logout(): Promise<void> {
    await api.post('/auth/logout')
  }

  async getAdminProfile(): Promise<AuthUser> {
    const response = await api.get<ApiResponse<AuthUser>>('/auth/admin/profile')
    return response.data.data!
  }

  async getClientProfile(): Promise<AuthUser> {
    const response = await api.get<ApiResponse<AuthUser>>('/auth/client/profile')
    return response.data.data!
  }
}

export const authApi = new AuthApi()

