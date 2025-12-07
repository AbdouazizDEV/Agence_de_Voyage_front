import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRegister } from '../hooks/useRegister'
import { Button } from '@common/components/ui/Button'
import { Input } from '@common/components/ui/Input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@common/components/ui/Card'

const registerSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
  first_name: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  last_name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  phone: z.string().optional(),
})

type RegisterFormData = z.infer<typeof registerSchema>

interface RegisterFormProps {
  type?: 'admin' | 'client'
}

/**
 * Formulaire d'inscription
 */
export const RegisterForm = ({ type = 'client' }: RegisterFormProps) => {
  const { mutate: register, isPending } = useRegister(type)
  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = (data: RegisterFormData) => {
    register(data)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Inscription {type === 'admin' ? 'Admin' : 'Client'}</CardTitle>
        <CardDescription>
          Créez votre compte
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Prénom"
              placeholder="Jean"
              {...registerField('first_name')}
              error={errors.first_name?.message}
            />
            <Input
              label="Nom"
              placeholder="Dupont"
              {...registerField('last_name')}
              error={errors.last_name?.message}
            />
          </div>
          <Input
            label="Email"
            type="email"
            placeholder="votre@email.com"
            {...registerField('email')}
            error={errors.email?.message}
          />
          {type === 'client' && (
            <Input
              label="Téléphone (optionnel)"
              type="tel"
              placeholder="+33 6 12 34 56 78"
              {...registerField('phone')}
              error={errors.phone?.message}
            />
          )}
          <Input
            label="Mot de passe"
            type="password"
            placeholder="••••••••"
            {...registerField('password')}
            error={errors.password?.message}
          />
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? 'Inscription...' : 'S\'inscrire'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

