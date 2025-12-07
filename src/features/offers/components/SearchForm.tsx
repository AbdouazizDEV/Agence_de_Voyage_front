import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Search } from 'lucide-react'
import { Button } from '@common/components/ui/Button'
import { Input } from '@common/components/ui/Input'
import { Select } from '@common/components/ui/Select'
import { Checkbox } from '@common/components/ui/Checkbox'
import { routes } from '@config/routes.config'
import { useSearchOffers } from '../hooks/useSearchOffers'
import { toast } from 'sonner'

const searchSchema = z.object({
  search: z.string().optional(),
  destination: z.string().optional(),
  category: z.string().optional(),
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
  minDuration: z.string().optional(),
  maxDuration: z.string().optional(),
  minRating: z.string().optional(),
  difficulty: z.enum(['easy', 'moderate', 'hard']).optional(),
  travelers: z.string().optional(),
  departureDate: z.string().optional(),
  returnDate: z.string().optional(),
  isPromotion: z.boolean().optional(),
})

type SearchFormData = z.infer<typeof searchSchema>

interface SearchFormProps {
  onSubmit?: (data: SearchFormData) => void
  compact?: boolean
}

/**
 * Formulaire de recherche avancée dans la Hero Section
 */
export const SearchForm = ({ onSubmit, compact = false }: SearchFormProps) => {
  const navigate = useNavigate()
  const { mutate: searchOffers, isPending } = useSearchOffers()
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
  })

  const isPromotion = watch('isPromotion')

  const categoryOptions = [
    { value: '', label: 'Toutes les catégories' },
    { value: 'Vols', label: 'Vols' },
    { value: 'Hôtels', label: 'Hôtels' },
    { value: 'Séjours', label: 'Séjours' },
    { value: 'Packages', label: 'Packages' },
  ]

  const difficultyOptions = [
    { value: '', label: 'Tous niveaux' },
    { value: 'easy', label: 'Facile' },
    { value: 'moderate', label: 'Modéré' },
    { value: 'hard', label: 'Difficile' },
  ]

  const onFormSubmit = (data: SearchFormData) => {
    // Transformer les données du formulaire en SearchRequest
    const searchRequest: Record<string, unknown> = {
      page: 1,
      limit: 12,
      sortBy: 'createdAt',
      sortOrder: 'desc',
    }

    if (data.search) searchRequest.search = data.search
    if (data.destination) searchRequest.destination = data.destination
    if (data.category) searchRequest.category = data.category
    if (data.minPrice) searchRequest.minPrice = parseInt(data.minPrice)
    if (data.maxPrice) searchRequest.maxPrice = parseInt(data.maxPrice)
    if (data.minDuration) searchRequest.minDuration = parseInt(data.minDuration)
    if (data.maxDuration) searchRequest.maxDuration = parseInt(data.maxDuration)
    if (data.minRating) searchRequest.minRating = parseFloat(data.minRating)
    if (data.difficulty) searchRequest.difficulty = data.difficulty
    if (data.travelers) searchRequest.travelers = parseInt(data.travelers)
    if (data.departureDate) {
      // Convertir la date en ISO 8601
      const date = new Date(data.departureDate)
      searchRequest.departureDate = date.toISOString()
    }
    if (data.returnDate) {
      const date = new Date(data.returnDate)
      searchRequest.returnDate = date.toISOString()
    }
    if (data.isPromotion !== undefined) {
      searchRequest.isPromotion = data.isPromotion
    }

    if (onSubmit) {
      onSubmit(data)
    } else {
      // Effectuer la recherche et rediriger vers la page des résultats
      searchOffers(searchRequest, {
        onSuccess: (response) => {
          navigate(routes.offers, {
            state: {
              searchRequest,
              results: response.data,
              pagination: response.pagination,
            },
          })
          toast.success(`${response.pagination.total} offres trouvées`)
        },
        onError: (error: unknown) => {
          const err = error as { response?: { data?: { error?: { message?: string } } } }
          toast.error(err.response?.data?.error?.message || 'Erreur lors de la recherche')
        },
      })
    }
  }

  if (compact) {
    // Version compacte pour la Hero Section
    return (
      <div className="bg-white rounded-lg shadow-xl p-6 mt-8">
        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className="grid grid-cols-1 md:grid-cols-5 gap-4"
        >
          <div className="md:col-span-1">
            <Input
              label="Destination"
              placeholder="Where to?"
              {...register('destination')}
            />
          </div>
          <div className="md:col-span-1">
            <Input
              label="Dates"
              type="date"
              placeholder="Check-in"
              {...register('departureDate')}
            />
          </div>
          <div className="md:col-span-1">
            <Input
              label="Travelers"
              type="number"
              placeholder="2"
              min="1"
              {...register('travelers')}
            />
          </div>
          <div className="md:col-span-1">
            <Input
              label="Budget max"
              type="number"
              placeholder="500000"
              {...register('maxPrice')}
            />
          </div>
          <div className="md:col-span-1 flex items-end">
            <Button type="submit" variant="primary" className="w-full" disabled={isPending}>
              <Search className="h-4 w-4 mr-2" />
              {isPending ? 'Recherche...' : 'Search Offers'}
            </Button>
          </div>
        </form>
      </div>
    )
  }

  // Version complète avec tous les champs
  return (
    <div className="bg-white rounded-lg shadow-xl p-6 mt-8">
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        {/* Première ligne : Recherche générale et Destination */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Recherche générale"
            placeholder="Titre, description..."
            {...register('search')}
            error={errors.search?.message}
          />
          <Input
            label="Destination"
            placeholder="Ex: Paris, Zanzibar..."
            {...register('destination')}
            error={errors.destination?.message}
          />
        </div>

        {/* Deuxième ligne : Catégorie, Difficulté, Note */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Select
              label="Catégorie"
              options={categoryOptions}
              value={watch('category') || ''}
              onChange={(e) => setValue('category', e.target.value || undefined)}
            />
          </div>
          <div>
            <Select
              label="Difficulté"
              options={difficultyOptions}
              value={watch('difficulty') || ''}
              onChange={(e) => {
                const value = e.target.value
                setValue('difficulty', (value === '' ? undefined : value) as 'easy' | 'moderate' | 'hard' | undefined)
              }}
            />
          </div>
          <Input
            type="number"
            label="Note minimum"
            placeholder="0-5"
            min="0"
            max="5"
            step="0.1"
            {...register('minRating')}
            error={errors.minRating?.message}
          />
        </div>

        {/* Troisième ligne : Prix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="number"
            label="Prix minimum"
            placeholder="Ex: 50000"
            {...register('minPrice')}
            error={errors.minPrice?.message}
          />
          <Input
            type="number"
            label="Prix maximum"
            placeholder="Ex: 500000"
            {...register('maxPrice')}
            error={errors.maxPrice?.message}
          />
        </div>

        {/* Quatrième ligne : Durée */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="number"
            label="Durée minimum (jours)"
            placeholder="Ex: 3"
            min="1"
            {...register('minDuration')}
            error={errors.minDuration?.message}
          />
          <Input
            type="number"
            label="Durée maximum (jours)"
            placeholder="Ex: 10"
            min="1"
            {...register('maxDuration')}
            error={errors.maxDuration?.message}
          />
        </div>

        {/* Cinquième ligne : Dates et Voyageurs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            type="date"
            label="Date de départ min"
            {...register('departureDate')}
            error={errors.departureDate?.message}
          />
          <Input
            type="date"
            label="Date de retour max"
            {...register('returnDate')}
            error={errors.returnDate?.message}
          />
          <Input
            type="number"
            label="Nombre de voyageurs"
            placeholder="Ex: 2"
            min="1"
            {...register('travelers')}
            error={errors.travelers?.message}
          />
        </div>

        {/* Promotion */}
        <div>
          <Checkbox
            label="Uniquement les promotions"
            checked={isPromotion || false}
            onChange={(e) => setValue('isPromotion', e.target.checked)}
          />
        </div>

        {/* Bouton de recherche */}
        <div className="flex justify-end">
          <Button type="submit" variant="primary" className="w-full md:w-auto" disabled={isPending}>
            <Search className="h-4 w-4 mr-2" />
            {isPending ? 'Recherche en cours...' : 'Rechercher'}
          </Button>
        </div>
      </form>
    </div>
  )
}
