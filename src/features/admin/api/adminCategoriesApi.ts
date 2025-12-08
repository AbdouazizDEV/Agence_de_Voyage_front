import { ApiResponse } from '@common/types/api.types'
import api from '@core/interceptors/auth.interceptor'

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  display_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface CreateCategoryDto {
  name: string
  description: string
  icon: string
  displayOrder: number
}

export interface UpdateCategoryDto {
  name?: string
  description?: string
  icon?: string
  displayOrder?: number
}

/**
 * API pour la gestion des catégories admin
 */
class AdminCategoriesApi {
  /**
   * Récupère toutes les catégories
   */
  async getAll(): Promise<Category[]> {
    const response = await api.get<ApiResponse<Category[]>>('/admin/categories')
    return response.data.data || []
  }

  /**
   * Récupère une catégorie par son ID
   */
  async getById(categoryId: string): Promise<Category> {
    const response = await api.get<ApiResponse<Category>>(`/admin/categories/${categoryId}`)
    return response.data.data!
  }

  /**
   * Crée une nouvelle catégorie
   */
  async create(data: CreateCategoryDto): Promise<Category> {
    const response = await api.post<ApiResponse<Category>>('/admin/categories', data)
    return response.data.data!
  }

  /**
   * Met à jour une catégorie
   */
  async update(categoryId: string, data: UpdateCategoryDto): Promise<Category> {
    const response = await api.patch<ApiResponse<Category>>(`/admin/categories/${categoryId}`, data)
    return response.data.data!
  }

  /**
   * Bascule le statut actif/inactif d'une catégorie
   */
  async toggleStatus(categoryId: string): Promise<{ id: string; isActive: boolean }> {
    const response = await api.patch<ApiResponse<{ id: string; isActive: boolean }>>(
      `/admin/categories/${categoryId}/toggle-status`
    )
    return response.data.data!
  }

  /**
   * Supprime une catégorie
   */
  async delete(categoryId: string): Promise<void> {
    await api.delete(`/admin/categories/${categoryId}`)
  }
}

export const adminCategoriesApi = new AdminCategoriesApi()

