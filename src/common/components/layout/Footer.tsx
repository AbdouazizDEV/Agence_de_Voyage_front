import { Link } from 'react-router-dom'
import { Plane, MessageCircle } from 'lucide-react'
import { Button } from '@common/components/ui/Button'
import { routes } from '@config/routes.config'

/**
 * Composant Footer avec 4 colonnes
 */
export const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Colonne 1: TravelAgency */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Plane className="h-6 w-6 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">TravelAgency</span>
            </div>
            <p className="text-gray-600 text-sm">
              Crafting unforgettable travel experiences. Your adventure starts here.
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
            <ul className="space-y-2 text-sm text-gray-600">
              <li>123 Travel Lane, Adventure City</li>
              <li>
                <a
                  href="mailto:hello@travelagency.com"
                  className="hover:text-primary-600 transition-colors"
                >
                  hello@travelagency.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+1034567890"
                  className="hover:text-primary-600 transition-colors"
                >
                  +1 (034) 567-890
                </a>
              </li>
            </ul>
          </div>

          {/* Colonne 4: Connect via WhatsApp */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Connect via WhatsApp</h3>
            <Button
              variant="primary"
              className="bg-green-500 hover:bg-green-600 w-full"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Chat with Us
            </Button>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-300 mt-8 pt-8 text-center">
          <p className="text-gray-600 text-sm">
            ©2024 TravelAgency. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

