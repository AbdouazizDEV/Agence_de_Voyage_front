import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, Plane, Home } from 'lucide-react'
import { useLogin } from '../hooks/useLogin'
import { Button } from '@common/components/ui/Button'
import { Toggle } from '@common/components/ui/Toggle'
import { Card, CardContent } from '@common/components/ui/Card'
import { routes } from '@config/routes.config'
import { cn } from '@common/utils/cn'

const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
})

type LoginFormData = z.infer<typeof loginSchema>

interface LoginFormProps {
  className?: string
}

/**
 * Formulaire de connexion avec toggle Client/Admin
 */
export const LoginForm = ({ className }: LoginFormProps) => {
  const [userType, setUserType] = useState<'client' | 'admin'>('client')
  const [showPassword, setShowPassword] = useState(false)
  
  const { mutate: login, isPending } = useLogin(userType)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: LoginFormData) => {
    login(data)
  }

  const toggleOptions = [
    { value: 'client', label: 'Client' },
    { value: 'admin', label: 'Admin' },
  ]

  return (
    <div className={cn('min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50 p-4 relative', className)}>
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardContent className="p-8">
          {/* Header avec icône et titre */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Plane className="h-10 w-10 text-primary-600" strokeWidth={1.5} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {userType === 'client' ? 'Connexion Client' : 'Connexion Admin'}
            </h1>
            <p className="text-gray-600 text-sm">
              {userType === 'client'
                ? "Bienvenue ! Veuillez saisir votre email et mot de passe pour vous connecter en tant que client."
                : "Bienvenue ! Veuillez saisir votre email et mot de passe pour vous connecter en tant qu'administrateur."
              }
            </p>
          </div>

          {/* Toggle Client/Admin */}
          <div className="flex justify-center mb-6">
            <Toggle
              options={toggleOptions}
              value={userType}
              onChange={(value) => setUserType(value as 'client' | 'admin')}
            />
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email/Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email / Username
              </label>
              <input
                type="text"
                placeholder="Enter your email or username"
                {...register('email')}
                className={cn(
                  'flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
                  errors.email && 'border-red-500 focus-visible:ring-red-500'
                )}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  {...register('password')}
                  className={cn(
                    'flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
                    errors.password && 'border-red-500 focus-visible:ring-red-500'
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}    
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <a
                href="/forgot-password"
                className="text-sm text-primary-600 hover:text-primary-700 hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={isPending}
            >
              {isPending ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          {/* Lien d'inscription */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Pas encore de compte ?{' '}
              <Link
                to={routes.register}
                className="text-primary-600 hover:text-primary-700 font-medium hover:underline"
              >
                {userType === 'client' ? 'Inscription Client' : 'Inscription Admin'}
              </Link>
            </p>
          </div>

          {/* Lien retour à l'accueil */}
          <div className="mt-4 text-center">
            <Link
              to={routes.home}
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-primary-600 transition-colors"
            >
              <Home className="h-4 w-4" />
              Retourner à l'accueil
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Footer Copyright */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-gray-500">
        © 2024 Your Travel Agency. All rights reserved.
      </div>
    </div>
  )
}
