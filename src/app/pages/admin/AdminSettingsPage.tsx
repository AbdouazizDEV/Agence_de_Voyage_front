import { AdminLayout } from '@common/components/layout/AdminLayout'
import { SettingsForm } from '@features/admin/components/SettingsForm'
import { Loading } from '@common/components/feedback/Loading'
import { Error } from '@common/components/feedback/Error'
import { useAdminSettings, useUpdateSettings } from '@features/admin/hooks/useAdminSettings'
import { UpdateSettingsDto } from '@features/admin/api/adminSettingsApi'

/**
 * Page de paramètres pour l'admin
 */
export const AdminSettingsPage = () => {
  const { data: settings, isLoading, error, refetch } = useAdminSettings()
  const updateSettings = useUpdateSettings()

  const handleSubmit = async (data: UpdateSettingsDto) => {
    try {
      await updateSettings.mutateAsync(data)
    } catch (error) {
      // L'erreur est déjà gérée par le hook
      console.error('Error updating settings:', error)
    }
  }

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loading message="Chargement des paramètres..." />
        </div>
      </AdminLayout>
    )
  }

  if (error) {
    return (
      <AdminLayout>
        <Error
          message="Erreur lors du chargement des paramètres"
          onRetry={() => refetch()}
        />
      </AdminLayout>
    )
  }

  if (!settings) {
    return (
      <AdminLayout>
        <div className="text-center py-12 text-gray-500">
          Aucun paramètre trouvé
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Paramètres</h1>
          <p className="text-gray-600">
            Gérez les paramètres de votre agence de voyage
          </p>
        </div>

        {/* Settings Form */}
        <SettingsForm
          settings={settings}
          onSubmit={handleSubmit}
          isLoading={updateSettings.isPending}
        />
      </div>
    </AdminLayout>
  )
}

