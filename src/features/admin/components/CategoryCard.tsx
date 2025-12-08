import { Pencil, Trash2 } from 'lucide-react'
import { Card } from '@common/components/ui/Card'
import { Badge } from '@common/components/ui/Badge'
import { Button } from '@common/components/ui/Button'
import { Category } from '../api/adminCategoriesApi'
import { cn } from '@common/utils/cn'

interface CategoryCardProps {
  category: Category
  isSelected?: boolean
  onSelect: (category: Category) => void
  onEdit: (category: Category) => void
  onDelete: (categoryId: string) => void
  onToggleStatus: (categoryId: string) => void
}

/**
 * Carte de catégorie pour la liste admin
 */
export const CategoryCard = ({
  category,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  onToggleStatus,
}: CategoryCardProps) => {
  return (
    <Card
      className={cn(
        'cursor-pointer transition-all duration-200 hover:shadow-md',
        isSelected && 'ring-2 ring-blue-500 border-blue-500'
      )}
      onClick={() => onSelect(category)}
    >
      <div className="flex gap-4 p-4">
        {/* Icon */}
        <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 text-3xl">
          {category.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate mb-1">
                {category.name}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">{category.description}</p>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <Badge
                variant={category.is_active ? 'default' : 'secondary'}
                className={cn(
                  category.is_active
                    ? 'bg-green-100 text-green-700 border-green-300'
                    : 'bg-red-100 text-red-700 border-red-300'
                )}
              >
                {category.is_active ? 'Active' : 'Désactivé'}
              </Badge>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>Ordre: {category.display_order}</span>
              <span className="text-xs text-gray-500">
                Slug: {category.slug}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              {/* Toggle Status */}
              <div className="flex items-center gap-2 mr-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    if (category.is_active) {
                      onToggleStatus(category.id)
                    }
                  }}
                  disabled={!category.is_active}
                  className={cn(
                    'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                    category.is_active
                      ? 'bg-green-500 cursor-pointer'
                      : 'bg-gray-300 cursor-not-allowed opacity-50'
                  )}
                  title={category.is_active ? 'Désactiver' : 'Catégorie désactivée'}
                >
                  <span
                    className={cn(
                      'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                      category.is_active ? 'translate-x-6' : 'translate-x-1'
                    )}
                  />
                </button>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(category)}
                className="h-8 w-8 p-0"
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
                    onDelete(category.id)
                  }
                }}
                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

