import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { Button } from '@common/components/ui/Button'
import { Input } from '@common/components/ui/Input'
import { SearchFormData } from '@common/types/home.types'
import { routes } from '@config/routes.config'

interface SearchFormProps {
  onSubmit?: (data: SearchFormData) => void
}

/**
 * Formulaire de recherche dans la Hero Section
 */
export const SearchForm = ({ onSubmit }: SearchFormProps) => {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<SearchFormData>()

  const onFormSubmit = (data: SearchFormData) => {
    if (onSubmit) {
      onSubmit(data)
    } else {
      // Rediriger vers la page des offres avec les paramètres de recherche
      navigate(routes.offers, {
        state: { search: data },
      })
    }
  }

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
            placeholder="Check-in - Check-out"
            {...register('dates')}
          />
        </div>
        <div className="md:col-span-1">
          <Input
            label="Travelers"
            placeholder="2 travelers"
            {...register('travelers')}
          />
        </div>
        <div className="md:col-span-1">
          <Input
            label="Budget"
            placeholder="$1000 - $2000"
            {...register('budget')}
          />
        </div>
        <div className="md:col-span-1 flex items-end">
          <Button type="submit" variant="primary" className="w-full">
            <Search className="h-4 w-4 mr-2" />
            Search Offers
          </Button>
        </div>
      </form>
    </div>
  )
}

