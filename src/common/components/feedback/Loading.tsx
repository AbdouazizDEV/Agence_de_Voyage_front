import { Spinner } from '@common/components/ui/Spinner'
import { BaseComponentProps } from '@common/types/component.types'

export interface LoadingProps extends BaseComponentProps {
  message?: string
}

export const Loading = ({ className, message = 'Chargement...' }: LoadingProps) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 ${className || ''}`}>
      <Spinner size="lg" />
      {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
    </div>
  )
}

