import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@features/auth/store/authStore'

interface ProtectedRouteProps {
  children: React.ReactNode
}

/**
 * Guard pour protéger les routes nécessitant une authentification
 */
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

