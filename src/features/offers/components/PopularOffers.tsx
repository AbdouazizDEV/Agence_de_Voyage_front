import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '@common/components/ui/Button'
import { OfferSearchCard } from './OfferSearchCard'
import { Loading } from '@common/components/feedback/Loading'
import { Error } from '@common/components/feedback/Error'
import { usePopularOffers } from '../hooks/usePopularOffers'
import { useWhatsApp } from '@features/whatsapp/hooks/useWhatsApp'
import { routes } from '@config/routes.config'

/**
 * Section des offres populaires (destinations les plus réservées)
 */
export const PopularOffers = () => {
  const navigate = useNavigate()
  const { data: offers, isLoading, error } = usePopularOffers()
  const { handleOfferWhatsApp } = useWhatsApp()

  const handleViewMore = () => {
    navigate(routes.offers, {
      state: {
        searchRequest: {
          sortBy: 'bookings',
          sortOrder: 'desc',
          page: 1,
          limit: 12,
        },
      },
    })
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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Destinations Populaires
          </h2>
          <p className="text-lg text-gray-600">
            Découvrez les destinations les plus réservées par nos voyageurs
          </p>
        </div>

        {isLoading && <Loading message="Chargement des destinations populaires..." />}
        
        {error && (
          <Error
            message="Erreur lors du chargement des destinations populaires"
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
                  Voir plus de destinations populaires
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

