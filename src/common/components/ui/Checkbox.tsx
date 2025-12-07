import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@common/utils/cn'

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          className={cn(
            'h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500',
            className
          )}
          ref={ref}
          {...props}
        />
        {label && (
          <label className="text-sm text-gray-700 cursor-pointer">
            {label}
          </label>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'

