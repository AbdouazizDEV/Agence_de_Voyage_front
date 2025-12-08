import { MessageCircle } from 'lucide-react'
import { Button } from '@common/components/ui/Button'
import { Card } from '@common/components/ui/Card'
import { Badge } from '@common/components/ui/Badge'
import { OfferSearchResult } from '../types/offers.types'
import { formatCurrency } from '@common/utils/formatters'
import { routes } from '@config/routes.config'
import { useNavigate } from 'react-router-dom'
import { useWhatsApp } from '@features/whatsapp/hooks/useWhatsApp'

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
  const { handleOfferWhatsApp } = useWhatsApp()

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
      handleOfferWhatsApp(offer.id, offer.title)
    }
  }

  // Calculer le prix avec promotion si applicable
  const finalPrice = offer.is_promotion && offer.promotion_discount
    ? offer.price * (1 - offer.promotion_discount / 100)
    : offer.price

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <img
          src={offer.images?.[0] || 'https://via.placeholder.com/400x300'}
          alt={offer.title}
          className="w-full h-full object-cover"
        />
        {offer.is_promotion && offer.promotion_discount && (
          <Badge
            variant="destructive"
            className="absolute top-2 right-2"
          >
            -{offer.promotion_discount}%
          </Badge>
        )}
        {offer.rating > 0 && (
          <div className="absolute top-2 left-2 bg-white/90 px-2 py-1 rounded flex items-center gap-1">
            <span className="text-yellow-400">★</span>
            <span className="text-sm font-semibold">{offer.rating.toFixed(1)}</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="mb-2">
          <span className="text-xs text-gray-500 uppercase">{offer.category}</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {offer.title}
        </h3>
        <p className="text-sm text-gray-600 mb-3">{offer.destination}</p>
        <div className="flex items-center justify-between mb-4">
          <div>
            {offer.is_promotion && offer.promotion_discount && (
              <div className="text-xs text-gray-500 line-through">
                {formatCurrency(offer.price, offer.currency)}
              </div>
            )}
            <span className="text-xl font-bold text-primary-600">
              From {formatCurrency(finalPrice, offer.currency)}
            </span>
          </div>
          <span className="text-sm text-gray-600">
            {offer.duration} Days / {offer.duration > 0 ? offer.duration - 1 : 0} Nights
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
