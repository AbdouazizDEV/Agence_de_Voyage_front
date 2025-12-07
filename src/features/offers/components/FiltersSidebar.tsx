import { useState } from 'react'
import { Button } from '@common/components/ui/Button'
import { Checkbox } from '@common/components/ui/Checkbox'
import { Input } from '@common/components/ui/Input'
import { Select } from '@common/components/ui/Select'
import { OfferFilters } from '../types/offers.types'

interface FiltersSidebarProps {
  filters: OfferFilters
  onFiltersChange: (filters: OfferFilters) => void
  onApply: () => void
  onClear: () => void
}

/**
 * Sidebar de filtres pour la recherche d'offres
 */
export const FiltersSidebar = ({
  filters,
  onFiltersChange,
  onApply,
  onClear,
}: FiltersSidebarProps) => {
  const [localMinPrice, setLocalMinPrice] = useState(filters.minPrice?.toString() || '')
  const [localMaxPrice, setLocalMaxPrice] = useState(filters.maxPrice?.toString() || '')

  const categoryOptions = [
    { value: 'Vols', label: 'Vols' },
    { value: 'Hôtels', label: 'Hôtels' },
    { value: 'Séjours', label: 'Séjours' },
    { value: 'Packages', label: 'Packages' },
  ]

  const difficultyOptions = [
    { value: 'easy', label: 'Facile' },
    { value: 'moderate', label: 'Modéré' },
    { value: 'hard', label: 'Difficile' },
  ]

  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    const numValue = value ? parseInt(value) : undefined
    if (type === 'min') {
      setLocalMinPrice(value)
      onFiltersChange({ ...filters, minPrice: numValue })
    } else {
      setLocalMaxPrice(value)
      onFiltersChange({ ...filters, maxPrice: numValue })
    }
  }

  const handleCategoryChange = (value: string) => {
    onFiltersChange({
      ...filters,
      category: value || undefined,
    })
  }

  const handleDifficultyChange = (value: string) => {
    onFiltersChange({
      ...filters,
      difficulty: value as 'easy' | 'moderate' | 'hard' | undefined,
    })
  }

  const handlePromotionToggle = (checked: boolean) => {
    onFiltersChange({
      ...filters,
      isPromotion: checked || undefined,
    })
  }

  return (
    <aside className="bg-white rounded-lg shadow-sm p-6 h-fit sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Filtres</h2>

      {/* Recherche textuelle */}
      <div className="mb-6">
        <Input
          label="Recherche"
          placeholder="Titre, destination..."
          value={filters.search || ''}
          onChange={(e) =>
            onFiltersChange({ ...filters, search: e.target.value || undefined })
          }
        />
      </div>

      {/* Destination */}
      <div className="mb-6">
        <Input
          label="Destination"
          placeholder="Ex: Paris, Zanzibar..."
          value={filters.destination || ''}
          onChange={(e) =>
            onFiltersChange({ ...filters, destination: e.target.value || undefined })
          }
        />
      </div>

      {/* Category */}
      <div className="mb-6">
        <Select
          label="Catégorie"
          options={[{ value: '', label: 'Toutes' }, ...categoryOptions]}
          value={filters.category || ''}
          onChange={(e) => handleCategoryChange(e.target.value)}
        />
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Fourchette de Prix
        </label>
        <div className="space-y-3">
          <Input
            type="number"
            placeholder="Prix min"
            value={localMinPrice}
            onChange={(e) => handlePriceChange('min', e.target.value)}
          />
          <Input
            type="number"
            placeholder="Prix max"
            value={localMaxPrice}
            onChange={(e) => handlePriceChange('max', e.target.value)}
          />
        </div>
      </div>

      {/* Duration Range */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Durée (jours)
        </label>
        <div className="space-y-3">
          <Input
            type="number"
            placeholder="Durée min"
            value={filters.minDuration?.toString() || ''}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                minDuration: e.target.value ? parseInt(e.target.value) : undefined,
              })
            }
          />
          <Input
            type="number"
            placeholder="Durée max"
            value={filters.maxDuration?.toString() || ''}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                maxDuration: e.target.value ? parseInt(e.target.value) : undefined,
              })
            }
          />
        </div>
      </div>

      {/* Rating */}
      <div className="mb-6">
        <Input
          type="number"
          label="Note minimum"
          placeholder="0-5"
          min="0"
          max="5"
          step="0.1"
          value={filters.minRating?.toString() || ''}
          onChange={(e) =>
            onFiltersChange({
              ...filters,
              minRating: e.target.value ? parseFloat(e.target.value) : undefined,
            })
          }
        />
      </div>

      {/* Difficulty */}
      <div className="mb-6">
        <Select
          label="Difficulté"
          options={[{ value: '', label: 'Toutes' }, ...difficultyOptions]}
          value={filters.difficulty || ''}
          onChange={(e) => handleDifficultyChange(e.target.value)}
        />
      </div>

      {/* Travelers */}
      <div className="mb-6">
        <Input
          type="number"
          label="Nombre de voyageurs"
          placeholder="Ex: 2"
          value={filters.travelers?.toString() || ''}
          onChange={(e) =>
            onFiltersChange({
              ...filters,
              travelers: e.target.value ? parseInt(e.target.value) : undefined,
            })
          }
        />
      </div>

      {/* Dates */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Dates
        </label>
        <div className="space-y-3">
          <Input
            type="date"
            label="Date de départ min"
            value={filters.departureDate || ''}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                departureDate: e.target.value || undefined,
              })
            }
          />
          <Input
            type="date"
            label="Date de retour max"
            value={filters.returnDate || ''}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                returnDate: e.target.value || undefined,
              })
            }
          />
        </div>
      </div>

      {/* Promotion */}
      <div className="mb-6">
        <Checkbox
          label="Uniquement les promotions"
          checked={filters.isPromotion || false}
          onChange={(e) => handlePromotionToggle(e.target.checked)}
        />
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button variant="primary" className="w-full" onClick={onApply}>
          Appliquer les Filtres
        </Button>
        <Button variant="outline" className="w-full" onClick={onClear}>
          Réinitialiser
        </Button>
      </div>
    </aside>
  )
}
