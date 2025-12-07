import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { apiConfig } from '@config/api.config'
import { getAccessToken, getRefreshToken, setTokens, clearTokens } from '@features/auth/utils/tokenStorage'

/**
 * Instance Axios configurée avec interceptors
 */
const api = axios.create({
  baseURL: apiConfig.baseURL,
  timeout: apiConfig.timeout,
  headers: apiConfig.headers,
})

/**
 * Request Interceptor - Ajoute le token d'authentification
 */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken()
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => Promise.reject(error)
)

/**
 * Response Interceptor - Gère le refresh token automatique
 */
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

    // Si erreur 401 et pas déjà tenté de refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = getRefreshToken()
        if (!refreshToken) {
          throw new Error('No refresh token')
        }

        // Appel API pour refresh
        const response = await axios.post(
          `${apiConfig.baseURL}/auth/refresh`,
          { refreshToken }
        )

        const { accessToken, refreshToken: newRefreshToken } = response.data.data
        setTokens(accessToken, newRefreshToken)

        // Retry la requête originale
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`
        }
        return api(originalRequest)
      } catch (refreshError) {
        // Refresh échoué - déconnexion
        clearTokens()
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default api

