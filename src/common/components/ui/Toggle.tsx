import { HTMLAttributes } from 'react'
import { cn } from '@common/utils/cn'

interface ToggleOption {
  value: string
  label: string
}

interface ToggleProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: ToggleOption[]
  value: string
  onChange: (value: string) => void
}

/**
 * Composant Toggle pour switcher entre deux options
 */
export const Toggle = ({
  options,
  value,
  onChange,
  className,
  ...props
}: ToggleProps) => {
  return (
    <div
      className={cn(
        'inline-flex bg-gray-100 rounded-lg p-1',
        className
      )}
      {...props}
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={cn(
            'px-4 py-2 rounded-md text-sm font-medium transition-all',
            value === option.value
              ? 'bg-white text-primary-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

