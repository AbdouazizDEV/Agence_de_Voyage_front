/**
 * Configuration de l'API
 */
import { envConfig } from './env.config'

export const apiConfig = {
  baseURL: envConfig.apiUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
} as const

