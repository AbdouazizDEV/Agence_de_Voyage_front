import { ArrowRight } from 'lucide-react'
import { Button } from '@common/components/ui/Button'
import { Card } from '@common/components/ui/Card'
import { Offer } from '@common/types/home.types'
import { formatCurrency } from '@common/utils/formatters'

interface OfferCardProps {
  offer: Offer
  onInquire?: (offerId: string) => void
}

/**
 * Carte d'offre de voyage
 */
export const OfferCard = ({ offer, onInquire }: OfferCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-64 overflow-hidden">
        <img
          src={offer.image}
          alt={offer.destination}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {offer.destination}
        </h3>
        <p className="text-gray-600 text-sm mb-4">{offer.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary-600">
            {formatCurrency(offer.price, offer.currency || 'USD')}
          </span>
          <Button
            variant="primary"
            size="sm"
            onClick={() => onInquire?.(offer.id)}
            className="flex items-center gap-1"
          >
            Inquire <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}

