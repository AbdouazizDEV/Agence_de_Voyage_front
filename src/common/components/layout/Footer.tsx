import { Link } from 'react-router-dom'
import { Plane, MessageCircle, Mail, Phone, MapPin } from 'lucide-react'
import { Button } from '@common/components/ui/Button'
import { useWhatsApp } from '@features/whatsapp/hooks/useWhatsApp'
import { useSettings } from '@features/settings/hooks/useSettings'
import { routes } from '@config/routes.config'

/**
 * Composant Footer avec 4 colonnes - Données dynamiques depuis l'API
 */
export const Footer = () => {
  const { handleDirectWhatsApp } = useWhatsApp()
  const { data: settings, isLoading } = useSettings()

  // Valeurs par défaut si les settings ne sont pas encore chargés
  const companyName = settings?.company?.name || 'Travel Agency'
  const companyDescription = settings?.company?.description || 'Votre agence de voyage de confiance'
  const companyAddress = settings?.company?.address || 'Dakar, Sénégal'
  const companyEmail = settings?.company?.email || 'contact@travelagency.sn'
  const companyPhone = settings?.company?.phone || '221761885485'
  const whatsappEnabled = settings?.whatsapp?.enabled ?? true

  return (
    <footer className="bg-gray-100 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Colonne 1: Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Plane className="h-6 w-6 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">
                {isLoading ? '...' : companyName}
              </span>
            </div>
            <p className="text-gray-600 text-sm">
              {isLoading ? 'Chargement...' : companyDescription}
            </p>
          </div>

          {/* Colonne 2: Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to={routes.offers}
                  className="text-gray-600 hover:text-primary-600 transition-colors text-sm"
                >
                  Offers
                </Link>
              </li>
              <li>
                <Link
                  to="/destinations"
                  className="text-gray-600 hover:text-primary-600 transition-colors text-sm"
                >
                  Destinations
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-primary-600 transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 hover:text-primary-600 transition-colors text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 3: Contact Us */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              {isLoading ? (
                <li className="text-gray-400">Chargement...</li>
              ) : (
                <>
                  {companyAddress && (
                    <li className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-0.5 text-primary-600 flex-shrink-0" />
                      <span>{companyAddress}</span>
                    </li>
                  )}
                  {companyEmail && (
                    <li className="flex items-start gap-2">
                      <Mail className="h-4 w-4 mt-0.5 text-primary-600 flex-shrink-0" />
                      <a
                        href={`mailto:${companyEmail}`}
                        className="hover:text-primary-600 transition-colors"
                      >
                        {companyEmail}
                      </a>
                    </li>
                  )}
                  {companyPhone && (
                    <li className="flex items-start gap-2">
                      <Phone className="h-4 w-4 mt-0.5 text-primary-600 flex-shrink-0" />
                      <a
                        href={`tel:${companyPhone}`}
                        className="hover:text-primary-600 transition-colors"
                      >
                        {companyPhone}
                      </a>
                    </li>
                  )}
                </>
              )}
            </ul>
          </div>

          {/* Colonne 4: Connect via WhatsApp */}
          {whatsappEnabled && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Connect via WhatsApp</h3>
              <Button
                variant="primary"
                className="bg-green-500 hover:bg-green-600 w-full"
                onClick={() => handleDirectWhatsApp()}
                disabled={isLoading}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Chat with Us
              </Button>
            </div>
          )}
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-300 mt-8 pt-8 text-center">
          <p className="text-gray-600 text-sm">
            ©{new Date().getFullYear()} {isLoading ? 'Travel Agency' : companyName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

