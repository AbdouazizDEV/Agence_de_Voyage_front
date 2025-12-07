import { cn } from '@common/utils/cn'
import { BaseComponentProps } from '@common/types/component.types'

export interface SpinnerProps extends BaseComponentProps {
  size?: 'sm' | 'md' | 'lg'
}

export const Spinner = ({ className, size = 'md' }: SpinnerProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  }

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-gray-300 border-t-primary-600',
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}

