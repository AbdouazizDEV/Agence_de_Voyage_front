/**
 * Types pour la page d'accueil
 */
export interface Offer {
  id: string
  title: string
  destination: string
  description: string
  price: number
  currency?: string
  image: string
}

export interface Destination {
  id: string
  name: string
  country: string
  image: string
}

export interface SearchFormData {
  destination: string
  dates: string
  travelers: string
  budget: string
}

