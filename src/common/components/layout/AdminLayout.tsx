import { ReactNode } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Plane, LayoutDashboard, Tag, FolderTree, Settings, Plus } from 'lucide-react'
import { Button } from '@common/components/ui/Button'
import { routes } from '@config/routes.config'
import { cn } from '@common/utils/cn'

interface AdminLayoutProps {
  children: ReactNode
}

interface NavItem {
  label: string
  icon: React.ComponentType<{ className?: string }>
  path: string
}

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, path: routes.admin.dashboard },
  { label: 'Offers', icon: Tag, path: routes.admin.offers },
  { label: 'Catégories', icon: FolderTree, path: routes.admin.categories },
  { label: 'Settings', icon: Settings, path: routes.admin.settings },
]

/**
 * Layout pour les pages admin avec sidebar
 */
export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <Plane className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-gray-900">Travel Agency</div>
              <div className="text-xs text-gray-500">Back-office Panel</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                  isActive
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Bouton New Offer */}
        <div className="p-4 border-t border-gray-200">
          <Button
            variant="primary"
            className="w-full"
            onClick={() => navigate(routes.admin.offers)}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Offer
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  )
}

