import { OfferCard } from './OfferCard'
import { Offer } from '@common/types/home.types'

interface ExclusiveOffersProps {
  offers: Offer[]
  onInquire?: (offerId: string) => void
}

/**
 * Section des offres exclusives
 */
export const ExclusiveOffers = ({ offers, onInquire }: ExclusiveOffersProps) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Exclusive Offers Just For You
          </h2>
          <p className="text-lg text-gray-600">
            Discover our handpicked selection of unbeatable travel deals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              onInquire={onInquire}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

