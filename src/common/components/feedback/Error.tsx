import { AlertCircle } from 'lucide-react'
import { BaseComponentProps } from '@common/types/component.types'
import { Button } from '@common/components/ui/Button'

export interface ErrorProps extends BaseComponentProps {
  message?: string
  onRetry?: () => void
}

export const Error = ({ className, message = 'Une erreur est survenue', onRetry }: ErrorProps) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 ${className || ''}`}>
      <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
      <p className="text-sm text-gray-600 mb-4">{message}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          Réessayer
        </Button>
      )}
    </div>
  )
}

