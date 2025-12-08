import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@common/components/ui/Button'
import { Input } from '@common/components/ui/Input'
import { Card, CardHeader, CardTitle, CardContent } from '@common/components/ui/Card'
import { Category, CreateCategoryDto, UpdateCategoryDto } from '../api/adminCategoriesApi'
import { cn } from '@common/utils/cn'

const categorySchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  description: z.string().min(5, 'La description doit contenir au moins 5 caractères'),
  icon: z.string().min(1, 'L\'icône est requise'),
  displayOrder: z.number().min(1, 'L\'ordre d\'affichage doit être au moins 1'),
})

type CategoryFormData = z.infer<typeof categorySchema>

interface CategoryFormProps {
  category?: Category | null
  onSubmit: (data: CreateCategoryDto | UpdateCategoryDto) => void
  onCancel: () => void
  isLoading?: boolean
}

/**
 * Formulaire de création/édition de catégorie
 */
export const CategoryForm = ({ category, onSubmit, onCancel, isLoading }: CategoryFormProps) => {
  const isEditMode = !!category

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: category
      ? {
          name: category.name,
          description: category.description,
          icon: category.icon,
          displayOrder: category.display_order,
        }
      : {
          displayOrder: 1,
        },
  })

  const onFormSubmit = (data: CategoryFormData) => {
    onSubmit(data)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditMode ? 'Edit Category' : 'Create New Category'}</CardTitle>
        {isEditMode && category && (
          <p className="text-sm text-gray-600 mt-1">
            Modify the details for the '{category.name}' category.
          </p>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          {/* Name */}
          <Input
            label="Name"
            {...register('name')}
            error={errors.name?.message}
            placeholder="Enter category name"
          />

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              {...register('description')}
              className={cn(
                'flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
                errors.description && 'border-red-500 focus-visible:ring-red-500'
              )}
              placeholder="Enter category description"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          {/* Icon */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Icon (Emoji)
            </label>
            <Input
              {...register('icon')}
              error={errors.icon?.message}
              placeholder="✈️"
              maxLength={2}
            />
            <p className="mt-1 text-xs text-gray-500">
              Entrez un emoji (ex: ✈️, 🏨, 🏖️, 🎁, 🚢, 🗺️)
            </p>
          </div>

          {/* Display Order */}
          <Input
            label="Display Order"
            type="number"
            {...register('displayOrder', { valueAsNumber: true })}
            error={errors.displayOrder?.message}
            placeholder="1"
          />

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? 'Saving...' : isEditMode ? 'Save Changes' : 'Create Category'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

