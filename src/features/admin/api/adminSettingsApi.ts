import { ApiResponse } from '@common/types/api.types'
import api from '@core/interceptors/auth.interceptor'

export interface CompanySettings {
  name: string
  email: string
  phone: string
  whatsappNumber: string
  address: string
  description: string
}

export interface WhatsAppSettings {
  enabled: boolean
  phoneNumber: string
  messageTemplate: string
}

export interface GeneralSettings {
  currency: string
  timezone: string
  language: string
}

export interface AdminSettings {
  company: CompanySettings
  whatsapp: WhatsAppSettings
  general: GeneralSettings
}

export interface UpdateSettingsDto {
  companyName: string
  companyEmail: string
  companyPhone: string
  whatsappNumber: string
  address: string
  description: string
  currency: string
  whatsappMessageTemplate: string
  whatsappEnabled: boolean
}

/**
 * API pour la gestion des paramètres admin
 */
class AdminSettingsApi {
  /**
   * Récupère les paramètres de l'application
   */
  async getSettings(): Promise<AdminSettings> {
    const response = await api.get<ApiResponse<AdminSettings>>('/admin/settings')
    return response.data.data!
  }

  /**
   * Met à jour les paramètres de l'application
   */
  async updateSettings(data: UpdateSettingsDto): Promise<AdminSettings> {
    const response = await api.put<ApiResponse<AdminSettings>>('/admin/settings', data)
    return response.data.data!
  }
}

export const adminSettingsApi = new AdminSettingsApi()

