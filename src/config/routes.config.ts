/**
 * Configuration des routes de l'application
 */
export const routes = {
  // Public routes
  home: '/',
  login: '/login',
  register: '/register',
  offers: '/offers',
  offerDetails: (id: string) => `/offers/${id}`,
  
  // Client routes
  client: {
    dashboard: '/client/dashboard',
    reservations: '/client/reservations',
    reservationDetails: (id: string) => `/client/reservations/${id}`,
    profile: '/client/profile',
  },
  
  // Admin routes
  admin: {
    dashboard: '/admin/dashboard',
    offers: '/admin/offers',
    offerCreate: '/admin/offers/create',
    offerEdit: (id: string) => `/admin/offers/${id}/edit`,
    clients: '/admin/clients',
    categories: '/admin/categories',
    reservations: '/admin/reservations',
    settings: '/admin/settings',
  },
} as const

