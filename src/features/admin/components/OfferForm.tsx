import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { X, Upload } from 'lucide-react'
import { Button } from '@common/components/ui/Button'
import { Input } from '@common/components/ui/Input'
import { Card, CardHeader, CardTitle, CardContent } from '@common/components/ui/Card'
import { Select } from '@common/components/ui/Select'
import { AdminOffer, CreateOfferDto, UpdateOfferDto } from '../api/adminOffersApi'
import { cn } from '@common/utils/cn'

const offerSchema = z.object({
  title: z.string().min(3, 'Le titre doit contenir au moins 3 caractères'),
  destination: z.string().min(2, 'La destination doit contenir au moins 2 caractères'),
  category: z.string().min(1, 'La catégorie est requise'),
  price: z.number().min(0, 'Le prix doit être positif'),
  duration: z.number().min(1, 'La durée doit être d\'au moins 1 jour'),
  description: z.string().min(10, 'La description doit contenir au moins 10 caractères'),
  max_capacity: z.number().min(1).optional(),
  available_seats: z.number().min(0).optional(),
  is_active: z.boolean().optional(),
  is_promotion: z.boolean().optional(),
  promotion_discount: z.number().min(0).max(100).optional(),
  promotion_ends_at: z.string().optional(),
  departure_date: z.string().optional(),
  return_date: z.string().optional(),
  difficulty: z.enum(['easy', 'moderate', 'hard']).optional(),
  tags: z.string().optional(),
  itinerary: z.string().optional(),
  included: z.string().optional(),
  excluded: z.string().optional(),
})

type OfferFormData = z.infer<typeof offerSchema>

interface OfferFormProps {
  offer?: AdminOffer | null
  onSubmit: (data: CreateOfferDto | UpdateOfferDto) => void
  onCancel: () => void
  isLoading?: boolean
}

/**
 * Formulaire de création/édition d'offre avec upload d'images
 */
