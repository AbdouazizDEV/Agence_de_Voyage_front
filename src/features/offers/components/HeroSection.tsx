import { SearchForm } from './SearchForm'
import { SearchFormData } from '@common/types/home.types'

interface HeroSectionProps {
  onSearch?: (data: SearchFormData) => void
}

/**
 * Section Hero avec image de fond et formulaire de recherche
 */
export const HeroSection = ({ onSearch }: HeroSectionProps) => {
  return (
    <section className="relative h-[600px] flex items-center justify-center">
      {/* Image de fond */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80)',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Contenu */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          Your Next Adventure Awaits
        </h1>
        <p className="text-xl text-white mb-8">
          Curated travel packages, just a message away
        </p>

        {/* Formulaire de recherche */}
        <div className="max-w-5xl mx-auto">
          <SearchForm onSubmit={onSearch} />
        </div>
      </div>
    </section>
  )
}

