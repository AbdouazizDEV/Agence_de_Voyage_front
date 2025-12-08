 import { Link, useNavigate } from 'react-router-dom'
import { Plane, Globe, LogOut, User, LayoutDashboard } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@common/components/ui/Button'
import { Select } from '@common/components/ui/Select'
import { useAuth } from '@features/auth/hooks/useAuth'
import { useLogout } from '@features/auth/hooks/useLogout'
import { routes } from '@config/routes.config'
import { cn } from '@common/utils/cn'

interface HeaderProps {
  className?: string
}

/**
 * Composant Header avec logo, navigation et boutons Contact et Connexion
 */
export const Header = ({ className }: HeaderProps) => {
  const navigate = useNavigate()
  const { i18n, t } = useTranslation()
  const { user, isAuthenticated } = useAuth()
  const logoutMutation = useLogout()

  const languageOptions = [
    { value: 'fr', label: '🇫🇷 FR' },
    { value: 'en', label: '🇬🇧 EN' },
  ]

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value)
  }

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  // Construire le nom complet de l'utilisateur
  const getUserDisplayName = () => {
    if (!user) return ''
    const firstName = user.first_name || ''
    const lastName = user.last_name || ''
    if (firstName || lastName) {
      return `${firstName} ${lastName}`.trim()
    }
    return user.email
  }

  return (
    <header className={cn('bg-white border-b-4 border-primary-600', className)}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to={routes.home} className="flex items-center gap-2">
            <Plane className="h-6 w-6 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">TravelAgency</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to={routes.offers}
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              {t('nav:offers')}
            </Link>
            <Link
              to="/destinations"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              {t('nav:destinations')}
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              {t('nav:about')}
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              {t('nav:contact')}
            </Link>
          </nav>

          {/* Sélecteur de langue et Boutons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Sélecteur de langue */}
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-gray-600" />
              <Select
                options={languageOptions}
                value={i18n.language}
                onChange={handleLanguageChange}
                className="w-24"
              />
            </div>

            {isAuthenticated && user ? (
              <>
                {/* Informations utilisateur */}
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-md">
                  <User className="h-4 w-4 text-gray-600" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900">
                      {getUserDisplayName()}
                    </span>
                    <span className="text-xs text-gray-500 capitalize">
                      {user.role}
                    </span>
                  </div>
                </div>

                {/* Bouton Dashboard pour admin */}
                {user.role === 'admin' && (
                  <Button
                    variant="outline"
                    onClick={() => navigate(routes.admin.dashboard)}
                    className="flex items-center gap-2"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Button>
                )}

                {/* Bouton Déconnexion */}
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  disabled={logoutMutation.isPending}
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  {logoutMutation.isPending ? 'Déconnexion...' : t('nav:logout')}
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => navigate(routes.login)}
                >
                  {t('nav:login')}
                </Button>
                <Button 
                  variant="primary"
                  onClick={() => navigate('/contact')}
                >
                  {t('nav:contactUs')}
                </Button>
              </>
            )}
          </div>

          {/* Menu mobile (hamburger) */}
          <button className="md:hidden text-gray-700">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}