export const OfferForm = ({ offer, onSubmit, onCancel, isLoading }: OfferFormProps) => {
  const [images, setImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [existingImages, setExistingImages] = useState<string[]>([])

  const isEditMode = !!offer

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<OfferFormData>({
    resolver: zodResolver(offerSchema),
    defaultValues: offer
      ? {
          title: offer.title,
          destination: offer.destination,
          category: offer.category,
          price: offer.price,
          duration: offer.duration,
          description: offer.description,
          max_capacity: offer.max_capacity,
          available_seats: offer.available_seats,
          is_active: offer.is_active,
          is_promotion: offer.is_promotion || false,
          promotion_discount: offer.promotion_discount || 0,
          promotion_ends_at: offer.promotion_ends_at
            ? new Date(offer.promotion_ends_at).toISOString().slice(0, 16)
            : undefined,
          departure_date: offer.departure_date
            ? new Date(offer.departure_date).toISOString().slice(0, 16)
            : undefined,
          return_date: offer.return_date
            ? new Date(offer.return_date).toISOString().slice(0, 16)
            : undefined,
          difficulty: (offer.difficulty as 'easy' | 'moderate' | 'hard') || 'easy',
          tags: offer.tags?.join(', ') || '',
          itinerary: offer.itinerary ? JSON.stringify(offer.itinerary) : '',
          included: offer.included?.join(', ') || '',
          excluded: offer.excluded?.join(', ') || '',
        }
      : {
          is_active: true,
          is_promotion: false,
          difficulty: 'easy',
        },
  })

  const isActive = watch('is_active')
  const isPromotion = watch('is_promotion')

  useEffect(() => {
    if (offer) {
      setExistingImages(offer.images || [])
    }
  }, [offer])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      setImages((prev) => [...prev, ...files])
      files.forEach((file) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          setImagePreviews((prev) => [...prev, reader.result as string])
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
    setImagePreviews((prev) => prev.filter((_, i) => i !== index))
  }

  const removeExistingImage = (index: number) => {
    // En mode édition, on garde une trace des images supprimées
    setExistingImages((prev) => prev.filter((_, i) => i !== index))
  }

  const onFormSubmit = (data: OfferFormData) => {
    // Convertir les chaînes en tableaux pour included/excluded/tags
    const includedArray = data.included
      ? data.included.split(',').map((item) => item.trim()).filter(Boolean)
      : undefined
    const excludedArray = data.excluded
      ? data.excluded.split(',').map((item) => item.trim()).filter(Boolean)
      : undefined
    const tagsArray = data.tags
      ? data.tags.split(',').map((item) => item.trim()).filter(Boolean)
      : undefined

    // Parser l'itinerary si c'est une chaîne JSON valide
    let itineraryParsed: string | undefined = undefined
    if (data.itinerary) {
      try {
        const parsed = JSON.parse(data.itinerary)
        itineraryParsed = JSON.stringify(parsed)
      } catch {
        // Si ce n'est pas du JSON valide, envoyer tel quel
        itineraryParsed = data.itinerary
      }
    }

    // Déterminer l'action sur les images en mode édition
    let imagesAction: 'add' | 'replace' | undefined = undefined
    let imagesToSend: File[] | undefined = undefined

    if (isEditMode) {
      if (images.length > 0 && existingImages.length > 0) {
        // Ajouter de nouvelles images aux existantes
        imagesAction = 'add'
        imagesToSend = images
      } else if (images.length > 0 && existingImages.length === 0) {
        // Remplacer toutes les images (plus d'existantes, on ajoute de nouvelles)
        imagesAction = 'replace'
        imagesToSend = images
      } else if (existingImages.length === 0 && images.length === 0) {
        // Supprimer toutes les images (plus d'existantes, pas de nouvelles)
        imagesAction = 'replace'
        imagesToSend = [] // Tableau vide pour indiquer la suppression
      }
      // Si existingImages.length > 0 et images.length === 0, on ne touche pas aux images
    } else {
      // Mode création : envoyer les images si présentes
      imagesToSend = images.length > 0 ? images : undefined
    }

    const formData: CreateOfferDto | UpdateOfferDto = {
      ...data,
      images: imagesToSend,
      images_action: imagesAction,
      itinerary: itineraryParsed,
      included: includedArray ? includedArray.join(', ') : undefined,
      excluded: excludedArray ? excludedArray.join(', ') : undefined,
      tags: tagsArray ? tagsArray.join(', ') : undefined,
      is_active: data.is_active ?? true,
      is_promotion: data.is_promotion ?? false,
    }

    onSubmit(formData)
  }

  const categoryOptions = [
    { value: 'Séjours', label: 'Séjours' },
    { value: 'Packages', label: 'Packages' },
    { value: 'Hôtels', label: 'Hôtels' },
    { value: 'Vols', label: 'Vols' },
    { value: 'Circuits', label: 'Circuits' },
  ]

  const difficultyOptions = [
    { value: 'easy', label: 'Facile' },
    { value: 'moderate', label: 'Modéré' },
    { value: 'hard', label: 'Difficile' },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditMode ? 'Edit Offer' : 'Create New Offer'}</CardTitle>
        {isEditMode && offer && (
          <p className="text-sm text-gray-600 mt-1">
            Modify the details for the '{offer.title}' offer.
          </p>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          {/* Title */}
          <Input
            label="Title"
            {...register('title')}
            error={errors.title?.message}
            placeholder="Enter offer title"
          />

          {/* Destination */}
          <Input
            label="Destination"
            {...register('destination')}
            error={errors.destination?.message}
            placeholder="Enter destination"
          />

          {/* Price */}
          <Input
            label="Price (FCFA)"
            type="number"
            {...register('price', { valueAsNumber: true })}
            error={errors.price?.message}
            placeholder="0"
          />

          {/* Category */}
          <Select
            label="Category"
            options={categoryOptions}
            {...register('category')}
          />
          {errors.category && (
            <p className="text-sm text-red-600">{errors.category.message}</p>
          )}

          {/* Duration */}
          <Input
            label="Duration (days)"
            type="number"
            {...register('duration', { valueAsNumber: true })}
            error={errors.duration?.message}
            placeholder="0"
          />

          {/* Max Capacity */}
          <Input
            label="Max Capacity"
            type="number"
            {...register('max_capacity', { valueAsNumber: true })}
            error={errors.max_capacity?.message}
            placeholder="0"
          />

          {/* Available Seats */}
          {isEditMode && (
            <Input
              label="Available Seats"
              type="number"
              {...register('available_seats', { valueAsNumber: true })}
              error={errors.available_seats?.message}
              placeholder="0"
            />
          )}

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Detailed Description
            </label>
            <textarea
              rows={4}
              {...register('description')}
              className={cn(
                'flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
                errors.description && 'border-red-500 focus-visible:ring-red-500'
              )}
              placeholder="Enter detailed description"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          {/* Images Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
            
            {/* Existing Images */}
            {existingImages.length > 0 && (
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Existing Images (click X to remove)</p>
                <div className="grid grid-cols-3 gap-2">
                  {existingImages.map((imageUrl, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={imageUrl}
                        alt={`Existing ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeExistingImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* New Images Preview */}
            {imagePreviews.length > 0 && (
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">New Images (click X to remove)</p>
                <div className="grid grid-cols-3 gap-2">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upload Area */}
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-2 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">SVG, PNG, JPG (MAX. 1200x800px)</p>
              </div>
              <input
                type="file"
                className="hidden"
                multiple
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>

          {/* Status Toggle */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="text-sm font-medium text-gray-700">Status</label>
              <p className="text-xs text-gray-500">Active / Inactive</p>
            </div>
            <button
              type="button"
              onClick={() => setValue('is_active', !isActive, { shouldValidate: true })}
              className={cn(
                'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                isActive ? 'bg-green-500' : 'bg-gray-300'
              )}
            >
              <span
                className={cn(
                  'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                  isActive ? 'translate-x-6' : 'translate-x-1'
                )}
              />
            </button>
            <input type="hidden" value={isActive ? 'true' : 'false'} {...register('is_active', { value: isActive })} />
          </div>

          {/* Promotion Toggle */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="text-sm font-medium text-gray-700">Promotion</label>
              <p className="text-xs text-gray-500">Enable promotion</p>
            </div>
            <button
              type="button"
              onClick={() => setValue('is_promotion', !isPromotion, { shouldValidate: true })}
              className={cn(
                'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                isPromotion ? 'bg-blue-500' : 'bg-gray-300'
              )}
            >
              <span
                className={cn(
                  'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                  isPromotion ? 'translate-x-6' : 'translate-x-1'
                )}
              />
            </button>
            <input type="hidden" value={isPromotion ? 'true' : 'false'} {...register('is_promotion', { value: isPromotion })} />
          </div>

          {/* Promotion Discount */}
          {isPromotion && (
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Promotion Discount (%)"
                type="number"
                {...register('promotion_discount', { valueAsNumber: true })}
                error={errors.promotion_discount?.message}
                placeholder="0"
              />
              <Input
                label="Promotion Ends At"
                type="datetime-local"
                {...register('promotion_ends_at')}
                error={errors.promotion_ends_at?.message}
              />
            </div>
          )}

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Departure Date"
              type="datetime-local"
              {...register('departure_date')}
              error={errors.departure_date?.message}
            />
            <Input
              label="Return Date"
              type="datetime-local"
              {...register('return_date')}
              error={errors.return_date?.message}
            />
          </div>

          {/* Difficulty */}
          <Select
            label="Difficulty"
            options={difficultyOptions}
            {...register('difficulty')}
          />

          {/* Tags */}
          <Input
            label="Tags (comma separated)"
            {...register('tags')}
            placeholder="tag1, tag2, tag3"
          />

          {/* Itinerary, Included, Excluded (JSON strings) */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Itinerary (JSON string)
              </label>
              <textarea
                rows={3}
                {...register('itinerary')}
                className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                placeholder='[{"day": 1, "title": "...", "description": "..."}]'
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Included (comma separated)
              </label>
              <Input {...register('included')} placeholder="Item 1, Item 2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Excluded (comma separated)
              </label>
              <Input {...register('excluded')} placeholder="Item 1, Item 2" />
            </div>
          </div>

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
              {isLoading ? 'Saving...' : isEditMode ? 'Save Changes' : 'Create Offer'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

