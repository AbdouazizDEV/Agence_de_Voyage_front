import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Home } from 'lucide-react'
import { Header } from '@common/components/layout/Header'
import { Footer } from '@common/components/layout/Footer'
import { FiltersSidebar } from '@features/offers/components/FiltersSidebar'
import { OfferSearchCard } from '@features/offers/components/OfferSearchCard'
import { Pagination } from '@common/components/ui/Pagination'
import { Select } from '@common/components/ui/Select'
import { OfferFilters, OfferSearchResult, SortOption } from '@features/offers/types/offers.types'
import { routes } from '@config/routes.config'
import { toast } from 'sonner'

/**
 * Données mockées pour les résultats de recherche
 */
const mockOffers: OfferSearchResult[] = [
  {
    id: '1',
    title: 'Maldives Overwater Bungalow',
    destination: 'Maldives',
    price: 1999,
    currency: 'USD',
    duration: 7,
    nights: 6,
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e4f2?w=800&q=80',
    category: 'beach',
  },
  {
    id: '2',
    title: 'Santorini Cliffside Villa',
    destination: 'Santorini, Greece',
    price: 2499,
    currency: 'USD',
    duration: 10,
    nights: 9,
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80',
    category: 'beach',
  },
  {
    id: '3',
    title: 'Bali Jungle Retreat',
    destination: 'Bali, Indonesia',
    price: 1800,
    currency: 'USD',
    duration: 8,
    nights: 7,
    image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=80',
    category: 'beach',
  },
  {
    id: '4',
    title: 'Caribbean Cruise Getaway',
    destination: 'Caribbean',
    price: 1250,
    currency: 'USD',
    duration: 7,
    nights: 6,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
    category: 'beach',
  },
  {
    id: '5',
    title: 'Thailand Island Hopping',
    destination: 'Thailand',
    price: 1600,
    currency: 'USD',
    duration: 9,
    nights: 8,
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80',
    category: 'adventure',
  },
  {
    id: '6',
    title: 'Cancun All-Inclusive',
    destination: 'Cancun, Mexico',
    price: 1450,
    currency: 'USD',
    duration: 5,
    nights: 4,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    category: 'beach',
  },
]

/**
 * Page des offres / résultats de recherche
 */
export const OffersPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  
  // Récupérer les paramètres de recherche depuis l'état de navigation
  const searchParams = (location.state as any)?.search || {}
  const categoryParam = (location.state as any)?.category || ''

  const [filters, setFilters] = useState<OfferFilters>({
    priceRange: { min: 500, max: 5000 },
    duration: categoryParam === 'beach' ? ['7'] : [],
    categories: categoryParam ? [categoryParam] : [],
  })

  const [sortBy, setSortBy] = useState<SortOption>('popularity')
  const [currentPage, setCurrentPage] = useState(1)
  const [results, setResults] = useState<OfferSearchResult[]>(mockOffers)
  const [totalResults, setTotalResults] = useState(24)
  const itemsPerPage = 6
  const totalPages = Math.ceil(totalResults / itemsPerPage)

  // Filtrer les résultats selon les filtres
  useEffect(() => {
    let filtered = [...mockOffers]

    // Filtrer par catégorie
    if (filters.categories.length > 0) {
      filtered = filtered.filter((offer) =>
        filters.categories.includes(offer.category || '')
      )
    }

    // Filtrer par prix
    filtered = filtered.filter(
      (offer) =>
        offer.price >= filters.priceRange.min &&
        offer.price <= filters.priceRange.max
    )

    // Filtrer par durée
    if (filters.duration.length > 0) {
      filtered = filtered.filter((offer) => {
        return filters.duration.some((d) => {
          if (d === '3-5') return offer.duration >= 3 && offer.duration <= 5
          if (d === '7') return offer.duration === 7
          if (d === '14+') return offer.duration >= 14
          return false
        })
      })
    }

    // Trier
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price
        case 'price-desc':
          return b.price - a.price
        case 'duration-asc':
          return a.duration - b.duration
        case 'duration-desc':
          return b.duration - a.duration
        default:
          return 0
      }
    })

    setResults(filtered)
    setTotalResults(filtered.length)
  }, [filters, sortBy])

  const handleApplyFilters = () => {
    setCurrentPage(1)
    toast.success('Filtres appliqués')
  }

  const handleClearFilters = () => {
    setFilters({
      priceRange: { min: 500, max: 5000 },
      duration: [],
      categories: [],
    })
    setCurrentPage(1)
    toast.info('Filtres réinitialisés')
  }

  const handleViewDetails = (offerId: string) => {
    navigate(routes.offerDetails(offerId))
  }

  const handleWhatsApp = (offerId: string) => {
    const offer = results.find((o) => o.id === offerId)
    if (offer) {
      const message = `I'm interested in ${offer.title}`
      window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank')
    }
  }

  // Pagination
  const paginatedResults = results.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const sortOptions = [
    { value: 'popularity', label: 'Popularity' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'duration-asc', label: 'Duration: Shortest' },
    { value: 'duration-desc', label: 'Duration: Longest' },
  ]

  // Déterminer le titre de la page
  const pageTitle = searchParams.destination
    ? `Search: ${searchParams.destination}`
    : filters.categories.length > 0
    ? `${filters.categories[0].charAt(0).toUpperCase() + filters.categories[0].slice(1)} Holidays`
    : 'All Offers'

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <a href={routes.home} className="hover:text-primary-600 flex items-center gap-1">
            <Home className="h-4 w-4" />
            Home
          </a>
          <span>/</span>
          <span>Search</span>
          {pageTitle !== 'All Offers' && (
            <>
              <span>/</span>
              <span className="text-gray-900">{pageTitle}</span>
            </>
          )}
        </nav>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className="w-1/4 hidden lg:block">
            <FiltersSidebar
              filters={filters}
              onFiltersChange={setFilters}
              onApply={handleApplyFilters}
              onClear={handleClearFilters}
            />
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header avec résultats et tri */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-900">
                Showing {totalResults} results
              </h1>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <Select
                  options={sortOptions}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="w-48"
                />
              </div>
            </div>

            {/* Grille de résultats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {paginatedResults.length > 0 ? (
                paginatedResults.map((offer) => (
                  <OfferSearchCard
                    key={offer.id}
                    offer={offer}
                    onViewDetails={handleViewDetails}
                    onWhatsApp={handleWhatsApp}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-600">Aucun résultat trouvé</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

