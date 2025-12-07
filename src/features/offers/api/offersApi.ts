import api from '@core/interceptors/auth.interceptor'
import { OfferSearchResult, SearchParams } from '../types/offers.types'
import { OfferDetails } from '../types/offerDetails.types'
import { SearchRequest, SearchResponse } from '../types/search.types'

/**
 * API pour les offres
 */
class OffersApi {
  /**
   * Récupère toutes les offres avec filtres et pagination
   */
  async getAll(params: SearchParams = {}): Promise<{
    data: OfferSearchResult[]
    pagination: {
      page: number
      limit: number
      total: number
      totalPages: number
    }
  }> {
    const queryParams = new URLSearchParams()

    // Pagination
    if (params.page) queryParams.append('page', params.page.toString())
    if (params.limit) queryParams.append('limit', params.limit.toString())

    // Filtres
    if (params.search) queryParams.append('search', params.search)
    if (params.category) queryParams.append('category', params.category)
    if (params.destination) queryParams.append('destination', params.destination)
    if (params.minPrice) queryParams.append('minPrice', params.minPrice.toString())
    if (params.maxPrice) queryParams.append('maxPrice', params.maxPrice.toString())
    if (params.minDuration) queryParams.append('minDuration', params.minDuration.toString())
    if (params.maxDuration) queryParams.append('maxDuration', params.maxDuration.toString())
    if (params.minRating) queryParams.append('minRating', params.minRating.toString())
    if (params.difficulty) queryParams.append('difficulty', params.difficulty)
    if (params.departureDate) queryParams.append('departureDate', params.departureDate)
    if (params.returnDate) queryParams.append('returnDate', params.returnDate)
    if (params.travelers) queryParams.append('travelers', params.travelers.toString())
    if (params.isPromotion !== undefined) queryParams.append('isPromotion', params.isPromotion.toString())
    
    // Tags (array)
    if (params.tags && params.tags.length > 0) {
      params.tags.forEach((tag) => queryParams.append('tags', tag))
    }

    // Tri
    if (params.sortBy) queryParams.append('sortBy', params.sortBy)
    if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder)

    const response = await api.get<{
      success: boolean
      data: OfferSearchResult[]
      pagination: {
        page: number
        limit: number
        total: number
        totalPages: number
      }
    }>(`/offers?${queryParams.toString()}`)
    
    return {
      data: response.data.data || [],
      pagination: response.data.pagination || {
        page: 1,
        limit: 12,
        total: 0,
        totalPages: 0,
      },
    }
  }

  /**
   * Recherche avancée d'offres (POST)
   */
  async search(request: SearchRequest): Promise<{
    data: OfferSearchResult[]
    pagination: {
      page: number
      limit: number
      total: number
      totalPages: number
    }
  }> {
    const response = await api.post<SearchResponse>('/offers/search', request)
    
    return {
      data: response.data.data || [],
      pagination: response.data.pagination || {
        page: 1,
        limit: 12,
        total: 0,
        totalPages: 0,
      },
    }
  }

  /**
   * Récupère les détails d'une offre
   */
  async getById(id: string): Promise<OfferDetails> {
    const response = await api.get<{
      success: boolean
      data: {
        id: string
        title: string
        slug: string
        destination: string
        category: string
        price: number
        currency: string
        duration: number
        description: string
        images: string[]
        itinerary: Array<{
          day: number
          title: string
          description: string
        }>
        included: string[]
        excluded: string[]
        is_promotion: boolean
        promotion_discount: number | null
        promotion_ends_at: string | null
        rating: number
        reviews_count: number
        bookings_count: number
        views_count: number
        available_seats: number
        max_capacity: number
        departure_date: string | null
        return_date: string | null
        tags: string[]
        difficulty: string
        created_at: string
        updated_at: string
      }
    }>(`/offers/${id}`)
    
    if (!response.data.data) {
      throw new Error('Offre non trouvée')
    }

    const offer = response.data.data

    // Transformer les données de l'API vers le format OfferDetails
    return {
      id: offer.id,
      title: offer.title,
      subtitle: `${offer.duration} ${offer.duration > 1 ? 'Days' : 'Day'} in Paradise`,
      destination: offer.destination,
      country: offer.destination.split(',')[1]?.trim() || offer.destination,
      continent: this.getContinentFromDestination(offer.destination),
      price: offer.price,
      currency: offer.currency,
      duration: offer.duration,
      nights: offer.duration > 0 ? offer.duration - 1 : 0,
      images: offer.images || [],
      description: offer.description,
      highlights: offer.tags || [],
      itinerary: offer.itinerary.map((item) => ({
        day: item.day,
        title: item.title,
        description: item.description,
      })),
      included: offer.included || [],
      notIncluded: offer.excluded || [],
      availableDates: offer.departure_date
        ? this.formatDateRange(offer.departure_date, offer.return_date)
        : undefined,
      category: offer.category,
    }
  }

  /**
   * Helper pour déterminer le continent depuis la destination
   */
  private getContinentFromDestination(destination: string): string {
    const destinationLower = destination.toLowerCase()
    
    if (destinationLower.includes('france') || destinationLower.includes('italy') || 
        destinationLower.includes('spain') || destinationLower.includes('germany') ||
        destinationLower.includes('uk') || destinationLower.includes('greece')) {
      return 'Europe'
    }
    if (destinationLower.includes('kenya') || destinationLower.includes('tanzanie') ||
        destinationLower.includes('senegal') || destinationLower.includes('dakar') ||
        destinationLower.includes('maroc') || destinationLower.includes('cap-vert')) {
      return 'Africa'
    }
    if (destinationLower.includes('usa') || destinationLower.includes('new york') ||
        destinationLower.includes('mexico')) {
      return 'Americas'
    }
    if (destinationLower.includes('turquie') || destinationLower.includes('istanbul') ||
        destinationLower.includes('dubai') || destinationLower.includes('uae')) {
      return 'Asia'
    }
    
    return 'World'
  }

  /**
   * Récupère les offres en promotion active
   */
  async getPromotionalOffers(): Promise<OfferSearchResult[]> {
    const response = await api.get<{
      success: boolean
      data: OfferSearchResult[]
    }>('/offers/featured/promotions')
    
    return response.data.data || []
  }

  /**
   * Récupère les offres les plus populaires (par nombre de réservations)
   */
  async getPopularOffers(): Promise<OfferSearchResult[]> {
    const response = await api.get<{
      success: boolean
      data: OfferSearchResult[]
    }>('/offers/featured/popular')
    
    return response.data.data || []
  }

  /**
   * Récupère les suggestions d'offres
   */
  async getSuggestedOffers(): Promise<OfferSearchResult[]> {
    const response = await api.get<{
      success: boolean
      data: OfferSearchResult[]
    }>('/offers/suggestions')
    
    return response.data.data || []
  }

  /**
   * Helper pour formater la plage de dates
   */
  private formatDateRange(departureDate: string | null, returnDate: string | null): string {
    if (!departureDate) return 'Year-round'
    
    const departure = new Date(departureDate)
    const returnDateObj = returnDate ? new Date(returnDate) : null
    
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]
    
    if (returnDateObj) {
      const depMonth = months[departure.getMonth()]
      const retMonth = months[returnDateObj.getMonth()]
      return `${depMonth} - ${retMonth}`
    }
    
    return months[departure.getMonth()]
  }
}

export const offersApi = new OffersApi()

