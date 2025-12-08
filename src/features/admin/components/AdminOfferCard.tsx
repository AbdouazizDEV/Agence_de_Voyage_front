import { Pencil, Trash2, Copy, Power } from 'lucide-react'
import { Card } from '@common/components/ui/Card'
import { Badge } from '@common/components/ui/Badge'
import { Button } from '@common/components/ui/Button'
import { Toggle } from '@common/components/ui/Toggle'
import { AdminOffer } from '../api/adminOffersApi'
import { formatCurrency } from '@common/utils/formatters'
import { cn } from '@common/utils/cn'

interface AdminOfferCardProps {
  offer: AdminOffer
  isSelected?: boolean
  onSelect: (offer: AdminOffer) => void
  onEdit: (offer: AdminOffer) => void
  onDelete: (offerId: string) => void
  onDuplicate: (offerId: string) => void
  onToggleStatus: (offerId: string) => void
}

/**
 * Carte d'offre pour la liste admin
 */
export const AdminOfferCard = ({
  offer,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  onDuplicate,
  onToggleStatus,
}: AdminOfferCardProps) => {
  const finalPrice = offer.is_promotion && offer.promotion_discount
    ? offer.price * (1 - offer.promotion_discount / 100)
    : offer.price

  return (
    <Card
      className={cn(
        'cursor-pointer transition-all duration-200 hover:shadow-md',
        isSelected && 'ring-2 ring-blue-500 border-blue-500'
      )}
      onClick={() => onSelect(offer)}
    >
      <div className="flex gap-4 p-4">
        {/* Image */}
        <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={offer.images?.[0] || 'https://via.placeholder.com/150'}
            alt={offer.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate mb-1">{offer.title}</h3>
              <p className="text-sm text-gray-600 truncate">{offer.destination}</p>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <Badge
                variant={offer.is_active ? 'default' : 'secondary'}
                className={cn(
                  offer.is_active
                    ? 'bg-green-100 text-green-700 border-green-300'
                    : 'bg-red-100 text-red-700 border-red-300'
                )}
              >
                {offer.is_active ? 'Active' : 'Désactivé'}
              </Badge>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="font-semibold text-gray-900">
                {formatCurrency(finalPrice, offer.currency)}
              </span>
              {offer.is_promotion && offer.promotion_discount && (
                <span className="text-xs line-through text-gray-400">
                  {formatCurrency(offer.price, offer.currency)}
                </span>
              )}
              <span>{offer.duration} jours</span>
              <span>{offer.category}</span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              {/* Toggle Status */}
              <div className="flex items-center gap-2 mr-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    if (offer.is_active) {
                      onToggleStatus(offer.id)
                    }
                  }}
                  disabled={!offer.is_active}
                  className={cn(
                    'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                    offer.is_active
                      ? 'bg-green-500 cursor-pointer'
                      : 'bg-gray-300 cursor-not-allowed opacity-50'
                  )}
                  title={offer.is_active ? 'Désactiver' : 'Offre désactivée'}
                >
                  <span
                    className={cn(
                      'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                      offer.is_active ? 'translate-x-6' : 'translate-x-1'
                    )}
                  />
                </button>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(offer)}
                className="h-8 w-8 p-0"
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDuplicate(offer.id)}
                className="h-8 w-8 p-0"
                title="Dupliquer"
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (window.confirm('Êtes-vous sûr de vouloir supprimer cette offre ?')) {
                    onDelete(offer.id)
                  }
                }}
                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

