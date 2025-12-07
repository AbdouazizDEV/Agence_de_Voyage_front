import { Package } from 'lucide-react'
import { BaseComponentProps } from '@common/types/component.types'

export interface EmptyProps extends BaseComponentProps {
  message?: string
}

export const Empty = ({ className, message = 'Aucun élément trouvé' }: EmptyProps) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 ${className || ''}`}>
      <Package className="h-12 w-12 text-gray-400 mb-4" />
      <p className="text-sm text-gray-600">{message}</p>
    </div>
  )
}

