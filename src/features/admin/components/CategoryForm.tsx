import { useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'
import { Smile } from 'lucide-react'
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
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const emojiPickerRef = useRef<HTMLDivElement>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
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

  const selectedIcon = watch('icon')

  // Fermer le picker si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false)
      }
    }

    if (showEmojiPicker) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showEmojiPicker])

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setValue('icon', emojiData.emoji, { shouldValidate: true })
    setShowEmojiPicker(false)
  }

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
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <div
                  className={cn(
                    'flex items-center justify-center w-full h-10 rounded-md border border-gray-300 bg-white px-3 cursor-pointer transition-colors hover:border-primary-500',
                    errors.icon && 'border-red-500',
                    !selectedIcon && 'text-gray-400'
                  )}
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                  {selectedIcon ? (
                    <span className="text-2xl">{selectedIcon}</span>
                  ) : (
                    <span className="text-sm text-gray-500">Cliquez pour choisir un emoji</span>
                  )}
                </div>
                <input
                  type="hidden"
                  {...register('icon')}
                />
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="px-4"
                title="Choisir un emoji"
              >
                <Smile className="h-4 w-4" />
              </Button>
            </div>
            {showEmojiPicker && (
              <div ref={emojiPickerRef} className="mt-2 relative z-50">
                <div className="absolute top-0 left-0 shadow-lg rounded-lg overflow-hidden">
                  <EmojiPicker
                    onEmojiClick={onEmojiClick}
                    autoFocusSearch={false}
                    skinTonesDisabled
                    previewConfig={{
                      showPreview: false,
                    }}
                  />
                </div>
              </div>
            )}
            <p className="mt-1 text-xs text-gray-500">
              Cliquez sur le bouton smiley ou dans le champ pour choisir un emoji
            </p>
            {errors.icon && (
              <p className="mt-1 text-sm text-red-600">{errors.icon.message}</p>
            )}
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

