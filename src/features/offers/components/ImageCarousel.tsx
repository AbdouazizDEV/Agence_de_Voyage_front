import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@common/components/ui/Button'
import { cn } from '@common/utils/cn'

interface ImageCarouselProps {
  images: string[]
  alt?: string
  className?: string
}

/**
 * Carousel d'images pour les détails d'offre
 */
export const ImageCarousel = ({
  images,
  alt = 'Offer image',
  className,
}: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  if (images.length === 0) {
    return null
  }

  return (
    <div className={cn('relative w-full', className)}>
      {/* Image principale */}
      <div className="relative h-96 md:h-[500px] overflow-hidden rounded-lg">
        <img
          src={images[currentIndex]}
          alt={`${alt} ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />

        {/* Boutons de navigation */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="sm"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
              onClick={goToNext}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </>
        )}
      </div>

      {/* Indicateurs */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                'w-2 h-2 rounded-full transition-all',
                index === currentIndex
                  ? 'bg-primary-600 w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

