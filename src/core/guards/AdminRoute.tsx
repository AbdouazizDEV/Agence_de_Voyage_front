import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@features/auth/store/authStore'

interface AdminRouteProps {
  children: React.ReactNode
}

/**
 * Guard pour protéger les routes admin
 */
export const AdminRoute = ({ children }: AdminRouteProps) => {
  const { user, isAuthenticated } = useAuthStore()

  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

