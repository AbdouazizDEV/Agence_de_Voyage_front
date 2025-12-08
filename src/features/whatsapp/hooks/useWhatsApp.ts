import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '@features/auth/store/authStore'
import { whatsappApi } from '../api/whatsappApi'
import { routes } from '@config/routes.config'
import { toast } from 'sonner'

const TRAVEL_AGENCY_PHONE = '+221761885485'

/**
 * Hook pour gérer les interactions WhatsApp
 */
export const useWhatsApp = () => {
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuthStore()

  /**
   * Génère un message personnalisé pour une offre
   */
  const generateOfferMessage = (offerTitle: string): string => {
    return `Bonjour, je suis intéressé(e) par l'offre : ${offerTitle}. Pourriez-vous me fournir plus d'informations ?`
  }

  /**
   * Mutation pour générer le lien WhatsApp d'une offre
   */
  const generateOfferLinkMutation = useMutation({
    mutationFn: async (offerId: string) => {
      if (!user) {
        throw new Error('User not authenticated')
      }

      // Récupérer le titre de l'offre (on peut le passer en paramètre si nécessaire)
      const customMessage = generateOfferMessage('')
      const customerName = `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.email

      return await whatsappApi.generateOfferLink({
        offerId,
        phone: TRAVEL_AGENCY_PHONE,
        customerName,
        customMessage,
      })
    },
    onSuccess: (data) => {
      // Ouvrir le lien WhatsApp dans un nouvel onglet
      window.open(data.data.link, '_blank')
    },
    onError: (error: any) => {
      const message = error.response?.data?.error?.message || 'Erreur lors de la génération du lien WhatsApp'
      toast.error(message)
    },
  })

  /**
   * Gère le clic sur le bouton WhatsApp pour une offre
   * Si l'utilisateur est connecté, génère le lien via l'API
   * Sinon, redirige vers la page de connexion
   */
  const handleOfferWhatsApp = (offerId: string, offerTitle?: string) => {
    if (!isAuthenticated || !user) {
      // Rediriger vers la page de connexion
      navigate(routes.login)
      return
    }

    // Générer le message avec le titre de l'offre si fourni
    const customMessage = offerTitle 
      ? generateOfferMessage(offerTitle)
      : 'Bonjour, je suis intéressé(e) par cette offre. Pourriez-vous me fournir plus d\'informations ?'

    const customerName = `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.email

    // Appeler l'API pour générer le lien
    whatsappApi
      .generateOfferLink({
        offerId,
        phone: TRAVEL_AGENCY_PHONE,
        customerName,
        customMessage,
      })
      .then((response) => {
        window.open(response.data.link, '_blank')
      })
      .catch((error: any) => {
        const message = error.response?.data?.error?.message || 'Erreur lors de la génération du lien WhatsApp'
        toast.error(message)
      })
  }

  /**
   * Génère un lien WhatsApp direct vers le numéro de TravelAgency
   * Utilisé pour le Footer
   * Note: wa.me nécessite le numéro sans le signe +
   */
  const handleDirectWhatsApp = (message?: string) => {
    const defaultMessage = 'Bonjour, je souhaite obtenir plus d\'informations sur vos offres de voyage.'
    const finalMessage = message || defaultMessage
    // Enlever le + du numéro pour l'URL WhatsApp
    const phoneNumber = TRAVEL_AGENCY_PHONE.replace('+', '')
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(finalMessage)}`
    window.open(whatsappLink, '_blank')
  }

  return {
    handleOfferWhatsApp,
    handleDirectWhatsApp,
    generateOfferLinkMutation,
    isAuthenticated,
  }
}

