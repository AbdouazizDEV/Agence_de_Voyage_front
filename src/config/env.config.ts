/**
 * Configuration des variables d'environnement
 */
export const envConfig = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1',
  appEnv: import.meta.env.VITE_APP_ENV || 'development',
} as const

