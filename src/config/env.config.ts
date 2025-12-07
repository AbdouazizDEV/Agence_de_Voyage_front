/**
 * Configuration des variables d'environnement
 */
import { productionConfig } from '../environnement/production.config'

// En développement, utiliser le proxy Vite pour éviter les problèmes CORS
// En production, utiliser l'URL complète de l'API
const isDevelopment = import.meta.env.DEV

export const envConfig = {
  apiUrl: isDevelopment
    ? '/api/v1' // Utilise le proxy Vite en développement
    : import.meta.env.VITE_API_URL || productionConfig.apiUrl,
  appEnv: import.meta.env.VITE_APP_ENV || (isDevelopment ? 'development' : 'production'),
} as const

