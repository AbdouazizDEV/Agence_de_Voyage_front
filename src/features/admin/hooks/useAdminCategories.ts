import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  adminCategoriesApi,
  CreateCategoryDto,
  UpdateCategoryDto,
} from '../api/adminCategoriesApi'
import { toast } from 'sonner'

/**
 * Hook pour récupérer toutes les catégories
 */
export const useAdminCategories = () => {
  return useQuery({
    queryKey: ['admin', 'categories'],
    queryFn: () => adminCategoriesApi.getAll(),
    staleTime: 10 * 60 * 1000, // Cache pendant 10 minutes
  })
}

/**
 * Hook pour récupérer une catégorie par son ID
 */
export const useAdminCategory = (categoryId: string) => {
  return useQuery({
    queryKey: ['admin', 'categories', categoryId],
    queryFn: () => adminCategoriesApi.getById(categoryId),
    enabled: !!categoryId,
  })
}

/**
 * Hook pour créer une nouvelle catégorie
 */
export const useCreateCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateCategoryDto) => adminCategoriesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'categories'] })
      toast.success('Catégorie créée avec succès')
    },
    onError: (error: unknown) => {
      const message =
        (error as { response?: { data?: { error?: { message?: string } } } })?.response?.data
          ?.error?.message || 'Erreur lors de la création de la catégorie'
      toast.error(message)
    },
  })
}

/**
 * Hook pour mettre à jour une catégorie
 */
export const useUpdateCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ categoryId, data }: { categoryId: string; data: UpdateCategoryDto }) =>
      adminCategoriesApi.update(categoryId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'categories'] })
      queryClient.invalidateQueries({ queryKey: ['admin', 'categories', variables.categoryId] })
      toast.success('Catégorie mise à jour avec succès')
    },
    onError: (error: unknown) => {
      const message =
        (error as { response?: { data?: { error?: { message?: string } } } })?.response?.data
          ?.error?.message || 'Erreur lors de la mise à jour de la catégorie'
      toast.error(message)
    },
  })
}

/**
 * Hook pour basculer le statut d'une catégorie
 */
export const useToggleCategoryStatus = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (categoryId: string) => adminCategoriesApi.toggleStatus(categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'categories'] })
      toast.success('Statut de la catégorie modifié')
    },
    onError: (error: unknown) => {
      const message =
        (error as { response?: { data?: { error?: { message?: string } } } })?.response?.data
          ?.error?.message || 'Erreur lors de la modification du statut'
      toast.error(message)
    },
  })
}

/**
 * Hook pour supprimer une catégorie
 */
export const useDeleteCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (categoryId: string) => adminCategoriesApi.delete(categoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'categories'] })
      toast.success('Catégorie supprimée avec succès')
    },
    onError: (error: unknown) => {
      const message =
        (error as { response?: { data?: { error?: { message?: string } } } })?.response?.data
          ?.error?.message || 'Erreur lors de la suppression de la catégorie'
      toast.error(message)
    },
  })
}
