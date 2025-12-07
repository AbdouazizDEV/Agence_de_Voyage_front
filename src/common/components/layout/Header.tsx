import { Link, useNavigate } from 'react-router-dom'
import { Plane } from 'lucide-react'
import { Button } from '@common/components/ui/Button'
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
              Offers
            </Link>
            <Link
              to="/destinations"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Destinations
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Boutons Connexion et Contact */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => navigate(routes.login)}
            >
              Connexion
            </Button>
            <Button variant="primary">
              Contact Us
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

