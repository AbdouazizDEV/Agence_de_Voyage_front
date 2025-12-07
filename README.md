# 🎯 Frontend Agence de Voyage

Frontend React moderne pour une plateforme d'agence de voyage connectée à une API NestJS.

## 🛠️ Stack Technique

- **React 18+** avec TypeScript (mode strict)
- **Vite** - Build tool et dev server
- **React Router v6** - Routing
- **Zustand** - State management
- **TanStack Query (React Query)** - Gestion des requêtes API et cache
- **Axios** - Client HTTP avec interceptors
- **Tailwind CSS** - Styling utility-first
- **React Hook Form** + **Zod** - Gestion et validation de formulaires
- **Sonner** - Notifications toast
- **date-fns** - Manipulation de dates
- **Lucide React** - Icônes

## 📁 Architecture

Le projet suit les principes **SOLID** et une architecture modulaire :

```
src/
├── app/                    # Configuration app (main.tsx, App.tsx)
├── common/                 # Éléments partagés
│   ├── constants/         # Constantes
│   ├── types/             # Types TypeScript partagés
│   ├── utils/             # Utilitaires
│   └── components/        # Composants UI réutilisables
├── features/              # Features métier (Feature-Sliced Design)
│   ├── auth/              # Module Authentification
│   ├── offers/            # Module Offres
│   ├── reservations/      # Module Réservations
│   └── admin/             # Module Administration
├── config/                # Configuration
├── core/                  # Core de l'application
│   ├── interceptors/     # Axios interceptors
│   ├── guards/            # Route guards
│   └── providers/         # Context providers
└── assets/                # Images, fonts, etc.
```

## 🚀 Installation

```bash
# Installer les dépendances
npm install

# Créer le fichier .env.local
cp .env.example .env.local

# Modifier .env.local avec vos configurations
```

## ⚙️ Configuration

### Variables d'environnement

Créez un fichier `.env.local` :

```env
VITE_API_URL=http://localhost:3000/api/v1
VITE_APP_ENV=development
```

## 🏃 Développement

```bash
# Démarrer le serveur de développement
npm run dev

# Build production
npm run build

# Preview production
npm run preview

# Lint
npm run lint
```

## 📦 Modules Implémentés

### ✅ Authentification (`features/auth/`)

- Login Admin et Client séparés
- Register Admin et Client
- Refresh token automatique
- Gestion des tokens (localStorage)
- Route guards (ProtectedRoute, AdminRoute)

### 🎨 Composants UI de Base

- Button (variants: primary, secondary, outline, ghost, destructive)
- Input (avec validation)
- Card (CardHeader, CardTitle, CardDescription, CardContent, CardFooter)
- Badge
- Spinner
- Loading, Error, Empty states

## 🔐 Authentification

L'authentification utilise JWT avec access et refresh tokens :

- Les tokens sont stockés dans `localStorage`
- Refresh automatique via interceptors Axios
- Route guards pour protéger les routes

## 📝 Structure des Features

Chaque feature suit cette structure :

```
feature/
├── api/           # Appels API
├── components/    # Composants spécifiques
├── hooks/         # Hooks métier
├── store/         # State management (Zustand)
├── types/         # Types spécifiques
└── utils/         # Utilitaires
```

## 🎯 Prochaines Étapes

- [ ] Module Offres (liste, détails, recherche, filtres)
- [ ] Module Réservations (création, liste, paiements)
- [ ] Module Administration (CRUD offres, clients, catégories)
- [ ] Dashboard Admin (statistiques)
- [ ] Upload d'images (FormData)
- [ ] Notifications en temps réel
- [ ] Tests unitaires

## 📚 Ressources

- **API Documentation:** `http://localhost:3000/api/docs` (Swagger)
- **React Query:** https://tanstack.com/query/latest
- **Zustand:** https://zustand-demo.pmnd.rs/
- **Tailwind CSS:** https://tailwindcss.com/docs

## 📄 Licence

MIT
