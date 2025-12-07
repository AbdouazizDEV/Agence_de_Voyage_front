import { ReactNode } from 'react'
import { cn } from '@common/utils/cn'

interface TabsProps {
  tabs: { id: string; label: string; content: ReactNode }[]
  activeTab: string
  onTabChange: (tabId: string) => void
  className?: string
}

/**
 * Composant Tabs pour la navigation entre sections
 */
export const Tabs = ({ tabs, activeTab, onTabChange, className }: TabsProps) => {
  return (
    <div className={cn('w-full', className)}>
      {/* Tab Headers */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'px-6 py-3 text-sm font-medium transition-colors border-b-2',
              activeTab === tab.id
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  )
}

