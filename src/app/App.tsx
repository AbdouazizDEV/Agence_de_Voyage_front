import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import { QueryProvider } from '@core/providers/QueryProvider'
import { ProtectedRoute } from '@core/guards/ProtectedRoute'
import { AdminRoute } from '@core/guards/AdminRoute'
import { routes } from '@config/routes.config'
import { RegisterForm } from '@features/auth/components/RegisterForm'
import { HomePage } from './pages/HomePage'
import { OffersPage } from './pages/OffersPage'
import { OfferDetailsPage } from './pages/OfferDetailsPage'
import { LoginPage } from './pages/LoginPage'
import { DestinationsPage } from './pages/DestinationsPage'
import { AboutUsPage } from './pages/AboutUsPage'
import { ContactUsPage } from './pages/ContactUsPage'

// Pages (à créer progressivement)
const ClientDashboard = () => <div className="p-8"><h1 className="text-2xl font-bold">Dashboard Client</h1></div>
const AdminDashboard = () => <div className="p-8"><h1 className="text-2xl font-bold">Dashboard Admin</h1></div>

/**
 * Composant principal de l'application
 */
function App() {
  return (
    <QueryProvider>
      <BrowserRouter>
        <Routes>
          {/* Routes publiques */}
          <Route path={routes.home} element={<HomePage />} />
          <Route path={routes.offers} element={<OffersPage />} />
          <Route path="/offers/:id" element={<OfferDetailsPage />} />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path={routes.login} element={<LoginPage />} />
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path={routes.register} element={<RegisterForm />} />
          
          {/* Routes client protégées */}
          <Route
            path={routes.client.dashboard}
            element={
              <ProtectedRoute>
                <ClientDashboard />
              </ProtectedRoute>
            }
          />
          
          {/* Routes admin protégées */}
          <Route
            path={routes.admin.dashboard}
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          
          {/* Route par défaut */}
          <Route path="*" element={<Navigate to={routes.home} replace />} />
        </Routes>
        <Toaster position="top-right" />
      </BrowserRouter>
    </QueryProvider>
  )
}

export default App

