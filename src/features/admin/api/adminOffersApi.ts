import { ApiResponse } from '@common/types/api.types'
import api from '@core/interceptors/auth.interceptor'
import { OfferSearchResult, SearchParams } from '@features/offers/types/offers.types'

export interface AdminOffer extends OfferSearchResult {
  is_active: boolean
  itinerary?: Array<{
    day: number
    title: string
    description: string
  }>
  included?: string[]
  excluded?: string[]
}

export interface CreateOfferDto {
  title: string
  destination: string
  category: string
  price: number
  duration: number
  description: string
  images?: File[]
  itinerary?: string
  included?: string
  excluded?: string
  is_active?: boolean
  is_promotion?: boolean
  promotion_discount?: number
  promotion_ends_at?: string
  max_capacity?: number
  available_seats?: number
  departure_date?: string
  return_date?: string
  tags?: string
  difficulty?: string
}

export interface UpdateOfferDto extends Partial<CreateOfferDto> {
  images_action?: 'add' | 'replace'
}

export interface AdminOffersResponse {
  data: AdminOffer[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

/**
 * API pour la gestion des offres par l'admin
 */
class AdminOffersApi {
  /**
   * Récupère toutes les offres avec pagination et filtres
   */
  async getAll(params: SearchParams & { isActive?: boolean } = {}): Promise<AdminOffersResponse> {
    const queryParams = new URLSearchParams()

    if (params.page) queryParams.append('page', params.page.toString())
    if (params.limit) queryParams.append('limit', params.limit.toString())
    if (params.search) queryParams.append('search', params.search)
    if (params.category) queryParams.append('category', params.category)
    if (params.destination) queryParams.append('destination', params.destination)
    if (params.isActive !== undefined) {
      queryParams.append('isActive', params.isActive.toString())
    }

    const response = await api.get<ApiResponse<AdminOffer[]> & { pagination: AdminOffersResponse['pagination'] }>(
      `/admin/offers?${queryParams.toString()}`
    )

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
   * Crée une nouvelle offre avec upload d'images
   */
  async create(data: CreateOfferDto): Promise<AdminOffer> {
    const formData = new FormData()

    // Ajouter tous les champs texte
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'images') {
        // Les images seront ajoutées séparément
        return
      }
      if (value !== undefined && value !== null) {
        if (typeof value === 'object') {
          formData.append(key, JSON.stringify(value))
        } else {
          formData.append(key, value.toString())
        }
      }
    })

    // Ajouter les images
    if (data.images && data.images.length > 0) {
      data.images.forEach((image) => {
        formData.append('images', image)
      })
    }

    const response = await api.post<ApiResponse<AdminOffer>>('/admin/offers', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response.data.data!
  }

  /**
   * Met à jour une offre existante avec upload d'images optionnel
   */
  async update(offerId: string, data: UpdateOfferDto): Promise<AdminOffer> {
    const formData = new FormData()

    // Ajouter tous les champs texte
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'images' || key === 'images_action') {
        // Les images seront ajoutées séparément
        return
      }
      if (value !== undefined && value !== null) {
        if (typeof value === 'object') {
          formData.append(key, JSON.stringify(value))
        } else {
          formData.append(key, value.toString())
        }
      }
    })

    // Gérer les images selon l'action
    if (data.images_action === 'replace') {
      // Remplacer toutes les images
      if (data.images && data.images.length > 0) {
        // Remplacer par de nouvelles images
        data.images.forEach((image) => {
          formData.append('images', image)
        })
      } else {
        // Supprimer toutes les images (envoyer un champ vide)
        formData.append('images', '')
      }
      formData.append('images_action', 'replace')
    } else if (data.images && data.images.length > 0) {
      // Ajouter de nouvelles images
      data.images.forEach((image) => {
        formData.append('images', image)
      })
      if (data.images_action === 'add') {
        formData.append('images_action', 'add')
      }
    }

    const response = await api.patch<ApiResponse<AdminOffer>>(
      `/admin/offers/${offerId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )

    return response.data.data!
  }

  /**
   * Bascule le statut actif/inactif d'une offre
   */
  async toggleStatus(offerId: string): Promise<{ id: string; isActive: boolean }> {
    const response = await api.patch<ApiResponse<{ id: string; isActive: boolean }>>(
      `/admin/offers/${offerId}/toggle-status`
    )
    return response.data.data!
  }

  /**
   * Duplique une offre existante
   */
  async duplicate(offerId: string): Promise<AdminOffer> {
    const response = await api.post<ApiResponse<AdminOffer>>(
      `/admin/offers/${offerId}/duplicate`
    )
    return response.data.data!
  }

  /**
   * Supprime une offre
   */
  async delete(offerId: string): Promise<void> {
    await api.delete(`/admin/offers/${offerId}`)
  }
}

export const adminOffersApi = new AdminOffersApi()

