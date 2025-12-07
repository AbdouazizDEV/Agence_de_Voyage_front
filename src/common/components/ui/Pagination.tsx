import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from './Button'
import { cn } from '@common/utils/cn'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

/**
 * Composant de pagination
 */
export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    
    if (totalPages <= 7) {
      // Afficher toutes les pages si <= 7
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Logique avec ellipses
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i)
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i)
      } else {
        pages.push(1)
        pages.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i)
        pages.push('...')
        pages.push(totalPages)
      }
    }
    
    return pages
  }

  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {getPageNumbers().map((page, index) => {
        if (page === '...') {
          return (
            <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
              ...
            </span>
          )
        }

        const pageNumber = page as number
        return (
          <Button
            key={pageNumber}
            variant={currentPage === pageNumber ? 'primary' : 'outline'}
            size="sm"
            onClick={() => onPageChange(pageNumber)}
            className={cn(
              currentPage === pageNumber && 'bg-primary-600 text-white'
            )}
          >
            {pageNumber}
          </Button>
        )
      })}

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

