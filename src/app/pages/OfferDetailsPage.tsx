import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Home } from 'lucide-react'
import { Header } from '@common/components/layout/Header'
import { Footer } from '@common/components/layout/Footer'
import { ImageCarousel } from '@features/offers/components/ImageCarousel'
import { BookingSidebar } from '@features/offers/components/BookingSidebar'
import { OfferDetailsContent } from '@features/offers/components/OfferDetailsContent'
import { Loading } from '@common/components/feedback/Loading'
import { Error } from '@common/components/feedback/Error'
import { useOffer } from '@features/offers/hooks/useOffer'
import { routes } from '@config/routes.config'

/**
 * Page de détails d'une offre
 */
export const OfferDetailsPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')

  const { data: offer, isLoading, error, refetch } = useOffer(id)

  if (!id) {
    navigate(routes.offers)
    return null
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Loading message="Chargement des détails de l'offre..." />
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !offer) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Error
            message="Offre non trouvée ou erreur de chargement"
            onRetry={() => {
              refetch()
            }}
          />
        </main>
        <Footer />
      </div>
    )
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
        {offer.images && offer.images.length > 0 && (
          <div className="mb-8">
            <ImageCarousel images={offer.images} alt={offer.title} />
          </div>
        )}

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
