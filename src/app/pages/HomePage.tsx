import { useNavigate } from 'react-router-dom'
import { Header } from '@common/components/layout/Header'
import { Footer } from '@common/components/layout/Footer'
import {
  HeroSection,
  PopularDestinations,
  PromotionalOffers,
  PopularOffers,
  SuggestedOffers,
} from '@features/offers/components'
import { Destination } from '@common/types/home.types'
import { routes } from '@config/routes.config'

/**
 * Données mockées pour les destinations populaires
 */
const mockDestinations: Destination[] = [
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
]

/**
 * Page d'accueil
 */
export const HomePage = () => {
  const navigate = useNavigate()

  const handleDestinationClick = (destinationId: string) => {
    const destination = mockDestinations.find((d) => d.id === destinationId)
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
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <PromotionalOffers />
        <PopularOffers />{/* 
        <ExclusiveOffers offers={mockOffers} onInquire={handleInquire} /> */}
        <PopularDestinations
          destinations={mockDestinations}
          onClick={handleDestinationClick}
        />
        <SuggestedOffers />
      </main>
      <Footer />
    </div>
  )
}

