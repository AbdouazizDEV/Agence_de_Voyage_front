import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Home } from 'lucide-react'
import { Header } from '@common/components/layout/Header'
import { Footer } from '@common/components/layout/Footer'
import { FiltersSidebar } from '@features/offers/components/FiltersSidebar'
import { OfferSearchCard } from '@features/offers/components/OfferSearchCard'
import { Pagination } from '@common/components/ui/Pagination'
import { Select } from '@common/components/ui/Select'
import { Loading } from '@common/components/feedback/Loading'
import { Error } from '@common/components/feedback/Error'
import { Empty } from '@common/components/feedback/Empty'
import { useOffers } from '@features/offers/hooks/useOffers'
import { OfferFilters, SortOption, SortOrder } from '@features/offers/types/offers.types'
import { routes } from '@config/routes.config'
import { toast } from 'sonner'

/**
 * Page des offres / résultats de recherche
 */
export const OffersPage = () => {
  const location = useLocation()
  const navigate = useNavigate()

  // Récupérer les paramètres de recherche depuis l'état de navigation
  const searchRequest = (location.state as any)?.searchRequest
  const searchParams = (location.state as any)?.search || {}
  const categoryParam = (location.state as any)?.category || ''

  const [filters, setFilters] = useState<OfferFilters>(
    searchRequest || {
      search: searchParams.destination || searchParams.search,
      destination: searchParams.destination,
      category: categoryParam || undefined,
    }
  )

  const [sortBy, setSortBy] = useState<SortOption>('createdAt')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  // Construire les paramètres de recherche pour l'API
  const apiParams = {
    ...filters,
    page: currentPage,
    limit: itemsPerPage,
    sortBy,
    sortOrder,
  }

  // Récupérer les offres depuis l'API
  const { data, isLoading, error, refetch } = useOffers(apiParams)

  const handleApplyFilters = () => {
    setCurrentPage(1)
    refetch()
    toast.success('Filtres appliqués')
  }

  const handleClearFilters = () => {
    setFilters({
      search: undefined,
      destination: undefined,
      category: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      minDuration: undefined,
      maxDuration: undefined,
      minRating: undefined,
      difficulty: undefined,
      travelers: undefined,
      departureDate: undefined,
      returnDate: undefined,
      isPromotion: undefined,
    })
    setCurrentPage(1)
    toast.info('Filtres réinitialisés')
  }

  const handleViewDetails = (offerId: string) => {
    navigate(routes.offerDetails(offerId))
  }

  const handleWhatsApp = (offerId: string) => {
    const offer = data?.data.find((o) => o.id === offerId)
    if (offer) {
      const message = `I'm interested in ${offer.title}`
      window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank')
    }
  }

  const sortOptions = [
    { value: 'price', label: 'Price' },
    { value: 'duration', label: 'Duration' },
    { value: 'rating', label: 'Rating' },
    { value: 'createdAt', label: 'Newest' },
    { value: 'bookings', label: 'Most Booked' },
    { value: 'views', label: 'Most Viewed' },
  ]

  const sortOrderOptions = [
    { value: 'asc', label: 'Ascending' },
    { value: 'desc', label: 'Descending' },
  ]

  // Déterminer le titre de la page
  const pageTitle = searchParams.destination
    ? `Search: ${searchParams.destination}`
    : filters.category
    ? `${filters.category}`
    : 'All Offers'

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <button
            onClick={() => navigate(routes.home)}
            className="hover:text-primary-600 flex items-center gap-1"
          >
            <Home className="h-4 w-4" />
            Home
          </button>
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
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <h1 className="text-3xl font-bold text-gray-900">
                {isLoading
                  ? 'Chargement...'
                  : `Showing ${data?.pagination.total || 0} results`}
              </h1>
              <div className="flex items-center gap-2">
                <Select
                  options={sortOptions}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="w-40"
                />
                <Select
                  options={sortOrderOptions}
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as SortOrder)}
                  className="w-32"
                />
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <Loading message="Chargement des offres..." />
            )}

            {/* Error State */}
            {error && (
              <Error
                message="Erreur lors du chargement des offres"
                onRetry={() => refetch()}
              />
            )}

            {/* Results Grid */}
            {!isLoading && !error && (
              <>
                {data && data.data.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                      {data.data.map((offer) => (
                        <OfferSearchCard
                          key={offer.id}
                          offer={offer}
                          onViewDetails={handleViewDetails}
                          onWhatsApp={handleWhatsApp}
                        />
                      ))}
                    </div>

                    {/* Pagination */}
                    {data.pagination.totalPages > 1 && (
                      <Pagination
                        currentPage={data.pagination.page}
                        totalPages={data.pagination.totalPages}
                        onPageChange={setCurrentPage}
                      />
                    )}
                  </>
                ) : (
                  <Empty message="Aucune offre trouvée avec ces critères" />
                )}
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
