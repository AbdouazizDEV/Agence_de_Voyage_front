import { useState } from 'react'
import { Plus } from 'lucide-react'
import { AdminLayout } from '@common/components/layout/AdminLayout'
import { CategoryCard } from '@features/admin/components/CategoryCard'
import { CategoryForm } from '@features/admin/components/CategoryForm'
import { Button } from '@common/components/ui/Button'
import { Loading } from '@common/components/feedback/Loading'
import { Error } from '@common/components/feedback/Error'
import {
  useAdminCategories,
  useCreateCategory,
  useUpdateCategory,
  useToggleCategoryStatus,
  useDeleteCategory,
} from '@features/admin/hooks/useAdminCategories'
import { Category, CreateCategoryDto, UpdateCategoryDto } from '@features/admin/api/adminCategoriesApi'

/**
 * Page de gestion des catégories pour l'admin
 */
export const AdminCategoriesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  const { data: categories, isLoading, error, refetch } = useAdminCategories()
  const createCategory = useCreateCategory()
  const updateCategory = useUpdateCategory()
  const toggleStatus = useToggleCategoryStatus()
  const deleteCategory = useDeleteCategory()

  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category)
    setIsCreating(false)
  }

  const handleCreateNew = () => {
    setSelectedCategory(null)
    setIsCreating(true)
    // Scroll vers le formulaire
    setTimeout(() => {
      const formElement = document.querySelector('[data-category-form]')
      formElement?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  const handleCancel = () => {
    setSelectedCategory(null)
    setIsCreating(false)
  }

  const handleSubmit = async (formData: CreateCategoryDto | UpdateCategoryDto) => {
    try {
      if (selectedCategory) {
        // Mise à jour
        const updated = await updateCategory.mutateAsync({
          categoryId: selectedCategory.id,
          data: formData as UpdateCategoryDto,
        })
        // Mettre à jour la catégorie sélectionnée avec les nouvelles données
        setSelectedCategory(updated)
      } else {
        // Création
        await createCategory.mutateAsync(formData as CreateCategoryDto)
        setIsCreating(false)
        // Rafraîchir la liste
        refetch()
      }
    } catch (error) {
      // L'erreur est déjà gérée par le hook
      console.error('Error submitting form:', error)
    }
  }

  const handleToggleStatus = async (categoryId: string) => {
    await toggleStatus.mutateAsync(categoryId)
    // Mettre à jour la catégorie sélectionnée si c'est celle-ci
    if (selectedCategory?.id === categoryId) {
      const updated = await refetch()
      const updatedCategory = updated.data?.find((c) => c.id === categoryId)
      if (updatedCategory) {
        setSelectedCategory(updatedCategory)
      }
    }
  }

  const handleDelete = async (categoryId: string) => {
    await deleteCategory.mutateAsync(categoryId)
    if (selectedCategory?.id === categoryId) {
      setSelectedCategory(null)
    }
  }

  // Trier les catégories par display_order
  const sortedCategories = categories
    ? [...categories].sort((a, b) => a.display_order - b.display_order)
    : []

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Categories Management */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Category Management</h1>
          </div>

          {/* Categories List */}
          {isLoading && (
            <div className="flex items-center justify-center h-64">
              <Loading message="Chargement des catégories..." />
            </div>
          )}

          {error && (
            <Error
              message="Erreur lors du chargement des catégories"
              onRetry={() => refetch()}
            />
          )}

          {!isLoading && !error && (
            <div className="space-y-3">
              {sortedCategories.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  Aucune catégorie trouvée
                </div>
              ) : (
                sortedCategories.map((category) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    isSelected={selectedCategory?.id === category.id}
                    onSelect={handleSelectCategory}
                    onEdit={handleSelectCategory}
                    onDelete={handleDelete}
                    onToggleStatus={handleToggleStatus}
                  />
                ))
              )}
            </div>
          )}
        </div>

        {/* Right Column - Edit/Create Form */}
        <div className="lg:col-span-1" data-category-form>
          {(selectedCategory || isCreating) ? (
            <CategoryForm
              category={selectedCategory || undefined}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              isLoading={createCategory.isPending || updateCategory.isPending}
            />
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p className="mb-4">Select a category to edit</p>
              <Button variant="primary" onClick={handleCreateNew}>
                <Plus className="h-4 w-4 mr-2" />
                Create New Category
              </Button>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}

