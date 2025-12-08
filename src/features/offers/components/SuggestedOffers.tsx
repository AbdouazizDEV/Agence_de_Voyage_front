import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '@common/components/ui/Button'
import { OfferSearchCard } from './OfferSearchCard'
import { Loading } from '@common/components/feedback/Loading'
import { Error } from '@common/components/feedback/Error'
import { useSuggestedOffers } from '../hooks/useSuggestedOffers'
import { useWhatsApp } from '@features/whatsapp/hooks/useWhatsApp'
import { routes } from '@config/routes.config'

/**
 * Section des suggestions d'offres
 */
export const SuggestedOffers = () => {
  const navigate = useNavigate()
  const { data: offers, isLoading, error } = useSuggestedOffers()
  const { handleOfferWhatsApp } = useWhatsApp()

  const handleViewMore = () => {
    navigate(routes.offers)
  }

  const handleViewDetails = (offerId: string) => {
    navigate(routes.offerDetails(offerId))
  }

  const handleWhatsApp = (offerId: string) => {
    const offer = offers?.find((o) => o.id === offerId)
    if (offer) {
      handleOfferWhatsApp(offerId, offer.title)
    }
  }

  // Afficher seulement les 4 premières offres
  const displayedOffers = offers?.slice(0, 4) || []

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Suggestions Pour Vous
          </h2>
          <p className="text-lg text-gray-600">
            Des offres personnalisées sélectionnées spécialement pour vous
          </p>
        </div>

        {isLoading && <Loading message="Chargement des suggestions..." />}
        
        {error && (
          <Error
            message="Erreur lors du chargement des suggestions"
            onRetry={() => window.location.reload()}
          />
        )}

        {!isLoading && !error && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {displayedOffers.map((offer) => (
                <OfferSearchCard
                  key={offer.id}
                  offer={offer}
                  onViewDetails={handleViewDetails}
                  onWhatsApp={handleWhatsApp}
                />
              ))}
            </div>

            {offers && offers.length > 4 && (
              <div className="text-center">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleViewMore}
                  className="inline-flex items-center gap-2"
                >
                  Voir plus de suggestions
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}

