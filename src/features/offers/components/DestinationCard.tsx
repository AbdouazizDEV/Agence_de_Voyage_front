import { Card } from '@common/components/ui/Card'
import { Destination } from '@common/types/home.types'

interface DestinationCardProps {
  destination: Destination
  onClick?: (destinationId: string) => void
}

/**
 * Carte de destination populaire
 */
export const DestinationCard = ({ destination, onClick }: DestinationCardProps) => {
  return (
    <Card
      className="relative h-80 overflow-hidden cursor-pointer group hover:shadow-xl transition-shadow"
      onClick={() => onClick?.(destination.id)}
    >
      <img
        src={destination.image}
        alt={destination.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-2xl font-bold text-white">
          {destination.name}, {destination.country}
        </h3>
      </div>
    </Card>
  )
}

