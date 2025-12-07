import { useState } from 'react'
import { Button } from '@common/components/ui/Button'
import { Checkbox } from '@common/components/ui/Checkbox'
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
  const [localPriceRange, setLocalPriceRange] = useState(filters.priceRange)

  const durationOptions = [
    { value: '3-5', label: '3-5 days' },
    { value: '7', label: '7 days' },
    { value: '14+', label: '14+ days' },
  ]

  const categoryOptions = [
    { value: 'beach', label: 'Beach' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'cultural', label: 'Cultural' },
    { value: 'city-break', label: 'City Break' },
  ]

  const handlePriceChange = (type: 'min' | 'max', value: number) => {
    const newRange = {
      ...localPriceRange,
      [type]: value,
    }
    setLocalPriceRange(newRange)
    onFiltersChange({
      ...filters,
      priceRange: newRange,
    })
  }

  const handleDurationToggle = (value: string) => {
    const newDurations = filters.duration.includes(value)
      ? filters.duration.filter((d) => d !== value)
      : [...filters.duration, value]
    onFiltersChange({
      ...filters,
      duration: newDurations,
    })
  }

  const handleCategoryToggle = (value: string) => {
    const newCategories = filters.categories.includes(value)
      ? filters.categories.filter((c) => c !== value)
      : [...filters.categories, value]
    onFiltersChange({
      ...filters,
      categories: newCategories,
    })
  }

  return (
    <aside className="bg-white rounded-lg shadow-sm p-6 h-fit sticky top-4">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Filters</h2>

      {/* Price Range */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Price Range
        </label>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>${localPriceRange.min}</span>
            <span>${localPriceRange.max === 5000 ? '5000+' : localPriceRange.max}</span>
          </div>
          <input
            type="range"
            min="500"
            max="5000"
            step="100"
            value={localPriceRange.max}
            onChange={(e) => handlePriceChange('max', Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
          />
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>$500</span>
            <span>$5000+</span>
          </div>
        </div>
      </div>

      {/* Duration */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Duration
        </label>
        <div className="space-y-3">
          {durationOptions.map((option) => (
            <Checkbox
              key={option.value}
              label={option.label}
              checked={filters.duration.includes(option.value)}
              onChange={() => handleDurationToggle(option.value)}
            />
          ))}
        </div>
      </div>

      {/* Category */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Category
        </label>
        <div className="space-y-3">
          {categoryOptions.map((option) => (
            <Checkbox
              key={option.value}
              label={option.label}
              checked={filters.categories.includes(option.value)}
              onChange={() => handleCategoryToggle(option.value)}
            />
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button variant="primary" className="w-full" onClick={onApply}>
          Apply Filters
        </Button>
        <Button variant="outline" className="w-full" onClick={onClear}>
          Clear
        </Button>
      </div>
    </aside>
  )
}

