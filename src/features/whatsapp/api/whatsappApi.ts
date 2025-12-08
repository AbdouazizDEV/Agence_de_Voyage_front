import api from '@core/interceptors/auth.interceptor'

interface GenerateWhatsAppLinkRequest {
  offerId: string
  phone: string
  customerName: string
  customMessage: string
}

interface GenerateWhatsAppLinkResponse {
  success: boolean
  data: {
    link: string
  }
}

/**
 * API pour WhatsApp
 */
class WhatsAppApi {
  /**
   * Génère un lien WhatsApp pour une offre
   * Note: L'instance axios a déjà le baseURL configuré, on utilise donc un chemin relatif
   */
  async generateOfferLink(
    data: GenerateWhatsAppLinkRequest
  ): Promise<GenerateWhatsAppLinkResponse> {
    const response = await api.post<GenerateWhatsAppLinkResponse>(
      '/whatsapp/generate-link',
      data
    )
    return response.data
  }
}

export const whatsappApi = new WhatsAppApi()

