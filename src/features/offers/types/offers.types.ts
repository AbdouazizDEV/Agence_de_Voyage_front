/**
 * Types pour les offres et la recherche
 */
export interface OfferSearchResult {
  id: string
  title: string
  destination: string
  price: number
  currency?: string
  duration: number
  nights: number
  image: string
  category?: string
}

export interface OfferFilters {
  priceRange: {
    min: number
    max: number
  }
  duration: string[]
  categories: string[]
}

export type SortOption = 'popularity' | 'price-asc' | 'price-desc' | 'duration-asc' | 'duration-desc'

export interface SearchParams {
  query?: string
  destination?: string
  dates?: string
  travelers?: string
  budget?: string
  category?: string
  page?: number
  limit?: number
  sort?: SortOption
}

