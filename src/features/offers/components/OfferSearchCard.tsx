import { MessageCircle } from 'lucide-react'
import { Button } from '@common/components/ui/Button'
import { Card } from '@common/components/ui/Card'
import { OfferSearchResult } from '../types/offers.types'
import { formatCurrency } from '@common/utils/formatters'
import { routes } from '@config/routes.config'
import { useNavigate } from 'react-router-dom'

interface OfferSearchCardProps {
  offer: OfferSearchResult
  onViewDetails?: (offerId: string) => void
  onWhatsApp?: (offerId: string) => void
}

/**
 * Carte d'offre pour les résultats de recherche
 */
export const OfferSearchCard = ({
  offer,
  onViewDetails,
  onWhatsApp,
}: OfferSearchCardProps) => {
  const navigate = useNavigate()

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(offer.id)
    } else {
      navigate(routes.offerDetails(offer.id))
    }
  }

  const handleWhatsApp = () => {
    if (onWhatsApp) {
      onWhatsApp(offer.id)
    } else {
      // TODO: Implémenter l'intégration WhatsApp
      window.open(`https://wa.me/?text=${encodeURIComponent(`I'm interested in ${offer.title}`)}`, '_blank')
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <img
          src={offer.image}
          alt={offer.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {offer.title}
        </h3>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xl font-bold text-primary-600">
            From {formatCurrency(offer.price, offer.currency || 'USD')}
          </span>
          <span className="text-sm text-gray-600">
            {offer.duration} Days / {offer.nights} Nights
          </span>
        </div>
        <div className="flex gap-2">
          <Button
            variant="primary"
            size="sm"
            className="flex-1"
            onClick={handleViewDetails}
          >
            View Details
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 bg-green-50 border-green-500 text-green-700 hover:bg-green-100"
            onClick={handleWhatsApp}
          >
            <MessageCircle className="h-4 w-4 mr-1" />
            WhatsApp
          </Button>
        </div>
      </div>
    </Card>
  )
}

