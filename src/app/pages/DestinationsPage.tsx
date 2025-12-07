import { useNavigate } from 'react-router-dom'
import { Header } from '@common/components/layout/Header'
import { Footer } from '@common/components/layout/Footer'
import { DestinationCard } from '@features/offers/components'
import { Destination } from '@common/types/home.types'
import { routes } from '@config/routes.config'

/**
 * Données mockées pour toutes les destinations
 */
const allDestinations: Destination[] = [
  {
    id: '1',
    name: 'Paris',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
  },
  {
    id: '2',
    name: 'Rome',
    country: 'Italy',
    image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800&q=80',
  },
  {
    id: '3',
    name: 'Kyoto',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80',
  },
  {
    id: '4',
    name: 'New York',
    country: 'USA',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80',
  },
  {
    id: '5',
    name: 'Bali',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=80',
  },
  {
    id: '6',
    name: 'Santorini',
    country: 'Greece',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80',
  },
  {
    id: '7',
    name: 'Dubai',
    country: 'UAE',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
  },
  {
    id: '8',
    name: 'Tokyo',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
  },
  {
    id: '9',
    name: 'Barcelona',
    country: 'Spain',
    image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80',
  },
  {
    id: '10',
    name: 'Maldives',
    country: 'Maldives',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e4f2?w=800&q=80',
  },
  {
    id: '11',
    name: 'London',
    country: 'UK',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80',
  },
  {
    id: '12',
    name: 'Sydney',
    country: 'Australia',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
  },
]

/**
 * Page des destinations
 */
export const DestinationsPage = () => {
  const navigate = useNavigate()

  const handleDestinationClick = (destinationId: string) => {
    const destination = allDestinations.find((d) => d.id === destinationId)
    if (destination) {
      navigate(routes.offers, {
        state: {
          search: { destination: destination.name },
          category: 'beach',
        },
      })
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Découvrez nos Destinations
            </h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Explorez le monde avec nos destinations soigneusement sélectionnées.
              Chaque voyage est une nouvelle aventure qui vous attend.
            </p>
          </div>
        </section>

        {/* Destinations Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {allDestinations.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                  onClick={handleDestinationClick}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

