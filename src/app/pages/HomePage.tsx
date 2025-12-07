import { useNavigate } from 'react-router-dom'
import { Header } from '@common/components/layout/Header'
import { Footer } from '@common/components/layout/Footer'
import {
  HeroSection,
  ExclusiveOffers,
  PopularDestinations,
} from '@features/offers/components'
import { Offer, Destination, SearchFormData } from '@common/types/home.types'
import { routes } from '@config/routes.config'
import { toast } from 'sonner'

/**
 * Données mockées pour les offres exclusives
 */
const mockOffers: Offer[] = [
  {
    id: '1',
    title: 'Santorini, Greece',
    destination: 'Santorini, Greece',
    description: '7-day luxury villa stay with caldera views.',
    price: 1999,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80',
  },
  {
    id: '2',
    title: 'Bali, Indonesia',
    destination: 'Bali, Indonesia',
    description: 'All-inclusive jungle resort & spa package.',
    price: 1450,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=80',
  },
  {
    id: '3',
    title: 'Lapland, Finland',
    destination: 'Lapland, Finland',
    description: 'Chase the Northern Lights from a glass igloo.',
    price: 2500,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&q=80',
  },
]

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

  const handleSearch = (data: SearchFormData) => {
    navigate(routes.offers, { state: { search: data } })
  }

  const handleInquire = (offerId: string) => {
    // TODO: Implémenter la redirection vers la page de détails ou WhatsApp
    toast.info('Redirection vers les détails de l\'offre...')
    console.log('Inquire offer:', offerId)
  }

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
        <HeroSection onSearch={handleSearch} />
        <ExclusiveOffers offers={mockOffers} onInquire={handleInquire} />
        <PopularDestinations
          destinations={mockDestinations}
          onClick={handleDestinationClick}
        />
      </main>
      <Footer />
    </div>
  )
}

