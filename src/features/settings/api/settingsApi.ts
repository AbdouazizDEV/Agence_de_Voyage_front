import api from '@core/interceptors/auth.interceptor'
import { ApiResponse } from '@common/types/api.types'
import { AdminSettings } from '@features/admin/api/adminSettingsApi'

/**
 * API publique pour récupérer les paramètres
 * Utilise l'endpoint admin (avec token si disponible) mais gère gracieusement les erreurs
 */
class PublicSettingsApi {
  /**
   * Récupère les paramètres publics de l'application
   * Si l'endpoint admin nécessite une auth et qu'on n'a pas de token, retourne des valeurs par défaut
   */
  async getPublicSettings(): Promise<AdminSettings> {
    try {
      // Utiliser l'instance api qui ajoutera automatiquement le token si disponible
      const response = await api.get<ApiResponse<AdminSettings>>('/admin/settings')
      return response.data.data!
    } catch (error: any) {
      // Si l'endpoint nécessite une auth et qu'on n'a pas de token (401/403)
      // ou si une autre erreur survient, retourner des valeurs par défaut
      if (error.response?.status === 401 || error.response?.status === 403) {
        console.info('Settings endpoint requires authentication, using defaults')
      } else {
        console.warn('Failed to fetch public settings, using defaults', error)
      }
      return this.getDefaultSettings()
    }
  }

  /**
   * Retourne les paramètres par défaut
   */
  private getDefaultSettings(): AdminSettings {
    return {
      company: {
        name: 'Travel Agency',
        email: 'contact@travelagency.sn',
        phone: '221761885485',
        whatsappNumber: '221761885485',
        address: 'Dakar, Sénégal',
        description: 'Votre agence de voyage de confiance',
      },
      whatsapp: {
        enabled: true,
        phoneNumber: '221761885485',
        messageTemplate: 'Bonjour, je suis intéressé(e) par...',
      },
      general: {
        currency: 'FCFA',
        timezone: 'Africa/Dakar',
        language: 'fr',
      },
    }
  }
}

export const publicSettingsApi = new PublicSettingsApi()

