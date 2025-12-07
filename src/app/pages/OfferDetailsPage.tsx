import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Home } from 'lucide-react'
import { Header } from '@common/components/layout/Header'
import { Footer } from '@common/components/layout/Footer'
import { ImageCarousel } from '@features/offers/components/ImageCarousel'
import { BookingSidebar } from '@features/offers/components/BookingSidebar'
import { OfferDetailsContent } from '@features/offers/components/OfferDetailsContent'
import { OfferDetails } from '@features/offers/types/offerDetails.types'
import { routes } from '@config/routes.config'
import { toast } from 'sonner'

/**
 * Données mockées pour les détails d'offre
 * TODO: Remplacer par un appel API
 */
const getMockOfferDetails = (id: string): OfferDetails | null => {
  const mockOffers: Record<string, OfferDetails> = {
    '1': {
      id: '1',
      title: 'Amalfi Coast Adventure',
      subtitle: '7 Days in Paradise',
      destination: 'Amalfi Coast',
      region: 'Amalfi Coast',
      country: 'Italy',
      continent: 'Europe',
      price: 1999,
      currency: 'USD',
      duration: 8,
      nights: 7,
      images: [
        'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=1200&q=80',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80',
        'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=1200&q=80',
        'https://images.unsplash.com/photo-1539650116574-75c0c6d73a6e?w=1200&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
      ],
      description:
        "Embark on a breathtaking journey along Italy's famed Amalfi Coast. This 7-day adventure blends stunning landscapes, rich history, and culinary delights. From the cliffside villages of Positano to the ancient ruins of Pompeii, you'll experience the very best of this sun-drenched paradise. Perfect for adventurers, romantics, and culture enthusiasts alike, this trip promises unforgettable memories.",
      highlights: [
        'Explore the vibrant, vertical town of Positano and relax on its iconic beaches.',
        'Sail to the enchanting island of Capri and visit the magical Blue Grotto.',
        'Step back in time with a guided tour of the remarkably preserved ruins of Pompeii.',
        'Savor authentic Italian cuisine, from fresh seafood to locally grown lemons.',
      ],
      itinerary: [
        {
          day: 1,
          title: 'Arrival in Naples',
          description: 'Arrive in Naples and transfer to your hotel in Sorrento.',
          activities: ['Airport pickup', 'Hotel check-in', 'Welcome dinner'],
        },
        {
          day: 2,
          title: 'Positano Exploration',
          description: 'Discover the stunning cliffside village of Positano.',
          activities: ['Guided tour', 'Beach time', 'Local shopping'],
        },
        {
          day: 3,
          title: 'Capri Island',
          description: 'Full-day excursion to the beautiful island of Capri.',
          activities: ['Boat trip', 'Blue Grotto visit', 'Lunch in Anacapri'],
        },
      ],
      included: [
        'Accommodation in 4-star hotels',
        'Daily breakfast',
        'Airport transfers',
        'Guided tours',
        'Transportation between cities',
      ],
      notIncluded: [
        'International flights',
        'Travel insurance',
        'Personal expenses',
        'Optional activities',
      ],
      availableDates: 'May - September',
      category: 'cultural',
    },
    '2': {
      id: '2',
      title: 'Maldives Overwater Bungalow',
      subtitle: '7 Days in Paradise',
      destination: 'Maldives',
      country: 'Maldives',
      continent: 'Asia',
      price: 1999,
      currency: 'USD',
      duration: 7,
      nights: 6,
      images: [
        'https://images.unsplash.com/photo-1512343879784-a960bf40e4f2?w=1200&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
      ],
      description:
        'Experience the ultimate luxury in an overwater bungalow in the Maldives. Crystal clear waters, pristine beaches, and world-class service await you.',
      highlights: [
        'Stay in a luxurious overwater bungalow',
        'Snorkeling and diving in pristine coral reefs',
        'Spa treatments and wellness activities',
        'Gourmet dining with fresh seafood',
      ],
      availableDates: 'Year-round',
      category: 'beach',
    },
  }

  return mockOffers[id] || null
}

/**
 * Page de détails d'une offre
 */
export const OfferDetailsPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')

  if (!id) {
    navigate(routes.offers)
    return null
  }

  const offer = getMockOfferDetails(id)

  if (!offer) {
    toast.error('Offre non trouvée')
    navigate(routes.offers)
    return null
  }

  const handleWhatsApp = () => {
    const message = `I'm interested in ${offer.title}`
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank')
  }

  // Construire le breadcrumb
  const breadcrumbs = [
    { label: 'Home', path: routes.home },
    offer.continent && { label: offer.continent, path: routes.offers },
    offer.country && { label: offer.country, path: routes.offers },
    { label: offer.title, path: routes.offerDetails(offer.id) },
  ].filter(Boolean) as { label: string; path: string }[]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center gap-2">
              {index > 0 && <span>/</span>}
              {index === breadcrumbs.length - 1 ? (
                <span className="text-gray-900">{crumb.label}</span>
              ) : (
                <button
                  onClick={() => navigate(crumb.path)}
                  className="hover:text-primary-600 flex items-center gap-1"
                >
                  {index === 0 && <Home className="h-4 w-4" />}
                  {crumb.label}
                </button>
              )}
            </div>
          ))}
        </nav>

        {/* Image Carousel */}
        <div className="mb-8">
          <ImageCarousel images={offer.images} alt={offer.title} />
        </div>

        {/* Title and Subtitle */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{offer.title}</h1>
          <p className="text-xl text-gray-600">{offer.subtitle}</p>
        </div>

        {/* Main Content with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <OfferDetailsContent
              offer={offer}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <BookingSidebar offer={offer} onWhatsApp={handleWhatsApp} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

