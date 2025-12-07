 import { Link, useNavigate } from 'react-router-dom'
import { Plane, Globe } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@common/components/ui/Button'
import { Select } from '@common/components/ui/Select'
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

  const languageOptions = [
    { value: 'fr', label: '🇫🇷 FR' },
    { value: 'en', label: '🇬🇧 EN' },
  ]

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value)
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
            <Button
              variant="outline"
              onClick={() => navigate(routes.login)}
            >
              {t('nav:login')}
            </Button>
            <Button variant="primary">
              {t('nav:contactUs')}
            </Button>
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

