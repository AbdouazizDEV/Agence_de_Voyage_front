/**
 * Types pour les offres et la recherche
 */
import { ApiResponse } from '@common/types/api.types'

export interface OfferSearchResult {
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
  is_promotion?: boolean
  promotion_discount?: number | null
  promotion_ends_at?: string | null
  rating: number
  reviews_count: number
  bookings_count: number
  views_count: number
  available_seats: number
  max_capacity: number
  departure_date?: string | null
  return_date?: string | null
  tags: string[]
  difficulty?: string
  created_at: string
  updated_at: string
}

export interface OfferFilters {
  search?: string
  category?: string
  destination?: string
  minPrice?: number
  maxPrice?: number
  minDuration?: number
  maxDuration?: number
  minRating?: number
  difficulty?: 'easy' | 'moderate' | 'hard'
  tags?: string[]
  departureDate?: string
  returnDate?: string
  travelers?: number
  isPromotion?: boolean
}

export type SortOption = 'price' | 'duration' | 'rating' | 'createdAt' | 'bookings' | 'views'
export type SortOrder = 'asc' | 'desc'

export interface SearchParams extends OfferFilters {
  page?: number
  limit?: number
  sortBy?: SortOption
  sortOrder?: SortOrder
}

export interface OffersResponse {
  data: OfferSearchResult[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface OffersApiResponse extends ApiResponse<OfferSearchResult[]> {
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
