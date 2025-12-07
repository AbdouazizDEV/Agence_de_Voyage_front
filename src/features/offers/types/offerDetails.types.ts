/**
 * Types pour les détails d'une offre
 */
export interface OfferDetails {
  id: string
  title: string
  subtitle: string
  destination: string
  region?: string
  country: string
  continent?: string
  price: number
  currency?: string
  duration: number
  nights: number
  images: string[]
  description: string
  highlights: string[]
  itinerary?: ItineraryDay[]
  included?: string[]
  notIncluded?: string[]
  pricing?: PricingTier[]
  availableDates?: string
  category?: string
}

export interface ItineraryDay {
  day: number
  title: string
  description: string
  activities?: string[]
}

export interface PricingTier {
  name: string
  price: number
  description?: string
}

