import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Building2, MessageCircle, Globe, Save } from 'lucide-react'
import { Button } from '@common/components/ui/Button'
import { Input } from '@common/components/ui/Input'
import { Card, CardHeader, CardTitle, CardContent } from '@common/components/ui/Card'
import { Select } from '@common/components/ui/Select'
import { AdminSettings, UpdateSettingsDto } from '../api/adminSettingsApi'
import { cn } from '@common/utils/cn'

const settingsSchema = z.object({
  companyName: z.string().min(2, 'Le nom de l\'entreprise est requis'),
  companyEmail: z.string().email('Email invalide'),
  companyPhone: z.string().min(1, 'Le numéro de téléphone est requis'),
  whatsappNumber: z.string().min(1, 'Le numéro WhatsApp est requis'),
  address: z.string().min(3, 'L\'adresse est requise'),
  description: z.string().min(10, 'La description doit contenir au moins 10 caractères'),
  currency: z.string().min(1, 'La devise est requise'),
  whatsappMessageTemplate: z.string().min(5, 'Le modèle de message est requis'),
  whatsappEnabled: z.boolean(),
})

type SettingsFormData = z.infer<typeof settingsSchema>

interface SettingsFormProps {
  settings: AdminSettings
  onSubmit: (data: UpdateSettingsDto) => void
  isLoading?: boolean
}

/**
 * Formulaire de paramètres avec sections
 */
export const SettingsForm = ({ settings, onSubmit, isLoading }: SettingsFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      companyName: settings.company.name,
      companyEmail: settings.company.email,
      companyPhone: settings.company.phone,
      whatsappNumber: settings.company.whatsappNumber,
      address: settings.company.address,
      description: settings.company.description,
      currency: settings.general.currency,
      whatsappMessageTemplate: settings.whatsapp.messageTemplate,
      whatsappEnabled: settings.whatsapp.enabled,
    },
  })

  const whatsappEnabled = watch('whatsappEnabled')

  const currencyOptions = [
    { value: 'FCFA', label: 'FCFA' },
    { value: 'EUR', label: 'EUR' },
    { value: 'USD', label: 'USD' },
    { value: 'XOF', label: 'XOF' },
  ]

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Company Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary-600" />
            <CardTitle>Informations de l'entreprise</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nom de l'entreprise"
              {...register('companyName')}
              error={errors.companyName?.message}
              placeholder="Travel Agency Dakar"
            />
            <Input
              label="Email"
              type="email"
              {...register('companyEmail')}
              error={errors.companyEmail?.message}
              placeholder="contact@travelagency.sn"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Téléphone"
              {...register('companyPhone')}
              error={errors.companyPhone?.message}
              placeholder="221761885485"
            />
            <Input
              label="Numéro WhatsApp"
              {...register('whatsappNumber')}
              error={errors.whatsappNumber?.message}
              placeholder="221761885485"
            />
          </div>

          <Input
            label="Adresse"
            {...register('address')}
            error={errors.address?.message}
            placeholder="Dakar, Sénégal"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows={4}
              {...register('description')}
              className={cn(
                'flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
                errors.description && 'border-red-500 focus-visible:ring-red-500'
              )}
              placeholder="Votre agence de voyage de confiance"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* WhatsApp Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-primary-600" />
            <CardTitle>Configuration WhatsApp</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="text-sm font-medium text-gray-700">Activer WhatsApp</label>
              <p className="text-xs text-gray-500">Permettre l'utilisation de WhatsApp</p>
            </div>
            <button
              type="button"
              onClick={() => setValue('whatsappEnabled', !whatsappEnabled, { shouldValidate: true })}
              className={cn(
                'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                whatsappEnabled ? 'bg-green-500' : 'bg-gray-300'
              )}
            >
              <span
                className={cn(
                  'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                  whatsappEnabled ? 'translate-x-6' : 'translate-x-1'
                )}
              />
            </button>
            <input type="hidden" value={whatsappEnabled ? 'true' : 'false'} {...register('whatsappEnabled', { value: whatsappEnabled })} />
          </div>

          {whatsappEnabled && (
            <>
              <Input
                label="Numéro WhatsApp"
                {...register('whatsappNumber')}
                error={errors.whatsappNumber?.message}
                placeholder="221761885485"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Modèle de message
                </label>
                <textarea
                  rows={3}
                  {...register('whatsappMessageTemplate')}
                  className={cn(
                    'flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
                    errors.whatsappMessageTemplate && 'border-red-500 focus-visible:ring-red-500'
                  )}
                  placeholder="Bonjour, je suis intéressé(e) par..."
                />
                {errors.whatsappMessageTemplate && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.whatsappMessageTemplate.message}
                  </p>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* General Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary-600" />
            <CardTitle>Paramètres généraux</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select
            label="Devise"
            options={currencyOptions}
            {...register('currency')}
          />
          {errors.currency && (
            <p className="text-sm text-red-600">{errors.currency.message}</p>
          )}

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Fuseau horaire:</strong> {settings.general.timezone}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              <strong>Langue:</strong> {settings.general.language}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Ces paramètres sont gérés automatiquement par le système.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button
          type="submit"
          variant="primary"
          disabled={isLoading}
          className="min-w-[200px]"
        >
          <Save className="h-4 w-4 mr-2" />
          {isLoading ? 'Enregistrement...' : 'Enregistrer les modifications'}
        </Button>
      </div>
    </form>
  )
}

