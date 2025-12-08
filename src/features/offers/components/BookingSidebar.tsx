import { MessageCircle } from 'lucide-react'
import { Button } from '@common/components/ui/Button'
import { Card } from '@common/components/ui/Card'
import { OfferDetails } from '../types/offerDetails.types'
import { formatCurrency } from '@common/utils/formatters'
import { useWhatsApp } from '@features/whatsapp/hooks/useWhatsApp'

interface BookingSidebarProps {
  offer: OfferDetails
  onWhatsApp?: () => void
}

/**
 * Sidebar de réservation avec prix et bouton WhatsApp
 */
export const BookingSidebar = ({ offer, onWhatsApp }: BookingSidebarProps) => {
  const { handleOfferWhatsApp } = useWhatsApp()

  const handleWhatsApp = () => {
    if (onWhatsApp) {
      onWhatsApp()
    } else {
      handleOfferWhatsApp(offer.id, offer.title)
    }
  }

  return (
    <Card className="p-6 sticky top-4">
      <div className="space-y-6">
        {/* Prix */}
        <div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-sm text-gray-600">From</span>
            <span className="text-4xl font-bold text-primary-600">
              {formatCurrency(offer.price, offer.currency || 'USD')}
            </span>
            <span className="text-sm text-gray-600">/person</span>
          </div>
        </div>

        {/* Duration */}
        <div className="flex justify-between items-center py-3 border-t border-b border-gray-200">
          <span className="text-sm font-medium text-gray-700">Duration</span>
          <span className="text-sm text-gray-900">
            {offer.duration} Days/{offer.nights} Nights
          </span>
        </div>

        {/* Dates */}
        {offer.availableDates && (
          <div className="flex justify-between items-center py-3 border-b border-gray-200">
            <span className="text-sm font-medium text-gray-700">Dates</span>
            <span className="text-sm text-gray-900">{offer.availableDates}</span>
          </div>
        )}

        {/* Bouton WhatsApp */}
        <Button
          variant="primary"
          className="w-full bg-green-500 hover:bg-green-600 text-white"
          onClick={handleWhatsApp}
        >
          <MessageCircle className="h-5 w-5 mr-2" />
          Send my request on WhatsApp
        </Button>
      </div>
    </Card>
  )
}

