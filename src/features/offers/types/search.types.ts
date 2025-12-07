/**
 * Types pour la recherche avancée d'offres
 */
import { SortOption, SortOrder } from './offers.types'

export interface SearchRequest {
  search?: string
  destination?: string
  category?: string
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
  sortBy?: SortOption
  sortOrder?: SortOrder
  page?: number
  limit?: number
}

export interface SearchResponse {
  success: boolean
  data: any[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

