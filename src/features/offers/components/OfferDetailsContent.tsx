import { Check } from 'lucide-react'
import { Tabs } from '@common/components/ui/Tabs'
import { OfferDetails } from '../types/offerDetails.types'
import { formatCurrency } from '@common/utils/formatters'

interface OfferDetailsContentProps {
  offer: OfferDetails
  activeTab: string
  onTabChange: (tabId: string) => void
}

/**
 * Contenu des détails d'offre avec onglets
 */
export const OfferDetailsContent = ({
  offer,
  activeTab,
  onTabChange,
}: OfferDetailsContentProps) => {
  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      content: (
        <div className="space-y-6">
          {/* Trip Overview */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Trip Overview</h3>
            <p className="text-gray-700 leading-relaxed">{offer.description}</p>
          </div>

          {/* Trip Highlights */}
          {offer.highlights && offer.highlights.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Trip Highlights</h3>
              <ul className="space-y-3">
                {offer.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ),
    },
    {
      id: 'itinerary',
      label: 'Itinerary',
      content: (
        <div className="space-y-6">
          {offer.itinerary && offer.itinerary.length > 0 ? (
            offer.itinerary.map((day) => (
              <div key={day.day} className="border-l-4 border-primary-600 pl-6 pb-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl font-bold text-primary-600">Day {day.day}</span>
                  <h4 className="text-xl font-semibold text-gray-900">{day.title}</h4>
                </div>
                <p className="text-gray-700 mb-3">{day.description}</p>
                {day.activities && day.activities.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {day.activities.map((activity, index) => (
                      <li key={index}>{activity}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-600">Itinerary details coming soon...</p>
          )}
        </div>
      ),
    },
    {
      id: 'included',
      label: "What's Included",
      content: (
        <div className="space-y-6">
          {offer.included && offer.included.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Included</h3>
              <ul className="space-y-3">
                {offer.included.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {offer.notIncluded && offer.notIncluded.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Not Included</h3>
              <ul className="space-y-3">
                {offer.notIncluded.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0">×</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ),
    },
    {
      id: 'pricing',
      label: 'Pricing',
      content: (
        <div className="space-y-6">
          {offer.pricing && offer.pricing.length > 0 ? (
            <div className="space-y-4">
              {offer.pricing.map((tier, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xl font-semibold text-gray-900">{tier.name}</h4>
                    <span className="text-2xl font-bold text-primary-600">
                      {formatCurrency(tier.price, offer.currency || 'USD')}
                    </span>
                  </div>
                  {tier.description && (
                    <p className="text-gray-600">{tier.description}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div>
              <p className="text-gray-700 mb-4">
                Starting from{' '}
                <span className="text-2xl font-bold text-primary-600">
                  {formatCurrency(offer.price, offer.currency || 'USD')}
                </span>{' '}
                per person
              </p>
              <p className="text-gray-600">
                Contact us for detailed pricing information and special offers.
              </p>
            </div>
          )}
        </div>
      ),
    },
  ]

  return <Tabs tabs={tabs} activeTab={activeTab} onTabChange={onTabChange} />
}

