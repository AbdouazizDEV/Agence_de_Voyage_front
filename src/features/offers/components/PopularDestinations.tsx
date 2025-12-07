import { DestinationCard } from './DestinationCard'
import { Destination } from '@common/types/home.types'

interface PopularDestinationsProps {
  destinations: Destination[]
  onClick?: (destinationId: string) => void
}

/**
 * Section des destinations populaires
 */
export const PopularDestinations = ({
  destinations,
  onClick,
}: PopularDestinationsProps) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Popular Destinations
          </h2>
          <p className="text-lg text-gray-600">
            Get inspired by the places travelers love the most.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              onClick={onClick}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

